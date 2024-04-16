import React, {useState} from 'react'
import axios from 'axios'
import {toast} from 'react-toastify'
import Header from '../../components/Header'
import Footer from '../../components/Footer'
import Container from '@mui/material/Container'
import Box from '@mui/material/Box'
import TextField from '@mui/material/TextField'
import Button from '@mui/material/Button'
import Typography from '@mui/material/Typography'
import Stack from '@mui/material/Stack'

const Signup = ({navigate}) => {

  return (
    <Container>
      <Box sx={{display:'flex', flexDirection: 'column', alignItems:'center' }}>
        <Typography sx={{margin: '2%'}} variant='h5'>Sign Up</Typography>
        <Stack spacing={2} direction="row" sx={{justifyContent: 'center', marginTop: '2%'}}>
          <Button variant='contained' sx={{width: '10%'}} href='/signup/user'>User</Button>
          <Button variant='contained' sx={{width: '10%'}} href='/signup/service'>Service</Button>
        </Stack>
      </Box>
    </Container>
  )
}

export default Signup
