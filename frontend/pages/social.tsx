import FriendList from 'components/social/carousel/FriendList'
import SideBar from 'components/social/sidebar/SideBar'
import UserCard from 'components/social/usercard/UserCard'
import React from 'react'

type Props = {}


const social = (props: Props) => {

  return (
    <div className="container">
      <div className="row mt-3">
        <div className="col-3">
          <SideBar></SideBar>
        </div>
        <div className="col">
          <div>벗에게 안성맞춤인 선물과 함께 <span>응원과 축하</span>를 건네보시오</div>
          <FriendList></FriendList>
          <div>벗의 <span>안부</span> 확인하기</div>
          <UserCard></UserCard>
        </div>

      </div>
    </div>
  )
}

export default social