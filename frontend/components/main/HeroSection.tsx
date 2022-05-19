import Image from 'next/image';
import React from 'react';
import HobeeTobee from 'public/characters/hobeetobee.png';
import { useRouter } from 'next/router';
import TitleOnly from 'public/logowop2.png';
import MainBg from 'public/mainbg2.png';
import styled from '@emotion/styled';
import { Container, MainHeading } from 'styles/main/MainGlobalElements';

function HeroSection() {
  const router = useRouter();

  return (
    <Hero>
      <HeroImage src={MainBg.src} />
      <StyledContainer>
        <ReverseDiv className="row">
          <div className="col-md-7 col-sm-8">
            <div className="h-100 d-flex align-items-center">
              <div>
                <MainHeading>
                  당신의 선물비서,
                  <Image
                    src={TitleOnly}
                    alt="seonbee"
                    width={102}
                    height={60}
                    style={{ margin: '0.75rem 0 0 0 !important' }}
                  />
                  가<br />
                  선물을 추천 해드립니다.
                </MainHeading>

                <HeroText>
                  당신의 소중한 사람만을 위한 맞춤형 선물을 추천 받으세요!
                </HeroText>
                <ButtonWrapper>
                  <Btn1
                    onClick={() => {
                      router.push('/chat');
                    }}
                  >
                    🎁 지금 추천받기
                  </Btn1>
                  {!sessionStorage.getItem('Token') && (
                    <Btn2
                      onClick={() => {
                        router.push('/login');
                      }}
                    >
                      선비에 가입하기
                    </Btn2>
                  )}
                </ButtonWrapper>
              </div>
            </div>
          </div>

          <div className="col-md-5 col-sm-8">
            <Image src={HobeeTobee} alt="hobeetobee" layout="responsive" />
          </div>
        </ReverseDiv>
      </StyledContainer>
    </Hero>
  );
}

const StyledContainer = styled(Container)`
  @media (max-width: 780px) {
    margin-top: -8rem;
  }
`;

const ReverseDiv = styled.div`
  @media (max-width: 780px) {
    flex-direction: column-reverse;
  }
`;

const Hero = styled.section`
  height: calc(100vh - 80px);
  background-position: center;
  background-size: cover;
  padding-top: clamp(75px, 16vh, 220px);
  box-shadow: inset 0 0 0 1000px rgba (0, 0, 0, 0.2);
`;

const HeroImage = styled.img`
  object-fit: cover;
  width: 100%;
  height: 100%;
  /* background: linear-gradient(to right, rgba(0, 0, 0, 0.7), rgba(0, 0, 0, 0.1)); */
  /* background-image: '../../public/maingbg.JPG'; */
  top: 0;
  position: absolute;
  z-index: -1;
`;

const HeroText = styled.p`
  margin-bottom: 27px;
  font-size: clamp(0.9rem, 1.5vw, 1.3rem);
  line-height: 18px;
  text-align: left;
  letter-spacing: 2px;
  /* color: #fff; */
`;

const ButtonWrapper = styled.div`
  width: 100%;
  display: flex;
  justify-content: start;
  flex-flow: wrap;
  gap: 1rem;
`;

const Btn1 = styled.div`
  text-decoration: none;
  padding: 16px 40px;
  font-size: 1rem;
  position: relative;
  /* margin-right: 32px; */

  background: #ff6464;
  color: #fff;
  border-radius: 24px;
  transition: transform 0.3s ease;

  cursor: pointer;

  &:hover {
    transform: translate(0, -6px);
  }
`;

const Btn2 = styled.div`
  text-decoration: none;
  padding: 16px 40px;
  font-size: 1rem;
  position: relative;
  /* margin-right: 32px; */

  background: #fff;
  color: #ff6464;
  border-radius: 24px;
  transition: transform 0.3s ease;

  cursor: pointer;
  border: 1px solid #ff6464;

  &:hover {
    transform: translate(0, -6px);
  }
`;

export default HeroSection;
