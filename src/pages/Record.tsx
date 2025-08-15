import React from "react";

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

  return JSON.parse(playerData as string) as {
    score: string;
    distribution: number[];
  };
}

function Statistics({
  winRate,
  totalGames
}: {
  winRate: number;
  totalGames: number;
}) {

  return (
    <div style={{ display: "flex", justifyContent: "space-evenly", maxWidth: 720, fontFamily: "system-ui, sans-serif" }}>
    {/* <div style={{ display: "flex", gap: "16px", marginBottom: "16px" }}> */}
      <div className="flexcolumn centered">
        <div className="title-text">{totalGames}</div>
        <div className="sub-text">Played </div>
      </div>
      <div className="flexcolumn centered">
        <div className="title-text">{winRate}</div>
        <div className="sub-text">Win %</div>
      </div>
    </div>
  );
}

function Bar({count, maxCount, total }: { count: number; maxCount: number; total: number; }) {
  const widthPercent = maxCount === 0 ? 0 : (count / maxCount) * 100;
  const percentOfTotal = total === 0 ? 0 : (count / total) * 100;

  if (count === 0) return (<div></div>);

  return (
    <div
      className="bar"
      style={{ width: `${widthPercent}%` }}
    >
      {count} ({Math.round(percentOfTotal)}%)
    </div>
  );
}

function DistributionView({ distribution }: { distribution: number[] }) {

  const total = distribution.reduce((sum, v) => sum + v, 0);
  const maxCount = distribution.length ? Math.max(...distribution) : 0;

  return (
    <div className="distribution" style={{ display: "grid", gap: "8px" }}>

      {distribution.map((count, index) => (
        <div key={index} className="distribution-row">
          <div className="distribution-number">
            {index + 1}:
          </div>
          <Bar count={count} maxCount={maxCount} total={total} />
        </div>

      ))}
    </div>
  );
}

export default function Record() {
  const playerData = loadPlayerData();

  const wins = playerData.score.split("/")[0];
  const losses = playerData.score.split("/")[1];

  const winRate = playerData.score === "0/0" ? 0 : (parseInt(wins) / (parseInt(wins) + parseInt(losses))) * 100;
  const totalGames = parseInt(wins) + parseInt(losses);

  return (
    <div style={{ maxWidth: 720, padding: 16, fontFamily: "system-ui, sans-serif" }}>
      <h1 style={{ marginTop: 0 }}>Daily Word</h1>
      <p>STATISTICS:</p>
      <Statistics winRate={winRate} totalGames={totalGames}/>
      <p>GUESS DISTRIBUTION:</p>
      <DistributionView distribution={playerData.distribution} />
    </div>
  );
}
