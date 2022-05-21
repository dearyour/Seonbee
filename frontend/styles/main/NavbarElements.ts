import styled from "@emotion/styled";
import Link from "next/link";

export const Nav = styled.nav`
  background: transparent;
  height: 80px;
  /* margin-top: -80px; */
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 1rem;
  /* position: sticky; */
  top: 0;
  z-index: 10;
  margin-bottom: 2rem;
  padding-bottom: 10px;
  /* background-color: #fbf8f4; */

  @media screen and (max-width: 960px) {
    transition: 0.8s all ease;
  }
`;

export const NavbarContainer = styled.div`
  display: flex;
  justify-content: space-between;
  height: 80px;
  z-index: 1;
  width: 100%;
  padding: 0 24px;
  max-width: 1100px;
  /* .isMain {
    margin-top: 22px;
  } */
`;

export const MobileIcon = styled.div`
  display: none;

  @media screen and (max-width: 768px) {
    display: block;
    position: absolute;
    top: -11px;
    right: 0;
    transform: translate(-100%, 60%);
    font-size: 1.8rem;
    cursor: pointer;
  }
`;

export const NavMenu = styled.ul`
  display: flex;
  align-items: center;
  list-style: none;
  text-align: center;
  margin-right: -22px;
  margin-top: 11px;

  @media screen and (max-width: 768px) {
    display: none;
  }
`;

export const NavItem = styled.li`
  /* height: 80px; */
  margin-right: 25px;
`;

export const NavLinks = styled.div`
  cursor: pointer;
  padding: 0 10px;
  font-weight: bold;
  text-align: center;
  text-decoration: none;
  color: black;
  transition: all 0.3s ease-in;

  &:hover {
    color: #baa68b;
  }
`;

export const NavLinksChat = styled.div`
  cursor: pointer;
  padding: 0 10px;
  font-weight: bold;
  text-align: center;
  text-decoration: none;
  color: #baa68b;
  transition: all 0.3s ease-in;

  &:hover {
    color: #64543e;
  }
`;
