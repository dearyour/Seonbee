import React from 'react';
import { useRouter } from 'next/router';
import { useEffectOnce } from 'store/hook/useEffectOnce';
import Image from 'next/image';
import Hobee from 'public/seonbee.png';
import {
  LeftSpeechBubble,
  RecommendContainer,
} from 'styles/chat/RecommendElements';
import { Stack } from '@mui/material';
import Btn from 'components/commons/Btn';
import { AiOutlineLogin } from 'react-icons/ai';

function Recommend() {
  const router = useRouter();

  useEffectOnce(() => {
    if (Object.keys(router.query).length === 0) {
      router.push('/404');
      return;
    }
  });

  return (
    <Stack
      direction="column"
      justifyContent="flex-start"
      alignItems="center"
      spacing={4}
    >
      <Stack
        direction="row"
        justifyContent="center"
        alignItems="center"
        spacing={4}
      >
        <Image src={Hobee} width={100} height={100} />
        <LeftSpeechBubble>엣헴, 오다 주웠소</LeftSpeechBubble>
      </Stack>
      <Btn filled={true}>
        <AiOutlineLogin />
        &nbsp; 로그인하고 추천 내역 저장하기
      </Btn>
    </Stack>
  );
}

export default Recommend;
