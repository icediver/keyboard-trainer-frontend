import { useEffect, useRef, useState } from "react";
import { useTypedSelector } from "@/hooks/useTypedSelector";

export interface ITimer {
  timer: number;
}

const useTimer = (initialState: number = 0): ITimer => {
  const [timer, setTimer] = useState<number>(initialState);
  const countRef = useRef<NodeJS.Timeout>();

  const { isTimerStarted } = useTypedSelector((state) => state.timer);

  useEffect(() => {
    if (isTimerStarted) {
      countRef.current = setInterval(() => {
        setTimer((timer) => timer + 1);
      }, 1000);
    }

    if (!isTimerStarted) {
      clearInterval(countRef.current);
    }
    return () => {
      clearInterval(countRef.current);
    };
  }, [isTimerStarted]);

  return {
    timer,
  };
};

export default useTimer;
