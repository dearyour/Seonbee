import Image from "next/image";
import React from "react";
import { HeroContainer, HeroBg, ImageBg } from "styles/main/HeroElements";
import TraditionPattern from "public/images/1.jpg";
import Btn from "components/commons/Btn";
import MacinChar from "public/MainChar.png";
import { useRouter } from "next/router";

function HeroSection() {
  const router = useRouter();
  return (
    <div className="">
      <div className="container">
        <div className="row">
          <div className="col-1"></div>
          <div className="col-7">
            <div className="h-100 d-flex align-items-center">
              <div>
                <h3 className="">
                  당신의 선물비서, <span>선비</span>가
                </h3>
                <h3>선물을 추천 해드립니다.</h3>
                <h5>
                  당신의 소중한 사람만을 위한 맞춤형 선물을 추천 받으세요!
                </h5>
                <div>
                  <Btn
                    filled={true}
                    className="me-2"
                    onClick={() => {
                      router.push("/chat");
                    }}
                  >
                    지금 추천받기
                  </Btn>
                  <Btn
                    onClick={() => {
                      router.push("/signup");
                    }}
                  >
                    선비에 가입하기
                  </Btn>
                </div>
              </div>
            </div>
          </div>

          <div className="col-4">
            <Image src={MacinChar} alt="tiger"></Image>
          </div>
        </div>
      </div>
    </div>
  );
}

export default HeroSection;
