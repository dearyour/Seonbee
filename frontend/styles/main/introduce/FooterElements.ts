import styled from '@emotion/styled';
import Link from 'next/link';
import { Column, Row } from 'styles/main/MainGlobalElements';

export const FooterContainer = styled.div`
  /* background-color: #101522; */
  padding: 4rem 0 2rem 0;
`;

export const FooterWrapper = styled.div`
  max-width: 1280px;
  margin-left: auto;
  margin-right: auto;
`;

export const FooterSubscription = styled.section`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  text-align: center;
  margin-bottom: 15px;
  padding: 15px;
  color: #fff;
`;

export const FooterSubHeading = styled.p`
  /* font-family: 'Trebuchet MS', 'Lucida Sans Unicode', 'Lucida Grande', 'Lucida Sans', Arial,
		sans-serif; */
  margin-bottom: 15px;
  font-size: 15px;
`;

export const FooterRow = styled(Row)`
  flex-wrap: wrap;
  @media screen and (max-width: 820px) {
    > div {
      width: 20%;
    }
    > div:first-child {
      width: 100%;
    }
  }
  @media screen and (max-width: 420px) {
    flex-direction: column;
    align-items: center;
    * {
      width: 100%;
      text-align: center;
    }
  }
`;

export const FooterGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  justify-content: center;
  align-items: flex-start;
`;

export const FooterColumn = styled(Column)`
  @media screen and (max-width: 999px) {
    align-items: center;
    grid-column: 1/-1;
  }
`;

export const FooterSubText = styled.p`
  margin-bottom: 15px;
  font-size: 13px;
`;

export const FooterLinksContainer = styled.div`
  width: 100%;
  max-width: 1000px;
  display: flex;
  justify-content: center;

  @media screen and (max-width: 820px) {
    padding-top: 15px;
  }
`;

export const FooterLinkItems = styled.div`
  display: flex;
  flex-direction: column;
  margin: 10px;
  text-align: left;
  box-sizing: border-box;
  color: #fff;

  @media screen and (max-width: 1000px) {
    align-items: center;
  }
`;

export const FooterLinkTitle = styled.h2`
  margin-bottom: 10px;
`;

export const FooterLink = styled.a`
  color: #fff;
  text-decoration: none;
  margin-bottom: 0.3rem;

  &:hover {
    color: #c0b4a5;
    transition: 0.3s ease-out;
  }
`;

export const FooterLogo = styled.a`
  color: #fff;
  justify-self: start;
  cursor: pointer;
  text-decoration: none;
  font-size: 1.25rem;
  display: flex;
  align-items: center;
  margin-bottom: 10px;

  &:hover {
    color: #c0b4a5;
  }
`;

export const SocialIcon = styled.img`
  margin-right: 10px;
  width: 40px;
`;

export const FooterRights = styled.div`
  color: #fff;
  margin-bottom: 16px;
  width: 100%;
  font-size: 0.8rem;
  text-align: center;
  border-top: 1px solid #2d3748;
  padding: 1rem 0;
  margin: 1rem 0 0;
`;

export const FooterSocialIcon = styled.a`
  color: #fff;
  font-size: 18px;

  &:hover {
    color: red;
  }
`;

export const FooterAddress = styled.div`
  color: white;
  margin: 0.4rem auto 0.4rem;
  max-width: 20rem;
  font-weight: 500;
  font-size: 0.875rem;
  line-height: 2;
  text-align: center;
  @media screen and (min-width: 1000px) {
    margin-left: 0px;
    text-align: left;
    margin-right: 1rem;
  }
`;
