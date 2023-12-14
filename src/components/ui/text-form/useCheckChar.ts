import { useState } from "react";
import useSound from "use-sound";
import { typingText } from "../../../backend-temp-data/typing-text";
import {
  IPressedKey,
  useGlobalContext,
} from "../../../contexts/current-key-context";
import { useTextPrepare } from "./useTextPrepare";

let count = 0;

export const useCheckChar = () => {
  const [textState, setTextState] = useState<string>("");
  const [play] = useSound("/error.mp3");
  const { typingArray } = useTextPrepare(typingText);
  const totalSymbols = typingArray.join(" ").length - (typingArray.length - 1);

  const {
    context: { isTimerStarted },
    setContext,
  } = useGlobalContext();

  const [typingRow, setTypingRow] = useState<number>(0);
  const [index, setIndex] = useState<number>(0);
  const [typingString, setTypingString] = useState<string>(
    typingArray[typingRow],
  );

  const [errorCount, setErrorCount] = useState<number>(0);

  const compareLetter = (pressedKey: IPressedKey): void => {
    if (
      index >= typingString.length &&
      (pressedKey.code === "Enter" || pressedKey.code === "Space")
    ) {
      if (typingRow < typingArray.length - 1) {
        let rowIndex = typingRow + 1;
        setTypingRow(rowIndex);
        setTypingString(typingArray[rowIndex]);
        setTextState(textState + "\n");
        setIndex(0);

        if (rowIndex >= typingArray.length - 1) {
          setContext((prevCtx) => ({
            ...prevCtx,
            isTimerStarted: false,
          }));
        }
      }
    }

    if (
      pressedKey &&
      typingString[index] === pressedKey.key &&
      typingString[index] !== undefined
    ) {
      if (!isTimerStarted) {
        setContext((prevCtx) => {
          return {
            ...prevCtx,
            isTimerStarted: true,
          };
        });
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
