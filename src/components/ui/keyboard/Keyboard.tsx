import cn from "clsx";
import { FC, useEffect, useRef } from "react";
import { IKeyButton } from "../../../types/key-button.interface";

import styles from "./Keyboard.module.scss";
import { dataKeys } from "./keys-data";
import { useActions } from "@/hooks/useActions";
import { IKey, IPressedKey } from "@/store/pressed-key/pressedKey.interface";
// import { IPressedKey } from "@/contexts/current-key-context";

let letterIndex = 0;
const Keyboard: FC<{ modalOpen: boolean }> = ({ modalOpen }) => {
  const listRefs = useRef<Array<HTMLDivElement | null>>([]);
  const { setPressedKey, resetPressedKey } = useActions();

  const keydownHandler = (event: KeyboardEvent): void => {
    if (!modalOpen) event.preventDefault();
    const keyButton = listRefs.current.find((ref) =>
      ref?.dataset.key?.includes(event.code),
    );

    if (keyButton) {
      const pressedKey: IKey = {
        key: event.key,
        code: event.code,
      };

      setPressedKey(pressedKey);

      setTimeout(() => {
        resetPressedKey();
      }, 50);
      keyButton.classList.add(styles.active);
      setTimeout(() => {
        keyButton.classList.remove(styles.active);
      }, 300);
    }
  };
  const keyupHandler = (event: KeyboardEvent): void => {
    if (!modalOpen) event.preventDefault();
  };
  useEffect(() => {
    addEventListener("keydown", keydownHandler);
    addEventListener("keyup", keyupHandler);
    return () => {
      removeEventListener("keydown", keydownHandler);
      removeEventListener("keyup", keyupHandler);
    };
  }, [modalOpen]);

  return (
    <div className="w-6/12">
      {dataKeys && (
        <div className={styles.container}>
          {dataKeys.map((row: IKeyButton[], indexRow: number) => (
            <div className={styles.row} key={indexRow}>
              {row.map((charKey: IKeyButton) => (
                <div
                  className={cn(styles.button, charKey.width)}
                  key={charKey.code}
                  ref={(ref) => {
                    ++letterIndex;
                    return (listRefs.current[letterIndex] = ref);
                  }}
                  data-key={charKey.code}
                >
                  {charKey.label}
                </div>
              ))}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Keyboard;
