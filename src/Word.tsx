import { useEffect, useState } from 'react';
import styled from 'styled-components';

const Letter = styled.div`
  width: 15vw;
  height: 40px;

  display: flex;
  justify-content: center;
  align-items: center;

  font-size: 14px;
  margin: 0;
  background-color: #121212;

  border: 1px solid #3a393c;
  border-radius: 11%;

  text-transform: uppercase;
  font-weight: bold;
  user-select: none;

  @media (min-width: 450px) {
  /* Styles for the smallest phones */
    width: 52px;
  }
`;

const GoldLetter = styled.div`
  width: 15vw;
  height: 40px;

  display: flex;
  justify-content: center;
  align-items: center;

  font-size: 14px;
  margin: 0;
  background-color: #b99d42;

  border: 1px solid #3a393c;
  border-radius: 11%;

  text-transform: uppercase;
  font-weight: bold;
  user-select: none;

  @media (min-width: 450px) {
  /* Styles for the smallest phones */
    width: 52px;
  }
`

const GreenLetter = styled.div`
  width: 15vw;
  height: 40px;

  display: flex;
  justify-content: center;
  align-items: center;

  font-size: 14px;
  margin: 0;
  background-color: #508c50;

  border: 1px solid #3a393c;
  border-radius: 11%;

  text-transform: uppercase;
  font-weight: bold;
  user-select: none;

  @media (min-width: 450px) {
  /* Styles for the smallest phones */
    width: 52px;
  }
`;

const WordRow = styled.div`
  display: flex;
  justify-content: center;
  width: 100%;
  gap: 5px;
  padding-top: 2px;
  padding-bottom: 2px;
`;

const WordContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

function tryToSaveWord(word: string,
  setWord: React.Dispatch<React.SetStateAction<string>>, 
  save: boolean, 
  saveWord: React.Dispatch<React.SetStateAction<boolean>>,
  submittedWords: string[],
  setSubmittedWords: React.Dispatch<React.SetStateAction<string[]>>)
{
  if (save) {
    if (word.trim().length === 5) {
      setSubmittedWords([...submittedWords, word.trim()]);    
      setWord("     ");
    }
    saveWord(false);
  }
}

type Props = {
  word: string;
  setWord: React.Dispatch<React.SetStateAction<string>>
  secretWord: string;
  save: boolean;
  saveWord: React.Dispatch<React.SetStateAction<boolean>>;
};

function letterState(letter: string, index: number, answer: string) {
  if (answer[index] == letter) {
    return (<GreenLetter key={index}>{letter}</GreenLetter>)
  } else if (answer.includes(letter)) {
    return (<GoldLetter key={index}>{letter}</GoldLetter>)
  }
  return (<Letter key={index}>{letter}</Letter>)
}

function Word({word, setWord, secretWord, save, saveWord}: Props) {
  const [submittedWords, setSubmittedWords] = useState<string[]>([]);

  useEffect(() => {
    tryToSaveWord(word, setWord, save, saveWord, submittedWords, setSubmittedWords);
  }, [save]);

  return (
    <>
      <div>secret word: {secretWord}</div>
      <WordContainer>

        {submittedWords.map((submittedWord, rowIndex) => (
          <WordRow key={rowIndex}>
            {[...submittedWord].map((letter, index) => (
              letterState(letter, index, secretWord)
            ))}
          </WordRow>
        ))}

        {/* Current typing word */}
        <WordRow id='currentWord'>
          {[...word].map((letter, index) => (
            <Letter key={index}>{letter}</Letter>
          ))}
        </WordRow>

      </WordContainer>
    </>
  )
}

export default Word
