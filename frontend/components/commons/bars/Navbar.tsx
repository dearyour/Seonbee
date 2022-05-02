import React, { useEffect, useState } from "react";
import { FaBars } from "react-icons/fa";
import {
  Nav,
  NavbarContainer,
  MobileIcon,
  NavMenu,
  NavItem,
  NavLinks,
} from "styles/main/NavbarElements";
import Image from "next/image";
import TextLogo from "public/textLogo2.png";
import Link from "next/link";
import Router from "next/router";
import Sidebar from "./Sidebar";

function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [isMain, setIsMain] = useState<boolean>(false);

  useEffect(() => {
    if (Router.pathname === "/") {
      setIsMain(true);
    } else {
      setIsMain(false);
    }
  }, [Router.pathname]);
  if (isMain) {
    return (
      <div>
        <Nav>
          <NavbarContainer>
            <MobileIcon>
              <FaBars />
            </MobileIcon>
            <NavMenu>
              <NavItem>
                <NavLinks onClick={() => Router.push("/")}>대문</NavLinks>
              </NavItem>
              <NavItem>
                <NavLinks onClick={() => Router.push("/shop")}>
                  저잣거리
                </NavLinks>
              </NavItem>
              <NavItem>
                <NavLinks onClick={() => Router.push("/social")}>
                  사랑방
                </NavLinks>
              </NavItem>
              <NavItem>
                <NavLinks onClick={() => Router.push("/profile")}>
                  호패
                </NavLinks>
              </NavItem>
            </NavMenu>
          </NavbarContainer>
        </Nav>
        <Sidebar isOpen={isOpen} toggle={toggle} />
      </div>
    );
  }
  const toggle = () => {
    setIsOpen(!isOpen);
  };

  return (
    <>
      <Nav>
        <NavbarContainer>
          <Link href="/">
            <a>
              <Image src={TextLogo} alt="logo" width={100} height={80} />
            </a>
          </Link>
          <MobileIcon onClick={toggle}>
            <FaBars />
          </MobileIcon>
          <NavMenu>
            <NavItem>
              <NavLinks onClick={() => Router.push("/")}>대문</NavLinks>
            </NavItem>
            <NavItem>
              <NavLinks onClick={() => Router.push("/shop")}>저잣거리</NavLinks>
            </NavItem>
            <NavItem>
              <NavLinks onClick={() => Router.push("/social")}>사랑방</NavLinks>
            </NavItem>
            <NavItem>
              <NavLinks onClick={() => Router.push("/profile")}>호패</NavLinks>
            </NavItem>
          </NavMenu>
        </NavbarContainer>
      </Nav>
      <Sidebar isOpen={isOpen} toggle={toggle} />
    </>
  );
}

export default Navbar;
