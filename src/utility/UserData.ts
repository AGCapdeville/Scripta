import { GameModeProperties, PlayerDataProperties } from "../types/Game";

export const loadPlayerData = (): PlayerDataProperties => {
    let player: PlayerDataProperties = localStorage.getItem("playerData") ? JSON.parse(localStorage.getItem("playerData")!) :  null;

    if (!player) {
        console.log("No player data found, creating new player data.");
        
        const daily: GameModeProperties = {
            name: "Daily Game",
            wins: 0,
            losses: 0,
            distribution: Array(6).fill(0),
            streak: 0,
            maxStreak: 0,
        }

        const wave: GameModeProperties = {
            name: "Wave Game",
            wins: 0,
            losses: 0,
            distribution: Array(6).fill(0),
            streak: 0,
            maxStreak: 0,
        }

        const newPlayer: PlayerDataProperties = {
            username: "",
            dailyGame: daily,
            waveGame: wave,
        };

        localStorage.setItem("playerData", JSON.stringify(newPlayer));
        player = newPlayer
    } else {
        console.log("Player data found, updating...");
    }

    return player;
}

export const saveGameScore = (gameType: string, outcome: boolean, guesses: number) => {
    const player = loadPlayerData();
    const game = gameType === "Daily Game" ? player.dailyGame : player.waveGame;
    const totalGames = game.wins + game.losses;
    
    if (outcome) {
        game.wins += 1;
        game.streak += 1;
        game.maxStreak = Math.max(game.maxStreak, game.streak);
        game.distribution[guesses - 1] += 1;
    } else {
        game.losses += 1;
        game.streak = 0;
    }

    localStorage.setItem("playerData", JSON.stringify(player));
}