import { useEffect } from 'react';
import { saveGameScore } from '../utility/UserData';

type ResultProps = {
  gameType: string;
  outcome: boolean;
  guesses: number;
};

export const Results = ({gameType, outcome, guesses} : ResultProps) => {

  useEffect(() => {
    saveGameScore(gameType, outcome, guesses);
  }, []);

  return (
    <div className="max-w-sm rounded overflow-hidden shadow-lg">
      <h1>Thanks for playing!</h1>
      <h2>Results: {outcome ? 'Victory!' : 'Lost!'}</h2>
    </div>
  );

}
