import { useEffect, useState } from 'react'
import './App.css'
import Word from './Word'
import Keys from './Keys'
import styled from 'styled-components';

const PageContainer = styled.button`
  display: flex;
  flex-direction
`;

function App() {
  const [word, setWord] = useState("");
  const [loading, setLoading] = useState(false);

  const fetchWord = async () => {
    try {
      const response = await fetch('https://api.datamuse.com/words?sp=?????&max=1000');
      const data = await response.json();
      if (data.length > 0) {
        const randomWord = data[Math.floor(Math.random() * data.length)].word;
        setWord(randomWord);
      } else {
        setWord('No words found.');
      }
    } catch (error) {
      console.error('Error fetching word:', error);
      setWord('Error fetching word.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchWord();
  }, []);

  return (
    <div className='screen'>
      
      <div className='title'>
        <h3>Scripta</h3>
      </div>

      <div className='wordBoard'>
        {/* {loading ? "" : word} */}
        {loading ? <h3>loading...</h3> : <Word word={word}/>}
      </div>

      <div className='wordKeyboard'>
        <Keys/>
      </div>

    </div>
  )
}

export default App
