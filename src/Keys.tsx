import styled from 'styled-components';


const LetterButton = styled.button`
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

  @media (min-width: 500px) {
  /* Styles for the smallest phones */
    width: 43px;
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

let qwerty = ['q', 'w', 'e', 'r', 't', 'y', 'u', 'i', 'o', 'p', 'a', 's', 'd', 'f', 'g', 'h', 'j', 'k', 'l', 'z', 'x', 'c', 'v', 'b', 'n', 'm'];


function renderKeyboard() {
  const rowLengths = [10, 9, 8];
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
            {row.map((letter) => (
              <LetterButton key={letter}>{letter}</LetterButton>
            ))}
          </Row>
        ))}
      </Keyboard>
    </>
  )
}

function Keys() {
  
  return (
    <>
      {renderKeyboard()}
    </>
  )
}


export default Keys
