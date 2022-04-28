import React from 'react';
import Router from 'next/router';
import {
  SidebarContainer,
  Icon,
  CloseIcon,
  SidebarWrapper,
  SidebarMenu,
  SidebarLink,
} from 'styles/main/SidebarElements';

interface Props {
  isOpen: boolean;
  toggle: () => void;
}

function Sidebar({ isOpen, toggle }: Props) {
  return (
    <SidebarContainer isOpen={isOpen} onClick={toggle}>
      <Icon onClick={toggle}>
        <CloseIcon />
      </Icon>
      <SidebarWrapper>
        <SidebarMenu>
          <SidebarLink onClick={() => Router.push('/')}>대문</SidebarLink>
          <SidebarLink onClick={() => Router.push('/shop')}>
            저잣거리
          </SidebarLink>
          <SidebarLink onClick={() => Router.push('/social')}>
            사랑방
          </SidebarLink>
          <SidebarLink onClick={() => Router.push('/profile')}>
            호패
          </SidebarLink>
        </SidebarMenu>
      </SidebarWrapper>
    </SidebarContainer>
  );
}

export default Sidebar;
