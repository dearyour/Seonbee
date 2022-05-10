import { useCallback, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "store/slice/index";
import { profileActions } from "store/slice/profile";

export default function useProfile() {
  const dispatch = useDispatch();
  const hostId = useSelector((state: RootState) => state.profile.hostId);
  const memberId = useSelector(
    (state: RootState) => state.member.info.memberId
  );
  // const loadingStart = useCallback(() => {
  //     dispatch(profileActions);
  // }, []);
  // const loadingEnd = useCallback(() => {
  //     dispatch(profileActions);
  // }, []);

  return { hostId, memberId };
}
