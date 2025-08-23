import { useEffect, useRef } from 'react';
import styled, { css } from 'styled-components';

const LetterButton = styled.div<{ $status: number }>`
  width: 10vw;
  height: 50px;

  display: flex;
  justify-content: center;
  align-items: center;

  color: white;
  text-decoration: none;

  font-size: 14px;
  margin: 0;

  ${({ $status }) => {
    switch ($status) {
      case 0:
        return css`
          background-color: #818385;
          border-color: #818385;
        `;
      case 1:
        return css`
          background-color: #3a393c;
          border-color: #3a393c;
        `;      
      case 2:
        return css`
          background-color: #b99d42;
          border-color: #b99d42;
        `;  
      case 3:
        return css`
          background-color: #508c50;
          border-color: #508c50;
        `; 
      default:
        return null;
    }
  }}

  border-radius: 11%;
  border-color: #818385;

  text-transform: uppercase;
  font-weight: bold;
  user-select: none;

  @media (min-width: 450px) {
  /* Styles for the smallest phones */
    width: 43px;
  }
`;

const EnterButton = styled.button`
  width: 13vw;
  height: 50px;

  display: flex;
  justify-content: center;
  align-items: center;

  color: white;
  text-decoration: none;

  font-size: 9px;
  margin: 0;
  background-color: #818385;

  border-radius: 11%;
  border-color: #818385;

  text-transform: uppercase;
  font-weight: bold;
  user-select: none;

  @media (min-width: 450px) {
  /* Styles for the smallest phones */
    width: 60px;
    font-size: 12px;

  }
`;

const Row = styled.div`
  display: flex;
  justify-content: center;
  width: 100%;
  gap: 2px;
  padding-top: 2px;
  padding-bottom: 2px;
`;

const Keyboard = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

let qwerty = ['q', 'w', 'e', 'r', 't', 'y', 'u', 'i', 'o', 'p', 'a', 's', 'd', 'f', 'g', 'h', 'j', 'k', 'l', 'enter', 'z', 'x', 'c', 'v', 'b', 'n', 'm', 'delete'];

export const Type = (letter: string, word: string, setWword: React.Dispatch<React.SetStateAction<string>>) => {
  let newWord = word.trim();
  newWord = newWord + letter;
  newWord.padEnd(5);
  if (newWord.length < 6) {
    setWword(newWord.padEnd(5));
  }
}

export const Backspace = (word: string, setWword: React.Dispatch<React.SetStateAction<string>>) => {
  let newWord = word.trim().substring(0, (word.trim().length - 1));
  setWword(newWord.padEnd(5));
}

export const useKeyboardListener = (
  word: string,
  setWord: React.Dispatch<React.SetStateAction<string>>,
  saveWord: React.Dispatch<React.SetStateAction<boolean>>,
  resultsShown: boolean
) => {

  const wordRef = useRef(word);
  const resultsShownRef = useRef(resultsShown);

  // Keep the ref up to date with the latest word
  useEffect(() => {
    wordRef.current = word;
    resultsShownRef.current = resultsShown;
  }, [word, resultsShown]);

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.defaultPrevented) return;

      if (resultsShownRef.current) return; // Game Over

      const key = event.key.toLowerCase(); // normalize
      if (qwerty.includes(key) && key !== "enter" && key != "return") {
        Type(key, wordRef.current, setWord);
      } else if (key === "backspace") {
        Backspace(wordRef.current, setWord);
      } else if (key === "enter") {
        saveWord(true);
      }

      event.preventDefault();
    }

    window.addEventListener('keydown', handleKeyDown, true);

    return () => {
      window.removeEventListener('keydown', handleKeyDown, true);
    };
  }, []); // Empty deps array ensures listener is added once
}

type Props = {
  word: string;
  setWord: React.Dispatch<React.SetStateAction<string>>; // @Question : Is this the best way to do this...
  saveWord: React.Dispatch<React.SetStateAction<boolean>>;
  resultsShown: boolean;
  guessedLetters: Array<string>;
  almostLetters: Array<string>;
  correctLetters: Array<string>;
}

export const Keys = ({ 
  word, 
  setWord, 
  saveWord,
  resultsShown,
  guessedLetters, 
  almostLetters, 
  correctLetters
}: Props) => {


  useKeyboardListener(word, setWord, saveWord, resultsShown);

  const rowLengths = [10, 9, 10];
  let rows: string[][] = [];
  let index = 0;

  for (const length of rowLengths) {
    rows.push(qwerty.slice(index, index + length));
    index += length;
  }
  
  return (
    <>
      <Keyboard>
        {rows.map((row, rowIndex) => (
          <Row key={rowIndex}>
            {row.map((letter) => {
              if (letter == "enter") {
                return (<EnterButton key={letter + "_bttn"} onClick={() => saveWord(true)}>{letter}</EnterButton>);
              } else if (letter == "delete") {
                return (<EnterButton key={letter + "_bttn"} onClick={() => Backspace(word, setWord)}>{letter}</EnterButton>);
              } else {

                if (correctLetters.includes(letter)) {
                  return (<LetterButton $status={3} key={letter + "_key"} onClick={() => Type(letter, word, setWord)}>{letter}</LetterButton>)
                }

                if (almostLetters.includes(letter)) {
                  return (<LetterButton $status={2} key={letter + "_key"} onClick={() => Type(letter, word, setWord)}>{letter}</LetterButton>)
                }

                if (guessedLetters.includes(letter)) {
                  return (<LetterButton $status={1} key={letter + "_key"} onClick={() => Type(letter, word, setWord)}>{letter}</LetterButton>)
                }

                return (<LetterButton $status={0} key={letter + "_key"} onClick={() => Type(letter, word, setWord)}>{letter}</LetterButton>)
              
              }
            })}
          </Row>
        ))}
      </Keyboard>    
    </>
  )

}
