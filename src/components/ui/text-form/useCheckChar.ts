import { useState } from "react";
import useSound from "use-sound";
import { IPressedKey } from "../../../contexts/current-key-context";
import { textPrepare } from "@/helpers/textPrepare";
import { useTypedSelector } from "@/hooks/useTypedSelector";
import { useActions } from "@/hooks/useActions";

let count = 0;

export const useCheckChar = (typingText: string) => {
  const { startTimer, stopTimer } = useActions();
  const [textState, setTextState] = useState<string>("");
  const [play] = useSound("/error.mp3");
  const { typingArray } = textPrepare(typingText);

  const totalSymbols = typingArray.join(" ").length - (typingArray.length - 1);

  const { isTimerStarted } = useTypedSelector((state) => state.timer);

  const [typingRow, setTypingRow] = useState<number>(0);
  const [index, setIndex] = useState<number>(0);

  const [errorCount, setErrorCount] = useState<number>(0);

  const compareLetter = (pressedKey: IPressedKey): void => {
    let typingString = typingArray[typingRow];

    if (
      index >= typingString.length &&
      (pressedKey.code === "Enter" || pressedKey.code === "Space")
    ) {
      if (typingRow < typingArray.length - 1) {
        setTypingRow(typingRow + 1);
        setTextState(textState + "\n");
        setIndex(0);
      } else {
        stopTimer();
      }
    }

    if (
      pressedKey &&
      typingString[index] === pressedKey.key &&
      typingString[index] !== undefined
    ) {
      if (!isTimerStarted) {
        startTimer();
      }
      setTextState(textState + pressedKey.key);
      count = count + 1;

      if (typingString.length > index) setIndex(index + 1);
    }
    if (
      !!pressedKey &&
      typingString[index] !== undefined &&
      pressedKey.key !== undefined &&
      pressedKey.key !== "Shift" &&
      typingString[index] !== pressedKey.key
    ) {
      play();
      setErrorCount((c) => c + 1);
      const text = index === 0 ? textState : textState.slice(0, -index);
      setTextState(text);
      count = count - index;
      setIndex(0);
    }
  };

  return {
    countSymbols: count,
    mistakes: errorCount,
    totalSymbols: totalSymbols,
    totalRows: typingArray.length,
    typingRow,
    index,
    textState,
    compareLetter,
  };
};
