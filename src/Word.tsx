import { useEffect } from 'react';
import styled from 'styled-components';

const Letter = styled.div`
  width: 10vw;
  height: 50px;

  display: flex;
  justify-content: center;
  align-items: center;

  font-size: 14px;
  margin: 0;
  background-color: #a2a2a2;

  border-radius: 11%;
  border-color: #a2a2a2;

  text-transform: uppercase;
  font-weight: bold;
  user-select: none;

  @media (min-width: 450px) {
  /* Styles for the smallest phones */
    width: 43px;
  }
`;

const WordRow = styled.div`
  display: flex;
  justify-content: center;
  width: 100%;
  gap: 2px;
  padding-top: 2px;
  padding-bottom: 2px;
`;

const WordContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

type Props = {
  word?: string;
};

function Word({ word }: Props) {

  if (!word) return <p>Loading...</p>;


  // useEffect(() => {
  //   console.log(word);
  // }, [word])


  return (
    <>
      <h2>WORD:</h2>
      <p>{word}</p>
    </>
  )
}

export default Word
