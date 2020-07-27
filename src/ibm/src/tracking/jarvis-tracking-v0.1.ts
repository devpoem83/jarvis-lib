declare var $: any;

namespace Jarvis {
    export namespace Tracking {
        // Trancking 객체 인터페이스
        export interface ITracking {
            userId: string;
            pageUrl: string;
            refererUrl: string;
            authCookie: string;
            ip: string;
            agent: string;
        }

        // Error 객체 인터페이스
        export interface IError {
            responseText: string;
            status: number;
            statusText: string;
        }

        export class TrackingHandler {
            private API_DOMAIN = "es.eduwill.net";

            private readonly PROFILE_LIVE = "L";
            private readonly PROFILE_STG = "S";
            private readonly PROFILE_DEV = "D";

            private readonly LOG_LEVEL_DEBUG = 4000;
            private readonly LOG_LEVEL_INFO = 3000;
            private readonly LOG_LEVEL_ERROR = 2000;
            private readonly LOG_LEVEL_NONE = 1000;

            private _tracking: ITracking = {
                userId: "",
                pageUrl: "",
                refererUrl: "",
                authCookie: "",
                ip: "",
                agent: "",
            };

            // 생성자
            constructor() {
                this.fn_active();
            }

            // Main Method
            private fn_active() {
                this._tracking.userId = this.fn_getCookie("EduwillUID");
                this._tracking.pageUrl = document.location.href;
                this._tracking.authCookie = this.fn_getCookie("EDWAUTH01");
                this._tracking.refererUrl = document.referrer;
                this._tracking.ip = this.fn_getCookie("loginIp");

                if (this._tracking.ip != "" && this._tracking.pageUrl != "") {
                    this.fn_config();
                    this.fn_setTracking();
                } else {
                    console.log("사용자 정보 없음.");
                }
            }

            private fn_config() {
                var api_protocol = "//";
                if (
                    this._tracking.pageUrl.indexOf("//l-") > -1 ||
                    this._tracking.pageUrl.indexOf("//d-") > -1
                ) {
                    api_protocol = api_protocol + "d-";
                } else if (
                    this._tracking.pageUrl.indexOf("//s-") > -1 ||
                    this._tracking.pageUrl.indexOf("//test") > -1
                ) {
                    api_protocol = api_protocol + "s-";
                }
                this.API_DOMAIN = api_protocol + this.API_DOMAIN;
            }

            // 데이터 조회
            private fn_setTracking() {
                var uri = "/visit/_doc";
                this.fn_postAjax(
                    this.API_DOMAIN + uri,
                    this._tracking,
                    this.fn_success,
                    this.fn_error
                );
            }

            // 데이터 조회성공
            private fn_success() {
                //console.log("success!")
                console.log("success tracking record!");
            }

            // 실패처리
            private fn_error(e: IError) {
                console.log("Error : " + e.responseText);
            }

            // Post 방식으로 Ajax 처리
            private fn_postAjax(
                callUrl: String,
                param: Object,
                successCallback: Function,
                failCallback: Function
            ): void {
                $.ajax({
                    type: "POST",
                    async: true,
                    url: callUrl,
                    crossDomain: true,
                    contentType: "application/json; charset=utf-8",
                    dataType: "json",
                    timeout: 5000,
                    cache: false,
                    data: param,
                    success: function (jsonData: Object) {
                        if (typeof successCallback == "function") {
                            successCallback(jsonData);
                        }
                    },
                    error: function (e: Error) {
                        if (typeof failCallback == "function") {
                            failCallback(e);
                        }
                    },
                });
            }

            private fn_getCookie(c_name: string) {
                var i,
                    x,
                    y,
                    ARRcookies = document.cookie.split(";");
                for (i = 0; i < ARRcookies.length; i++) {
                    x = ARRcookies[i].substr(0, ARRcookies[i].indexOf("="));
                    y = ARRcookies[i].substr(ARRcookies[i].indexOf("=") + 1);
                    x = x.replace(/^\s+|\s+$/g, "");
                    if (x == c_name) {
                        return unescape(y);
                    }
                }
                return "";
            }
        }
    }
}
var tracking = new Jarvis.Tracking.TrackingHandler();
