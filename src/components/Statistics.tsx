import { PlayerDataProperties, GameModeProperties } from "../types/Game";
import { toPercentage } from "../utility/toPercentage";

interface StatisticsProps {
    winRate: String;
    totalGames: number;
    streak: number;
    maxStreak: number;
}

export const Statistics = ({
    winRate,
    totalGames,
    streak,
    maxStreak
}: StatisticsProps) => {

    return (
        <div style={{ display: "flex", justifyContent: "space-evenly", maxWidth: 720, fontFamily: "system-ui, sans-serif" }}>
            <div className="flexcolumn centered">
                <div className="title-text">{totalGames}</div>
                <div className="sub-text">Played </div>
            </div>
            <div className="flexcolumn centered">
                <div className="title-text">{winRate}</div>
                <div className="sub-text">Win %</div>
            </div>
            <div className="flexcolumn centered">
                <div className="title-text">{streak}</div>
                <div className="sub-text">Streak</div>
            </div>
            <div className="flexcolumn centered">
                <div className="title-text">{maxStreak}</div>
                <div className="sub-text">Max Streak</div>
            </div>
        </div>
    );
}



export const Distribution = ({ distribution }: { distribution: number[] }) => {

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
  

export const Bar = ({ 
    count, 
    maxCount, 
    total
}:{
    count: number; 
    maxCount: number; 
    total: number; 
}) => {
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

export const GameModeStatistics = ( game: GameModeProperties ) => {
    const totalGames = game.wins + game.losses;
    return(
        <div style = {{ maxWidth: 720, padding: 16, fontFamily: "system-ui, sans-serif" }} >
            <h1 style={{ marginTop: 0 }}>{game.name}</h1>
            <p>STATISTICS:</p>
            <Statistics winRate={toPercentage(game.wins, totalGames)} totalGames={totalGames} streak={game.streak} maxStreak={game.maxStreak} />
            <p>GUESS DISTRIBUTION:</p>
            <Distribution distribution={game.distribution} />
        </div >
    );
}