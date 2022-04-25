import React, { useState } from 'react'

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
  return (
    <div>
      {members.map((member, index) => {
        return (
          <div key={index}>
          </div>
        )
      })}
    </div>
  )
}

export default FriendList