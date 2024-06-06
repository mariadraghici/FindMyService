import React from 'react'
import Container from '@mui/material/Container'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import Typography from '@mui/material/Typography'
import Stack from '@mui/material/Stack'
import { Grid } from '@mui/material'
import signupImg from '../../img/signup-img.png'
import './signup.css'
import SignupLayout from '../../components/utils/SignUpLayout'

const Signup = () => {

  return (
    <SignupLayout>
          <Stack direction='column' spacing={5} className='signup-stack'>
          <Typography sx={{margin: '2%'}} variant='h5' color='text.primary'>Înregistrează-te</Typography>
          <Stack spacing={2} direction="row" sx={{justifyContent: 'center', marginTop: '2%'}}>
            <Button variant='contained' sx={{width: '10%'}} href='/signup/user'>User</Button>
            <Button variant='contained' sx={{width: '10%'}} href='/signup/service'>Service</Button>
          </Stack>
        </Stack>
    </SignupLayout>
  )
}

export default Signup
