import HobeeBody from 'public/characters/hobee_body.png';
import TobeeBody from 'public/characters/tobee_body.png';
import HobeeTobee from 'public/characters/hobeetobee.png';

export const heroOne = {
  reverse: true,
  inverse: true,
  topLine: {
    text: '1 Target Setting',
  },
  headline: '선물을 받을 분에 대해서 알려주시오 :)',
  description:
    '사용자가 선물할 상대에 대한 간단한 정보를 입력하여 그 정보에 근접한 상품들을 추천해드립니다',
  buttonLabel: '지금 추천받기',
  imgStart: 'start',
  img: HobeeBody.src,
  start: 'true',
};

export const heroTwo = {
  reverse: false,
  inverse: false,
  topLine: {
    text: '2 Calendar & Notify',
  },
  headline: '기억은 선비가 대신 해주겠소!',
  description:
    '친구를 맺은 회원의 일정을 캘린더에 기록해 일정에 맞춰 친구가 갖고 싶은 선물, 갖기 싫은 선물을 보여드려요',
  buttonLabel: '로그인하기',

  linkTo: '/more',
  imgStart: 'start',
  img: TobeeBody.src,
  start: 'true',
};

export const heroThree = {
  reverse: true,
  inverse: true,
  topLine: {
    text: '3 Lantern Carnival',
  },
  headline: '축하메시지를 전하고 싶다면?',
  description:
    '친구에게 메시지와 함께 연등을 달아 선물 뿐만 아니라 마음까지 주고받을 수 있어요',
  buttonLabel: 'View Project',

  linkTo: '/download',
  imgStart: '',
  img: HobeeTobee.src,
  start: 'true',
};
