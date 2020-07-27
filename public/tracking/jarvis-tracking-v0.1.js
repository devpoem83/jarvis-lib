"use strict";
var Jarvis;
(function (Jarvis) {
    var Tracking;
    (function (Tracking) {
        var TrackingHandler = /** @class */ (function () {
            // 생성자
            function TrackingHandler() {
                this.API_DOMAIN = "es.eduwill.net";
                this.PROFILE_LIVE = "L";
                this.PROFILE_STG = "S";
                this.PROFILE_DEV = "D";
                this.LOG_LEVEL_DEBUG = 4000;
                this.LOG_LEVEL_INFO = 3000;
                this.LOG_LEVEL_ERROR = 2000;
                this.LOG_LEVEL_NONE = 1000;
                this._tracking = {
                    userId: "",
                    pageUrl: "",
                    refererUrl: "",
                    authCookie: "",
                    ip: "",
                    agent: "",
                };
                this.fn_active();
            }
            // Main Method
            TrackingHandler.prototype.fn_active = function () {
                this._tracking.userId = this.fn_getCookie("EduwillUID");
                this._tracking.pageUrl = document.location.href;
                this._tracking.authCookie = this.fn_getCookie("EDWAUTH01");
                this._tracking.refererUrl = document.referrer;
                this._tracking.ip = this.fn_getCookie("loginIp");
                if (this._tracking.ip != "" && this._tracking.pageUrl != "") {
                    this.fn_config();
                    this.fn_setTracking();
                }
                else {
                    console.log("사용자 정보 없음.");
                }
            };
            TrackingHandler.prototype.fn_config = function () {
                var api_protocol = "//";
                if (this._tracking.pageUrl.indexOf("//l-") > -1 ||
                    this._tracking.pageUrl.indexOf("//d-") > -1) {
                    api_protocol = api_protocol + "d-";
                }
                else if (this._tracking.pageUrl.indexOf("//s-") > -1 ||
                    this._tracking.pageUrl.indexOf("//test") > -1) {
                    api_protocol = api_protocol + "s-";
                }
                this.API_DOMAIN = api_protocol + this.API_DOMAIN;
            };
            // 데이터 조회
            TrackingHandler.prototype.fn_setTracking = function () {
                var uri = "/visit/_doc";
                this.fn_postAjax(this.API_DOMAIN + uri, this._tracking, this.fn_success, this.fn_error);
            };
            // 데이터 조회성공
            TrackingHandler.prototype.fn_success = function () {
                //console.log("success!")
                console.log("success tracking record!");
            };
            // 실패처리
            TrackingHandler.prototype.fn_error = function (e) {
                console.log("Error : " + e.responseText);
            };
            // Post 방식으로 Ajax 처리
            TrackingHandler.prototype.fn_postAjax = function (callUrl, param, successCallback, failCallback) {
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
                    success: function (jsonData) {
                        if (typeof successCallback == "function") {
                            successCallback(jsonData);
                        }
                    },
                    error: function (e) {
                        if (typeof failCallback == "function") {
                            failCallback(e);
                        }
                    },
                });
            };
            TrackingHandler.prototype.fn_getCookie = function (c_name) {
                var i, x, y, ARRcookies = document.cookie.split(";");
                for (i = 0; i < ARRcookies.length; i++) {
                    x = ARRcookies[i].substr(0, ARRcookies[i].indexOf("="));
                    y = ARRcookies[i].substr(ARRcookies[i].indexOf("=") + 1);
                    x = x.replace(/^\s+|\s+$/g, "");
                    if (x == c_name) {
                        return unescape(y);
                    }
                }
                return "";
            };
            return TrackingHandler;
        }());
        Tracking.TrackingHandler = TrackingHandler;
    })(Tracking = Jarvis.Tracking || (Jarvis.Tracking = {}));
})(Jarvis || (Jarvis = {}));
var tracking = new Jarvis.Tracking.TrackingHandler();
//# sourceMappingURL=jarvis-tracking-v0.1.js.map