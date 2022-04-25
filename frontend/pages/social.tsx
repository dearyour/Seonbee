import styled from '@emotion/styled'
import FriendList from 'components/social/carousel/FriendList'
import SideBar from 'components/social/sidebar/SideBar'
import UserCard from 'components/social/usercard/UserCard'
import React from 'react'

type Props = {}


const social = (props: Props) => {
  const Blue = styled.span`
  color: #38508C;
`
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
          <UserCard></UserCard>
        </div>

      </div>
    </div>
  )
}

export default social