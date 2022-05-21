import React, { useEffect } from "react";
import { Container, Section } from "styles/main/MainGlobalElements";
import {
  ContentRow,
  TextWrapper,
  TopLine,
  Heading,
  ContentButton,
  Subtitle,
  ImgWrapper,
  Img,
  ContentColumn,
} from "styles/main/introduce/ContentElements";
import { useInView } from "react-intersection-observer";
// import { useAnimation } from "framer-motion";

type Props = {};

function Content({
  primary,
  topLine,
  headline,
  description,
  buttonLabel,
  img,
  alt,
  inverse,
  reverse,
}: any) {
  const initial = { opacity: 0, y: 30 };
  // const animation = useAnimation();

  // const { ref, inView } = useInView({ threshold: 0.1 });

  // useEffect(() => {
  //   if (inView) {
  //     animation.start({
  //       opacity: 1,
  //       y: 0,
  //     });
  //   }
  // }, [inView, animation]);

  return (
    <Section inverse={inverse}>
      <Container>
        <ContentRow reverse={reverse}>
          <ContentColumn>
            <TextWrapper>
              <TopLine
              // initial={initial}
              // transition={{ delay: 0.3, duration: 0.6 }}
              // animate={animation}
              >
                {topLine.text}
              </TopLine>
              <Heading
                // initial={initial}
                // transition={{ delay: 0.5, duration: 0.6 }}
                // animate={animation}
                inverse={inverse}
              >
                {headline}
              </Heading>
              <Subtitle
                // initial={initial}
                // transition={{ delay: 0.7, duration: 0.6 }}
                // animate={animation}
                inverse={inverse}
              >
                {description}
              </Subtitle>
              {/* <ContentButton
                initial={initial}
                transition={{ delay: 1, duration: 0.6 }}
                animate={animation}
                inverse={inverse}
                primary={primary}
              >
                {buttonLabel}
              </ContentButton> */}
            </TextWrapper>
          </ContentColumn>
          <ContentColumn
          // initial={initial}
          // transition={{ delay: 0.5, duration: 0.6 }}
          // animate={animation}
          >
            <ImgWrapper>
              <Img
                src={img}
                alt={alt}
                // whileHover={{ rotate: 2, scale: 1.02 }}
                // transition={{ duration: 0.5 }}
              />
            </ImgWrapper>
          </ContentColumn>
        </ContentRow>
      </Container>
    </Section>
  );
}

export default Content;
