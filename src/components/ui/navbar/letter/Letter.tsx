import { FC, useEffect, useState } from "react";
import styles from "./Letter.module.scss";
import { useTypedSelector } from "@/hooks/useTypedSelector";

const Letter: FC = () => {
  const { pressedKey } = useTypedSelector((state) => state.pressedKey);

  const [key, setKey] = useState("");

  useEffect(() => {
    if (pressedKey?.key) setKey(pressedKey.key);
  }, [pressedKey]);

  return <div className={styles.letter}>{key}</div>;
};

export default Letter;
