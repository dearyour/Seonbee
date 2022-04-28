import type { NextPage } from 'next'
import { Button, FormControl, InputLabel, Select, MenuItem, Stack, Slider } from '@mui/material'
import styled from '@emotion/styled'

const Asd: NextPage = () => {


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
    </div>
  )
}

export default Asd;