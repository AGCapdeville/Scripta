import styled from 'styled-components';


const LetterButton = styled.button`

`;

const Row = styled.div`
  display: flex;
  justify-content: center;
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
