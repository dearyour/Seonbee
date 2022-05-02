import styled from '@emotion/styled'
import Image from 'next/image'
import React, { useEffect, useState } from 'react'
import { Carousel } from 'react-responsive-carousel'

type Props = {}
class DdayFriends {
  nickname: string
  dday: string
  imageString: string
  content: string

  constructor(data: any) {
    this.imageString = data.imageString || ''
    this.nickname = data.nickname || ''
    this.dday = data.dday || ''
    this.content = data.content || ''
  }
}


const FriendList = (props: Props) => {
  const [members, setMembers] = useState<DdayFriends[]>([])
  const test = {
    nickname: 'asd', dday: 'D-2', imageString: 'https://picsum.photos/150/150', content: 'asdasd'
  }
  const testL = [test, test, test, test]
  useEffect(() => {
    setMembers(testL)

  }, [])

  return (
    <Carousel centerMode={true} centerSlidePercentage={20} showThumbs={false} infiniteLoop={true} swipeable={true} showIndicators={false}>
      {
        members.map((member, index) => {
          return (
            <ImgWrap key={index} className='mx-2'>
              <FriendImg src={member.imageString} alt="" />
              <Content>{member.dday}</Content>
              <Dday>{member.content}</Dday>

            </ImgWrap>
          )
        })
      }
    </Carousel >
  )
}
const ImgWrap = styled.div`
  overflow: hidden;
  position: relative;
  `
const FriendImg = styled.img`
  border-radius: 10px;
  object-fit:cover;
  width: 100%;
  opacity: 50%;
`

const Content = styled.div`
  position: absolute;
  top: 30%;
  left: 40%;
  right: 40%;
  z-index:2;

`
const Dday = styled.div`
  position: absolute;
  top: 50%;
  left: 40%;
  right: 40%;
  z-index:2;
`


export default FriendList