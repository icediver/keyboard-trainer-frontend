import { FC } from "react";
import Timer from "./timer/Timer";
import styles from "./Dashboard.module.scss";
import { IIndicators } from "./indicators.interface";
import { Score } from "./score/Score";

const Dashboard: FC<IIndicators> = ({
  totalRows,
  totalSymbols,
  mistakes,
  countSymbols,
  currentRow,
}) => {
  return (
    <div className={styles.dashboard}>
      <Timer
        currentRow={currentRow}
        totalRows={totalRows}
        countSymbols={countSymbols}
        totalSymbols={totalSymbols}
      />
      <Score
        currentRow={currentRow}
        totalRows={totalRows}
        countSymbols={countSymbols}
        totalSymbols={totalSymbols}
        mistakes={mistakes}
      />
    </div>
  );
};

export default Dashboard;
