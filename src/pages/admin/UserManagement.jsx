import { useFetchData } from '6pp';
import { Avatar, Skeleton } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { server } from '../../components/constants/config';
import AdminLayout from '../../components/layout/AdminLayout';
import Table from '../../components/shared/Table';
import { useErrors } from '../../hooks/hook';
import { transformImage } from '../../library/features';

const columns=[
  {
  field:"id",
  headerName:"ID",
  headerClassName:"table-header",
  width:250,
},
{
  field:"avatar",
  headerName:"Avatar",
  headerClassName:"table-header",
  width:100,
  renderCell:(params)=>
  (
  <Avatar alt={params.row.name} src={params.row.avatar} />
  ),
},
{
  field:"name",
  headerName:"Name",
  headerClassName:"table-header",
  width:200
},
{
  field:"username",
  headerName:"Username",
  headerClassName:"table-header",
  width:200,
},
{
  field:"friends",
  headerName:"Friends",
  headerClassName:"table-header",
  width:100,
},
{
  field:"groups",
  headerName:"Groups",
  headerClassName:"table-header",
  width:100,
},
];

const UserManagement = () => {

  const {loading,data,error}=useFetchData(`${server}/api/v1/admin/users`,"dashboard-users");

  useErrors([{
    isError:error,
    error:error, 
  }]);


  const [rows,setrows]=useState([]);

  useEffect(()=>{
   if(data){
    setrows
    (data.users.map((i)=>
      ({
      ...i,
      id: i._id,
      //avatar:transformImage(i.avatar,50),
      avatar:typeof i.avatar === 'string' ? transformImage(i.avatar, 50) : "",
    }))
  )
   }
},[data]);

  return (
    <AdminLayout>
       {loading ? 
        (
          <Skeleton height={"100vh"}/>
        )
        :
        (
          <Table heading={"All Users"} columns={columns} rows={rows} />
        )
       }
    </AdminLayout>
  );
};

export default UserManagement;