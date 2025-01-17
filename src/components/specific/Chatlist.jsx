import { Stack } from '@mui/material';
import React from 'react'
import ChatItem from '../shared/ChatItem';
import { IndeterminateCheckBox } from '@mui/icons-material';
import { bgGradient } from '../constants/color';

const Chatlist = ({
    w="100%",
    chats=[],
    chatId,
    onlineUsers=[],
    newMessagesAlert=[{
        chatId:"",
        count:0,
    },
],
handleDeleteChat,
}) => {
  return (
    <Stack 
    width={w} 
    direction={"column"} 
    overflow={"auto"} 
    height={"100%"}
    >
{
chats?.map((data,index)=>{

const { avatar,_id,name,groupchat,members } = data;

const newMessageAlert=newMessagesAlert.find(
  ({chatId}) => chatId === _id
);

const isOnline = members?.some((member) =>
          onlineUsers.includes(member)
        );

    return (
      <ChatItem 
      index={index}
      newMessageAlert={newMessageAlert}  
      isOnline={isOnline}
      avatar={avatar}
      name={name}
      _id={_id}
      key={_id}
      groupchat={groupchat}
      sameSender={chatId === _id}
      handleDeleteChat={handleDeleteChat}
      />
      );
}
)}  
</Stack> 
  );
};

export default Chatlist;