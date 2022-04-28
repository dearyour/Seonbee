import type { NextPage } from 'next'
import { Button, FormControl, InputLabel, Select, MenuItem, Stack, Slider } from '@mui/material'
import styled from '@emotion/styled'
import axios from 'axios'
import { useEffect, useState } from 'react'
import baseurl from 'baseurl'
const Asd: NextPage = () => {
  const [imgtest, setImageUrl] = useState<string>('')

  const image = () => {
    axios({
      method: 'get',
      url: baseurl + 'member/image/0',
    })
      .then((res) => {
        const byteimg = base64ToArrayBuffer(res.data)
        setImageUrl("data:image/png;base64," + btoa(String.fromCharCode.apply(null, Array.from(new Uint8Array(byteimg)))))
      })
  }
  function base64ToArrayBuffer(base64: any) {
    console.log(base64)
    const binaryString = window.atob(base64); // Comment this if not using base64
    const bytes = new Uint8Array(binaryString.length);
    return bytes.map((byte, i) => binaryString.charCodeAt(i));
  }

  const Test = styled.div`
    color: blue;
    margin: 10px;
  `
  class fruit {
    name: string
    id: number

    constructor(data: any | Array<any>) {
      // console.log(typeof data)
      this.name = data.name || ''
      this.id = data.id || 0
    }
  }
  const data = [{ name: '사과', id: null }, { name: '바나나', id: 2 }]
  let f = new Array(new fruit(data))
  let fruits = data.map((now) => {
    return new fruit(now)
  })

  console.log(f)




  return (
    <div className='m-5 rainbow'>
      가나다라마바사
      <button onClick={image}>image</button>
      <img src={imgtest}></img>
    </div>
  )
}

export default Asd;