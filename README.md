# 자비스 라이브러리 시스템

## 프론트엔드 Libarary 서비스

### 도메인

-   운영 : jarvis-lib.eduwill.net
-   스테이지 : s-jarvis-lib.eduwill.net
-   개발 : d-jarvis-lib.eduwill.net

### 웹서버

-   서비스용 : nginx
-   개발용 : Static Server

### 개발언어

-   Typescript

### 형상관리

-   Gitlab : http://gitlab.eduwill.net/dev_team/jarvis-lib

### 빌드 & 배포관리

-   빌드 : Jenkins (ci4.eduwill.net)
-   배포 : Marathon
-   알림 : Hangout Chat

### 개발환경 구축

-   Node 설치
-   VSCode 설치 https://code.visualstudio.com
-   Git 설치 https://git-scm.com
-   Source Clone

```
git clone http://gitlab.eduwill.net/dev_team/jarvis-lib.git
```

-   로컬호스트 설정

```
127.0.0.1   l-jarvis-lib.eduwill.net
```

-   디펜던시 다운로드

```
npm install
```

-   타입스크립트 빌드

```
파일선택 > ctrl + Shift + B > TSC tsconfig 선택
```

-   실행

```
npm run jarvis
```
