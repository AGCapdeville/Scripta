import { useEffect, useState } from 'react';
import styled, { css, keyframes } from 'styled-components';
import dictJSON from "../assets/dictionary.json";

const Answer = styled.div<{ $isHidden?: boolean }>`
  display: ${({ $isHidden }) => ($isHidden ? 'none' : 'block')};
`;

const WordBox = styled.div`
  display: flex;
  flex-flow: column;
  position: absolute;
`

const Letter = styled.div`
  width: 15vw;
  height: 15vw;

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
  height: 15vw;

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
  height: 15vw;

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

const WordRow = styled.div<{ $shouldShake: boolean }>`
  display: flex;
  justify-content: center;
  width: 100%;
  gap: 5px;
  padding-top: 2px;
  padding-bottom: 2px;

  ${({ $shouldShake }) =>
    $shouldShake &&
    css`
      animation: ${shake} 0.5s ease-in-out;
    `}
`;

const WordContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const shake = keyframes`
  0% { transform: translateX(0); }
  25% { transform: translateX(-5px); }
  50% { transform: translateX(5px); }
  75% { transform: translateX(-5px); }
  100% { transform: translateX(0); }
`;

export const letterState = (letter: string, index: number, answer: string) => {
  if (answer[index] == letter) {
    return (<GreenLetter key={index}>{letter}</GreenLetter>)
  } else if (answer.includes(letter)) {
    return (<GoldLetter key={index}>{letter}</GoldLetter>)
  }
  return (<Letter key={index}>{letter}</Letter>)
}

export const showAnswer = (isHidden: boolean, setIsAnswerHidden: React.Dispatch<React.SetStateAction<boolean>>) => {
  setIsAnswerHidden(!isHidden);
}

type WordProps = {
  word: string;
  setWord: React.Dispatch<React.SetStateAction<string>>
  secretWord: string;
  save: boolean;
  saveWord: React.Dispatch<React.SetStateAction<boolean>>;
  attempts: number;
  setAttempts: React.Dispatch<React.SetStateAction<number>>;
  guessedLetters: Array<string>;
  setGuessedLetters: React.Dispatch<React.SetStateAction<Array<string>>>;
  almostLetters: Array<string>;
  setAlmostLetters: React.Dispatch<React.SetStateAction<Array<string>>>;
  correctLetters: Array<string>;
  setCorrectLetters: React.Dispatch<React.SetStateAction<Array<string>>>;
};

export const Word = (
  { word, setWord, secretWord,
    save, saveWord,
    attempts, setAttempts,
    guessedLetters, setGuessedLetters, 
    almostLetters, setAlmostLetters, 
    correctLetters, setCorrectLetters }: WordProps
  ) => {

  const [submittedWords, setSubmittedWords] = useState<string[]>([]);
  const [wordSet, setWordSet] = useState<Set<string>>(new Set());
  const [shake, setShake] = useState(false);
  const [isAnswerHidden, setIsAnswerHidden] = useState(true);

  useEffect(() => {

    console.log("SAVING WORD");

    if (save) {
      if (wordSet.has(word.toLowerCase()) && word.trim().length === 5 && attempts < 5) {

        let guessed = [...guessedLetters];
        let almost = [...almostLetters];
        let correct = [...correctLetters];

        [...word].forEach((char, index) => {
          if (!guessed.includes(char)) {
            guessed = [...guessed, char];
          }
          if (secretWord[index] == char) {
            correct = [...correct, char];
          }
          if (secretWord.includes(char) && !almost.includes(char)) {
            almost = [...almost, char];
          }
        })

        if (guessed.length > guessedLetters.length) {
          setGuessedLetters([...guessed]);
        }

        if (correct.length > correctLetters.length) {
          setCorrectLetters([...correct]);
        }

        if (almost.length > almostLetters.length) {
          setAlmostLetters([...almost]);
        }

        setAttempts(attempts + 1);
        setSubmittedWords([...submittedWords, word.trim()]);    
        setWord("     ");
      } else {
        setShake(true);
        setTimeout(() => setShake(false), 500); // Reset shake after animation
      }
      saveWord(false);
    }

  }, [save]);

  useEffect(() => {
    const words = (dictJSON as string[]).filter((w: string) => w.length === 5);
    setWordSet(new Set(words));
  }, []);

  return (
    <>
      {/* <button onClick={() => showAnswer(isAnswerHidden, setIsAnswerHidden)}>show answer</button> */}
      <Answer $isHidden={isAnswerHidden}>secret word: {secretWord}</Answer>
      <WordContainer>

        {[0,1,2,3,4,5].map((rowIndex) => (
          <WordRow key={rowIndex} $shouldShake={false}>
            {[0,1,2,3,4].map((index) => (
              letterState(' ', index, secretWord)
            ))}
          </WordRow>
        ))}

        <WordBox>
          
          {submittedWords.map((submittedWord, rowIndex) => (
            <WordRow key={rowIndex} $shouldShake={false}>
              {[...submittedWord].map((letter, index) => (
                letterState(letter, index, secretWord)
              ))}
            </WordRow>
          ))}

          {/* Current typing word */}
          <WordRow id='currentWord' $shouldShake={shake}>
            {[...word].map((letter, index) => (
              <Letter key={index}>{letter}</Letter>
            ))}
          </WordRow>

        </WordBox>


      </WordContainer>
    </>
  )
}
