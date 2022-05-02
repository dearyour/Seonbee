import styled from '@emotion/styled'
import FriendList from 'components/social/carousel/FriendList'
import SideBar from 'components/social/sidebar/SideBar'
import UserCard from 'components/social/usercard/UserCard'
import React, { useEffect, useState } from 'react'
import CardMember from 'store/interface/social/cardmember'


type Props = {}



const Blue = styled.span`
color: #38508C;
`
const Social = (props: Props) => {
  const [members, setMembers] = useState<CardMember[]>([])
  const temp_member = {
    nickname: 'asd', schedule: [{ dday: -10, content: "수능" }, { dday: -10, content: "수능" }], verse: "asd", product: [{ imageUrl: "https://picsum.photos/150/150" }], imageString: "https://picsum.photos/150/150"
  }
  useEffect(() => {
    setMembers([temp_member, temp_member, temp_member, temp_member])

  }, [])

  return (
    <div className="container">
      <div className="row mt-3">
        <div className="col-3">
          <SideBar></SideBar>
        </div>
        <div className="col">
          <div>벗에게 안성맞춤인 선물과 함께 <Blue>응원과 축하</Blue>를 건네보시오</div>
          <FriendList></FriendList>
          <div>벗의 <Blue>안부</Blue> 확인하기</div>
          <div className='row'>
            {members.map((now: any, index: any) => {
              return (

                <div className='col-6 mt-2' key={index}>
                  <UserCard {...now}></UserCard>
                </div>
              )
            })}
          </div>
        </div>

      </div>
    </div>
  )
}

export default Social