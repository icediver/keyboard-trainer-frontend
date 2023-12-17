import { useAuth } from "@/hooks/useAuth";
import { AuthService } from "@/services/auth/auth.service";
import { FC, MouseEventHandler, useEffect, useState } from "react";
import { FaRegKeyboard, FaTasks } from "react-icons/fa";
import { IoPersonCircleOutline, IoSettingsOutline } from "react-icons/io5";
import { MdLogout, MdOutlineQueryStats } from "react-icons/md";
import { IModalOpen } from "../../layout/Layout";
import ModalContent from "../../modal-window/modal-content/ModalContent";
import ModalWindow from "../../modal-window/ModalWindow";
import Letter from "../letter/Letter";
import styles from "./NavMenu.module.scss";
import { useActions } from "@/hooks/useActions";

const NavMenu: FC<IModalOpen> = ({ modalOpen, setModalOpen }) => {
  const [isOpenOptions, setIsOpenOptions] = useState<boolean>(false);
  const [typeModal, setTypeModal] = useState<string>();
  const { user } = useAuth();
  const { logout } = useActions();
  const handlerClick: MouseEventHandler<SVGElement> = (e) => {
    // let data = e.currentTarget.dataset
    setTypeModal(e.currentTarget.dataset.type);

    // setIsOpenOptions(!isOpenOptions);
    setModalOpen(!modalOpen);
  };

  return (
    <div className={styles.container}>
      <Letter />
      <div />
      <div className={styles.rightColumn}>
        <FaRegKeyboard
          data-type={"keyboard"}
          className={styles.icons}
          size={30}
          onClick={handlerClick}
        />
        <MdOutlineQueryStats
          data-type={"stats"}
          className={styles.icons}
          size={30}
          onClick={handlerClick}
        />
        <FaTasks
          data-type={"tasks"}
          className={styles.icons}
          size={30}
          onClick={handlerClick}
        />
        <IoSettingsOutline
          data-type={"settings"}
          className={styles.icons}
          size={30}
          onClick={handlerClick}
        />
        {!user ? (
          <IoPersonCircleOutline
            data-type={"login"}
            className={styles.icons}
            size={32}
            onClick={handlerClick}
          />
        ) : (
          <MdLogout
            className={styles.icons}
            size={32}
            onClick={() => {
              logout();
              /*  setUser(null); */
            }}
          />
        )}
      </div>
      <ModalWindow isOpenOptions={modalOpen} setIsOpenOptions={setModalOpen}>
        {typeModal && (
          <ModalContent typeModal={typeModal} setIsOpenOptions={setModalOpen} />
        )}
      </ModalWindow>
    </div>
  );
};

export default NavMenu;
