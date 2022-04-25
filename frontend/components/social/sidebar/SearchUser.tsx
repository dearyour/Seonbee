import React, { useState } from 'react'
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import { InputAdornment, TextField } from '@mui/material';
import { BsSearch } from "react-icons/bs";

type Props = {}

const SearchUser = (props: Props) => {
  const [keyword, setKeyword] = useState<string>('');
  const handleChange: React.ChangeEventHandler = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    // console.log(event.target.value)
    setKeyword(event.target.value)
  }

  return (
    <Card className='background-image-1'>
      <CardContent>
        <TextField id="outlined-basic"
          // value={keyword}
          onChange={handleChange}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <BsSearch />
              </InputAdornment>
            ),
          }}
          variant="standard"
        />
      </CardContent>
    </Card>
  )
}

export default SearchUser