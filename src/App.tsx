import { useEffect, useState } from 'react';
import './App.css';
import Word from './Word';
import Keys from './Keys';
import styled from 'styled-components';

const PageContainer = styled.button`
  display: flex;
  flex-direction
`;

function App() {
  const [word, setWord] = useState("     ");
  const [save, saveWord] = useState(false);
  const [secretWord, setSecretWord] = useState("");
  const [loading, setLoading] = useState(false);

  const fetchSecretWord = async () => {
    try {
      const response = await fetch('https://api.datamuse.com/words?sp=?????&max=1000');
      const data = await response.json();
      if (data.length > 0) {
        const randomWord = data[Math.floor(Math.random() * data.length)].word;
        setSecretWord(randomWord);
      } else {
        setSecretWord('No api words found.');
      }
    } catch (error) {
      console.error('Error fetching api word:', error);
      setSecretWord('Error fetching api word.');
    } finally {
      setLoading(false);
    }
  };

  // Do once and forget...
  useEffect(() => {
    fetchSecretWord();
  }, []);

  return (
    <div className='screen'>
      
      <div className='title'>
        <h3>Scripta</h3>
      </div>
      
      {loading ? "loading..." :
        <div className='wordBoard'>
          <Word word={word} setWord={setWord} secretWord={secretWord} save={save} saveWord={saveWord}/>
        </div>
      }

      <div className='wordKeyboard'>
        <Keys word={word} setWord={setWord} saveWord={saveWord}/>
      </div>

    </div>
  )
}

export default App
