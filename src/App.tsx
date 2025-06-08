import { useState } from 'react'
import './App.css'
import Keys from './Keys'
import styled from 'styled-components';

const PageContainer = styled.button`
  display: flex;
  flex-direction
`;

function App() {
  const [count, setCount] = useState(0)

  return (
    <div className='screen'>
      
      <div className='title'>
        <h3>Scripta</h3>
      </div>
      
      <div className='wordBoard'>
      </div>

      <div className='wordKeyboard'>
        <Keys/>
      </div>

    </div>
  )
}

export default App
