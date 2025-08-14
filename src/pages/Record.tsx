
function loadPlayerData() {

  let playerData = localStorage.getItem("playerData");

  if (!playerData) {
    console.log("No player data found, creating new player data.");
    const newPlayer = {
      score: "0/0",
      distribution: Array(6).fill(0),
    };
    localStorage.setItem("playerData", JSON.stringify(newPlayer));
    playerData = JSON.stringify(newPlayer);
  } else {
    console.log("Player data found, updating...");
  }

  return JSON.parse(playerData);
}

export default function Record() {

  let playerData = loadPlayerData();
  
  return (
    <div>
      <h1>Record</h1>
      <p>Score: {playerData.score}</p>
      <p>Distribution: {playerData.distribution.join(", ")}</p>
    </div>
  );
}