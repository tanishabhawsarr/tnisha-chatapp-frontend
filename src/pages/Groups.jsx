import { Add as AddIcon, Delete as DeleteIcon, Done as DoneIcon, Edit as EditIcon, KeyboardBackspace as KeyboardBackspaceIcon, Menu as MenuIcon } from '@mui/icons-material';
import { Backdrop, Box, Button, CircularProgress, Drawer, Grid, IconButton, Stack, TextField, Tooltip, Typography } from '@mui/material';
import React, { lazy, memo, Suspense, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { bgGradient, matBlack } from '../components/constants/color';
import { LayoutLoader } from '../components/layout/Loaders';
import AvatarCard from '../components/shared/AvatarCard';
import UserItem from '../components/shared/UserItem';
import { Link } from '../components/stylescomponent';
import { useAsyncMutation, useErrors } from '../hooks/hook';
import { useChatDetailsQuery, useDeleteChatMutation, useMyGroupsQuery, useRemoveGroupMmebersMutation, useRenameGroupMutation } from '../redux/api/api';
import { setIsAddMembers } from '../redux/reducers/misc';

const ConfirmDeleteDialog=lazy(()=>
import("../components/dialogs/confirmDeleteDialog")
);

const AddMemberDialog=lazy(()=>
import("../components/dialogs/AddMemberDialog")
);


const Groups = () => {

  const chatId=useSearchParams()[0].get("group")
  const navigate= useNavigate();
  const dispatch=useDispatch();

  const {isAddMember}=useSelector((state)=>state.misc)

  const myGroups=useMyGroupsQuery("");

  const groupDetails=useChatDetailsQuery({chatId,populate:true},{skip: !chatId})

  const [updateGroup,isLoadingGroupName]=useAsyncMutation
  (useRenameGroupMutation)

  const [removeMmeber,isLoadingRemoveMember]=useAsyncMutation
  (useRemoveGroupMmebersMutation)

  const [deleteGroup,isLoadingDeleteGroup]=useAsyncMutation
  (useDeleteChatMutation)

  const [isMobileMenuOpen,setisMobileMenuOpen]= useState(false);
  const [isEdit, setIsEdit]=useState(false);
  const [confirmDeleteDialog,setconfirmDeleteDialog]=useState(false);

  const [groupName,setgroupName]=useState("");
  const [groupNameUpdatedValue,setgroupNameUpdatedValue]=useState("");

  const [members,setMembers]=useState([])

  const errors=[{
    isError:myGroups.isError,
    error:myGroups.error, 
  },
  {
    isError:groupDetails.isError,
    error:groupDetails.error, 
  }
];

  useErrors(errors);

  useEffect(()=>{
    const groupData=groupDetails.data;
    if(groupData){
      setgroupName(groupData.chat.name);
      setgroupNameUpdatedValue(groupData.chat.name);
      setMembers(groupData.chat.members);
    }

    return ()=>{
      setgroupName("");
      setgroupNameUpdatedValue("");
      setMembers([]);
      setIsEdit(false)
  }

  },[groupDetails.data])

  const navigateBack=()=>{
    navigate("/");
  };
  
  const handleMobile=()=>{
  setisMobileMenuOpen((prev)=>!prev);
  };

  const handleMobileClose=()=>setisMobileMenuOpen(false);

  const updateGroupName=()=>{
    setIsEdit(false);
    updateGroup("Updating Group Name...",{
      chatId,
      name:groupNameUpdatedValue,
    });
  };
  
  const openConfirmDeleteHandler=()=>{
    setconfirmDeleteDialog(true);
  };

  const closeConfirmDeleteHandler=()=>{
    setconfirmDeleteDialog(false);
  };

  const openAddMemberHandler=()=>{
    dispatch(setIsAddMembers(true));
  };

  const removeMemberHandler=(userId)=>{
    removeMmeber("Removing member..",{chatId,userId})
  };

  const deleteHandler=()=>{
   deleteGroup("Deleting Group...",chatId)
   closeConfirmDeleteHandler();
   navigate("/groups")
    };

  useEffect(()=>{
  if (chatId){
    setgroupName(`Group Name ${chatId}`);
  setgroupNameUpdatedValue(`Group Name ${chatId}`);
  }

  return()=>{
  setgroupName("");
  setgroupNameUpdatedValue("");
  setIsEdit(false);
  };
},[chatId]);

  const IconBtns=(
  <>
  <Box sx={{
    xs:"block",
    sm:"none", 
    position:"fixed",
    right:"1rem",
    top:"1rem",
  }}>
  <IconButton onClick={handleMobile}>
    <MenuIcon />
  </IconButton>
  </Box>

  <Tooltip title="back">
    <IconButton sx={{
      position:"absolute",
      top:"2rem",
      left:"2rem",
      bgcolor:matBlack,
      color:"white", 
      ":hover":{
        bgcolor:"rgba(0,0,0,0.7)",
      },
    }}
    onClick={navigateBack}
    >
      <KeyboardBackspaceIcon />
    </IconButton>
  </Tooltip>
  </>
  );

  const GroupName=<
  Stack 
  direction={"row"} 
  alignItems={"center"} 
  justifyContent={"center"} 
  spacing={"1rem"} 
  padding={"3rem"}>
  {
    isEdit? (
      <>
        <TextField 
        value={groupNameUpdatedValue} 
        onChange={(e)=> setgroupNameUpdatedValue(e.target.value)} 
        />
        <IconButton 
        onClick={updateGroupName} 
        disabled={isLoadingGroupName}>
          <DoneIcon />
        </IconButton>
      </>
    ) : (
      <>
      <Typography variant='h4'>{groupName}</Typography>
      <IconButton 
      disabled={isLoadingGroupName} 
      onClick={()=> setIsEdit(true)}>
      <EditIcon />
      </IconButton>
    </>
    )
  }
  </Stack>
  
  const ButtonGroup=(
    <Stack
    direction={{
        xs:"column-reverse",
        sm:"row",  
      }}
      spacing={"1rem"}
      p={{
         xs:"0",
         sm:"1rem",
         md:"1rem 4rem",
      }}
      >
      <Button 
      size="large" 
      color='error' 
      startIcon={<DeleteIcon />} 
      onClick={openConfirmDeleteHandler}
      >
      Delete Group
      </Button>
      <Button 
      size="large" 
      variant="contained" 
      startIcon={<AddIcon />} 
      onClick={openAddMemberHandler
      }
      >Add Member
      </Button>
    </Stack>
  )

  return myGroups.isLoading ? <LayoutLoader /> : (
  <Grid container height={"100vh"}>

  <Grid 
  item
  sx={{
    display:{
    xs:"none",
    sm:"block",
    },
  }}
  sm={4}
  >
    <GroupList myGroups={myGroups?.data?.groups} chatId={chatId}/>
  </Grid>

  <Grid item xs={12} sm={8} sx={{
    display:"flex",
    flexDirection:"column",
    alignItems:"center",
    position:"relative",
    padding:"1rem 3rem",
  }}
  >
  {IconBtns}
  {groupName &&  (
    <>
  {GroupName}
  <Typography margin={"2rem"} alignSelf={"flex-start"} variant="body1">
    Members
  </Typography>
  <Stack
  maxWidth={"45rem"}
  width={"100%"}
  boxSizing={"border-box"}
  padding={{
    xs:"0",
    sm:"1rem",
    md:"1rem 4rem",
  }}
  spacing={"2rem"}
  height={"50vh"}
  overflow={"auto"}
  >
   {/* */}
   { isLoadingDeleteGroup ? (
    <CircularProgress /> )
     : (
    members.map((i)=>
    (
      <UserItem 
      user={i} 
      isAdded
      key={i._id}
      styling={{
        boxShadow:"0 0 0.5rem rgba(0,0,0,0.2)",
        padding:"1rem 2rem",
        borderRadius:"0.5rem",
      }} 
        handler={removeMemberHandler}
      />
    ))
     )
   }
  </Stack>
  {ButtonGroup}
  </>
  )}
  </Grid>

  {
    isAddMember && (
      <Suspense fallback={<Backdrop open
      />}>
    <AddMemberDialog chatId={chatId}/>
    </Suspense>
  )}

  {confirmDeleteDialog && (
    <Suspense fallback={<Backdrop open />}>
    <ConfirmDeleteDialog 
    open={confirmDeleteDialog} 
    handleClose={closeConfirmDeleteHandler} 
      deleteHandler={deleteHandler}
    />
  </Suspense> 
  )}
  
  <Drawer sx={{
    display:{
      xs:"block",
      sm:"none",
    },
  }}
  open={isMobileMenuOpen} 
  onClose={handleMobileClose}
  >
  <GroupList w={"50vw"} myGroups={myGroups?.data?.groups} chatId={chatId} />
   </Drawer>

  </Grid>
  );
};

const GroupList=({w="100%",myGroups=[],chatId}) => (
  <Stack 
  width={w}
  sx={{
    backgroundImage:bgGradient,
    height:"100vh",
    overflow:"auto",
  }}
   >
    {myGroups.length > 0 ? (
      
      myGroups.map((group)=> <GroupListItem group={group} chatId={chatId} key={group._id}/>)
      
   )  :  (
     <Typography textAlign={"center"} padding={"1rem"}>
      No Groups
     </Typography>
    )}
  </Stack>
);

const GroupListItem = memo(({group, chatId})=>{
    const {name,avatar,_id }=group;

    return (
    <Link to={`?group=${_id}`} onClick={(e) => 
    { if(chatId===_id) e.preventDefault();
    }}
    >
      <Stack direction={"row"} alignItems={"center"} spacing={"1rem"}>
        <AvatarCard avatar={avatar}/>
        <Typography>{name}</Typography>
      </Stack>
    </Link>
);
});

export default Groups;