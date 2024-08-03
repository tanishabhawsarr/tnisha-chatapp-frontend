import { useInfiniteScrollTop } from '6pp';
import { AttachFile as AttachFileIcon, Send as SendIcon } from '@mui/icons-material';
import { IconButton, Skeleton, Stack } from '@mui/material';
import React, { Fragment, useCallback, useEffect, useRef, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { graycolor, orange } from '../components/constants/color';
import { ALERT, CHAT_JOINED, CHAT_LEAVED, NEW_MESSAGE, START_TYPING, STOP_TYPING } from '../components/constants/events';
import FileMenu from '../components/dialogs/FileMenu';
import AppLayout from '../components/layout/AppLayout';
import { TypingLoader } from '../components/layout/Loaders';
import MessageComponent from '../components/shared/MessageComponent';
import { InputBox } from '../components/stylescomponent';
import { useErrors, useSocketEvents } from '../hooks/hook';
import { useChatDetailsQuery, useGetMessagesQuery } from '../redux/api/api';
import { removeNewMessagesAlert } from '../redux/reducers/chat';
import { setIsFileMenu } from '../redux/reducers/misc';
import { getSocket } from '../socket';


const Chat = ({chatId,user}) => {

  const containerRef=useRef(null);
  const bottomRef=useRef(null);

  const socket=getSocket();
  const dispatch=useDispatch();
  const navigate=useNavigate();

  const [message,setMessage]=useState("");
  const [messages,setMessages]=useState([]);
  const [page,setPage]=useState(1);
  const [fileMenuAnchor,setFileMenuAnchor]=useState(null);

  const [IAmTyping,setIAmTyping]=useState(false);
  const [userTyping,setUserTyping]=useState(false)
  const typingTimeOut=useRef(null);

  const chatDetails=useChatDetailsQuery({chatId,skip: !chatId});
  const oldMessagesChunk=useGetMessagesQuery({chatId,page});

  const {data:oldMessages,setData:setOldMessages}=
  useInfiniteScrollTop(
    containerRef,
    oldMessagesChunk.data?.totalPages,
    page,
    setPage,
    oldMessagesChunk.data?.messages
  )

  const errors=[
    {isError: chatDetails.isError,error:chatDetails.error},
    {isError: oldMessagesChunk.isError,error:oldMessagesChunk.error}
  ];
  
  const members=chatDetails?.data?.chat?.members;

  const messageOnChange=(e)=>{
    setMessage(e.target.value);

    if(!IAmTyping){
      socket.emit(START_TYPING,{members,chatId});
      setIAmTyping(true);
    }

    if(typingTimeOut.current) clearTimeout(typingTimeOut.current)

    typingTimeOut.current= setTimeout(() => {
      socket.emit(STOP_TYPING,{members,chatId})
      setIAmTyping(false)
    }, [2000]);
  }
  
  const handleFileOpen=(e)=>{
    dispatch(setIsFileMenu(true));
    setFileMenuAnchor(e.currentTarget);
  }

  const submitHandler=(e)=>{
  e.preventDefault();

  if(!message.trim()) return;
  //emitting the message to the server
    socket.emit(NEW_MESSAGE,{chatId,members,message});
    setMessage("");
  };

  useEffect(()=>{
    socket.emit(CHAT_JOINED,{userId: user._id,members})
    dispatch(removeNewMessagesAlert(chatId))
    return ()=> {
    setMessages([]);
    setMessage("");
    setOldMessages([]);
    setPage(1);
    socket.emit(CHAT_LEAVED, {userId: user._id,members});
    };
  },
  [chatId]);

  useEffect(()=>{
    if(bottomRef.current) 
      bottomRef.current.scrollIntoView({behavior:"smooth"});
  },[messages]);

  useEffect(()=>{
  if(chatDetails.isError) return navigate("/");
  },[chatDetails.isError]);

  const newMessagesHandler=useCallback(
    (data)=>{
    if(data.chatId !== chatId) return;

    setMessages((prev)=>[...prev,data.message]);
  },[chatId]);

  const startTypingListener=useCallback(
    (data)=>{
    if(data.chatId !== chatId) return;
   
    setUserTyping(true);
  },[chatId]);

  const stopTypingListener=useCallback(
    (data)=>{
    if(data.chatId !== chatId) return;
 
    setUserTyping(false);
  },[chatId]);

  const alertListner=useCallback(
    (data)=>{
    if(data.chatId !== chatId) return;
      const messageForAlert={
        content:data.message,
        sender:{
          _id:"randomrandom",
          name:"Admin",
        },
        chat:chatId,
        createdAt:new Date().toISOString(),
      };
      setMessages((prev)=>[...prev,messageForAlert]);
  },[chatId]);

 const eventHandler={ 
  [ALERT]: alertListner,
  [NEW_MESSAGE]: newMessagesHandler,
  [START_TYPING]:startTypingListener,
  [STOP_TYPING]:stopTypingListener,
 };

 useSocketEvents(socket,eventHandler);
 useErrors(errors);

 const allMessages=[...oldMessages,...messages]

  return chatDetails.isLoading ? (
  <Skeleton />
)
  :
  ( 
  <Fragment>
  <Stack ref={containerRef}
  boxSizing={"border-box"}
  padding={"1rem"}
  spacing={"1rem"}
  bgcolor={graycolor}
  height={"90%"}
  sx={
    {
      overflowX:"hidden",
      overflowY:"auto",
    }
  }
  >
    {
     allMessages.map((i) => (
      <MessageComponent key={i._id} message={i} user={user} />
    ))}

    {userTyping && <TypingLoader />}

    <div ref={bottomRef}/>
  </Stack>
  <form 
  style={{
    height:"10%",
  }}
  onSubmit={submitHandler}
  >
  <Stack direction={"row"} 
  height={"100%"}
  alignItems={"center"}
  padding={"1rem"}
  position={"relative"}
  >
    <IconButton
    sx={{
      position: "absolute",
      left: "1.5rem",
      rotate: "30deg",
    }}
    onClick={handleFileOpen}
    >
      <AttachFileIcon />
    </IconButton>

    <InputBox 
    placeholder='Type Message Here...' 
    value={message} 
    onChange={messageOnChange}/>

    <IconButton
    type="submit"
    sx={{
      rotate: "-30deg",
      bgcolor: orange,
      color: "white",
      marginLeft: "1rem",
      padding: "0.5rem",
      "&:hover":{
         bgcolor:"error.dark"
      },
          }}
    >
      <SendIcon />
    </IconButton>
  </Stack>

  </form>

  <FileMenu anchorE1={fileMenuAnchor} chatId={chatId}/>
  </Fragment>
  );
};

export default AppLayout()(Chat);