import React from 'react'
import { Grid ,Skeleton, Stack} from '@mui/material'
import { BouncingSkeleton } from '../stylescomponent';

const LayoutLoader = () => {
  return (
    <Grid container height={"calc (100vh - 1rem)"} spacing={"1rem"} >
            <Grid 
            item 
            xs={4} 
            md={3} 
            sx={{
              display:{ xs:"none",md:"block" }
            }} 
            height={"100%"}
             >
            <Skeleton variant="rounded" height={"100vh"} />
            </Grid>

            <Grid 
            item 
            xs={12} 
            sm={8} 
            md={5} 
            lg={6} 
            height={"100%"} 
            > 
           <Stack spacing={".5rem"}>
           {Array.from({length:10}).map((_,index)=>(
                    <Skeleton key={index} variant="rounded" height={"3.5rem"}/>
                ))}
           </Stack>
            </Grid>

            <Grid 
            item 
            md={4} 
            lg={3} 
            sx={{
              display:{ xs:"none",md:"block" },
            }} 
            height={"100%"} 
            >
            <Skeleton variant="rounded" height={"100vh"}/>
            </Grid>

            </Grid>
  )
};

const TypingLoader=()=>{
   return <Stack
   spacing={"0.5rem"}
   direction={"row"}
   padding={"0.5rem"}
   justifyContent={"center"}
   >
    <BouncingSkeleton 
    variant="circular" 
    width={15} 
    height={15} 
    style={{
      animationDelay:"0.1s",
    }} />
    <BouncingSkeleton 
    variant="circular" 
    width={15} 
    height={15} 
    style={{
      animationDelay:"0.2s",
    }} />
    <BouncingSkeleton 
    variant="circular" 
    width={15} 
    height={15} 
    style={{
      animationDelay:"0.4s",
    }} />
    <BouncingSkeleton 
    variant="circular" 
    width={15} 
    height={15} 
    style={{
      animationDelay:"0.6s",
    }} />

   </Stack>
}

export {TypingLoader, LayoutLoader}