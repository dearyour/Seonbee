import Image from 'next/image';
import React from 'react';
import { HeroContainer, HeroBg, ImageBg } from 'styles/main/HeroElements';
import TraditionPattern from 'public/images/1.jpg';

function HeroSection() {
  return (
    <HeroContainer>
      <HeroBg>
        <ImageBg src={TraditionPattern} layout="responsive" />
      </HeroBg>
    </HeroContainer>
  );
}

export default HeroSection;
