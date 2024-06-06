import React from 'react'
import Container from '@mui/material/Container'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import Typography from '@mui/material/Typography'
import Stack from '@mui/material/Stack'
import { Grid } from '@mui/material'
import signupImg from '../../img/signup-img.png'
import './signup-layout.css'

const SignupLayout = ({children}) => {

  return (
    <Container maxWidth={false} sx={{padding: "0 !Important"}}>
      <Grid container>
        <Grid item md={5}>
          <Box className='box-img-signup'>
            <img src={signupImg} alt='signup' className='signup-img'/>
          </Box>
        </Grid>
        <Grid item md={7} xs={12}>
          {children}
        </Grid>
      </Grid>
    </Container>
  )
}

export default SignupLayout;
