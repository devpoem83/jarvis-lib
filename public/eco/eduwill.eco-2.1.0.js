"use strict";
/**
 * Eduwill Javascript Library
 * http://eco.eduwill.net
 * Version : 2.1.0
 * Data : 2019-02-22
 */
var eduwill;
(function (eduwill) {
    var eco;
    (function (eco) {
        /**
         * Logger Class11
         */
        var Logger = /** @class */ (function () {
            /**
             * Constructor
             * @param level : logger level value
             */
            function Logger(object) {
                this.className = "";
                //this.className = this.getFunctionName(object);
            }
            /**
             * 함수명 추출처리
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
				this.debug("set log level : " + debug);
				if(level == eduwill.eco.Logger.LOGGER_LEVEL_ERROR || level == eduwill.eco.Logger.LOGGER_LEVEL_WARNING || level == eduwill.eco.Logger.LOGGER_LEVEL_INFO || level == eduwill.eco.Logger.LOGGER_LEVEL_DEBUG){
					Logger.loggerLevel = level;
				}else{
					var loggerLevel = "설정하려는 log level 값이 유효하지 않습니다.";
					loggerLevel += " [Level : " 
								+ eduwill.eco.Logger.LOGGER_LEVEL_ERROR + "-" + eduwill.eco.Logger.LOGGER_LEVEL_ERROR_TITLE + ", "
								+ eduwill.eco.Logger.LOGGER_LEVEL_WARNING + "-" + eduwill.eco.Logger.LOGGER_LEVEL_WARNING_TITLE + ", "
								+ eduwill.eco.Logger.LOGGER_LEVEL_INFO + "-" + eduwill.eco.Logger.LOGGER_LEVEL_INFO_TITLE + ", "
								+ eduwill.eco.Logger.LOGGER_LEVEL_DEBUG + "-" + eduwill.eco.Logger.LOGGER_LEVEL_DEBUG_TITLE
								+ "]";
					this.print(Logger.LOGGER_LEVEL_ERROR, Logger.LOGGER_LEVEL_ERROR_TITLE, loggerLevel);
				}
				
            };
			
			Logger.prototype.getLoggerLevel = function () {
				var loggerLevel = "현재 로그레벨 : " + eduwill.eco.Logger.loggerLevel;
				loggerLevel += " [Level : " 
							+ eduwill.eco.Logger.LOGGER_LEVEL_ERROR + "-" + eduwill.eco.Logger.LOGGER_LEVEL_ERROR_TITLE + ", "
							+ eduwill.eco.Logger.LOGGER_LEVEL_WARNING + "-" + eduwill.eco.Logger.LOGGER_LEVEL_WARNING_TITLE + ", "
							+ eduwill.eco.Logger.LOGGER_LEVEL_INFO + "-" + eduwill.eco.Logger.LOGGER_LEVEL_INFO_TITLE + ", "
							+ eduwill.eco.Logger.LOGGER_LEVEL_DEBUG + "-" + eduwill.eco.Logger.LOGGER_LEVEL_DEBUG_TITLE
							+ "]";
                return loggerLevel;
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
				this.print(Logger.LOGGER_LEVEL_INFO, Logger.LOGGER_LEVEL_INFO_TITLE, msg);
            };
            /**
             * Warning log print
             * @param msg
             */
            Logger.prototype.warn = function (msg) {
				this.print(Logger.LOGGER_LEVEL_WARNING, Logger.LOGGER_LEVEL_WARNING_TITLE, msg);
            };
            /**
             * Error log print
             * @param e         : Exception Object
             */
            Logger.prototype.error = function (e) {
				this.print(Logger.LOGGER_LEVEL_ERROR, Logger.LOGGER_LEVEL_ERROR_TITLE, "[" + e.code + "]" + e.name + " " + e.message);
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
                    //logText += "CLASS:[" + this.className + "] > ";
                    logText += msg;
                    try {
                        console.log(logText);
                    }
                    catch (e) {
						console.log("에러 : " + e.message);
                    }
                }
            };
            Logger.LOGGER_LEVEL_DEBUG = 1000; // debug log level value
            Logger.LOGGER_LEVEL_INFO = 2000; // info log level value
            Logger.LOGGER_LEVEL_WARNING = 3000; // warning log level value
            Logger.LOGGER_LEVEL_ERROR = 4000; // error log level value
            Logger.LOGGER_LEVEL_DEBUG_TITLE = "DEBUG"; // debug log level title
            Logger.LOGGER_LEVEL_INFO_TITLE = "INFO"; // info log level title
            Logger.LOGGER_LEVEL_WARNING_TITLE = "WARNING"; // warning log level title
            Logger.LOGGER_LEVEL_ERROR_TITLE = "ERROR"; // error log level title
            Logger.loggerLevel = Logger.LOGGER_LEVEL_ERROR; // default log level
			//Logger.loggerLevel = Logger.LOGGER_LEVEL_INFO; // default log level
			//Logger.loggerLevel = Logger.LOGGER_LEVEL_DEBUG; // default log level
            return Logger;
        }());
        eco.Logger = Logger;
        /**
         * Ajax class
         */
        var Ajax = /** @class */ (function () {
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
             * @param type            : 처리(A : append, R : Replace)
             */
            Ajax.prototype.postAjax = function (callUrl, param, successCallback, failCallback, type, objectId) {
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
                            successCallback(jsonData, type, objectId); // 성공시 함수 실행
                        }
                    },
                    error: function (e) {
                        if (typeof failCallback == "function" || typeof successCallback == "object") {
                            failCallback(e); // 실패시 함수 실행
                        }
                    }
                });
            };
            Ajax.prototype.xDomainRequest = function (callUrl, param, successCallback, failCallback, type, objectId) {
                var xdr = new XDomainRequest();
                xdr.open("get", callUrl);
                xdr.onprogress = function () {
                    //Progress
                };
                xdr.ontimeout = function () {
                    //Timeout
                };
                xdr.onerror = function () {
                    //Error Occurred
                };
                xdr.onload = function () {
                    var jsonData = JSON.parse(xdr.responseText);
                    successCallback(jsonData, type, objectId);
                };
                setTimeout(function () {
                    xdr.send();
                }, 0);
            };
            return Ajax;
        }());
        eco.Ajax = Ajax;
        /**
         * content handler class
         */
        var EcoContentHandler = /** @class */ (function () {
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
				this.logger.debug("ecoMode : " + ecoMode);
                EcoContentHandler.ECO_MODE = ecoMode;
            };
            /**
             * log level configuration
             * @param logLevel
             */
            EcoContentHandler.prototype.setLogLevel = function (logLevel) {
				this.logger.setLoggerLevel(logLevel);
                this.logger.info("로그레벨 변경 성공.");
            };

			EcoContentHandler.prototype.getLogLevel = function () {
                return this.logger.getLoggerLevel();
            };
            /**
             * View Mode 추출
             */
            EcoContentHandler.prototype.ecoModeInit = function () {
				this.logger.info("페이지 URL을 분석하여 출력모드를 설정합니다.");
                var currUrl = document.location.href; // 현재페이지 URL
				this.logger.debug("currUrl : " + currUrl);

                // EcoMode 설정유무 확인 - URL에 EcoMode 파라미터 존재여부 확인
				this.logger.debug("eco content indexof : " + currUrl.indexOf(eduwill.eco.EcoContentHandler.ECO_MODE_PARAM_NAME));
				if (currUrl.indexOf(eduwill.eco.EcoContentHandler.ECO_MODE_PARAM_NAME) > -1) {
                    // URL에 파라미터 존재유무 확인
                    if (currUrl.indexOf("?") > -1) {
                        var parameters = currUrl.split("?")[1]; // URL에서 파라미터군 분리
                        // 파라미터가 복수개일 경우
                        if (parameters.indexOf("&") > -1) {
                            var paramArray = parameters.split("&"); // 각 파라미터를 분리하여 배열로 구성
                            var paramName, paramValue;

							this.logger.debug("paramArray : " + paramArray);
                            for (var i = 0; i < paramArray.length; i++) {
                                paramName = paramArray[i].split("=")[0]; // 파라미터 명
                                paramValue = paramArray[i].split("=")[1]; // 파라미터 값
								
								this.logger.debug("paramName : " + paramName);
								this.logger.debug("paramValue : " + paramValue);

                                // 파리미터가 EcoMode 일 경우
                                if (paramName == eduwill.eco.EcoContentHandler.ECO_MODE_PARAM_NAME) {
                                    this.setEcoMode(paramValue); // EcoMode 설정
                                    this.logger.info("출력모드 분석결과 - 출력모드가 설정되었습니다.[" + this.getEcoMode() + "]");
                                }
                            }
                            // 파라미터가 1개일 경우
                        }
                        else {
                            // 파리미터가 EcoMode 일 경우
                            if (parameters.split("=")[0] == eduwill.eco.EcoContentHandler.ECO_MODE_PARAM_NAME) {
                                this.setEcoMode(parameters.split("=")[1]); // EcoMode 설정
                                this.logger.info("출력모드 분석결과 - 출력모드가 설정되었습니다.[" + this.getEcoMode() + "]");
                            }
                        }
                    }
                }else{
                    this.logger.info("출력모드 분석결과 - 출력모드를 설정하지 않아 기본모드(운영)로 실행합니다.");
                }
            };
            /**
             *
             */
            EcoContentHandler.prototype.run = function () {
                this.logger.info("ECO 프로세스 시작.");
                this.ecoModeInit(); // ECO MODE INIT
                // 콘텐츠가 존재할 경우

				this.logger.info("페이지 마크업을 분석하여 ECO 콘텐츠 사용여부를 확인합니다.");
                if ($("[" + eduwill.eco.EcoContentHandler.ECO_INDENTITY_ATTR + "]")) {
					this.logger.info("해당 페이지는 ECO 콘텐츠를 사용하고 있습니다.");
                    var content_id_array_1 = "";
                    var content_id_1;
                    // 콘텐츠 수만큼 반복처리
                    $("[" + eduwill.eco.EcoContentHandler.ECO_INDENTITY_ATTR + "]").each(function (idx) {
                        content_id_1 = $(this).attr(eduwill.eco.EcoContentHandler.ECO_INDENTITY_ATTR); // 콘텐츠 식별번호                      
						if (content_id_1 != "") {
                            content_id_array_1 += content_id_array_1 == "" ? content_id_1 : "," + content_id_1;
                        }
                    });
                    // 콘텐츠 식별번호가 존재할 경우
					this.logger.debug("content_id_array_1 : " + content_id_array_1);
                    if (content_id_array_1 != undefined && content_id_array_1 != "") {
                        var param = {"ecoMode": this.getEcoMode()};

						this.logger.debug("API - " + this.contentApi + content_id_array_1);
						this.logger.debug("param - " + JSON.stringify(param));

						this.logger.debug("window.XDomainRequest : " + window.XDomainRequest);
                        if (window.XDomainRequest) {
							this.ajax.xDomainRequest(this.contentApi + content_id_array_1, param, this.successCallback, this.failCallback, "R", "");
                        }else {
                            this.ajax.postAjax(this.contentApi + content_id_array_1, param, this.successCallback, this.failCallback, "R", "");
                        }
                    }
                    // 콘텐츠가 존재하지 않을 경우
                }
                else {
                    this.logger.debug("해당 페이지는 ECO 콘텐츠를 사용하지 않습니다.");
                }
            };

			EcoContentHandler.prototype.get = function (content_id, objectId, type) {
				this.logger.info("ECO 프로세스 시작.");
				// 콘텐츠 식별번호가 존재할 경우
				this.logger.debug("content_id - " + content_id);
				this.logger.debug("objectId - " + objectId);
				if (content_id != undefined && content_id != "") {
					var param = {"ecoMode": this.getEcoMode()};

					this.logger.debug("API - " + this.contentApi + content_id);
					this.logger.debug("param - " + JSON.stringify(param));

					this.logger.debug("window.XDomainRequest : " + window.XDomainRequest);
					if (window.XDomainRequest) {
						this.ajax.xDomainRequest(this.contentApi + content_id, param, this.successCallback, this.failCallback, type, objectId);
					}else {
						this.ajax.postAjax(this.contentApi + content_id, param, this.successCallback, this.failCallback, type, objectId);
					}
				}
			};

            /**
             * 콘텐츠정보 조회 성공처리 메소드
             * @param data
             * @prarm type  : A - Append, R - Replace
             */
            EcoContentHandler.prototype.successCallback = function (data, type, objectId) {
                var logger = new eduwill.eco.Logger(this);
                logger.info("데이터통신 결과 - 성공.");
                var contentsData = data["data"];
                var contentsCount = contentsData.length;

				logger.debug("contentsData : " + JSON.stringify(contentsData));
				logger.debug("contentsCount : " + contentsCount);

				if (type == undefined || type == ""){
					type = "R";
				}

				logger.debug("type : " + type);
				
                // 콘텐츠가 존재할 경우
                if (contentsCount > 0) {
                    var content_id = void 0, template = void 0, contentData = void 0;
                    for (var i = 0; i < contentsCount; i++) {
						contentData = contentsData[i];
						logger.debug("contentData[" + i + "] : " + JSON.stringify(contentData));

                        if (contentData != undefined && contentData != null) {
                            content_id = contentData["content_id"] == undefined ? "" : contentData["content_id"]; // 콘텐츠 식별번호
                            template = contentData["template"] == undefined ? "" : contentData["template"]; // 콘텐츠 템플릿
                            
							logger.info("조회 데이터 > 콘텐츠번호 - " + content_id);
							logger.info("조회 데이터 > 템플릿 - " + template);

                            // 콘텐츠 식별번호 및 템플릿이 존재하라 경우
                            if (content_id != 0 && template != "") {
                                try {
									logger.info("페이지에 콘텐츠 출력 시작.");
                                    // 오브젝트에 콘텐츠 템플릿 주입
                                    var addContent = '<iframe src="//img.eduwill.net/resources/eco/eco_log_collect.html?contentId=' + content_id + '" width="0" height="0" frameborder="0" style="width:0px;height:0px;display: block;">';
									logger.debug("addContent : " + addContent);
									
									if(objectId == undefined || objectId == ""){
										if (type == "R") {
											$("[" + eduwill.eco.EcoContentHandler.ECO_INDENTITY_ATTR + "=" + content_id + "]").html(template);
										}else if(type == "A"){
											$("[" + eduwill.eco.EcoContentHandler.ECO_INDENTITY_ATTR + "=" + content_id + "]").append(template);
										}
									}else{
										if (type == "R") {
											$("[id=" + objectId + "]").html(template);
										}else if(type == "A"){
											$("[id=" + objectId + "]").append(template);
										}
									}
                                    
									logger.info("페이지에 콘텐츠 출력 성공.");
                                    $("[" + eduwill.eco.EcoContentHandler.ECO_INDENTITY_ATTR + "=" + content_id + "]").append(addContent);
									logger.info("콘텐츠 출력로그 기록.[Google Analytics]");
                                }
                                catch (e) {
									logger.info("콘텐츠 출력 실패.");
                                    // 오브젝트에 콘텐츠 템플릿 주입시 예외 발생
                                    logger.error(e);
                                }
                            }
                            else {
                                logger.info("템플릿이 존재하지 않습니다.");
                            }
                        }
                        else {
                            logger.info("콘텐츠가 존재하지 않습니다.");
                        }
                    }
                    var ecoHandler = new eduwill.eco.EcoContentHandler();
                    if (ecoHandler.getEcoMode() == 'S' || ecoHandler.getEcoMode() == 'D') {
                        stageModeInit();
                    }
                }else{
					logger.info("콘텐츠가 존재하지 않습니다.");
				}
				logger.info("ECO 프로세스 종료.");
            };
            /**
             * 콘텐츠정보 조회 실패처리 메소드
             * @param e
             */
            EcoContentHandler.prototype.failCallback = function (e) {
                var logger = new eduwill.eco.Logger(this);
				logger.info("데이터통신 결과 : 실패.");
                logger.error(e);
            };
            EcoContentHandler.ECO_VERSION = "v2"; // ECO Version
            EcoContentHandler.ECO_INDENTITY_ATTR = "data-eduwill-eco-content"; // ECO 콘텐츠 식별자
            EcoContentHandler.ECO_MODE_PARAM_NAME = "ECO_MODE"; // mode config string
            EcoContentHandler.ECO_MODE = "L"; // L-Live, S-Stage, D-Dev
            return EcoContentHandler;
        }());
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
// 콘텐츠 동적조회
function getEcoDynamicContent(content_id, objectId, type) {
    if (typeof $ != "undefined") {
        var ecoContentHandler = new eduwill.eco.EcoContentHandler(); // Eco Content Handler Class 객체 생성
        ecoContentHandler.get(content_id, objectId, type);
    }
}
var ecoContentHandler;
$(function () {
    if (typeof window.ecoRunYn == "undefined") {
        ecoContentHandler = new eduwill.eco.EcoContentHandler(); // Eco Content Handler Class 객체 생성
        ecoContentHandler.run(); // Eco Content Initialize
        window.ecoRunYn = "Y";
    }
});
