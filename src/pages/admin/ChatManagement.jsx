import { useFetchData } from '6pp';
import { Avatar, Skeleton, Stack } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { server } from '../../components/constants/config';
import AdminLayout from '../../components/layout/AdminLayout';
import AvatarCard from '../../components/shared/AvatarCard';
import Table from '../../components/shared/Table';
import { useErrors } from '../../hooks/hook';
import { transformImage } from '../../library/features';

const columns=[
  {
  field:"id",
  headerName:"ID",
  headerClassName:"table-header",
  width:200,
},
{
  field:"avatar",
  headerName:"Avatar",
  headerClassName:"table-header",
  width:150,
  renderCell:(params) => <AvatarCard max={100} avatar={params.row.avatar}/>,
},
{
  field:"name",
  headerName:"Name",
  headerClassName:"table-header",
  width:300
},
{
  field:"groupchat",
  headerName:"Group",
  headerClassName:"table-header",
  width:120,
},
{
  field:"totalmembers",
  headerName:"Total Members",
  headerClassName:"table-header",
  width:220,
},
{
  field:"members",
  headerName:"Members",
  headerClassName:"table-header",
  width:400,
  renderCell:(params)=> <AvatarCard max={100} avatar={params.row.members} /> ,
},
{
  field:"totalMessage",
  headerName:"Total Messages",
  headerClassName:"table-header",
  width:180,
},
{
  field:"creator",
  headerName:"Created By",
  headerClassName:"table-header",
  width:250,
  renderCell:(params)=>
    (
    <Stack direction={"row"} alignItems={"center"} spacing={"1rem"}>
      <Avatar alt={params.row.creator.name} src={params.row.creator.avatar} />
      <span>{params.row.creator.name}</span>
    </Stack>
    ),
},
];

const ChatManagement = () => {
  

  const {loading,data,error}=useFetchData(`${server}/api/v1/admin/chats`,"dashboard-chats");
 
  console.log(data);
  useErrors([{
    isError:error,
    error:error, 
  }]);

  const [rows,setrows]=useState([]);

  useEffect(()=>{
    if(data){
      setrows(
        data.chats.map((i)=>({
        ...i,
        id:i._id,
        //avatar:transformImage(i, 50),
        //members:transformImage(i.avatar, 50),
        avatar:i.avatar.map((i)=>typeof i.avatar === 'string' ? transformImage(i,50) : "",),
        members:i.members.map((i)=>typeof i.avatar === 'string' ? transformImage(i.avatar, 50) : ""),
        creator:{
          name: i.creator.name,
          avatar:typeof i.avatar === 'string' ? transformImage(i.creator.avatar, 50) : "",
          //avatar:transformImage(i.creator.avatar, 50),
        },
      }))
    );
    }
  },[data]);

  return (
    <AdminLayout>
        {
          loading ? (<Skeleton height={"100vh"}/>) : (
            <Table heading={"All Chats"} columns={columns} rows={rows} />
          )
        }
    </AdminLayout>
  );
};


export default ChatManagement;