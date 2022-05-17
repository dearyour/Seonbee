import React from 'react';

import { GiShop, GiThreeFriends, GiAsianLantern } from 'react-icons/gi';
import { ImGift, ImProfile } from 'react-icons/im';
import { BsBookmarkHeartFill } from 'react-icons/bs';

import { IconType } from 'react-icons/lib';
const iconStyle = (Icon: IconType) =>
  React.createElement(Icon, { size: '3rem', color: '#0f0f0f' });

export const featuresData = [
  {
    name: '선물 추천',
    description:
      '선비의 챗봇인 호비 또는 토비의 질문들에 잘 대답해주시면 트렌디한 맞춤형 추천 결과를 보여드립니다.',
    icon: iconStyle(ImGift),
    imgClass: 'one',
  },
  {
    name: '저잣거리',
    description: '해령아, 나랑 함께 저잣거리에 가자',
    icon: iconStyle(GiShop),
    imgClass: 'two',
  },
  {
    name: '사랑방',
    description:
      '친구의 각종 기념일이 표시되며, 새로운 친구를 맺을 수 있는 소셜 페이지입니다.',
    icon: iconStyle(GiThreeFriends),
    imgClass: 'three',
  },
  {
    name: '호패',
    description:
      '선비의 개인 페이지로서, 개인 정보 수정 및 주고싶소 / 갖고싶소 / 연등회 등의 서비스를 이용할 수 있습니다.',
    icon: iconStyle(ImProfile),
    imgClass: 'four',
  },
  {
    name: '주고싶소 / 갖고싶소 / 약속하기',
    description:
      '주고 싶은 선물을 친구별로 저장, 카카오톡 공유할 수 있습니다. 갖고 싶은 선물을 설정, 친구들이 볼 수 있도록 합니다. 선물을 약속하여 중복된 선물을 주는 것을 방지할 수 있습니다.',
    icon: iconStyle(BsBookmarkHeartFill),
    imgClass: 'five',
  },
  {
    name: '연등회',
    description:
      '기념일이 다가오면 연등회가 열리는데, 축하 메시지를 적어 연등을 달면 주인공이 읽을 수 있습니다.',
    icon: iconStyle(GiAsianLantern),
    imgClass: 'six',
  },
];
