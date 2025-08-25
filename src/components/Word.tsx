import { useEffect, useState } from "react";
import { FlipLetter } from "./Letter";
import dictJSON from "../assets/dictionary.json";

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

    if (wordSet.has(word.toLowerCase()) && word.trim().length === 5) {

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
  }, [save]);

  useEffect(() => {
    const words = (dictJSON as string[]).filter((w: string) => w.length === 5);
    setWordSet(new Set(words));
  }, []);

  return (
    <>
      <div className="flex flex-col items-center">

        {/* Number of Attempts place holders */}
        {[0, 1, 2, 3, 4, 5].map((rowIndex) => (
          <div
            key= {"wordPlaceHolder" + rowIndex}
            className={
              "flex justify-center w-full gap-[5px] py-[2px]"
            }
          >
            {[0, 1, 2, 3, 4].map((index) => 
              <FlipLetter
                key={`${rowIndex}-${index}`}
                letter={" "}
                index={index}
                answer={secretWord}
                delayMs={index * 120} // nice stagger
              />
            )}
          </div>
        ))}

        {/* WordBox -> absolute overlay stack of played & current rows */}
        <div className="flex flex-col absolute">
          {/* Submitted rows */}
          {submittedWords.map((submittedWord, rowIndex) => (
            <div key={rowIndex} className="flex justify-center w-full gap-[5px] py-[2px]">
              {[...submittedWord].map((ch, i) => (
                <div className="bg-black ">
                  <FlipLetter
                    key={`${rowIndex}-${i}`}
                    letter={ch}
                    index={i}
                    answer={secretWord}
                    delayMs={i * 120} // nice stagger
                  />
                </div>
              ))}
            </div>
          ))}

          {/* Current typing row */}
          {attempts <= 5 && (
            <div
              id="currentWord"
              className={
                "flex justify-center w-full gap-[5px] py-[2px] " +
                (shake ? "animate-[shake_0.5s_ease-in-out]" : "")
              }
            >
              {[...word].map((letter, index) => (
                <FlipLetter
                  key={`${index}`}
                  letter={letter}
                  index={index}
                  answer={""}
                  delayMs={index * 120} // nice stagger
                />
              ))}
            </div>
          )}

        </div>
      </div>
    </>
  );
};
