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

리액트 하나를 설치하면서 왜 패키지를 3개나 설치하지? 라는 생각이 들 수도 있는데, 셋 다 하나의 리액트가 맞다.

저렇게 3개로 쪼개진 이유는 혹시 커스텀하게 경량 개발을 원하는 개발자가 있을까봐 용도에 따라 3개로 쪼개놓은건데,
우리는 그냥 신경쓰지 말고 저렇게 설치하면 된다.

혹시나 "앞으로 리액트 개발할때 저 패키지 명을 다 외워야 하느냐" "저 패키지 역할을 다 따로 이해하고 공부하여야 하느냐" 하는 식의 쓸데없는 걱정을 하고 있다면, 그 걱정은 접어두시길 바란다. 어차피 우리는 현업에서 바닐라 리액트로 개발하지 않을 것이다. 프로덕션 레벨에서는 nextjs나 remix같은 걸 쓰게 될 테니.


- index.js
package.json이 들어있는 루트 폴더에 src라는 폴더를 하나 만들고, 그 안에 index.js라는 이름으로 파일을 하나 만들자.

```javascript
import React, { StrictMode } from "react"; // (1)
import { createRoot } from "react-dom/client"; // (2)

const root = createRoot(document.getElementById("root"));
root.render(  // (3)
  <StrictMode>
    <div>hello world</div>
  </StrictMode>
)
```
(1) react라는 패키지로부터 React를 불러오고 있다. 아래 코드 어디서도 React를 참조하고 있지 않지만, 이렇게 React를 소환해야 한다.
이따가 package.json에서 이 src/index.js 를 엔트리 포인트로 지정할 것이다.
그러면 nodejs가 시작하면서 이 파일을 볼 것이고 그때 React를 소환시켜 뒀으면 이게 리액트구나 라는걸 알게 돼서 리액트 식으로 동작하게 될 것이다.

(2) 이번에는 react-dom/client 패키지에서 createRoot라는 함수를 불러오고 있다.
그리고 이 함수는 아래에 보면 자바스크립트에서 익숙하게 본 ```document.getElementById("root")```를 파라메터로 받아 root라는 object를 생성하고 있다.
"root"는 이따가 index.html을 생성할때 다시 보게 될 텐데, root라는 id를 가진 태그를 뿌리삼아 여기부터 리액트 렌더링을 시작하겠다는 의미다.

(3) 여기서부터 프론트엔드 항목들을 그리면 된다. 기본적으로 html 문법과 같은데, html 문법으로 전부 그려도 되지만, 리액트에서는 컴포넌트라는 것을 사용해서 더 효율적으로 작성할 예정이다.
일단은 간단하게 hello world 하나만 작성해 보자.


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

div 태그 안에 ```id="root"```를 확인 할 수 있는데, 위에서 작성한 렌더링이 이 div로 치환될 것이다.

- package json 수정

scripts 에 아래와 같이 start 와 build 를 추가해 준다. main도 src 폴더 내의 index.js를 가리키도록 바꾸자.

```json
{
  "name": "to-do-list",
  "version": "1.0.0",
  "main": "/src/index.js", // 수정
  "scripts": {
    "start": "react-scripts start", // 추가
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
