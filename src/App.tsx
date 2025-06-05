import { useState } from 'react'
import './App.css'
import Keys from './Keys'


function App() {
  const [count, setCount] = useState(0)

  return (
    <>

      <div>
        <h3>Scripta</h3>
      </div>

      <div className="card">
        <button onClick={() => setCount((count) => count - 1)}>
          -
        </button>
        <button>
          count is {count}
        </button>
        <button onClick={() => setCount((count) => count + 1)}>
          +
        </button>
      </div>

      <Keys/>

    </>
  )
}

export default App
