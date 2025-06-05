import styled from 'styled-components';

const ButtonCustom = styled.button`
  background-color: blue;
  color: white;
  padding: 10px 20px;
  border-radius: 8px;
  border: none;
`;

function keyboardKey(key : string) {
  return <ButtonCustom>{key}</ButtonCustom>;
}
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
            {row.map((letter, letterIndex) => (
              <ButtonCustom key={letterIndex}>{letter}</ButtonCustom>
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
