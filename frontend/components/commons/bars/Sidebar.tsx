import React from "react";
import Router from "next/router";
import {
  SidebarContainer,
  Icon,
  CloseIcon,
  SidebarWrapper,
  SidebarMenu,
  SidebarLink,
} from "styles/main/SidebarElements";
import Swal from "sweetalert2";
import { useSelector, useDispatch } from "react-redux";
import { memberActions } from "store/slice/member";
interface Props {
  isOpen: boolean;
  toggle: () => void;
}

function Sidebar({ isOpen, toggle }: Props) {
  const dispatch = useDispatch();
  return (
    <SidebarContainer isOpen={isOpen} onClick={toggle}>
      <Icon onClick={toggle}>
        <CloseIcon />
      </Icon>
      <SidebarWrapper>
        <SidebarMenu>
          <SidebarLink onClick={() => Router.push("/")}>대문</SidebarLink>
          <SidebarLink onClick={() => Router.push("/shop")}>
            저잣거리
          </SidebarLink>
          <SidebarLink onClick={() => Router.push("/social")}>
            사랑방
          </SidebarLink>
          <SidebarLink onClick={() => Router.push("/redux")}>호패</SidebarLink>
          {sessionStorage.getItem("Token") != null &&
          sessionStorage.getItem("Token") != "undefined" ? (
            <SidebarLink
              onClick={() => {
                sessionStorage.clear();
                localStorage.removeItem("persist:root");
                dispatch(memberActions.reset());
                Swal.fire({
                  title: "로그아웃 되었습니다",
                  text: "메인페이지로 이동합니다",
                  icon: "success",
                  showConfirmButton: false,
                });
                Router.push("/");
              }}
            >
              로그아웃
            </SidebarLink>
          ) : (
            <SidebarLink onClick={() => Router.push("/login")}>
              로그인
            </SidebarLink>
          )}
        </SidebarMenu>
      </SidebarWrapper>
    </SidebarContainer>
  );
}

export default Sidebar;
