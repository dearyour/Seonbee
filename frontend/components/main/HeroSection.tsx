import Image from 'next/image';
import React from 'react';
import { HeroContainer, HeroBg, ImageBg } from 'styles/main/HeroElements';
import TraditionPattern from 'public/images/1.jpg';
import Btn from 'components/commons/Btn';
import HobeeTobee from 'public/characters/hobeetobee.png';
import { useRouter } from 'next/router';
import TitleOnly from 'public/logowop2.png';
import MainBg from 'public/mainbg2.jpg';
import styled from '@emotion/styled';
import { Container, MainHeading } from 'styles/main/MainGlobalElements';

function HeroSection() {
  const router = useRouter();
  // return (
  //   <div className="">
  //     <div className="container">
  //       <div className="row">
  //         <div className="col-1"></div>
  //         <div className="col-7">
  //           <div className="h-100 d-flex align-items-center">
  //             <div style={{}}>
  //               <h3>
  //                 당신의 선물비서,{' '}
  //                 <Image src={TitleOnly} width={85} height={50} />가
  //               </h3>
  //               <h3>선물을 추천 해드립니다.</h3>
  //               <h5>
  //                 당신의 소중한 사람만을 위한 맞춤형 선물을 추천 받으세요!
  //               </h5>
  //               <div>
  //                 <Btn
  //                   filled={true}
  //                   className="me-2"
  //                   onClick={() => {
  //                     router.push('/chat');
  //                   }}
  //                 >
  //                   지금 추천받기
  //                 </Btn>
  //                 <Btn
  //                   onClick={() => {
  //                     router.push('/login');
  //                   }}
  //                 >
  //                   선비에 가입하기
  //                 </Btn>
  //               </div>
  //             </div>
  //           </div>
  //         </div>

  //         <div className="col-4">
  //           <Image src={MacinChar} alt="tiger"></Image>
  //         </div>
  //       </div>
  //     </div>
  //   </div>
  // );

  return (
    <Hero>
      <HeroImage src={MainBg.src} />
      <StyledContainer>
        <ReverseDiv className="row">
          <div className="col-md-1" />
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
                    style={{ marginBottom: '-0.7rem' }}
                  />
                  가<br />
                  선물을 추천 해드립니다.
                </MainHeading>

                <HeroText>
                  당신의 소중한 사람만을 위한 맞춤형 선물을 추천 받으세요!
                </HeroText>
                <ButtonWrapper>
                  <Btn
                    filled={true}
                    className="me-2"
                    onClick={() => {
                      router.push('/chat');
                    }}
                  >
                    지금 추천받기
                  </Btn>
                  <Btn
                    onClick={() => {
                      router.push('/login');
                    }}
                  >
                    선비에 가입하기
                  </Btn>
                </ButtonWrapper>
              </div>
            </div>
          </div>

          <div className="col-md-4 col-sm-8">
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
  gap: 0.5rem;
`;

export default HeroSection;
