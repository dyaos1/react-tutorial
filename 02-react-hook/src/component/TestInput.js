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
