import { useEffect, useState } from "react";
import dictJSON from "../assets/dictionary.json";

/** Utility: base tile classes */
const baseTile = 
  "flex items-center justify-center " +
  "text-[14px] m-1 uppercase font-bold select-none " + 
  "border-1 border-[#3a3a3c] " +
  "w-[36px] h-[36px] " +    /* default <320px */
  "xxs: w-[46px] xxs: h-[40px] " +   /* tiny phones (≥320px) */
  "xs: w-[56px] xs: h-[56px] " +    /* small phones (≥375px) */
  "sm:w-[72px] sm:h-[72px] " + /* regular phones */
  "md:w-[82px] md:h-[82px] " + /* tablets */
  "lg:w-[86px] lg:h-[86px] " + /* desktops */
  "sm:text-3xl lg:text-4xl";

/** Letter state renderer (gray / gold / green) */
export const letterState = (letter: string, index: number, answer: string) => {
  if (answer[index] === letter) {
    return (
      <div key={index} className={`${baseTile} bg-[#508c50]`}>
        {letter}
      </div>
    );
  } else if (answer.includes(letter)) {
    return (
      <div key={index} className={`${baseTile} bg-[#b99d42]`}>
        {letter}
      </div>
    );
  }
  return (
    <div key={index} className={`${baseTile} bg-[#121212]`}>
      {letter}
    </div>
  );
};

type WordProps = {
  word: string;
  setWord: React.Dispatch<React.SetStateAction<string>>;
  secretWord: string;
  save: boolean;
  saveWord: React.Dispatch<React.SetStateAction<boolean>>;
  attempts: number;
  setAttempts: React.Dispatch<React.SetStateAction<number>>;
  guessedLetters: Array<string>;
  setGuessedLetters: React.Dispatch<React.SetStateAction<Array<string>>>;
  almostLetters: Array<string>;
  setAlmostLetters: React.Dispatch<React.SetStateAction<Array<string>>>;
  correctLetters: Array<string>;
  setCorrectLetters: React.Dispatch<React.SetStateAction<Array<string>>>;
};

export const Word = ({
  word,
  setWord,
  secretWord,
  save,
  saveWord,
  attempts,
  setAttempts,
  guessedLetters,
  setGuessedLetters,
  almostLetters,
  setAlmostLetters,
  correctLetters,
  setCorrectLetters,
}: WordProps) => {
  const [submittedWords, setSubmittedWords] = useState<string[]>([]);
  const [wordSet, setWordSet] = useState<Set<string>>(new Set());
  const [shake, setShake] = useState(false);

  useEffect(() => {
    if (!save) return;

    if (wordSet.has(word.toLowerCase()) && word.trim().length === 5 && attempts < 5) {
      let guessed = [...guessedLetters];
      let almost = [...almostLetters];
      let correct = [...correctLetters];

      [...word].forEach((char, index) => {
        if (!guessed.includes(char)) guessed = [...guessed, char];
        if (secretWord[index] === char) correct = [...correct, char];
        if (secretWord.includes(char) && !almost.includes(char)) almost = [...almost, char];
      });

      if (guessed.length > guessedLetters.length) setGuessedLetters([...guessed]);
      if (correct.length > correctLetters.length) setCorrectLetters([...correct]);
      if (almost.length > almostLetters.length) setAlmostLetters([...almost]);

      setAttempts(attempts + 1);
      setSubmittedWords([...submittedWords, word.trim()]);
      setWord("     ");
    } else {
      setShake(true);
      setTimeout(() => setShake(false), 500);
    }

    saveWord(false);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [save]);

  useEffect(() => {
    const words = (dictJSON as string[]).filter((w: string) => w.length === 5);
    setWordSet(new Set(words));
  }, []);

  return (
    <>
      {/* WordContainer -> flex col, center */}
      <div className="flex flex-col items-center">
        {/* Empty 6 rows grid preview */}
        {[0, 1, 2, 3, 4, 5].map((rowIndex) => (
          <div
            key={rowIndex}
            className={
              "flex justify-center w-full gap-[5px] py-[2px]"
            }
          >
            {[0, 1, 2, 3, 4].map((index) => letterState(" ", index, secretWord))}
          </div>
        ))}

        {/* WordBox -> absolute overlay stack of played & current rows */}
        <div className="flex flex-col absolute">
          {/* Submitted rows */}
          {submittedWords.map((submittedWord, rowIndex) => (
            <div
              key={rowIndex}
              className="flex justify-center w-full gap-[5px] py-[2px]"
            >
              {[...submittedWord].map((letter, index) => letterState(letter, index, secretWord))}
            </div>
          ))}

          {/* Current typing row */}
          <div
            id="currentWord"
            className={
              "flex justify-center w-full gap-[5px] py-[2px] " +
              (shake ? "animate-[shake_0.5s_ease-in-out]" : "")
            }
          >
            {[...word].map((letter, index) => (
              <div key={index} className={`${baseTile} bg-[#121212]`}>
                {letter}
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};
