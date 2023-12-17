import { useAuth } from "@/hooks/useAuth";
import { FC, useState } from "react";
import { AiOutlineDown, AiOutlineRight } from "react-icons/ai";
import styles from "./CurrentCategory.module.scss";

const CurrentCategory: FC<{ currentCategoryId: number }> = ({
  currentCategoryId,
}) => {
  const { user } = useAuth();
  // const { setContext } = useGlobalContext();
  const [openLevels, setOpenLevels] = useState<number | null>(null);

  const toggle = (index: number) => {
    if (openLevels === index) {
      return setOpenLevels(null);
    }
    setOpenLevels(index);
  };

  const currentCategoryExercises = user?.solvedExercises.filter(
    (el) => el.level.category.id === currentCategoryId,
  );

  const levels = currentCategoryExercises?.map((el) => el.level.id);

  const list = levels?.filter(
    (item, index, arr) => arr.indexOf(item) === index,
  );

  const listLevels = list?.map((item) => {
    return currentCategoryExercises?.filter((el) => el.level.id == item);
  });

  return (
    <div className={styles.current}>
      <h1>Category: {currentCategoryId}</h1>
      {currentCategoryExercises &&
        listLevels?.map((el, index) => {
          return (
            <div key={index} className={styles.level}>
              <div className={styles.title} onClick={() => toggle(index)}>
                level: {el && el[0].level.id}
                {openLevels === index ? (
                  <AiOutlineDown className={styles.icon} />
                ) : (
                  <AiOutlineRight className={styles.icon} />
                )}
              </div>

              {openLevels === index ? (
                <>
                  {el?.map((exc) => {
                    return (
                      <div
                        className={styles.exercises}
                        key={exc.id}
                        onClick={(e) => {
                          // return setContext(prevCtx => ({
                          // 	...prevCtx,
                          // 	currentExerciseId: exc.id
                          // }));
                        }}
                      >
                        exercise: {exc.id}
                      </div>
                    );
                  })}
                </>
              ) : null}
            </div>
          );
        })}
    </div>
  );
};

export default CurrentCategory;
