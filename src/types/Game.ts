
export interface GameModeProperties {
    name: string;
    wins: number;
    losses: number;
    distribution: number[];
    streak: number;
    maxStreak: number;
}

export interface PlayerDataProperties {
    username?: string;
    dailyGame: GameModeProperties;
    waveGame: GameModeProperties;
}