export default function TestButton({ clickButton }) {
  return (
    <div className="test-button">
      <button
        onClick={(_) => clickButton()}
      >TestButton</button>
    </div>
  )
}