import { useEffect } from 'react';
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

type Props = {
  word: string;
  secretWord: string;
};

function Word({ word, secretWord}: Props) {

  useEffect(() => {
    console.log(word);
  }, [word])

  return (
    <>
      <div>secret word: {secretWord}</div>
      <WordContainer>
        <WordRow>
          
          {[...word].map((letter, index) => (
            <Letter key={index}>
              {letter}
            </Letter>
          ))}

        </WordRow>
      </WordContainer>
    </>
  )
}

export default Word
