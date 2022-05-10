import React, { useCallback, useEffect } from "react";
import { useDispatch } from "react-redux";
import { useEffectOnce } from "store/hook/useEffectOnce";
import { memberActions } from "store/slice/member";
import styled from "@emotion/styled";
const Auth2 = () => {
  const dispatch = useDispatch();
  // const kakaoLogin = useCallback(() => {
  //   dispatch(memberActions.getKakaoKey());
  // }, []);
  // useEffect(() => {
  //   kakaoLogin();
  // }, []);
  useEffectOnce(() => {
    dispatch(memberActions.getKakaoKey());
  });
  return (
    <div>
      <div>
        <Large></Large>
      </div>
    </div>
  );
};

const Large = styled.div`
  width: 100%;
  margin-top: 30%;
  display: flex;
  justify-content: center;
`;
export default Auth2;
