import Btn from "components/commons/Btn";
import React, { useState } from "react";
import styles from "styles/profile/profileLantern.module.css";
import LanternFestivalCardList from "./LanternFestivalCardList";
import LanternFestivalCreateModal from "./LanternFestivalCreateModal";

type Props = {};

const Lantern = (props: Props) => {
  const [showCreateModal, setShowCreateModal] = useState<boolean>(false);

  const onClickCancel = (e: React.MouseEvent) => {
    console.log("onClickCancel");
    setShowCreateModal(false);
  };

  return (
    <>
      <div className={styles.lantern_container}>
        <div className="d-flex flex-column justify-content-between">
          <div className={styles.lantern_festivals}>
            <LanternFestivalCardList />
          </div>
          <div className="ms-auto">
            <Btn
              filled={true}
              onClick={() => setShowCreateModal(!showCreateModal)}
            >
              연등회 등록
            </Btn>
          </div>
        </div>
      </div>
      {showCreateModal ? (
        <LanternFestivalCreateModal onClick={onClickCancel} />
      ) : null}
    </>
  );
};

export default Lantern;
