import React, { useState, useEffect, useRef } from "react";
import "../src/App.css"

const STATUS = {
  STARTED: "Started",
  STOPPED: "Stopped"
};

const INITIAL_COUNT = 5;

export default function App() {
  const [secondsRemaining, setSecondsRemaining] = useState(INITIAL_COUNT);
  const [status, setStatus] = useState(STATUS.STOPPED);

  const secondsToDisplay = secondsRemaining % 60;
  const minutesRemaining = (secondsRemaining - secondsToDisplay) / 60;
  const minutesToDisplay = minutesRemaining % 60;
  const hoursToDisplay = (minutesRemaining - minutesToDisplay) / 60;

  const handleStart = () => {
    setStatus(STATUS.STARTED);
  };
  const handleStop = () => {
    setStatus(STATUS.STOPPED);
  };
  const handleReset = () => {
    setStatus(STATUS.STOPPED)
    setSecondsRemaining(INITIAL_COUNT)
  }
  useInterval(
    () => {
      if (secondsRemaining > 0) {
        setSecondsRemaining(secondsRemaining - 1);
      } else {
        setStatus(STATUS.STOPPED);
      }
    },
    status === STATUS.STARTED ? 1000 : null

  );
  return (
    <div className="start">
      <div className="App" onMouseEnter={handleStart} onMouseLeave={handleStop} >
     <div className="Appcontent">
     <h1>React Countdown Demo Hover to start</h1>
      <div id="hover-box" style={{ padding: 20 }}>
        {twoDigits(hoursToDisplay)}:{twoDigits(minutesToDisplay)}:
        {twoDigits(secondsToDisplay)}
      </div>
      <div>Status: {status}</div>

      <button onClick={handleReset} type="button">
        Reset
      </button>
     </div>
    </div>
    </div>
  );
}

function useInterval(callback, delay) {
  const savedCallback = useRef();

  // save the latest callback.
  useEffect(() => {
    savedCallback.current = callback;
  }, [callback]);

  // Set up the interval.
  useEffect(() => {
    function tick() {
      savedCallback.current();
    }
    if (delay !== null) {
      let id = setInterval(tick, delay);
      return () => clearInterval(id);
    }
  }, [delay]);
}
const twoDigits = (num) => String(num).padStart(2, "0");