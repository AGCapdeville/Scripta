import { useState } from "react";

interface Props {
    frontC : String;
    backC : String;
}



export const LetterBox = ({frontC, backC}: Props) => {
    const [face, setFace] = useState(true);
    const [frontColor, setFrontColor] = useState(frontC);
    const [backColor, setBackColor] = useState(backC);

    const flipCellToColor = (newColor: String, duration: number) => {
        setTimeout(() => {
            setBackColor(newColor);
            setFace(!face);
        }, duration);
    }

    const flipCell = (duration: number) => {
        setTimeout(() => {
            setFace(!face);
        }, duration);
    }

    return (
        <div className="flex flex-col items-center gap-3">
            {/* Scene: gives 3D depth */}
            <div className="w-40 h-40 [perspective:900px]">
                {/* Card: rotates; children remain 3D */}
                <div
                    className={`
                        relative w-full h-full rounded-lg
                        transition-transform duration-700 ease-in-out
                        [transform-style:preserve-3d]
                        ${flipped ? "[transform:rotateX(180deg)]" : ""}
                    `}
                >
                    {/* FRONT face (shown 0°..90°) */}
                    <div
                        className="
                        absolute inset-0 grid place-items-center rounded-lg
                        text-white font-semibold
                        bg-gray-800 border-2 border-[#3a3a3c]
                        [backface-visibility:hidden]
                        "
                    >
                        FRONT
                    </div>

                    {/* BACK face (shown 90°..180°) */}
                    <div
                        className="
                        absolute inset-0 grid place-items-center rounded-lg
                        text-white font-semibold
                        bg-red-700 border-2 border-red-700
                        [transform:rotateX(180deg)]
                        [backface-visibility:hidden]
                        "
                    >
                        BACK
                    </div>
                </div>
            </div>
        </div>
    );
}
