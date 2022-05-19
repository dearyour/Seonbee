import React from 'react';
import { Row, Section } from 'styles/main/MainGlobalElements';
import {
  FooterLinkItems,
  FooterLinkTitle,
  FooterLink,
  FooterLogo,
  SocialIcon,
  FooterRights,
  FooterSocialIcon,
  FooterWrapper,
  FooterAddress,
  FooterColumn,
  FooterGrid,
} from 'styles/main/introduce/FooterElements';
import { footerData, footerSocialData } from 'components/main/data/FooterData';
import Seonbee from 'public/logowop.png';
import Link from 'next/link';
import Image from 'next/image';

type Props = {};

function Footer({}: Props) {
  return (
    <Section padding="4rem 0 2rem 0">
      <FooterWrapper>
        <FooterGrid>
          <FooterColumn id="footerLogo">
            <Link href="/">
              <FooterLogo>
                <SocialIcon src={Seonbee.src} />
                당신의 선물비서, 선비
              </FooterLogo>
            </Link>
            <FooterAddress>
              서울특별시 강남구 테헤란로 212,
              <br />
              SSAFY 6기 A406, 서울 없는 서울팀
            </FooterAddress>

            <Row>
              {footerSocialData.map((social, index) => (
                <FooterSocialIcon
                  key={index}
                  href="/"
                  target="_blank"
                  aria-label={social.name}
                >
                  {social.icon}
                </FooterSocialIcon>
              ))}
            </Row>
          </FooterColumn>
          {footerData.map((footerItem, index) => (
            <FooterLinkItems key={index}>
              <FooterLinkTitle>
                <Image
                  src={footerItem.image}
                  alt="link title"
                  width={40}
                  height={40}
                />
                &nbsp;
                {footerItem.role}
              </FooterLinkTitle>
              {footerItem.members.map((member, memberIndex) => (
                <FooterLink key={memberIndex} href={member.link}>
                  {member.name}
                </FooterLink>
              ))}
            </FooterLinkItems>
          ))}
        </FooterGrid>
        <FooterRights>당신의 선물비서, 선비 © 2022</FooterRights>
      </FooterWrapper>
    </Section>
  );
}

export default Footer;
