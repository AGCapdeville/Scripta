import React from "react";
import { Statistics, Distribution, GameModeStatistics } from "../components/Statistics";
import { loadPlayerData } from "../utility/UserData";
import { toPercentage } from "../utility/toPercentage";

export const Record = () => {
  const player = loadPlayerData();
  const dailyGame = player.dailyGame;
  const waveGame = player.waveGame;

  return (
    <>
      <h1>Player Record</h1>
      {GameModeStatistics(dailyGame)}
      {GameModeStatistics(waveGame)}
    </>
  );
}
