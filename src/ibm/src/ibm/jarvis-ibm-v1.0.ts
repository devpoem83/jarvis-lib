declare var $: any;

namespace Jarvis {
    export namespace Ibm {
        export class Logger {
            private static readonly LOGGER_LEVEL_DEBUG: number = 1000; // debug log level value
            private static readonly LOGGER_LEVEL_INFO: number = 2000; // info log level value
            private static readonly LOGGER_LEVEL_WARNING: number = 3000; // warning log level value
            private static readonly LOGGER_LEVEL_ERROR: number = 4000; // error log level value

            private static readonly LOGGER_LEVEL_DEBUG_TITLE: string = "DEBUG"; // debug log level title
            private static readonly LOGGER_LEVEL_INFO_TITLE: string = "INFO"; // info log level title
            private static readonly LOGGER_LEVEL_WARNING_TITLE: string =
                "WARNING"; // warning log level title
            private static readonly LOGGER_LEVEL_ERROR_TITLE: string = "ERROR"; // error log level title

            public static loggerLevel: number = 3000;
            //public static loggerLevel: number = 1000;

            private className: string = "";

            private static logger: Jarvis.Ibm.Logger;

            /**
             * Constructor
             * @param level : logger level value
             */
            constructor(object: Object) {
                this.className = this.getFunctionName(object);
            }

            /**
             * 함수명 추출처리
             */
            private getFunctionName(object: Object): string {
                var funcNameRegex = /function (.{1,})\(/;
                var results = funcNameRegex.exec(object.constructor.toString());
                return results && results.length > 1 ? results[1] : "";
            }

            /**
             * Logger level configuration
             * @param level
             */
            public setLoggerLevel(level: number): void {
                Jarvis.Ibm.Logger.loggerLevel = level;
                console.log(
                    "Logger level changed! - " + Jarvis.Ibm.Logger.loggerLevel
                );
            }

            public static getInstance(object: Object): Jarvis.Ibm.Logger {
                if (Jarvis.Ibm.Logger.logger == undefined) {
                    Jarvis.Ibm.Logger.logger = new Jarvis.Ibm.Logger(object);
                } else {
                }
                return Jarvis.Ibm.Logger.logger;
            }

            /**
             * Debug log print
             * @param msg
             */
            public debug(msg: Object): void {
                this.print(
                    Jarvis.Ibm.Logger.LOGGER_LEVEL_DEBUG,
                    Jarvis.Ibm.Logger.LOGGER_LEVEL_DEBUG_TITLE,
                    msg
                );
            }

            /**
             * Info log print
             * @param msg
             */
            public info(msg: Object): void {
                this.print(
                    Jarvis.Ibm.Logger.LOGGER_LEVEL_INFO,
                    Jarvis.Ibm.Logger.LOGGER_LEVEL_INFO_TITLE,
                    msg
                );
            }

            /**
             * Warning log print
             * @param msg
             */
            public warn(msg: Object): void {
                this.print(
                    Jarvis.Ibm.Logger.LOGGER_LEVEL_WARNING,
                    Jarvis.Ibm.Logger.LOGGER_LEVEL_WARNING_TITLE,
                    msg
                );
            }

            /**
             * Error log print
             * @param e         : Exception Object
             */
            //public error(e: DOMException): void {
            public error(e: DOMException): void {
                this.print(
                    Jarvis.Ibm.Logger.LOGGER_LEVEL_ERROR,
                    Jarvis.Ibm.Logger.LOGGER_LEVEL_ERROR_TITLE,
                    "[" + e.code + "] " + e.name + " " + e.message
                );
            }

            /**
             * Log print
             * @param level         : log level value
             * @param levelTitle    : log level title
             * @param msg           : print message
             */
            private print(
                level: number,
                levelTitle: string,
                msg: Object
            ): void {
                if (level >= Jarvis.Ibm.Logger.loggerLevel) {
                    var now = new Date();
                    var whitespace =
                        levelTitle == Jarvis.Ibm.Logger.LOGGER_LEVEL_DEBUG_TITLE
                            ? ""
                            : "";
                    var nowTime =
                        now.getFullYear() +
                        "-" +
                        (now.getMonth() + 1) +
                        "-" +
                        now.getDate() +
                        " " +
                        now.getHours() +
                        ":" +
                        now.getMinutes() +
                        ":" +
                        now.getSeconds();
                    var logText =
                        whitespace + "[" + levelTitle + "] [" + nowTime + "] ";
                    logText += this.className + " > ";
                    if (typeof msg == "string") {
                        logText += msg;
                        try {
                            console.log(logText);
                        } catch (e) {}
                    } else {
                        try {
                            console.log(msg);
                        } catch (e) {}
                    }
                }
            }
        }
        export class Utils {
            private static utils: Jarvis.Ibm.Utils;

            private _logger = Jarvis.Ibm.Logger.getInstance(this);

            public static getInstance(): Jarvis.Ibm.Utils {
                if (Jarvis.Ibm.Utils.utils == undefined) {
                    Jarvis.Ibm.Utils.utils = new Jarvis.Ibm.Utils();
                }
                return Jarvis.Ibm.Utils.utils;
            }

            // Get방식으로 Ajax 처리
            public getData(
                callUrl: string,
                param: Object,
                successCallback: Function,
                failCallback: Function
            ): void {
                $.ajax({
                    type: "GET",
                    async: true,
                    //async: false,
                    url: callUrl,
                    crossDomain: true,
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

            // Post 방식으로 Ajax 처리
            public postData(
                callUrl: string,
                param: Object,
                successCallback: Function,
                failCallback: Function
            ): void {
                $.ajax({
                    type: "POST",
                    async: true,
                    url: callUrl,
                    crossDomain: true,
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

            // 쿠키 조회
            public getCookie(cookie_name: string) {
                var i,
                    x,
                    y,
                    ARRcookies = document.cookie.split(";");
                for (i = 0; i < ARRcookies.length; i++) {
                    x = ARRcookies[i].substr(0, ARRcookies[i].indexOf("="));
                    y = ARRcookies[i].substr(ARRcookies[i].indexOf("=") + 1);
                    x = x.replace(/^\s+|\s+$/g, "");
                    if (x == cookie_name) {
                        return unescape(y);
                    }
                }
                return "";
            }

            // 쿠키 설정
            public setCookie(
                cookie_name: string,
                cookie_value: string,
                exdays: number
            ) {
                this._logger.debug("쿠키 생성");
                var exdate = new Date();
                exdate.setDate(exdate.getDate() + exdays);
                var c_value =
                    escape(cookie_value) +
                    (exdays == null ? "" : "; expires=" + exdate.toUTCString());
                document.cookie =
                    cookie_name + "=" + c_value + ";domain=eduwill.net;";
            }

            // 파라미터 조회
            public getParameter(name: string): string {
                var value = "";
                var currUrl = document.location.href;
                if (currUrl.indexOf(name) > -1) {
                    if (currUrl.indexOf("?") > -1) {
                        var div = currUrl.split("?");
                        if (div.length == 2) {
                            if (div[1].indexOf("&") > -1) {
                                var params = div[1].split("&");
                                if (params.length > 1) {
                                    var param = params.filter(
                                        (obj) => obj.indexOf(name) > -1
                                    )[0];
                                    var divParam = param.split("=");
                                    if (divParam.length == 2) {
                                        value = divParam[1];
                                    }
                                } else if (params.length == 1) {
                                    var param = params[0];
                                    var divParam = param.split("=");
                                    if (divParam.length == 2) {
                                        value = divParam[1];
                                    }
                                }
                            } else {
                                // 단일 파라미터
                                var divParam = div[1].split("=");
                                if (divParam.length == 2) {
                                    value = divParam[1];
                                }
                            }
                        }
                    }
                }

                return value;
            }
        }

        export interface IService {
            svcCd: string;
            hide: boolean;
            banner: IBanner;
            html: string;
        }

        export interface IBanner {
            bnrNo: number;
            bnrNm: string;
            expsrDevc: string;
            overImgUseYn: string;
            dimUseYn: string;
            endType: string;
            listExpsrType: string;
            listPageUseYn: string;
            listFrontRearUseYn: string;
            uprndLocAdjst: number;
            leftLocAdjst: number;
            expsrLoc: string;
            contents: IBannerContent[];
            tmpltNo: number;
            html: string;
        }

        export interface IBannerContent {
            contntNo: number;
            contntType: string;
            pcImgUrl: string;
            overImgUseYn: string;
            overImgUrl: string;
            mobileImgUrl: string;
            vodUrl: string;
            leftColorCd: string;
            rightColorCd: string;
            calbak: string;
            links: IBannerContentLink[];
            html: string;
            width: string;
        }

        export interface IBannerContentLink {
            linkNo: number;
            linkType: string;
            linkUrl: string;
            linkMsg: string;
        }

        export class BannerHandler {
            //private _logger = new Jarvis.Ibm.Logger(this);
            private _logger = Jarvis.Ibm.Logger.getInstance(this);
            private _utils = Jarvis.Ibm.Utils.getInstance();

            private static API_DOMAIN = "//jarvis-api.eduwill.net";
            private static PDS_DOMAIN = "//pds.eduwill.net";
            private readonly BANNER_IDENTIFIER = "data-jarvis-ibm";
            private readonly PREVIEW_IDENTIFIER = "IBM_PREVIEW";
            private readonly BANNER_COOKIE_NAME = "IBM_BANNER_HIDE";
            private readonly BANNER_COOKIE_VALUE = "HIDE";
            private readonly MOBILE_WIDTH_LIMIT: number = 1024;

            private static _serviceMode = "L";

            private static _handler: Jarvis.Ibm.BannerHandler;

            private _services: IService[] = [];
            private isPreview: boolean = false;

            // 생성자
            constructor() {}

            public static getInstance(): Jarvis.Ibm.BannerHandler {
                if (Jarvis.Ibm.BannerHandler._handler == undefined) {
                    Jarvis.Ibm.BannerHandler._handler = new Jarvis.Ibm.BannerHandler();
                }
                return Jarvis.Ibm.BannerHandler._handler;
            }

            // 초기화
            public init(): void {
                Jarvis.Ibm.BannerHandler.API_DOMAIN =
                    "//jarvis-api.eduwill.net";
                Jarvis.Ibm.BannerHandler.PDS_DOMAIN = "//pds.eduwill.net";

                //this.setEnviroment(); // 환경설정
                this.setRequest(); // 요청콘텐츠 확인
                this.getData(); // 데이터 조회
            }

            // 환경설정
            public setEnviroment(): void {
                this._logger.info("Step1. 환경설정 Begin...");

                var currUrl = document.location.href;
                if (currUrl.indexOf("//l-") > -1) {
                    this._logger.debug("Profile - local");
                    //로컬 환경
                    Jarvis.Ibm.BannerHandler.API_DOMAIN =
                        Jarvis.Ibm.BannerHandler.API_DOMAIN.replace(
                            "//",
                            "//l-"
                        ) + ":8080";
                    Jarvis.Ibm.BannerHandler.PDS_DOMAIN = Jarvis.Ibm.BannerHandler.PDS_DOMAIN.replace(
                        "//",
                        "//d-"
                    );
                } else if (currUrl.indexOf("//d-") > -1) {
                    this._logger.debug("Profile - dev");
                    // 개발 환경
                    Jarvis.Ibm.BannerHandler.API_DOMAIN = Jarvis.Ibm.BannerHandler.API_DOMAIN.replace(
                        "//",
                        "//d-"
                    );
                    Jarvis.Ibm.BannerHandler.PDS_DOMAIN = Jarvis.Ibm.BannerHandler.PDS_DOMAIN.replace(
                        "//",
                        "//d-"
                    );
                } else if (currUrl.indexOf("//s-") > -1) {
                    this._logger.debug("Profile - stage");
                    // 스테이지 환경
                    Jarvis.Ibm.BannerHandler.API_DOMAIN = Jarvis.Ibm.BannerHandler.API_DOMAIN.replace(
                        "//",
                        "//s-"
                    );
                    Jarvis.Ibm.BannerHandler.PDS_DOMAIN = Jarvis.Ibm.BannerHandler.PDS_DOMAIN.replace(
                        "//",
                        "//s-"
                    );
                } else {
                    this._logger.debug("Profile - live");
                    // 운영환경
                }

                this._logger.debug(
                    "API Domain - " + Jarvis.Ibm.BannerHandler.API_DOMAIN
                );
                this._logger.debug(
                    "PDS Domain - " + Jarvis.Ibm.BannerHandler.PDS_DOMAIN
                );

                if (currUrl.indexOf(this.PREVIEW_IDENTIFIER) > -1) {
                    // 미리보기 모드
                    this._logger.debug("미리보기 동작 중...");
                    this.isPreview = true;
                }
            }

            // 배너 요청 확인
            public setRequest() {
                this._logger.info("Step2. 요청콘텐츠 확인 Begin...");
                var requestCount = $("[" + this.BANNER_IDENTIFIER + "]").length;
                var value: string;
                if (requestCount > 0) {
                    if (requestCount == 1) {
                        value = $("[" + this.BANNER_IDENTIFIER + "]").attr(
                            this.BANNER_IDENTIFIER
                        );
                        this._services[0] = {
                            svcCd: value,
                            hide: false,
                            banner: {
                                bnrNo: 0,
                                bnrNm: "",
                                expsrDevc: "",
                                overImgUseYn: "",
                                dimUseYn: "",
                                endType: "",
                                listExpsrType: "",
                                uprndLocAdjst: 0,
                                leftLocAdjst: 0,
                                contents: [],
                                html: "",
                                expsrLoc: "",
                                listFrontRearUseYn: "N",
                                listPageUseYn: "N",
                                tmpltNo: 0,
                            },
                            html: "",
                        };
                    } else {
                        for (var i = 0; i < requestCount; i++) {
                            this._services[i] = {
                                svcCd: $(
                                    "[" +
                                        this.BANNER_IDENTIFIER +
                                        "]:nth(" +
                                        i +
                                        ")"
                                ).attr(this.BANNER_IDENTIFIER),
                                hide: false,
                                banner: {
                                    bnrNo: 0,
                                    bnrNm: "",
                                    expsrDevc: "",
                                    overImgUseYn: "",
                                    dimUseYn: "",
                                    endType: "",
                                    listExpsrType: "",
                                    uprndLocAdjst: 0,
                                    leftLocAdjst: 0,
                                    expsrLoc: "",
                                    listFrontRearUseYn: "N",
                                    listPageUseYn: "N",
                                    contents: [],
                                    tmpltNo: 0,
                                    html: "",
                                },
                                html: "",
                            };
                        }
                    }
                }
                this._logger.debug("Request Data > ");
                this._logger.debug(this._services);
            }

            // 데이터 조회
            public getData(): void {
                this._logger.info("Step3. 데이터 조회 Begin...");
                var services = this._services;
                var previewSvcCd = this._utils.getParameter(
                    this.PREVIEW_IDENTIFIER
                );
                var previewBnrNo = this._utils.getParameter("bnrNo");

                var svcCds = "";
                for (var i = 0; i < services.length; i++) {
                    svcCds +=
                        svcCds == ""
                            ? services[i].svcCd
                            : "," + services[i].svcCd;
                }
                if (svcCds != "") {
                    this._utils.getData(
                        Jarvis.Ibm.BannerHandler.API_DOMAIN +
                            "/ibm/v1/services",
                        {
                            svcCd: svcCds,
                            isPreview: this.isPreview == true ? "Y" : "N",
                            previewSvcCd: previewSvcCd,
                            previewBnrNo: previewBnrNo,
                        },
                        this.success,
                        function (e: DOMException) {
                            try {
                                console.log(e.message);
                            } catch (e2) {}
                        }
                    );
                }
            }

            // 콜백
            public success(data: IService[]): void {
                var _logger = Jarvis.Ibm.Logger.getInstance(this);
                var _handler = Jarvis.Ibm.BannerHandler.getInstance();

                _logger.debug(data);
                _handler.setServices(data);
                _handler.makeHtml();
                _handler.inject(); // 마크업 주입
                _handler.action(); // 액션
                _handler.bindEvent(); // 이벤트 리스너 등록
            }

            // 마크업 생성
            public makeHtml(): void {
                this._logger.info("Step4. 마크업 생성 Begin...");

                if (this._services != null) {
                    var count = this._services.length;
                    if (count > 0) {
                        for (var i = 0; i < count; i++) {
                            if (
                                typeof this._services[i].banner != "undefined"
                            ) {
                                makeServiceHtml(this._services[i]);
                            }
                        }
                    }
                }

                // 서비스별 마크업 생성
                function makeServiceHtml(service: IService) {
                    var _utils = Jarvis.Ibm.Utils.getInstance();
                    var _handler = Jarvis.Ibm.BannerHandler.getInstance();

                    var isHideCookie = _utils.getCookie(
                        _handler.BANNER_COOKIE_NAME + "_" + service.svcCd
                    );

                    if (isHideCookie != _handler.BANNER_COOKIE_VALUE) {
                        var layerHtml = "";
                        var wrapHtml = "";
                        var dimHtml = "";
                        var mainClass =
                            service.banner.tmpltNo == 2
                                ? "ibm-floating"
                                : service.banner.tmpltNo == 3
                                ? "ibm-toast"
                                : service.banner.tmpltNo == 4
                                ? "ibm-layer"
                                : service.banner.tmpltNo == 5
                                ? "ibm-band"
                                : "";

                        var optionClass = "";
                        if (service.banner.tmpltNo == 3) {
                            optionClass =
                                service.banner.expsrLoc == "1"
                                    ? "leftTop"
                                    : service.banner.expsrLoc == "2"
                                    ? "leftBottom"
                                    : service.banner.expsrLoc == "3"
                                    ? "rightTop"
                                    : service.banner.expsrLoc == "4"
                                    ? "rightBottom"
                                    : "";
                        }

                        layerHtml =
                            '<div id="ibmZone" class="ibm ' +
                            mainClass +
                            " " +
                            optionClass +
                            '">';

                        if (service.banner != null) {
                            // Dim유형
                            if (service.banner.dimUseYn == "Y") {
                                dimHtml += '<div class="ibm-dim"></div>';
                            }

                            wrapHtml += '<div class="ibm-wrap">';
                            wrapHtml += makeBannerHtml(service, service.banner);
                            wrapHtml += "</div>";

                            layerHtml += dimHtml;
                            layerHtml += wrapHtml;
                            layerHtml += "</div>";
                        }

                        service.html = layerHtml;
                    }
                }

                // 배너별 마크업 생성
                function makeBannerHtml(
                    service: IService,
                    banner: IBanner
                ): string {
                    var _logger = Jarvis.Ibm.Logger.getInstance("");

                    var wraphtml = "";

                    // 닫기유형
                    var closeHtml = "";
                    var innerHtml = "";
                    var endType =
                        banner.endType == undefined ? "" : banner.endType;

                    _logger.debug("endType : " + endType);
                    if (endType != "") {
                        closeHtml += '<div class="ibm-action">';

                        if (endType.indexOf("3") > -1) {
                            closeHtml +=
                                "| <a href='#' data-svc-cd='" +
                                service.svcCd +
                                "' data-action='hide7days' class='ibm-week-close' onclick='return false;'><span>일주일 보지 않기</span></a>";
                        }
                        if (endType.indexOf("2") > -1) {
                            closeHtml +=
                                "| <a href='#' data-svc-cd='" +
                                service.svcCd +
                                "' data-action='hideOneday' class='ibm-today-close' onclick='return false;'><span>오늘 하루 보지 않기</span></a>";
                        }
                        if (endType.indexOf("1") > -1) {
                            closeHtml +=
                                "<a href='#' data-svc-cd='" +
                                service.svcCd +
                                "' data-action='hide' class='ibm-close' onclick='return false;'><span>닫기</span></a>";
                        }

                        closeHtml += "</div>";
                    }

                    // 콘텐츠
                    if (banner.contents != null) {
                        for (var k = 0; k < banner.contents.length; k++) {
                            var itemHtml = makeContentHtml(
                                service,
                                banner,
                                banner.contents[k]
                            );
                            banner.contents[k].html = itemHtml;
                        }

                        //html += bannerHtml;
                    }

                    _logger.debug(
                        "banner.listExpsrType : " + banner.listExpsrType
                    );

                    // 목록노출유형
                    var contentCount = banner.contents.length;

                    innerHtml = '<div class="ibm-inner">';

                    if (contentCount >= 2) {
                        if (banner.listExpsrType == "1") {
                            // 랜덤
                            var ranIndex = Math.floor(
                                Math.random() * contentCount
                            );
                            innerHtml += banner.contents[ranIndex].html;
                        } else if (banner.listExpsrType == "2") {
                            // 나열
                            for (var i = 0; i < contentCount; i++) {
                                innerHtml += banner.contents[i].html;
                            }
                        } else if (banner.listExpsrType == "3") {
                            innerHtml =
                                '<div class="ibm-inner" data-ibm-slide="true">';
                            // 롤링
                            for (var i = 0; i < contentCount; i++) {
                                innerHtml += banner.contents[i].html;
                            }
                        } else {
                            // 해당없음(무조건 첫번째 1개 노출)
                            innerHtml += banner.contents[0].html;
                        }
                    } else {
                        innerHtml += banner.contents[0].html;
                    }
                    innerHtml += "</div>";

                    wraphtml = innerHtml + closeHtml;
                    return wraphtml;
                }

                // 콘텐츠별 마크업 생성
                function makeContentHtml(
                    service: IService,
                    banner: IBanner,
                    content: IBannerContent
                ): string {
                    var _handler = Jarvis.Ibm.BannerHandler.getInstance();
                    var itemHtml = "";
                    var wingsHtml = "";
                    var bannerHtml = "";
                    var imgHtml = "";
                    var vodHtml = "";
                    var linkHtml = "";

                    /*****************************************************************
                     * 좌측/우측 배경이미지 또는 배경색 작성
                     ******************************************************************/
                    var wingsBackgroundImg = "";
                    if (
                        banner.tmpltNo == 1 &&
                        banner.listExpsrType == "3" &&
                        content.overImgUseYn == "Y"
                    ) {
                        wingsBackgroundImg +=
                            "  <div style=\"background-color: #f7f7f7; background-image: url('" +
                            Jarvis.Ibm.BannerHandler.PDS_DOMAIN +
                            content.overImgUrl +
                            "');\"></div>";
                    }

                    var wingsColor = "";
                    if (wingsBackgroundImg == "") {
                        if (
                            content.leftColorCd != "" &&
                            content.rightColorCd != ""
                        ) {
                            wingsColor +=
                                '  <div style="background-color:' +
                                content.leftColorCd +
                                ';"></div>';
                            wingsColor +=
                                '  <div style="background-color: ' +
                                content.rightColorCd +
                                ';"></div>';
                        }
                    }

                    if (wingsBackgroundImg != "" || wingsColor != "") {
                        wingsHtml = '<div class="ibm-wings">';
                        wingsHtml += wingsBackgroundImg + wingsColor;
                        wingsHtml += "</div>";
                    }

                    var windowWidth = document.body.offsetWidth;
                    var defaultUrl = "";

                    if (content.pcImgUrl != "" && content.mobileImgUrl != "") {
                        defaultUrl =
                            windowWidth > _handler.MOBILE_WIDTH_LIMIT
                                ? content.pcImgUrl
                                : content.mobileImgUrl;
                    } else {
                        if (content.pcImgUrl == "") {
                            defaultUrl = content.mobileImgUrl;
                        } else {
                            defaultUrl = content.pcImgUrl;
                        }
                    }

                    /*****************************************************************
                     * 이미지 마크업 작성
                     ******************************************************************/
                    if (
                        banner.tmpltNo == 1 &&
                        banner.listExpsrType == "3" &&
                        content.overImgUseYn == "Y"
                    ) {
                        imgHtml =
                            "<img src='" +
                            Jarvis.Ibm.BannerHandler.PDS_DOMAIN +
                            defaultUrl +
                            "' data-pc-src='" +
                            (content.pcImgUrl != ""
                                ? Jarvis.Ibm.BannerHandler.PDS_DOMAIN +
                                  content.pcImgUrl
                                : "") +
                            "' data-mobile-src='" +
                            (content.mobileImgUrl != ""
                                ? Jarvis.Ibm.BannerHandler.PDS_DOMAIN +
                                  content.mobileImgUrl
                                : "") +
                            "' />";
                    } else {
                        imgHtml =
                            "<img src='" +
                            Jarvis.Ibm.BannerHandler.PDS_DOMAIN +
                            defaultUrl +
                            (content.overImgUseYn == "Y"
                                ? "' data-over-src='" +
                                  Jarvis.Ibm.BannerHandler.PDS_DOMAIN +
                                  content.overImgUrl
                                : "") +
                            "' data-pc-src='" +
                            (content.pcImgUrl != ""
                                ? Jarvis.Ibm.BannerHandler.PDS_DOMAIN +
                                  content.pcImgUrl
                                : "") +
                            "' data-mobile-src='" +
                            (content.mobileImgUrl != ""
                                ? Jarvis.Ibm.BannerHandler.PDS_DOMAIN +
                                  content.mobileImgUrl
                                : "") +
                            "' />";
                    }

                    /*****************************************************************
                     * 영상 마크업 작성
                     ******************************************************************/
                    if (content.contntType == "2" && content.vodUrl != "") {
                        //vodHtml = '<video src="' + content.vodUrl + '"></video>';

                        vodHtml += '<div class="ibm-video">';

                        // 유투브
                        if (
                            content.vodUrl
                                .toLowerCase()
                                .indexOf("//www.youtube.com/") > -1
                        ) {
                            vodHtml +=
                                '<iframe width="100%" height="100%" src="' +
                                content.vodUrl +
                                '" frameborder="0" scrolling="no" marginwidth="0" marginheight="0" allow="autoplay" allowfullscreen></iframe>';

                            //네이버TV
                        } else if (
                            content.vodUrl
                                .toLowerCase()
                                .indexOf("//tv.naver.com/") > -1
                        ) {
                            vodHtml +=
                                '<iframe width="100%" height="100%" src="' +
                                content.vodUrl +
                                '" frameborder="0" scrolling="no" marginwidth="0" marginheight="0" allow="autoplay" allowfullscreen></iframe>';

                            // MP4
                        } else if (
                            content.vodUrl.toLowerCase().indexOf(".mp4")
                        ) {
                            vodHtml +=
                                '<video width="100%" height="100%" controls><source src="' +
                                content.vodUrl +
                                '" type="video/mp4"></video>';
                        }

                        vodHtml += "</div>";
                    }

                    /*****************************************************************
                     * 링크 마크업 작성
                     ******************************************************************/
                    var links = content.links;
                    if (links != undefined) {
                        if (links.length > 0) {
                            linkHtml += '<div class="ibm-links">';

                            for (var i = 0; i < links.length; i++) {
                                var link = links[i];

                                if (link.linkType == "1") {
                                    // 페이지 이동

                                    linkHtml +=
                                        "<a href='" +
                                        link.linkUrl +
                                        "' title='' data-svc-cd='" +
                                        service.svcCd +
                                        "' data-bnr-no='" +
                                        banner.bnrNo +
                                        "' data-callback='" +
                                        content.calbak +
                                        "' target='_self'><span class='sr-only'>링크 이동</span></a>";
                                } else if (link.linkType == "2") {
                                    // 새창
                                    linkHtml +=
                                        "<a href='" +
                                        link.linkUrl +
                                        "' title='' data-svc-cd='" +
                                        service.svcCd +
                                        "' data-bnr-no='" +
                                        banner.bnrNo +
                                        "' data-callback='" +
                                        content.calbak +
                                        "' target='_blank'><span class='sr-only'>링크 새창</span></a>";
                                } else if (link.linkType == "3") {
                                    // 메세지노출
                                    linkHtml +=
                                        "<a href=\"javascript:alert('" +
                                        link.linkMsg +
                                        "')\" title='' data-svc-cd='" +
                                        service.svcCd +
                                        "' data-bnr-no='" +
                                        banner.bnrNo +
                                        "' data-callback='" +
                                        content.calbak +
                                        "'><span class='sr-only'>링크 메세지</span></a>";
                                }
                            }

                            linkHtml += "</div>";
                        }
                    }

                    bannerHtml += '<div class="ibm-banner">';
                    bannerHtml += imgHtml;
                    bannerHtml += vodHtml;
                    bannerHtml += linkHtml;
                    bannerHtml += "</div>";

                    itemHtml += '<div class="ibm-item">';
                    itemHtml += wingsHtml;
                    itemHtml += bannerHtml;
                    itemHtml += "</div>";

                    return itemHtml;
                }
            }

            // 콘텐츠 주입
            public inject(): void {
                this._logger.info("Step5. 데이터 주입 Begin...");
                var _handler = Jarvis.Ibm.BannerHandler.getInstance();

                if (this._services != null) {
                    var count = this._services.length;
                    if (count > 0) {
                        for (var i = 0; i < count; i++) {
                            if (
                                typeof this._services[i].banner != "undefined"
                            ) {
                                var html = this._services[i].html;
                                this._logger.debug(
                                    "데이터 주입 > " +
                                        this._services[i].svcCd +
                                        " : " +
                                        html
                                );
                                $(
                                    "[" +
                                        this.BANNER_IDENTIFIER +
                                        "=" +
                                        this._services[i].svcCd +
                                        "]"
                                ).html(html);

                                // 롤링처리

                                if (
                                    this._services[i].banner.listExpsrType ==
                                    "3"
                                ) {
                                    var isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry/i.test(
                                        navigator.userAgent
                                    )
                                        ? true
                                        : false;

                                    // 토스트, 레이버 배너일경우 콘텐츠(이미지)의 사이즈를 너비로 지정한다.
                                    if (
                                        this._services[i].banner.tmpltNo == 3 ||
                                        this._services[i].banner.tmpltNo == 4
                                    ) {
                                        // 롤링일 경우 - 노출할 이미지의 너비로 영역너비를 지정한다.
                                        $(
                                            "[data-jarvis-ibm=" +
                                                this._services[i].svcCd +
                                                "] div[class=ibm-wrap]"
                                        ).css(
                                            "width",
                                            this._services[i].banner.contents[0]
                                                .width + "px"
                                        );
                                    }

                                    $(
                                        "[data-jarvis-ibm=" +
                                            this._services[i].svcCd +
                                            "] [data-ibm-slide=true]"
                                    ).slick({
                                        infinite: true, // 맨 끝 이미지에서 끝나지않고 다시 맨 앞으로 이동
                                        autoplay: true, // 자동재생
                                        autoplaySpeed: 3000, // 속도
                                        arrows: isMobile
                                            ? false
                                            : this._services[i].banner
                                                  .listFrontRearUseYn == "Y"
                                            ? true
                                            : false, // 좌우 화살표
                                        dots:
                                            this._services[i].banner
                                                .listPageUseYn == "Y"
                                                ? true
                                                : false, // indicator
                                        pauseOnHover: true /* 마우스 호버시 슬라이드 이동 멈춤 */,
                                        adaptiveHeight: true, // 높이 자동
                                    });
                                }

                                // 좌측 위치조정
                                if (this._services[i].banner.leftLocAdjst > 0) {
                                    var currLeft: number = parseInt(
                                        $(
                                            "[" +
                                                this.BANNER_IDENTIFIER +
                                                "=" +
                                                this._services[i].svcCd +
                                                "] > div:nth(0)"
                                        )
                                            .css("margin-left")
                                            .replace("px", "")
                                    );
                                    var value =
                                        currLeft +
                                        this._services[i].banner.leftLocAdjst;

                                    $(
                                        "[" +
                                            this.BANNER_IDENTIFIER +
                                            "=" +
                                            this._services[i].svcCd +
                                            "] > div:nth(0)"
                                    ).css("margin-left", value);
                                }

                                // 상단 위치조정
                                if (
                                    this._services[i].banner.uprndLocAdjst > 0
                                ) {
                                    var currLeft: number = parseInt(
                                        $(
                                            "[" +
                                                this.BANNER_IDENTIFIER +
                                                "=" +
                                                this._services[i].svcCd +
                                                "] > div:nth(0)"
                                        )
                                            .css("margin-top")
                                            .replace("px", "")
                                    );
                                    var value =
                                        currLeft +
                                        this._services[i].banner.uprndLocAdjst;

                                    $(
                                        "[" +
                                            this.BANNER_IDENTIFIER +
                                            "=" +
                                            this._services[i].svcCd +
                                            "] > div:nth(0)"
                                    ).css("margin-top", value);
                                }
                            }
                        }

                        $("[" + this.BANNER_IDENTIFIER + "] a").off("click");
                        $("[" + this.BANNER_IDENTIFIER + "] a").on(
                            "click",
                            this.setEvent
                        );
                    }
                }
            }

            public action(): void {}

            public bindEvent(): void {
                var _handler = Jarvis.Ibm.BannerHandler.getInstance();
                var ibmWindowResizeTimer: any;

                // 1. 윈도우 창크기(너비) 변경에 따른 PC, Mobile 이미지 변경처리
                $(window).on("resize", function (e: Error) {
                    var windowWidth = document.body.offsetWidth;

                    clearTimeout(ibmWindowResizeTimer);
                    ibmWindowResizeTimer = setTimeout(function () {
                        for (
                            var i = 0;
                            i <
                            $("[" + _handler.BANNER_IDENTIFIER + "] img")
                                .length;
                            i++
                        ) {
                            var pcUrl = $(
                                "[" +
                                    _handler.BANNER_IDENTIFIER +
                                    "] img:nth(" +
                                    i +
                                    ")"
                            ).data("pcSrc");
                            var mobileUrl = $(
                                "[" +
                                    _handler.BANNER_IDENTIFIER +
                                    "] img:nth(" +
                                    i +
                                    ")"
                            ).data("mobileSrc");

                            if (pcUrl != "" && mobileUrl != "") {
                                var changeUrl =
                                    windowWidth > _handler.MOBILE_WIDTH_LIMIT
                                        ? pcUrl
                                        : mobileUrl;

                                $(
                                    "[" +
                                        _handler.BANNER_IDENTIFIER +
                                        "] img:nth(" +
                                        i +
                                        ")"
                                ).attr(
                                    "src",
                                    windowWidth > _handler.MOBILE_WIDTH_LIMIT
                                        ? pcUrl
                                        : mobileUrl
                                );
                            }
                        }
                    }, 250);
                });

                // 2. 마우스오버 이벤트 리스너 등록
                var overImgUseCount = $(
                    "[" + _handler.BANNER_IDENTIFIER + "] img[data-over-src]"
                ).length;

                this._logger.debug("overImgUseCount : " + overImgUseCount);
                if (overImgUseCount > 0) {
                    $(
                        "[" +
                            _handler.BANNER_IDENTIFIER +
                            "] img[data-over-src]"
                    ).off("mouseover"); // 중복으로 이벤트 리스너를 등록하지 않기 위해 초기화함.
                    $(
                        "[" +
                            _handler.BANNER_IDENTIFIER +
                            "] img[data-over-src]"
                    ).on("mouseover", function (event: any) {
                        var overSrc = $(event.target).data("overSrc");
                        var windowWidth = document.body.offsetWidth;
                        if (windowWidth > _handler.MOBILE_WIDTH_LIMIT) {
                            $(event.target).attr("src", overSrc);
                        }
                    });

                    $(
                        "[" +
                            _handler.BANNER_IDENTIFIER +
                            "] img[data-over-src]"
                    ).on("mouseout", function (event: any) {
                        var pcSrc = $(event.target).data("pcSrc");
                        var mobileSrc = $(event.target).data("mobileSrc");

                        var windowWidth = document.body.offsetWidth;
                        if (windowWidth > _handler.MOBILE_WIDTH_LIMIT) {
                            $(event.target).attr("src", pcSrc);
                        } else {
                            $(event.target).attr("src", mobileSrc);
                        }
                    });
                }
            }

            public setServices(services: IService[]): void {
                this._services = services;
            }

            // 이벤트 처리
            public setEvent(): boolean {
                var _handler = Jarvis.Ibm.BannerHandler.getInstance();
                var _logger = Jarvis.Ibm.Logger.getInstance(this);

                var action =
                    $(this).data("action") == undefined
                        ? ""
                        : $(this).data("action");
                var svcCd =
                    $(this).data("svc-cd") == undefined
                        ? ""
                        : $(this).data("svc-cd");
                var bnrNo =
                    $(this).data("bnr-no") == undefined
                        ? ""
                        : $(this).data("bnr-no");
                var callback =
                    $(this).data("callback") == undefined
                        ? ""
                        : $(this).data("callback");

                if (action != "") {
                    if (action == "hide7days") {
                        _handler.eventHide7days(svcCd);
                    } else if (action == "hideOneday") {
                        _handler.eventHideOneday(svcCd);
                    } else if (action == "hide") {
                        _handler.eventHide(svcCd);
                    }
                }

                if (svcCd != "" && bnrNo != "") {
                    _handler.eventClick(svcCd, bnrNo);
                }

                // 콜백이 있을경우
                if (callback != undefined) {
                    if (callback != "") {
                        try {
                            eval(callback);
                        } catch (e) {
                            _logger.error(e);
                        }
                    }
                }

                return true;
            }

            // 클릭이벤트
            public eventClick(svcCd: string, bnrNo: string): void {
                this._logger.debug("클릭 이벤트 / " + svcCd + " / " + bnrNo);
                this._utils.postData(
                    Jarvis.Ibm.BannerHandler.API_DOMAIN + "/ibm/v1/click",
                    { svcCd: svcCd, bnrNo: bnrNo },
                    function (data: any) {
                        var _logger = Jarvis.Ibm.Logger.getInstance("");
                        if (data == true) {
                            _logger.debug("클릭이벤트 등록 성공!");
                        } else {
                        }
                    },
                    function (e: DOMException) {
                        var _logger = Jarvis.Ibm.Logger.getInstance("");
                        _logger.error(e);
                    }
                );
            }

            // 노출이벤트
            public eventDisplay(): void {
                var _handler = Jarvis.Ibm.BannerHandler.getInstance();
                var count = $("[" + _handler.BANNER_IDENTIFIER + "]").length;

                if (count > 0) {
                    $("[" + _handler.BANNER_IDENTIFIER + "]").each(function (
                        idx: number,
                        item: any
                    ) {});
                }
            }

            // 안보기 이벤트
            public eventHide(svcCd: string) {
                this._logger.debug("안보기!");
                this.hideService(svcCd, 0);
            }

            // 하루안보기 이벤트
            public eventHideOneday(svcCd: string) {
                this._logger.debug("하루안보기!");
                this.hideService(svcCd, 1);
            }

            // 일주일안보기 이벤트
            public eventHide7days(svcCd: string) {
                this._logger.debug("일주일안보기!");
                this.hideService(svcCd, 7);
            }

            // 안보기 처리
            private hideService(svcCd: string, hideDays: number): void {
                var _logger = Jarvis.Ibm.Logger.getInstance(this);
                if (hideDays > 0) {
                    this._utils.setCookie(
                        this.BANNER_COOKIE_NAME + "_" + svcCd,
                        this.BANNER_COOKIE_VALUE,
                        hideDays
                    );
                }
                $("[" + this.BANNER_IDENTIFIER + "=" + svcCd + "]").hide();
            }

            public static getServiceMode(): String {
                return this._serviceMode;
            }

            public injectBanner(elementId: string, bnrNo: number): void {
                var svcCd = "UNCONNECTED-" + bnrNo;
                $("[id=" + elementId + "]").attr(this.BANNER_IDENTIFIER, svcCd);
                this._utils.getData(
                    Jarvis.Ibm.BannerHandler.API_DOMAIN +
                        "/ibm/v1/banner/" +
                        bnrNo,
                    {},
                    function (banner: IBanner) {
                        success(svcCd, banner);
                    },
                    function (e: DOMException) {
                        try {
                            console.log(e.message);
                        } catch (e2) {}
                    }
                );

                function success(svcCd: string, banner: IBanner) {
                    console.log("수동 주입");
                    var _handler = Jarvis.Ibm.BannerHandler.getInstance();
                    var _services: IService[] = [];
                    _services = [
                        {
                            svcCd: svcCd,
                            hide: false,
                            banner: banner,
                            html: "",
                        },
                    ];
                    console.log(_services);

                    _handler.setServices(_services);
                    _handler.makeHtml();
                    _handler.inject(); // 마크업 주입
                    _handler.action(); // 액션
                    _handler.bindEvent(); // 이벤트 리스너 등록
                }
            }

            public setLoggerLevel(level: number): void {
                var _logger = Jarvis.Ibm.Logger.getInstance(this);
                _logger.setLoggerLevel(level);
            }
        }
    }
}
