import React from 'react'
import Button from '@mui/material/Button'
import Typography from '@mui/material/Typography'
import Stack from '@mui/material/Stack'
import './signup.css'
import SignupLayout from '../../components/signup/SignUpLayout'
import { Link } from 'react-router-dom'

const Signup = () => {
  return (
    <SignupLayout>
      <Typography sx={{margin: '0% 0% 20% 0%', textAlign: 'center'}} variant='h5'>Înregistrează-te</Typography>
      <Stack direction="row" sx={{justifyContent: 'space-between', marginTop: '2%'}}>
        <Button variant='contained' sx={{width: '40%'}} component={Link} to={'/signup/user'}>
        client
        </Button>
        <Button variant='contained' sx={{width: '40%'}} component={Link} to={'/signup/service'}>
        service
        </Button>
      </Stack>
    </SignupLayout>
  )
}

export default Signup
