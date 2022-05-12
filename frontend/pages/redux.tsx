import React, { useCallback, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "store/slice";
import { layoutAction } from "store/slice/layout";
import { memberActions } from "store/slice/member";
import { profileActions } from "store/slice/profile";
type Props = {};

const reduxTestData = {
  id: 3,
  name: "뀨뀨",
};
// 리덕스 사용방법 설명 페이지

const Redux = (props: Props) => {
  const dispatch = useDispatch();
  const { nickname, memberId, imageString } = useSelector(
    (state: RootState) => state.member.info
  );

  const testRedux = useCallback(() => {
    dispatch(memberActions.getMember());
  }, []);

  useEffect(() => {
    // testRedux();
    dispatch(profileActions.getProfile(memberId));
    dispatch(layoutAction.updateDetailState(reduxTestData));
  }, [dispatch]);

  return nickname ? (
    <div style={{ textAlign: "center" }}>
      <div>nickname : {nickname}</div>
      <div>memberId : {memberId}</div>
      <div>imageId : {`data:image/png;base64,` + imageString}</div>
    </div>
  ) : (
    <div></div>
  );
};

export default Redux;
