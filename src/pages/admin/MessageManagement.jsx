import { useFetchData } from '6pp';
import { Avatar, Box, Skeleton, Stack } from '@mui/material';
import moment from 'moment';
import React, { useEffect, useState } from 'react';
import { server } from '../../components/constants/config';
import AdminLayout from '../../components/layout/AdminLayout';
import RenderAttachment from '../../components/shared/RenderAttachment';
import Table from '../../components/shared/Table';
import { useErrors } from '../../hooks/hook';
import { fileformat, transformImage } from '../../library/features';


const columns=[
  {
  field:"id",
  headerName:"ID",
  headerClassName:"table-header",
  width:200,
},
{
  field:"attachments",
  headerName:"Attachments",
  headerClassName:"table-header",
  width:200,
  renderCell: (params)=>
  {
    const {attachments}=params.row;

    return attachments ?.length > 0 ? attachments.map((i)=>{

      const url=i.url;
      const file=fileformat(url);

      return <Box key={url}>
      <a 
        href={url}
        download
        target="_blank"
        style={{
          color:"black",
        }}
        >
        {RenderAttachment(file,url)}
      </a></Box>
    })
    : 
    "No Attachments";
  },
},
{
  field:"content",
  headerName:"Content",
  headerClassName:"table-header",
  width:400,
},
{
  field:"sender",
  headerName:"Sent By",
  headerClassName:"table-header",
  width:200,
  renderCell: (params)=>
    (
    <Stack direction={"row"} alignItems={"center"} spacing={"1rem"}>
    <Avatar alt={params.row.sender.name} src={params.row.sender.avatar.url} />
    <span>{params.row.sender.name}</span>
    </Stack>
    ),
},
{
  field:"chat",
  headerName:"Chat",
  headerClassName:"table-header",
  width:220,
},
{
  field:"groupchat",
  headerName:"Group Chat",
  headerClassName:"table-header",
  width:100,
},
{
  field:"createdAt",
  headerName:"Time",
  headerClassName:"table-header",
  width:250,
},
];


const MessageManagement = () => {

  const {loading,data,error}=useFetchData(`${server}/api/v1/admin/messages`,"dashboard-messages");
  useErrors([{
    isError:error,
    error:error, 
  }]);
  
  const [rows,setrows]=useState([]);

  useEffect(()=>{

    if(data){
      setrows(
        data.messages.map((i)=>({
         ...i,
         id:i._id,
         sender:{
          name:i.sender.name,
          //avatar:transformImage(i.sender.avatar, 50),
          avatar:typeof i.avatar === 'string' ? transformImage(i.sender.avatar, 50) : "",
         },
         createdAt:moment(i.createdAt).format("MMMM Do YYYY, h:mm:ss a")
        }))
      );
    }

  },[data]);

  return (
   <AdminLayout>
     {
      loading? (<Skeleton height={"100vh"}/>) : (
        <Table heading={"All Messages"} columns={columns} rows={rows} rowHeight={200}/>
      )
     }
   </AdminLayout>
  )
}

export default MessageManagement;

