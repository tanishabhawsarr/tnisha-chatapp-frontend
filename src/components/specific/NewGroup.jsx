import { useInputValidation } from '6pp'
import { Button, Dialog, DialogTitle, Skeleton, Stack, TextField, Typography } from '@mui/material'
import React, { useState } from 'react'
import toast from 'react-hot-toast';
import { useDispatch, useSelector } from 'react-redux'
import { useAsyncMutation, useErrors } from '../../hooks/hook'
import { useAvailableFirendsQuery, useNewGroupMutation } from '../../redux/api/api'
import { setIsNewGroup } from '../../redux/reducers/misc'
import UserItem from '../shared/UserItem'


const NewGroup = () => {

  const {isNewGroup}=useSelector(state=>state.misc);


  const groupname= useInputValidation("");
  const dispatch=useDispatch();

  const {isError,isLoading,error,data}=useAvailableFirendsQuery();
  const [newGroup,isLoadingNewGroup]=useAsyncMutation(useNewGroupMutation)
 
  const [selectedMembers,setSelectedMembers]=useState([]);
  
  const errors=[{
    isError,
    error,
  }]

  useErrors(errors);

   const selectMemberHandler=(id)=>{ 
     setSelectedMembers(prev=>
      prev.includes(id) 
      ? prev.filter((currElement)=> currElement !== id)
      : [...prev,id]
    );
   };

   const submitHandler=()=>{
    if(!groupname.value) return toast.error("Group name is required");

    if(selectedMembers.length < 2) return toast.error("Please Select Atleast 3 Mmebers");

   newGroup("Creating Mew Group...",{ name:groupname.value, members:selectedMembers });

    closeHandler();
   };

   const closeHandler=()=>{
    dispatch(setIsNewGroup(false));
   };

  return (
    <Dialog open={isNewGroup} onClose={closeHandler}>
      <Stack p={{ xs:"1rem", sm:"3rem" }} maxWidth={"25rem"} spacing={"2rem"}>
        <DialogTitle textAlign={"center"} variant='h4'>New Group</DialogTitle>

        <TextField label="Group Name" value={groupname.value} onChange={groupname.changeHandler}/>

        <Typography>
          Members
        </Typography>
        <Stack>
        {isLoading 
        ? 
        (
          <Skeleton /> 
        )
        : 
        ( 
          data?.friends?.map((i) => (
         <UserItem 
            user={i} 
            key={i._id} 
            handler={selectMemberHandler} 
            isAdded={selectedMembers.includes(i._id)}
            />
          ))
          )
          }
        </Stack>

        <Stack direction={"row"} justifyContent={"space-evenly"}>
          <Button 
          variant='text' 
          color='error' 
          size='large' 
          onClick={closeHandler}
          >Cancel
          </Button>
          <Button 
          variant='contained' 
          size='large' 
          onClick={submitHandler} 
          disabled={isLoadingNewGroup}
          >Create
          </Button>
        </Stack>
      </Stack>
    </Dialog>
  )
}

export default NewGroup;