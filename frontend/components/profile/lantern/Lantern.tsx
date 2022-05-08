import Btn from "components/commons/Btn";
import React, { useEffect, useState } from "react";
import styles from "styles/profile/profileLantern.module.css";
import LanternFestivalCardList from "./LanternFestivalCardList";
import LanternFestivalCreateModal from "./LanternFestivalCreateModal";
import { RootState } from "store/slice";
import { useDispatch, useSelector } from "react-redux";
import LanternFestival from "../main/LanternFestival";
import { IoIosArrowBack } from "react-icons/io";
import { profileActions } from "store/slice/profile";
import axiosConnector from "utils/axios-connector";

type Props = {};

const Lantern = (props: Props) => {
  const dispatch = useDispatch();
  const hostId = useSelector((state: RootState) => state.profile.hostId);
  const uid = useSelector((state: RootState) => state.member.info.memberId);
  const lanternFestival = useSelector(
    (state: RootState) => state.profile.lanternFestival
  );
  const showLanternFestival = useSelector(
    (state: RootState) => state.profile.showLanternFestival
  );
  const [showCreateModal, setShowCreateModal] = useState<boolean>(false);

  useEffect(() => {
    if (showLanternFestival) {
      dispatch(profileActions.setShowLanternFestival(false));
    }
  }, []);

  const onClickCancel = (e: React.MouseEvent) => {
    setShowCreateModal(false);
  };

  const onClickDelete = () => {
    if (lanternFestival) {
      axiosConnector({
        method: "DELETE",
        url: `profile/lantern/schedule/${lanternFestival.scheduleId}`,
      })
        .then((res) => {
          dispatch(profileActions.getLanternFestivals(hostId));
          if (showLanternFestival) {
            dispatch(profileActions.setShowLanternFestival(false));
          }
        })
        .catch((err) => {
          console.log(err.response);
        });
    }
  };

  return (
    <>
      {!showLanternFestival ? (
        <div className={styles.lantern_container}>
          <div className="d-flex flex-column justify-content-between">
            <div className={styles.lantern_festivals}>
              <LanternFestivalCardList />
            </div>
            {uid == hostId ? (
              <div className="ms-auto">
                <Btn
                  filled={true}
                  onClick={() => setShowCreateModal(!showCreateModal)}
                >
                  연등회 등록
                </Btn>
              </div>
            ) : null}
          </div>
        </div>
      ) : (
        <div>
          <div className="d-flex justify-content-between">
            <div
              className="d-flex font_hover"
              onClick={() =>
                dispatch(profileActions.setShowLanternFestival(false))
              }
              style={{ cursor: "pointer" }}
            >
              <div className={styles.icon_back + " mb-3 me-2"}>
                <div>
                  <IoIosArrowBack size="28" />
                </div>
              </div>
              <div className="font_2">
                {lanternFestival.title ? lanternFestival.title : "제목없음"} (
                {lanternFestival.scheduleDate})
              </div>
            </div>
            {uid == hostId ? (
              <div className="pt-1 font_hover" onClick={() => onClickDelete()}>
                <div>연등회 삭제</div>
              </div>
            ) : null}
          </div>
          <LanternFestival lanternFestival={lanternFestival} />
        </div>
      )}
      {showCreateModal ? (
        <LanternFestivalCreateModal onClick={onClickCancel} />
      ) : null}
    </>
  );
};

export default Lantern;
