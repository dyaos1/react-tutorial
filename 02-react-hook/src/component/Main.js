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
