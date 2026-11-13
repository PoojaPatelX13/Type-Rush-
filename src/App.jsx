
import { useState, useEffect } from 'react';
import './App.css';

import Timer from './components/Timer';
import Stats from './components/Stats';
import TypingArea from './components/TypingArea';
import Results from './components/Results';

const paragraphs = [
  "The quick brown fox jumps over the lazy dog. Practice makes a person perfect. Keep learning and improve your typing speed every day.",
  "Technology is changing the world every day. Learning new skills helps us grow and achieve our goals.",
  "Success does not come overnight. It requires patience, dedication, hard work and consistent practice.",
  "Programming is the art of solving problems through logic and creativity. Every line of code brings a new idea to life.",
  "Believe in yourself and keep moving forward. Small steps every day can lead to great achievements.",
  "Reading books improves knowledge, vocabulary and imagination. A good book can inspire us in many ways.",
  "Time is precious, so use it wisely. Focus on your goals and make every moment count."
];

function getRandomParagraph(previousParagraph) {
  const availableParagraphs = paragraphs.filter(
    (item) => item !== previousParagraph
  );

  return availableParagraphs[
    Math.floor(Math.random() * availableParagraphs.length)
  ];
}

function App() {
  const [input, setInput] = useState('');
  const [paragraph, setParagraph] = useState(() => getRandomParagraph(''));
  const [time, setTime] = useState(60);
  const [started, setStarted] = useState(false);
  const [finished, setFinished] = useState(false);
  const [elapsedTime, setElapsedTime] = useState(0);

  useEffect(() => {
    if (!started || finished) return;

    const timer = setInterval(() => {
      setTime((prev) => {
        if (prev <= 1) {
          setFinished(true);
          return 0;
        }
        return prev - 1;
      });

      setElapsedTime((prev) => Math.min(prev + 1, 60));
    }, 1000);

    return () => clearInterval(timer);
  }, [started, finished]);

  const handleTyping = (e) => {
    const value = e.target.value;

    if (!started) {
      setStarted(true);
    }

    if (value.length <= paragraph.length) {
      setInput(value);

      if (value === paragraph) {
        setFinished(true);
      }
    }
  };

  const correctChars = input.split('').filter(
    (char, index) => char === paragraph[index]
  ).length;

  const accuracy = input.length
    ? Math.round((correctChars / input.length) * 100)
    : 100;

  const wpm = elapsedTime > 0
    ? Math.round((correctChars / 5) / (elapsedTime / 60))
    : 0;

  const restart = () => {
    setInput('');
    setTime(60);
    setStarted(false);
    setFinished(false);
    setElapsedTime(0);
    setParagraph((previous) => getRandomParagraph(previous));
  };

  return (
    <div className="app">
      <header>
        <h1>⚡ TYPE RUSH</h1>
        <p>Challenge yourself. Improve your typing speed.</p>
      </header>

      <div className="container">
        <div className="stats">
          <Timer time={time} />
          <Stats wpm={wpm} accuracy={accuracy} />
        </div>

        <div className="paragraph">
          {paragraph.split('').map((char, index) => {
            let className = '';

            if (index < input.length) {
              className =
                input[index] === char ? 'correct' : 'incorrect';
            }

            return (
              <span key={index} className={className}>
                {char}
              </span>
            );
          })}
        </div>

        <TypingArea
          input={input}
          handleTyping={handleTyping}
          disabled={finished}
        />

        {finished && (
          <Results
            wpm={wpm}
            accuracy={accuracy}
            characters={input.length}
          />
        )}

        <button onClick={restart}>
          Restart Test ↻
        </button>
      </div>
    </div>
  );
}

export default App;
