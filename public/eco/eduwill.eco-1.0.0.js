/**
 * Eduwill Javascript Library
 * http://eduwill.net
 * Version : 1.0.0
 * Data : 2017-05-17
 */
var eduwill;
/**
 * Eduwill Javascript Library
 * http://eduwill.net
 * Version : 1.0.1
 * Data : 2017-05-17
 */
(function (eduwill) {
    var eco;
    (function (eco) {
        /**
         * Logger Class
         */
        var Logger = (function () {
            /**
             * Constructor
             * @param level : logger level value
             */
            function Logger(object) {
                this.className = "";
                this.className = this.getFunctionName(object);
            }
            /**
             * 함수명 추출
             */
            Logger.prototype.getFunctionName = function (object) {
                var funcNameRegex = /function (.{1,})\(/;
                var results = (funcNameRegex).exec(object.constructor.toString());
                return (results && results.length > 1) ? results[1] : "";
            };
            /**
             * Logger level configuration
             * @param level
             */
            Logger.prototype.setLoggerLevel = function (level) {
                eduwill.eco.Logger.loggerLevel = level;
            };
            /**
             * Debug log print
             * @param msg
             */
            Logger.prototype.debug = function (msg) {
                this.print(Logger.LOGGER_LEVEL_DEBUG, Logger.LOGGER_LEVEL_DEBUG_TITLE, msg);
            };
            /**
             * Info log print
             * @param msg
             */
            Logger.prototype.info = function (msg) {
                this.print(Logger.LOGGER_LEVEL_DEBUG, Logger.LOGGER_LEVEL_INFO_TITLE, msg);
            };
            /**
             * Warning log print
             * @param msg
             */
            Logger.prototype.warning = function (msg) {
                this.print(Logger.LOGGER_LEVEL_DEBUG, Logger.LOGGER_LEVEL_WARNING_TITLE, msg);
            };
            /**
             * Error log print
             * @param e         : Exception Object
             */
            Logger.prototype.error = function (e) {
                this.print(Logger.LOGGER_LEVEL_DEBUG, Logger.LOGGER_LEVEL_ERROR_TITLE, "[" + e.code + "]" + e.name + " " + e.message);
            };
            /**
             * Log print
             * @param level         : log level value
             * @param levelTitle    : log level title
             * @param msg           : print message
             */
            Logger.prototype.print = function (level, levelTitle, msg) {
                if (level >= eduwill.eco.Logger.loggerLevel) {
                    var now = new Date();
                    var nowTime = now.getFullYear() + "-" + (now.getMonth() + 1) + "-" + now.getDate() + " " + now.getHours() + ":" + now.getMinutes() + ":" + now.getSeconds();
                    var logText = "[" + levelTitle + "] [" + nowTime + "] ";
                    logText += "CLASS:[" + this.className + "] > ";
                    logText += msg;
                    try {
                        console.log(logText);
                    }
                    catch (e) {
                    }
                }
            };
            return Logger;
        }());
        Logger.LOGGER_LEVEL_DEBUG = 1000; // debug log level value
        Logger.LOGGER_LEVEL_INFO = 2000; // info log level value
        Logger.LOGGER_LEVEL_WARNING = 3000; // warning log level value
        Logger.LOGGER_LEVEL_ERROR = 4000; // error log level value
        Logger.LOGGER_LEVEL_DEBUG_TITLE = "DEBUG"; // debug log level title
        Logger.LOGGER_LEVEL_INFO_TITLE = "INFO"; // info log level title
        Logger.LOGGER_LEVEL_WARNING_TITLE = "WARNING"; // warning log level title
        Logger.LOGGER_LEVEL_ERROR_TITLE = "ERROR"; // error log level title
        Logger.loggerLevel = Logger.LOGGER_LEVEL_ERROR; // default log level
        eco.Logger = Logger;
        /**
         * Ajax class
         */
        var Ajax = (function () {
            /**
             * Constructor
             */
            function Ajax() {
                this.logger = new eduwill.eco.Logger(this);
            }
            /**
             *
             * @param callUrl         : 호출할 URL
             * @param param           : 호출시 전달할 JSON 오브젝트 파라미터
             * @param successCallback : 성공 결과를 처리하는 메소드
             * @param failCallback    : 실패 결과를 처리하는 메소드
             */
            Ajax.prototype.postAjax = function (callUrl, param, successCallback, failCallback) {
                $.ajax({
                    type: "GET",
                    async: true,
                    url: callUrl,
                    crossDomain: true,
                    dataType: "json",
                    timeout: 5000,
                    cache: false,
                    data: param,
                    success: function (jsonData) {
                        if (typeof successCallback == "function" || typeof successCallback == "object") {
                            successCallback(jsonData); // 성공시 함수 실행
                        }
                    },
                    error: function (e) {
                        if (typeof failCallback == "function" || typeof successCallback == "object") {
                            failCallback(e); // 실패시 함수 실행
                        }
                    }
                });
            };
            return Ajax;
        }());
        eco.Ajax = Ajax;
        /**
         * content handler class
         */
        var EcoContentHandler = (function () {
            /**
             * Constructor
             */
            function EcoContentHandler() {
                this.logger = new eduwill.eco.Logger(this);
                this.ajax = new eduwill.eco.Ajax(); // Eduwill Common Ajax 객체 생성
                this.contentApi = "//eco.eduwill.net/api/contents/" + eduwill.eco.EcoContentHandler.ECO_VERSION + "/";
            }
            /**
             * get ecoMode value
             */
            EcoContentHandler.prototype.getEcoMode = function () {
                return EcoContentHandler.ECO_MODE;
            };
            EcoContentHandler.prototype.setEcoMode = function (ecoMode) {
                EcoContentHandler.ECO_MODE = ecoMode;
            };
            /**
             * log level configuration
             * @param logLevel
             */
            EcoContentHandler.prototype.setLogLevel = function (logLevel) {
                this.logger.setLoggerLevel(logLevel);
            };
            /**
             * View Mode 추출
             */
            EcoContentHandler.prototype.ecoModeInit = function () {
                var currUrl = document.location.href; // 현재페이지 URL
                this.logger.debug("currUrl : " + currUrl);
                // EcoMode 설정유무 확인 - URL에 EcoMode 파라미터 존재여부 확인
                if (currUrl.indexOf(eduwill.eco.EcoContentHandler.ECO_MODE_PARAM_NAME) > -1) {
                    // URL에 파라미터 존재유무 확인
                    if (currUrl.indexOf("?") > -1) {
                        var parameters = currUrl.split("?")[1]; // URL에서 파라미터군 분리
                        // 파라미터가 복수개일 경우
                        if (parameters.indexOf("&") > -1) {
                            var paramArray = parameters.split("&"); // 각 파라미터를 분리하여 배열로 구성
                            var paramName, paramValue;
                            for (var i = 0; i < paramArray.length; i++) {
                                paramName = paramArray[i].split("=")[0]; // 파라미터 명
                                paramValue = paramArray[i].split("=")[1]; // 파라미터 값
                                // 파리미터가 EcoMode 일 경우
                                if (paramName == eduwill.eco.EcoContentHandler.ECO_MODE_PARAM_NAME) {
                                    this.setEcoMode(paramValue); // EcoMode 설정
                                    this.logger.debug("Multi parameter - ECO MODE [" + this.getEcoMode() + "]");
                                }
                            }
                            // 파라미터가 1개일 경우
                        }
                        else {
                            // 파리미터가 EcoMode 일 경우
                            if (parameters.split("=")[0] == eduwill.eco.EcoContentHandler.ECO_MODE_PARAM_NAME) {
                                this.setEcoMode(parameters.split("=")[1]); // EcoMode 설정
                                this.logger.debug("Single parameter - ECO MODE [" + this.getEcoMode() + "]");
                            }
                        }
                    }
                    else {
                        this.logger.debug("parameter is null");
                    }
                }
                else {
                    this.logger.debug("EcoMode 데이터가 존재하지 않습니다.");
                }
                this.logger.debug("ECO MODE : " + this.getEcoMode());
            };
            /**
             *
             */
            EcoContentHandler.prototype.run = function () {
                this.logger.debug("S:Process");
                this.ecoModeInit(); // ECO MODE INIT
                // 콘텐츠가 존재할 경우
                if ($("[" + eduwill.eco.EcoContentHandler.ECO_INDENTITY_ATTR + "]")) {
                    var content_id_array_1 = "";
                    var content_id_1;
                    // 콘텐츠 수만큼 반복처리
                    $("[" + eduwill.eco.EcoContentHandler.ECO_INDENTITY_ATTR + "]").each(function (idx) {
                        content_id_1 = $(this).attr(eduwill.eco.EcoContentHandler.ECO_INDENTITY_ATTR); // 콘텐츠 식별번호                      
                        if (content_id_1 != "") {
                            content_id_array_1 += content_id_array_1 == "" ? content_id_1 : "," + content_id_1;
                        }
                    });
                    this.logger.debug("content_id_array - " + content_id_array_1);
                    // 콘텐츠 식별번호가 존재할 경우
                    if (content_id_array_1 != undefined && content_id_array_1 != "") {
                        var param = { "ecoMode": this.getEcoMode() };
                        this.ajax.postAjax(this.contentApi + content_id_array_1, param, this.successCallback, this.failCallback);
                        //this.ajax.postAjax.call(this.logger, this.contentApi, param, this.successCallback, this.failCallback);
                        // 콘텐츠 식별번호가 존재하지 않을 경우
                    }
                    else {
                        this.logger.debug("ECO eco_code is null!");
                    }
                    // 콘텐츠가 존재하지 않을 경우
                }
                else {
                    this.logger.debug("ECO Object is nothing!");
                }
                this.logger.debug("E:Process");
            };
            /**
             * 콘텐츠정보 조회 성공처리 메소드
             * @param data
             */
            EcoContentHandler.prototype.successCallback = function (data) {
                var logger = new eduwill.eco.Logger(this);
                logger.debug("S:successCallback");
                var contentsData = data["data"];
                var contentsCount = contentsData.length;
                logger.debug("contentsCount - " + contentsCount);
                // 콘텐츠가 존재할 경우
                if (contentsCount > 0) {
                    var content_id = void 0, template = void 0, contentData = void 0;
                    for (var i = 0; i < contentsCount; i++) {
                        contentData = contentsData[i];
                        if (contentData != undefined && contentData != null) {
                            logger.debug("contentData - " + contentData);
                            content_id = contentData["content_id"] == undefined ? "" : contentData["content_id"]; // 콘텐츠 식별번호
                            template = contentData["template"] == undefined ? "" : contentData["template"]; // 콘텐츠 템플릿
                            logger.debug("content_id - " + content_id);
                            logger.debug("template - " + template);
                            // 콘텐츠 식별번호 및 템플릿이 존재하라 경우
                            if (content_id != 0 && template != "") {
                                try {
                                    // 오브젝트에 콘텐츠 템플릿 주입
                                    $("[" + eduwill.eco.EcoContentHandler.ECO_INDENTITY_ATTR + "=" + content_id + "]").append(template);
                                }
                                catch (e) {
                                    // 오브젝트에 콘텐츠 템플릿 주입시 예외 발생
                                    logger.error(e);
                                }
                            }
                            else {
                                logger.debug("content_id, tempate is null!");
                            }
                        }
                        else {
                            logger.debug("contentData is null!");
                        }
                    }
                    var ecoHandler = new eduwill.eco.EcoContentHandler();
                    if (ecoHandler.getEcoMode() == 'S' || ecoHandler.getEcoMode() == 'D') {
                        stageModeInit();
                    }
                }
                logger.debug("E:successCallback");
            };
            /**
             * 콘텐츠정보 조회 실패처리 메소드
             * @param e
             */
            EcoContentHandler.prototype.failCallback = function (e) {
                var logger = new eduwill.eco.Logger(this);
                logger.error(e);
            };
            return EcoContentHandler;
        }());
        EcoContentHandler.ECO_VERSION = "v1"; // ECO Version
        EcoContentHandler.ECO_INDENTITY_ATTR = "data-eduwill-eco-content"; // ECO 콘텐츠 식별자
        EcoContentHandler.ECO_MODE_PARAM_NAME = "ECO_MODE"; // mode config string
        EcoContentHandler.ECO_MODE = "L"; // L-Live, S-Stage, D-Dev
        eco.EcoContentHandler = EcoContentHandler;
    })(eco = eduwill.eco || (eduwill.eco = {}));
})(eduwill || (eduwill = {}));
/**
 * 스테이지 모드에서 처리되는 Layout관련 함수
 */
function stageModeInit() {
    stageModeInitStep1();
    setTimeout("stageModeInitStep2()", 0);
    setTimeout("stageModeInitStep2()", 100);
    setTimeout("stageModeInitStep2()", 500);
    setTimeout("stageModeInitStep2()", 1000);
    setTimeout("stageModeInitStep2()", 3000);
}
// 스테이지 모드처리 Step1
function stageModeInitStep1() {
    $('[' + eduwill.eco.EcoContentHandler.ECO_INDENTITY_ATTR + ']').append('<div class="dim"><span></span><div style="position:absolute; top:10px; right:10px;"><a href="#" onclick="$(this).parent().parent().remove(); return false;" style="font-size:12px; color:#fff; font-weight:bold;">닫기</a></div></div>');
    $('[' + eduwill.eco.EcoContentHandler.ECO_INDENTITY_ATTR + ']').wrapInner('<div class="innerWrap"></div>');
    $('div[class=innerWrap]').on("mouseover", function () {
        $(this).addClass('hover').siblings('div[class=innerWrap]').removeClass('hover');
        $(this).find('.dim').show();
    }).mouseout(function () {
        $(this).find('.dim').hide();
    });
}
// 스테이지 모드처리 Step2
function stageModeInitStep2() {
    var _height;
    $('[' + eduwill.eco.EcoContentHandler.ECO_INDENTITY_ATTR + ']').each(function (index) {
        _height = $(this).find(' .innerWrap').height();
        $(this).find(".dim").find("span").text($(this).attr(eduwill.eco.EcoContentHandler.ECO_INDENTITY_ATTR));
    });
}
