import React, {useEffect, useState} from 'react'
import Container from '@mui/material/Container';
import myAxios from './axios';
import { toast } from 'react-toastify';
import { Link, useNavigate } from 'react-router-dom';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';

const Header = () => {
  const navigate = useNavigate();

  const logout = () => {
    myAxios.get('/api/logout')
    .then(res => {
      if (res.status === 200) {
        toast.success(res.data);
        navigate('/');
      }
    })
    .catch(err => {
      toast.error(err.response.data.error);
    });
  }

  return (
      <Box sx={{ flexGrow: 1 }}>
        <AppBar position="static">
          <Container>
            <Toolbar>
              <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                FindMyService
              </Typography>
              <Button color="inherit" href='/'>Home</Button>
              <Button color="inherit" href='/signup'>Sign Up</Button>
              <Button color="inherit" href='/signin'>Sign in</Button>
              <Button color="inherit" onClick={logout}>Logout</Button>
              <Button color="inherit" href='/dashboard'>My account</Button>
            </Toolbar>
          </Container>
        </AppBar>
      </Box>
  );
}

export default Header;