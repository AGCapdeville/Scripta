import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

type Props = {
  word: string;
  outcome: boolean;
  guesses: number;
};


const saveScore = (word: string, outcome: boolean, guesses: number) => {

  let playerData = localStorage.getItem("playerData");
  
  if (!playerData) {
    console.log("Player data not found");

    let newDistribution = Array(6).fill(0);
    
    if (outcome)
      newDistribution[guesses] = 1;

    const newPlayer = {
      score: outcome ? "1/0" : "0/1",
      distribution: newDistribution,
    }

    localStorage.setItem("playerData", JSON.stringify(newPlayer));

  } else {
    console.log("Player data found");
    const player = JSON.parse(playerData);

    if (outcome) {
      player.score = (parseInt(player.score.split("/")[0]) + 1) + "/" + parseInt(player.score.split("/")[1]);
      player.distribution[guesses] += 1;
    } else {
      player.score = (parseInt(player.score.split("/")[0])) + "/" + ((parseInt(player.score.split("/")[1]) + 1));
    }

    localStorage.setItem("playerData", JSON.stringify(player));
  }
};

export default function Results() {
  const { state } = useLocation();
  const { word, outcome, guesses} = state as Props;

  useEffect(() => {
    saveScore(word, outcome, guesses);
  }, []);

  return (
    <div>
      <h1>Results: {outcome ? 'Victory!' : 'Lost!'}</h1>
      <p>Word: {word}</p>
    </div>
  );
}
