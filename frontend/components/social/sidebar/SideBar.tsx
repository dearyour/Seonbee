import styled from '@emotion/styled'
import React from 'react'
import Alarm from './Alarm'
import SideCalendar from './SideCalendar'
import SearchUser from './SearchUser'


type Props = {}
const Wrap = styled.div`
  
`
const SideBar = (props: Props) => {
  return (
    <Wrap className='background-image-2 p-1'>
      <div>나의 벗 맺기 <span>전보</span></div>
      <Alarm></Alarm>
      <div><span>벗</span>의 연동회</div>
      <SideCalendar></SideCalendar>
      <div>다른 <span>벗</span>도 찾아보시오</div>
      <SearchUser></SearchUser>
    </Wrap>
  )
}

export default SideBar