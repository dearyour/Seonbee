import type { NextPage } from 'next'
import { Button, FormControl, InputLabel, Select, MenuItem, Stack, Slider } from '@mui/material'
import styled from '@emotion/styled'

const Asd: NextPage = () => {
  const Test = styled.div`
    color: blue;
    margin: 10px;
  `

  return (
    <div>
      <Test>asdasd</Test>
      <img src='https://picsum.photos/250/250'></img>
      <Button variant="contained" disableElevation>
        Disable elevation
      </Button>
      <div>asdasd</div>
      <FormControl fullWidth>
        <InputLabel id="demo-simple-select-label">Age</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          label="Age"
        >
          <MenuItem value={10}>Ten</MenuItem>
          <MenuItem value={20}>Twenty</MenuItem>
          <MenuItem value={30}>Thirty</MenuItem>
        </Select>
      </FormControl>
      <Stack spacing={2} direction="row" sx={{ mb: 1 }} alignItems="center">

        <Slider aria-label="Volume" />

      </Stack>
      <Slider disabled defaultValue={30} aria-label="Disabled slider" />
    </div>
  )
}

export default Asd;