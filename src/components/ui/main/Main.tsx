import { FC } from "react";
import TextForm from "../text-form/TextForm";
import styles from "./Main.module.scss";

const Main: FC<{ modalOpen: boolean }> = ({ modalOpen }) => {
  return (
    <div className={styles.main}>
      <TextForm modalOpen={modalOpen} idExercise={1} />
    </div>
  );
};

export default Main;
