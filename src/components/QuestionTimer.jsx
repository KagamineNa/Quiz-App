import { TIME_PROGRESS } from "../config.js";
import { useState, useEffect } from "react";
export default function QuestionTimer({ timeOut, onTimeout, mode }) {
  const [remainingTime, setRemainingTime] = useState(timeOut);
  useEffect(() => {
    const timer = setTimeout(onTimeout, timeOut);
    return () => {
      clearTimeout(timer);
    };
  }, [timeOut, onTimeout]);

  useEffect(() => {
    const interval = setInterval(() => {
      setRemainingTime(
        (prevRemainingTime) => prevRemainingTime - TIME_PROGRESS
      );
    }, TIME_PROGRESS);
    return () => {
      clearInterval(interval);
    };
  }, []);
  return <progress max={timeOut} value={remainingTime} className={mode} />;
}
