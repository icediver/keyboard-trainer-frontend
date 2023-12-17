import {
  FC,
  MouseEvent,
  PropsWithChildren,
  useCallback,
  useEffect,
  useRef,
} from "react";
import { MdClose } from "react-icons/md";
import { animated, useSpring } from "react-spring";
import styles from "./ModalWindow.module.scss";
import { useActions } from "@/hooks/useActions";

const ModalWindow: FC<
  PropsWithChildren<{
    isOpenOptions: boolean;
    setIsOpenOptions: (show: boolean) => void;
  }>
> = ({ isOpenOptions = false, setIsOpenOptions, children }) => {
  const { stopTimer } = useActions();
  const modalRef = useRef<HTMLDivElement>(null);

  const animation = useSpring({
    config: {
      duration: 250,
    },
    opacity: isOpenOptions ? 1 : 0,
    transform: isOpenOptions ? `translateY(0%)` : `translateY(-100%)`,
  });

  const closeModal = (e: MouseEvent) => {
    if (modalRef.current === e.target) {
      setIsOpenOptions(false);
    }
  };

  const keyPress = useCallback(
    (e: KeyboardEvent) => {
      if (e.key === "Escape" && isOpenOptions) {
        setIsOpenOptions(false);
      }
    },
    [setIsOpenOptions, isOpenOptions],
  );

  useEffect(() => {
    document.addEventListener("keydown", keyPress);
    return () => document.removeEventListener("keydown", keyPress);
  }, [keyPress]);

  useEffect(() => {
    if (isOpenOptions) stopTimer();
  }, [isOpenOptions]);

  return (
    <>
      {isOpenOptions ? (
        <div className={styles.background} ref={modalRef} onClick={closeModal}>
          <animated.div style={animation}>
            <div className={styles.modalWrapper}>
              {children}
              <MdClose
                size={32}
                className={styles.closeModalButton}
                aria-label="Close modal"
                onClick={() => setIsOpenOptions(false)}
              />
            </div>
          </animated.div>
        </div>
      ) : null}
    </>
  );
};

export default ModalWindow;
