import { useInputValidation } from '6pp';
import { Button, Container, Paper, TextField, Typography } from '@mui/material';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';
import { adminLogin, getAdmin } from '../../redux/thunks/admin';



const AdminLogin = () => {

  const {isAdmin}=useSelector(state=>state.auth);
  const dispatch=useDispatch();

  const secretKey=useInputValidation(" ");

    const submithandler=(e)=>{
        e.preventDefault();
        dispatch(adminLogin(secretKey.value));
    }

    useEffect(()=>{
      dispatch(getAdmin())
    },[dispatch]);

    if (isAdmin) return <Navigate to="/admin/dashboard" />;

    return (
    <div style={{
        backgroundImage:"linear-gradient(rgb(225 225 209),rgb(249 159 159))",
              }
       }>
       <Container component={"main"} maxWidth="xs" sx={{
         height:"100vh",
         display:"flex",
         alignItems:"center",
         justifyContent:"center",
       }}>
       <Paper
       elevation={3}
       sx={{
         padding:4,
         display:'flex',
         flexDirection:'column',
         alignItems:"center",
       }}
       >
           <Typography  variant='h5' >Admin Login</Typography>
           <form style={{
             width:"100%",
             marginTop:"1rem",
           }}
           onSubmit={submithandler}
           >

             <TextField
             required
             fullWidth
             label="Secret Key"
             type='password'
             margin='normal'
             variant='outlined'
             value={secretKey.value}
             onChange={secretKey.changeHandler}
             >
             </TextField>

             <Button
             sx={{
               marginTop: "1rem",
               backgroundColor: "blue", 
             width: "100%", 
             }} 
             variant="contained"
             color="primary" 
             type="submit"
             fullWidth
             >
              Login
            </Button>
            
           </form>
       </Paper>
    </Container>  
    </div>
  );
};

export default AdminLogin;