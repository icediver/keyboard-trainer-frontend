import cn from "clsx";
import { FC } from "react";
import { IoTimerOutline } from "react-icons/io5";
import { TbPlayerPause, TbPlayerPlay } from "react-icons/tb";
import styles from "./Timer.module.scss";
import useTimer from "./useTimer";
import { useTypedSelector } from "@/hooks/useTypedSelector";
import { useActions } from "@/hooks/useActions";
import { formatTime } from "@/utils/format-time/formatTime";

const Timer: FC<{
  currentRow: number;
  totalRows: number;
  countSymbols: number;
  totalSymbols: number;
}> = ({ countSymbols, totalSymbols }) => {
  const { timer } = useTimer();
  const { isTimerStarted } = useTypedSelector((state) => state.timer);
  const { stopTimer } = useActions();
  return (
    <div className={styles.timer}>
      {!isTimerStarted ? (
        <TbPlayerPlay size={24} className={styles.icon} />
      ) : (
        <TbPlayerPause
          onClick={() => {
            stopTimer();
          }}
          className={cn(styles.icon, "cursor-pointer")}
          size={"30"}
        />
      )}
      <div className={styles.label}>{`${countSymbols}(${totalSymbols})`}</div>
      <IoTimerOutline className={styles.icon} size={"30"} />
      <div className={styles.label}>{formatTime(timer)}</div>
    </div>
  );
};

export default Timer;
