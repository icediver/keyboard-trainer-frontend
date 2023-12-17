import { memo, useEffect, useState } from "react";

import styles from "../Dashboard.module.scss";
import { GiProgression } from "react-icons/gi";
import { MdReportGmailerrorred } from "react-icons/md";
import { TfiDashboard } from "react-icons/tfi";
import { useTypedSelector } from "@/hooks/useTypedSelector";
import useTimer from "../timer/useTimer";
import { IIndicators } from "../indicators.interface";

export const Score = memo(function Score({
  currentRow,
  totalRows,
  countSymbols,
  totalSymbols,
  mistakes,
}: IIndicators) {
  const { timer } = useTimer();
  const [charPerMinute, setCharPerMinute] = useState<number>(100);
  const { isTimerStarted } = useTypedSelector((state) => state.timer);

  useEffect(() => {
    if (isTimerStarted) {
      setCharPerMinute(Math.round((countSymbols * 60) / timer));
    }
  }, [currentRow, countSymbols, timer, isTimerStarted]);

  return (
    <>
      <TfiDashboard className={styles.icon} size={"30"} />
      <div className={styles.label}>
        {`${
          timer < 10
            ? "100"
            : charPerMinute < 100
              ? "0" + charPerMinute
              : charPerMinute
        }
				(${currentRow < totalRows - 1 ? currentRow + 1 : totalRows - 1}
				/${totalRows - 1})`}
      </div>
      <MdReportGmailerrorred className={styles.icon} size={"30"} />
      <div className={styles.label}>
        {mistakes}/5
        {/*{context.errorCount ? context.errorCount : 0}/5*/}
      </div>
      <GiProgression className={styles.icon} size={"22"} />
      <div className={styles.label}>
        {Math.round((countSymbols / totalSymbols) * 100)}%
      </div>
    </>
  );
});
