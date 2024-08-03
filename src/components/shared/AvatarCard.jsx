import { Avatar, AvatarGroup, Box, Stack } from '@mui/material'
import React from 'react'
import { transformImage } from '../../library/features'

//todo transform
const AvatarCard = ({avatar = [],max=4}) => {
  return (
    <Stack spacing={0.5} direction={"row"}>
    <AvatarGroup max={max} 
    sx={{
      position:"relative",
    }}>
    <Box  width={"5rem"} height={"3rem"}>
        {avatar.map((i,index) => {
           
            return (
              <Avatar
            
                key={Math.random()*100}
                src={transformImage(i)}
                alt={`Avatar ${index}`}
                sx={
                    {
                        width:"3rem",
                        height:"3rem",
                        position:"absolute",
                        left:{
                            xs:`${0.5+index}rem`,
                            sm:`${index}rem`,
                        },
                     }}
/>
            );
        })}
        </Box>
    </AvatarGroup>
    </Stack>
  )
}

export default AvatarCard;