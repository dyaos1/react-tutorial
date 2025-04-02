# 리액트로 to-do-list app 만들어 보기

## 1. 설치

 > branch: 01-react-basic-01

 - 초기화

```
npm init
```

이 커맨드를 실행하면 (nodejs와 npm이 정상적으로 설치되었다면) 설문조사가 시작된다.
앱 이름은 뭘로 할래, 니 이름은 뭐냐, 깃헙 주소 등등을 물어보는데,
프로덕션 레벨이 아닌 이상 일반 연습에선 중요한건 없으니 그냥 다 엔터 쳐도 상관 없다(엔터치면 전부 기본값으로 설정됨).

일일히 엔터치기도 귀찮으면 그냥 ```npm init -y``` 로 초기화를 하면 전부 기본값으로 된다.


- 리액트 설치

```
npm install react react-dom react-scripts
```

리액트 하나를 설치하면서 왜 3개나 설치하지? 라는 생각이 들 수도 있는데, 셋 다 하나의 리액트가 맞다.

저렇게 3개로 쪼개진 이유는 혹시 커스텀하게 경량 개발을 원하는 개발자가 있을까봐 용도에 따라 3개로 쪼개놓은건데,
우리는 그냥 신경쓰지 말고 저렇게 설치하면 된다.


- index.js
package.json이 들어있는 루트 폴더에 src라는 폴더를 하나 만들고, 그 안에 index.js라는 이름으로 파일을 하나 만들자.

```javascript
import React, { StrictMode } from "react";
import { createRoot } from "react-dom/client";

const root = createRoot(document.getElementById("root"));
root.render(
  <StrictMode>
    <div>hello world</div>
  </StrictMode>
)
```


- index.html

루트 폴더에 public/ 폴더를 하나 만들고 그 안에 index.html을 생성한다.
그리고 ! tab 을 차례로 눌러 html 스니펫 코드를 만든 뒤 아래와 같이 수정해 준다.

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
  </head>
  <body>
    <div id="root"></div>
  </body>
</html>
```

div 태그 안에 

- package json 수정

scripts 에 아래와 같이 start 와 build 를 추가해 준다. main도 src 폴더 내의 index.js를 가리키도록 바꾸자.

```json
{
  "name": "to-do-list",
  "version": "1.0.0",
  "main": "/src/index.js",
  "scripts": {
    "start": "react-scripts start",
    "build": "react-scripts build"
  },
  "author": "spark",
  "license": "ISC",
  "description": "",
  "dependencies": {
    "react": "^19.1.0",
    "react-dom": "^19.1.0",
    "react-scripts": "^5.0.1"
  },
}
```

그리고 터미널에 ```npm run start``` 를 입력해 보자. 브라우저로 localhost:3000 에 접속해서 hello world 라고 뜬다면 성공한 것이다.

