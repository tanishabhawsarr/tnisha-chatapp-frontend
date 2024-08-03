import { Button, Dialog, DialogTitle, Skeleton, Stack, Typography } from '@mui/material';
import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useAsyncMutation, useErrors } from '../../hooks/hook';
import { useAddGroupMmebersMutation, useAvailableFirendsQuery } from '../../redux/api/api';
import { setIsAddMembers } from '../../redux/reducers/misc';
import UserItem from '../shared/UserItem';

const AddMemberDialog = ({ chatId}) => {

const dispatch=useDispatch();
const {isLoading,data,error,isError}=useAvailableFirendsQuery(chatId);

const {isAddMember}=useSelector((state)=>state.misc)
const [addMember,isLoadingAddMember]=useAsyncMutation
(useAddGroupMmebersMutation)
    
const [selectedMembers,setSelectedMembers]=useState([]);



   const selectMemberHandler=(id)=>{ 
     setSelectedMembers(prev=>
      prev.includes(id) 
      ? prev.filter((currElement)=> currElement !== id)
      : [...prev,id]
    );
   };

    const addMmeberSubmitHandler=()=>{
      addMember("Adding members...",{members:selectedMembers,chatId})
        closeHandler();
    };

    const closeHandler=()=>{
      dispatch(setIsAddMembers(false));
    };
    useErrors([{isError, error}])

  return (
    <Dialog open={isAddMember} onClose={closeHandler}>
        <Stack p={"2rem"} width={"20rem"} spacing={"2rem"}>
            <DialogTitle textAlign={"center"}>Add Member</DialogTitle>

            <Stack spacing={"1rem"}>
            {isLoading ? 
            ( 
              <Skeleton /> 
              )
              :
            data?.friends?.length > 0 ? (data?.friends?.map((i)=>
                (
                  <UserItem key={i._id} 
                  user={i} 
                  handler={selectMemberHandler} 
                  isAdded={selectedMembers.includes(i._id)} 
                  />
                )) 
                ): (
                    <Typography textAlign={"center"}>No Friends</Typography>
                )
            }
          
            </Stack>
            <Stack direction={"row"} alignItems={"center"} justifyContent={"space-evenly"}>
                <Button color='error' onClick={closeHandler}>Cancel</Button>
                <Button 
                onClick={addMmeberSubmitHandler} 
                variant='contained' 
                disabled={isLoadingAddMember}
                >
                Submit Changes
                </Button>
            </Stack>
        </Stack>
    </Dialog>
  );
};

export default AddMemberDialog;