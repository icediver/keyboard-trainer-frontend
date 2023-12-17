import { useAuth } from "@/hooks/useAuth";
import { useExercise } from "@/hooks/useExercises";
import { FC, useEffect, useState } from "react";
import Dashboard from "./dashboard/Dashboard";
import { IIndicators } from "./dashboard/indicators.interface";
import TextBlock from "./text-block/TextBlock";
import styles from "./TextForm.module.scss";
import TypingTextarea from "./typing-textarea/TypingTextarea";
import { useCheckChar } from "./useCheckChar";
import { textPrepare } from "@/helpers/textPrepare";
import { useTypedSelector } from "@/hooks/useTypedSelector";

const welcomeString =
  "Welcome to the keyTrainer\nplease log in, for more features";

interface ITextForm {
  modalOpen: boolean;
  idExercise: number;
}

const TextForm: FC<ITextForm> = ({ modalOpen, idExercise }) => {
  const [currentExercise, setCurrentExercise] = useState(welcomeString);
  const { pressedKey } = useTypedSelector((state) => state.pressedKey);
  const { user } = useAuth();
  const { data } = useExercise(idExercise);

  useEffect(() => {
    if (user && data?.exercise) {
      setCurrentExercise(data?.exercise);
    } else {
      setCurrentExercise(welcomeString);
    }
  }, [data?.exercise, user]);

  const { typingArray } = textPrepare(currentExercise);

  const {
    compareLetter,
    mistakes,
    countSymbols,
    totalSymbols,
    totalRows,
    typingRow,
    index,
    textState,
  } = useCheckChar(currentExercise);

  useEffect(() => {
    if (!modalOpen && pressedKey) compareLetter(pressedKey);
  }, [pressedKey]);

  const indicators: IIndicators = {
    countSymbols,
    mistakes: mistakes,
    totalSymbols,
    totalRows,
    currentRow: typingRow,
  };

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <div>
          <span className={"text-amber-700  text-opacity-60"}>
            {typingArray[typingRow].slice(0, index)}
          </span>
          <span className={"text-2xl text-indigo-900"}>
            [
            <span className={"text-red-700  tracking-tighter"}>
              {typingArray[typingRow][index]}
            </span>
            ]
          </span>
          <span>{typingArray[typingRow].slice(index + 1)}</span>
        </div>
        <div className={"text-amber-700"}>
          {data?.level?.category?.title} Lv: {data?.level.levelNumber} Ex:{" "}
          {data?.id}
        </div>
      </div>
      <TextBlock
        index={index}
        typingArray={typingArray}
        typingRow={typingRow}
      />
      <TypingTextarea typingRow={typingRow} value={textState} />
      <div className={styles.footer}>
        <Dashboard {...indicators} />
      </div>
    </div>
  );
};

export default TextForm;
