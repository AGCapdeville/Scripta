import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import seedrandom from 'seedrandom';

import { Word } from '../components/Word';
import { Keys } from '../components/Keys';

import wordJSON from "../assets/wordList.json";

const getDailySeed = (ns = 'my-game'): string => {
  const todayUTC = new Date().toISOString().slice(0, 10); // "YYYY-MM-DD"
  return `${ns}:${todayUTC}`;
}

const getDailyRNG = (ns?: string) => {
  return seedrandom(getDailySeed(ns));
}

const getDailyWord = (wordList: string[]): string => {

  let key = getDailySeed();
  let word = localStorage.getItem(key);

  if (!word) {
    const rng = getDailyRNG();
    word = wordList[Math.floor(rng() * wordList.length) + 1]
    localStorage.setItem(getDailySeed(), word);
  }

  return word; 
}

export const DailyGame = () => {

  const navigate = useNavigate();

  const [word, setWord] = useState("     ");
  const [save, saveWord] = useState(false);
  const [secretWord, setSecretWord] = useState("");
  const [loading, setLoading] = useState(false);
  const [attempts, setAttempts] = useState(0);

  // Why do the other states not freak out here? ^^^
  const [guessedLetters, setGuessedLetters] = useState<string[]>([]);
  const [almostLetters, setAlmostLetters] = useState<string[]>([]);
  const [correctLetters, setCorrectLetters] = useState<string[]>([]);

  const fetchSecretWord = async () => {

    const fiveLetterWords = wordJSON.filter((w: string) => w.length === 5);
    const word = getDailyWord(fiveLetterWords);
    
    try {
      setSecretWord(word);
    } catch (error) {
      console.error('Error fetching word:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    
    if (word === secretWord || attempts > 5) {
      
      console.log("word:" + word + " secWord:" + secretWord + " a:" + attempts);
      console.log("outcome: " + (word === secretWord));

      // navigate('/scripta/results', {
      //   state: {
      //     gameType: "Daily Game",
      //     outcome: word === secretWord,
      //     guesses: attempts
      //   }
      // });
      // Results({
      //   gameType: "Daily Game",
      //   outcome: word === secretWord,
      //   guesses: attempts
      // });
    }

  }, [save])

  // Do once and forget...
  useEffect(() => {
    fetchSecretWord();
  }, []);

  return (
    <div className='screen'>
      
      <div className='title'>
        <h3>Scripta</h3>
      </div>
      
      {loading ? "loading..." :
        <div className='wordBoard'>
          <Word word={word} 
            setWord={setWord} 
            secretWord={secretWord} 
            save={save} 
            saveWord={saveWord}
            attempts={attempts}
            setAttempts={setAttempts} 
            guessedLetters={guessedLetters}
            setGuessedLetters={setGuessedLetters}
            almostLetters={almostLetters}
            setAlmostLetters={setAlmostLetters}
            correctLetters={correctLetters}
            setCorrectLetters={setCorrectLetters}
            />
        </div>
      }

      <div className='wordKeyboard'>
        <Keys 
          word={word} 
          setWord={setWord} 
          saveWord={saveWord}
          guessedLetters={guessedLetters}
          almostLetters={almostLetters}
          correctLetters={correctLetters}
        />
      </div>

    </div>
  )
}
