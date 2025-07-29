import { useLocation } from 'react-router-dom';

type Props = {
  word: string;
  outcome: boolean;
};

export default function Results() {
  const { state } = useLocation();
  const { word, outcome } = state as Props;

  return (
    <div>
      <h1>Results: {outcome ? 'Victory!' : 'Lost!'}</h1>
      <p>Word: {word}</p>
    </div>
  );
}
