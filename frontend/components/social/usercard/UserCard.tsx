import React from 'react'
import { Card } from '@mui/material'
import CardContent from '@mui/material/CardContent';
import CardMember from 'store/interface/social/cardmember'
import Btn from 'components/commons/Btn';


const UserCard = (props: CardMember) => {
  return (
    <Card className=''>
      <CardContent>
        <div>{props.nickname}</div>
        <Btn type="gray" >asd</Btn>
      </CardContent>
    </Card>
  )
}

export default UserCard