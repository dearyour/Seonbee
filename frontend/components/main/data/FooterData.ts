import React from 'react';
import {
  FaGitlab,
  FaFacebook,
  FaInstagram,
  FaYoutube,
  FaTwitter,
  FaLinkedin,
} from 'react-icons/fa';
import HobeeFace from 'public/characters/hobee_face.png';
import TobeeFace from 'public/characters/tobee_face.png';
import { IconType } from 'react-icons/lib';

const iconStyle = (Icon: IconType) => React.createElement(Icon);

export const footerSocialData = [
  // {
  //   name: 'Gitlab',
  //   icon: iconStyle(FaGitlab),
  // },
  // {
  //   name: 'Facebook',
  //   icon: iconStyle(FaFacebook),
  // },
  // {
  //   name: 'Instagram',
  //   icon: iconStyle(FaInstagram),
  // },
  {
    name: 'YouTube',
    icon: iconStyle(FaYoutube),
  },
  // {
  //   name: 'Twitter',
  //   icon: iconStyle(FaTwitter),
  // },
  // {
  //   name: 'LinkedIn',
  //   icon: iconStyle(FaLinkedin),
  // },
];

export const footerData = [
  {
    image: HobeeFace.src,
    role: 'Front End',
    members: [
      {
        name: 'Kim Kisol',
        link: 'https://github.com/kimkisol',
      },
      {
        name: 'Kim Yonghee',
        link: 'https://github.com/dearyour',
      },
      {
        name: 'Eum Heesung',
        link: 'https://github.com/ehs0525',
      },
      {
        name: 'Jeon Geonha',
        link: 'https://github.com/Elgcha',
      },
    ],
  },
  {
    image: TobeeFace.src,
    role: 'Back End',
    members: [
      {
        name: 'Kang Jin',
        link: 'https://github.com/kjin41',
      },
      {
        name: 'Lim Jaehyun',
        link: 'https://github.com/jaehyun9520',
      },
      { name: '', link: '' },
      { name: '', link: '' },
    ],
  },
  // {
  //   image: {},
  //   title: 'Etc.',
  //   members: [
  //     {
  //       name: 'BGM : Arche! - 나비춤',
  //       links: 'https://youtube.com/watch?v=FPvVetNkE90',
  //     },
  //   ],
  // },
];
