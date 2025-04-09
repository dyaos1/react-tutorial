---
title: 리액트 훅
date: 2025-04-05
---
# 리액트 훅 써보기

> branch: 02-react-hook-01

## 1. 준비하기

이전 01-react-basic 챕터에서 썼던 코드를 재사용해도 되지만, 복습할 겸 새로 생성해 보자.

(1) nodejs 초기화

먼저 폴더를 생성하고 ```npm init -y```로 nodejs를 초기화 한다.


(2) 리액트 설치

```npm i react react-dom react-scripts```

(3) package.json 수정

main: "/src/index.js"로 수정   
scripts: "start": "react-scripts start", "build": "react-scripts build" 추가

(4) src/index.js

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

(5) public/index.html
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

## 1.1 준비하기(2): 메인 컴포넌트 추가하기

지금 index.js는 컴포넌트가 아니다. root.render로 컴포넌트 및 html 요소를 직접 parameter로 받아주고 있는데, 뒤에서 이용할 훅은 반드시 컴포넌트 안에서만 동작한다.

그래서 index.js가 Main컴포넌트를 받도록 하고, 앞으로 코드는 Main안에서 구현하는 식으로 고쳐줄 필요가 있다.

- index.js 수정

```javascript
import React, { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import Main from "./component/Main"

const root = createRoot(document.getElementById("root"));
root.render(
  <StrictMode>
    <Main />
  </StrictMode>
)
```

- Main 컴포넌트 추가

src 폴더 안에 component폴더를 만들고 그 안에 Main.js를 만든 뒤, 아래와 같이 작성한다.

```
export default function Main() {
  return (
    <div className="layout">
      <div className="main-container"> 
        <div>hello world</div>
      </div>
    </div>
  )
}
```

이전에는 index.js에 컴포넌트를 직접 배치하고, 스타일 요소도 직접 수정하고 그랬는데, 앞으로는 이런식으로 index.js는 Main 컴포넌트만 받고, 컴포넌트 추가, 스타일 변경, 훅 사용 등 모든 활동은 Main안에서 진행하도록 하겠다.

## 2. 훅 써보기

### (1) 개요

훅 hook 은 리액트 공부의 꽃이자, 알파이자 오메가라고 해도 좋을 정도로 중요한 개념이다.   
직관적이지 않고 이해하기도 어려운데다 배워도 굳이 이걸 왜 이렇게 써야 하지? 라는 의구심이 제일 먼저 들기 때문에 좀처럼 익숙해지기가 어렵다. 리액트 공부의 가장 높은 진입 장벽이라고 할 수 있다.   

훅은 hook 갈고리를 의미한다. 조금더 정확히 말하자면 실로 조종하는 꼭두각시 인형에 줄을 거는 갈고리를 의미한다.

꼭두각시 인형의 팔을 움직이고 싶으면 팔에 줄을 걸어야 한다. 마찬가지로 리액트에서 특정 html 요소를 조종하고 싶으면 그 요소에 훅을 걸어야 한다.

바닐라 자바스크립트에서는 훅이라는 개념이 없다. 자유롭게 html 요소에 접근할 수 있기 때문이다. ```document.getElementById("msg")```와 같이 내가 html 요소에 ```id="msg"```를 부여해 두었다가 script에서 그것을 가져오도록 할 수 있다. 왜냐하면 내가 html 요소와 script문 둘 다 작성을 하니까, 둘 다 개발자가 마음대로 쓸 수 있는 것이다.

그런데 리액트는 렌더링을 한다. html 요소를 내가 아니라 리액트가 그리기 때문에, 개발자 입장에서 내가 그리지 않은 DOM 요소에 접근하려면 좀 특수한 방법이 필요하다. 그것이 훅이다.

훅은 여러가지가 있지만, 가장 사용빈도가 높은 useEffect, useState 두 가지만 알아도 얼추 리액트 초보티는 벗었다고 할 수 있으니 일단은 이 두가지 위주로 설명하도록 하겠다.

### (2) 테스트용 컴포넌트 만들기

리액트의 훅을 맛보기 위해서 테스트용 컴포넌트를 몇개 만들어 볼 것이다.

component 폴더안에, TestInput.js TestButton.js TestDisplay.js 라는 이름으로 각각 3개 파일을 생성하자.

- TestInput.js

```javascript
export default function TestInput() {
  return (
    <div className="test-input">
      <input type="text" />
    </div>
  )
}
```

- TestButton.js

```javascript
export default function TestButton() {
  return (
    <div className="test-button">
      <button>TestButton</button>
    </div>
  )
}
```

- TestDisplay.js

```javascript
export default function TestDisplay() {
  return (
    <div className="test-display">
      <p>message here</p>
    </div>
  )
}
```

- Main.js 수정

```javascript
import TestInput from "./TestInput";
import TestButton from "./TestButton";
import TestDisplay from "./TestDisplay";

export default function Main() {
  return (
    <div className="layout">
      <div className="main-container">    
        <TestInput />
        <TestButton />
        <TestDisplay />
      </div>
    </div>
  )
}
```
이와같이 구성하여 Main 컴포넌트가 부모역할을, 각각의 Input, Button, Display 컴포넌트는 자식컴포넌트 역할을 하도록 구성해 주었다.

- styles.css

src 폴더에 styles.css 파일을 생성하고 다음과 같이 입력한다.

```css
.layout {
  display: flex;
  min-height: 100vh;
  justify-content: center;
  align-items: center;
}

.main-container {
  display: flex;
  flex-direction: column;
  width: 480px;
}

.test-input {
  margin: 2px;
}

.test-button {
  margin: 2px;
  
}

.test-display {
  margin: 2px;
  
}
```

npm run start 로 실행시키고, localhost:3000을 확인해서 잘 되었나 보자.

우리가 원하는 것은 input 란에 값을 입력하고 테스트버튼을 클릭하면, 
아래쪽에 그 문구가 출력되도록 하는 것을 만들 것이다.

- TestInput.js 수정

TestInput.js를 다음과 같이 수정한다.

```javascript
import { useState } from "react"

export default function TestInput() {
  const [inputState, setInputState] = useState("초기값")

  return (
    <div className="test-input">
      <input type="text" value={inputState} />
    </div>
  )
}
```

리액트에서는 변화할 수 있는 모든 변수는 "상태(state)"로 만들어줘야 한다.     
어떤 변하는 값이든 리액트에서 다루려면 상태로서 선언해 주어야 한다. 그리고 상태를 선언하는 방법은 useState를 이용해야 한다.

> useState를 이용해서 상태를 선언하는 방법.
```javascript
const [ 상태, 상태 세터 함수 ] = useState(상태의 초기값)
```

1. useState()의 괄호 안에는 state의 초기값을 넣어준다. 문자열이면 빈 문자열을, 숫자면 0을 기타 object인 경우 {}를 넣는다든지 하는 식으로 초기값을 넣어준다.

2. state와 stateSetter를 구조분해 할당한다.   
```const [ inputState, setInputState ] = useState("초기값")``` 이런 식으로 선언하면 배열 앞 값은 상태가, 뒤의 값은 상태를 변경할 수 있는 함수가 된다.   
위 코드대로라면, ```inputState```에는 "초기값"이라는 문자열이 할당될 것이고, ```setInputState("hello")```를 호출하면 inputState는 "hello"라는 값으로 바뀔 것이다.

3. input의 value에 상태값을 넣어준다.
아직은 inputState는 초기값인 "초기값"인 상태다. setInputState()를 쓴 적이 없으니 이 값은 바뀌지 않은 것이다. localhost:3000에서 들어가서 확인해 보면, input란에 어떤 값을 넣어도 값이 변하지 않는다. set함수를 이용해서 input에 값을 넣으면 상태가 그에따라 변하도록 하여야 한다.


- TestInput.js 수정

```javascript
import { useState } from "react"

export default function TestInput() {
  const [inputState, setInputState] = useState("")

  return (
    <div className="test-input">
      <input 
        type="text" 
        value={inputState} 
        onChange={
          (event) => {
            setInputState(event.target.value)
            console.log(inputState)
          }
        }
      />
    </div>
  )
}
```

onChange에 함수를 추가해 주었다. set함수에 변경된 이벤트 값(event.target.value)를 넣어주고 상태를 콘솔로 직도록 변경했다.

이렇게 해 주고 localhost:3000에서 input 안에 값을 입력해서 어떻게 변하나 지켜보자.

> 참고. 콘솔에 찍히는 것이 한템포 느리다는 것을 눈치챌 수 있을 것이다. 이것은 리액트 useState를 이용해서 만들어진 상태의 setter함수가 비동기적으로 동작하기 때문이다. 즉, setInputState(event.target.value)라인이 실행되어 완료 되고 나서, console.log(inputState)가 동작 되는 것이 아니라, setInputState(event.target.value)가 완료 전에 console.log(inputState)가 먼저 시작되어 버리는 것이다.   
이 부분에 대해서는 기회가 된다면 나중에 따로 다루도록 하겠다. 


- TestButton을 수정하기 전에

TestInput에서 입력한 값을 상태(state)로 만들어 주었다. 우리는 state가 TestButton을 누르면 TestDisplay에 전달되도록 하기만 하면 된다.

문제는 TestInput과 TestButton, TestDisplay는 모두 각각 독립된 컴포넌트 라는 점이다.

inputState라는 상태는 TestInput 컴포넌트 안에 선언되어 있다. 이 inputState입장에서는, TestButton이라는 무관한 컴포넌트를 눌렀을때, TestDisplay라는 무관한 컴포넌트에 출력되도록 해야한다는 의미인데, 이렇게 독립된 컴포넌트끼리 state를 주고 받는 것은 간단한 일이 아니다.

이 문제에 대한 해결책은, 애초에 state와 setter함수를 각각의 컴포넌트가 아닌 부모 컴포넌트인 Main컴포넌트에서 선언해서 각 컴포넌트의 props로 내려주는 것이다. 

말로 설명하면 복잡할 테니 다음 코드를 보도록 하자.

 - src/component/Main.js
```javascript
import { useState } from "react"

import TestInput from "./TestInput";
import TestButton from "./TestButton";
import TestDisplay from "./TestDisplay";

export default function Main() {
  const [inputState, setInputState] = useState("")
  return (
    <div className="layout">
      <div className="main-container">    
        <TestInput 
          value={inputState}
          setValue={setInputState}
        />
        <TestButton />
        <TestDisplay />
      </div>
    </div>
  )
}
```

- src/component/TestInput.js

```javascript
export default function TestInput({value, setValue}) {
  return (
    <div className="test-input">
      <input 
        type="text" 
        value={value} 
        onChange={
          (event) => {
            setValue(event.target.value)
            console.log(value)
          }
        }
      />
    </div>
  )
}
```

이전에 TestInput 컴포넌트 안에서 useState를 이용해서 상태를 만들어 input내에 훅을 걸었던 것을, 부모컴포넌트인 Main에서 생성해서 이 state와 stateSetter를 자식 컴포넌트로 내려주는 식으로 구현하였다.

이번에는 TestButton 컴포넌트의 button을 누르면 TestDisplay에 inputState가 표시되도록 하는 함수를 만들어 각각의 컴포넌트에 내려주도록 하자.

- Main.js

```javascript
import { useState } from "react"

import TestInput from "./TestInput";
import TestButton from "./TestButton";
import TestDisplay from "./TestDisplay";

export default function Main() {
  const [inputState, setInputState] = useState("")
  const [displayState, setDisplayState] = useState("입력 받은 값이 없습니다.")

  function clickTestButton() {
    setDisplayState((prev) => {
      if (inputState === "") return "입력 받은 값이 없습니다."
      return `입력받은 값: ${inputState}`
    })
  }

  return (
    <div className="layout">
      <div className="main-container">    
      <TestInput 
        value={inputState}
        setValue={setInputState}
      />
      <TestButton 
        clickButton={clickTestButton}
      />
      <TestDisplay 
        value={displayState}
      />
      </div>
    </div>
  )
}
```
useState를 하나 더 만들어준다. display 컴포넌트의 문자열은 버튼을 누르기 전에는 default 값 이다가, inputState를 누르는 순간 변경되어야 하기 때문에, 같은 값이 아니다. inputState와 따로 만들어야 한다.

그리고 버튼 클릭시 적용될 clickTestButton 함수를 생성해 준다. 입력받은 값: inputState 를 반환하도록 구현하였다.


- TestButton.js
```javascript
export default function TestButton({ clickButton }) {
  return (
    <div className="test-button">
      <button
        onClick={(_) => clickButton()}
      >TestButton</button>
    </div>
  )
}
```


- TestDisplay.js
```javascript
export default function TestDisplay({ value }) {
  return (
    <div className="test-display">
      <p>{value}</p>
    </div>
  )
}
```

Main에서 생성한 함수 및 state를 적절하게 아래 컴포넌트로 prop으로 전달해 준다.

input 란에 값을 입력해 보고 버튼을 클릭하면 아래의 display에 나타나게 된다.   

방금 실습에서, useState로 state 및 setter를 만들어서 각각의 하위 컴포넌트의 특정 html 요소에 부여해 주었는데, 이것은 사실 그 html 요소에 인형 조종이 가능한 실을 걸어둔 것이다. 우리가 input에 값을 입력하거나 버튼을 클릭함으로써 그 연결해 둔 실로 인형을 조종하듯 조종한 것인데, 인형사가 팔을 걸면 팔만 움직이고, 다리를 걸면 다리만 움직이는것 처럼, 리액트는 훅을 걸어서 값을 변경하게 되면, 그 부분만 렌더링 된다.

특정 부분만 렌더링이 된다는 것은 프론트엔드에 있어서 대단히 중요한 의미가 있다. 문서의 내용이 변경되면 새로고침으로 전체를 새로 그려내는 것이 아니라, 변경된 그 부분만 수정한다는 것이다. 

바로 이렇기 때문에 리액트는 다른 프론트엔드와 달리 화면이 부드럽고 깜빡임이 없고 마치 물 흐르듯 부드러운 화면을 보여줄 수 있다는 독보적인 장점이 있다. 그리고 이 장점은 훅을 걸어서 그 부분만 그려내도록 할 수 있기 때문에 구현이 가능한 것이다.
