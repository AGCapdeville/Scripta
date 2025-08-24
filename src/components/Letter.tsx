import { useEffect, useState } from "react";

const TileParent = `
    relative w-full h-full rounded-lg
    transition-transform duration-1000 ease-in-out 
    [transform-style:preserve-3d]
`;
const TileFront = `
    absolute inset-0 grid place-items-center rounded-lg
    text-white font-semibold bg-[#121212]
    border-2 border-[#787c7e]
    [backface-visibility:hidden]
`;

const TileBack = `
    absolute inset-0 grid place-items-center rounded-lg
    text-white font-semibold border-2
    [transform:rotateX(180deg)] 
    [backface-visibility:hidden]
`;

type FlipTileProps = {
    letter: string;
    index: number;
    answer: string;
    delayMs?: number; // stagger optional
};

export const FlipTile = ({ letter, index, answer, delayMs = 0 }: FlipTileProps) => {
    const [flipped, setFlipped] = useState(false);

    // choose result color
    const isCorrect = answer[index] === letter;
    const isPresent = !isCorrect && answer.includes(letter);
    const backColor = isCorrect ? "#6aaa64" : isPresent ? "#c9b458" : "#121212";
    const borderColor = isCorrect ? "#6aaa64" : isPresent ? "#c9b458" : "#787c7e";

    useEffect(() => {
        // start at 0deg, flip after delay -> triggers transition
        const t = setTimeout(() => setFlipped(true), delayMs);
        return () => clearTimeout(t);
    }, [delayMs]);

    return (
        <div className="w-[52px] h-[52px] [perspective:900px]">
            <div className={`${TileParent} ${flipped ? "[transform:rotateX(180deg)]" : ""}`}>
                <div className={TileFront}>{letter}</div>
                <div className={TileBack} style={{ backgroundColor: backColor, borderColor: borderColor }}>
                    {letter}
                </div>
            </div>
        </div>
    );
}
