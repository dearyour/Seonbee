import React, { useEffect, useState } from "react";
import { FaBars } from "react-icons/fa";
import {
  Nav,
  NavbarContainer,
  MobileIcon,
  NavMenu,
  NavItem,
  NavLinks,
  NavLinksChat,
} from "styles/main/NavbarElements";
import Image from "next/image";
import TextLogo from "public/textLogo2.png";
import Link from "next/link";
import Router, { useRouter } from "next/router";
import Sidebar from "./Sidebar";
import Swal from "sweetalert2";
import { useSelector, useDispatch } from "react-redux";
import { memberActions } from "store/slice/member";
import { RootState } from "store/slice";
import AudioPlayer from "components/commons/AudioPlayer";

function Navbar() {
  const dispatch = useDispatch();
  const [isOpen, setIsOpen] = useState(false);
  const [isMain, setIsMain] = useState<boolean>(false);
  const router = useRouter();

  useEffect(() => {
    if (router.pathname === "/") {
      setIsMain(true);
    } else {
      setIsMain(false);
    }
    // console.log(router.pathname, isMain);
  }, [router.pathname, isMain]);

  const toggle = () => {
    setIsOpen(!isOpen);
  };

  const uid = useSelector((state: RootState) => state.member.info?.memberId);

  return (
    <div className="">
      <Nav className="">
        <NavbarContainer>
          {!isMain ? (
            <Link href="/">
              <a>
                <Image src={TextLogo} alt="logo" width={100} height={80} />
              </a>
            </Link>
          ) : (
            <div></div>
          )}
          <MobileIcon onClick={toggle}>
            <FaBars />
          </MobileIcon>
          <NavMenu className={isMain ? "isMain" : ""}>
            <NavItem>{/* <AudioPlayer /> */}</NavItem>
            <NavItem>
              <NavLinksChat onClick={() => Router.push("/chat")}>
                선물 추천
              </NavLinksChat>
            </NavItem>
            <NavItem>
              <NavLinks onClick={() => Router.push("/shop")}>저잣거리</NavLinks>
            </NavItem>
            <NavItem>
              <NavLinks onClick={() => Router.push("/social")}>사랑방</NavLinks>
            </NavItem>
            <NavItem>
              <NavLinks onClick={() => Router.push(`/profile/${uid}`)}>
                호패
              </NavLinks>
            </NavItem>
            <NavItem>
              {sessionStorage.getItem("Token") != null &&
              sessionStorage.getItem("Token") != "undefined" ? (
                <NavLinks
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
                </NavLinks>
              ) : (
                <NavLinks onClick={() => Router.push("/login")}>
                  로그인
                </NavLinks>
              )}
            </NavItem>
          </NavMenu>
        </NavbarContainer>
      </Nav>
      <Sidebar isOpen={isOpen} toggle={toggle} />
    </div>
  );
}

export default Navbar;
