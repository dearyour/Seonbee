import styled from '@emotion/styled'
import { Button } from '@mui/material'
import React, { MouseEventHandler, useEffect } from 'react'

interface Props {
  type?: string
  size?: string
  clickEvent?: MouseEventHandler
  children?: any
}
const temp = () => {

}


const Btn = ({ type = 'blank', size = '', clickEvent = temp, children }: Props) => {
  let fontColor = ''
  let backColor = ''
  if (type === 'navy') {
    backColor = 'navy'
    fontColor = 'white'

  } else if (type === 'gray') {
    backColor = 'gray'
    fontColor = 'white'
  }
  const BtnStyle = {
    width: size,
    backgroundColor: backColor,
    color: fontColor
  }


  return (
    <Button style={BtnStyle} onClick={clickEvent}>{children}</Button>
  )
}

export default Btn