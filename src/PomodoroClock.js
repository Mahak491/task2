import React, { useState, useEffect } from "react";
import './PomodoroClock.css'

const PomodoroClock = () => {
  const [time, setTime] = useState(1500); // 25 minutes in seconds
  const [cycles, setCycles] = useState(0);
  const [limit, setLimit] = useState(2); // Default limit of 2 cycles
  const [isBreak, setIsBreak] = useState(false);
  const [isRunning, setIsRunning] = useState(false);

  useEffect(() => {
    let timer;
    if (isRunning) {
      timer = setInterval(() => {
        setTime((prevTime) => prevTime - 1);
      }, 1000);
    }

    return () => {
      clearInterval(timer);
    };
  }, [isRunning]);

  useEffect(() => {
    if (time === 0) {
      if (isBreak) {
        setCycles((prevCycles) => prevCycles + 1);
      }
      setIsBreak((prevIsBreak) => !prevIsBreak);
      setTime(isBreak ? 1500 : 300); // Switch between work (25 mins) and break (5 mins)
    }

    if (cycles === limit) {
      setIsRunning(false);
    }
  }, [time]);

  const startTimer = () => {
    setIsRunning(true);
  };

  const stopTimer = () => {
    setIsRunning(false);
    setCycles(0);
    setTime(1500);
    setIsBreak(false);
  };

  const formatTime = (timeInSeconds) => {
    const minutes = Math.floor(timeInSeconds / 60);
    const seconds = timeInSeconds % 60;
    return `${minutes.toString().padStart(2, "0")}:${seconds
      .toString()
      .padStart(2, "0")}`;
  };

  return (
    <div className="container">
      <h1>Pomodoro Clock</h1>
      <div>
        <h2>{isBreak ? "Break" : "Work"}</h2>
        <h3>{formatTime(time)}</h3>
      </div>
      <div className="button-container">
        <button onClick={startTimer} disabled={isRunning}>
          Start
        </button>
        <button onClick={stopTimer} disabled={!isRunning}>
          Stop
        </button>
      </div>
      <div>
        <p>Cycles: {cycles}</p>
        <p>Limit: {limit}</p>
      </div>
    </div>
  );
};

export default PomodoroClock;
