import React from 'react'
import Container from '@mui/material/Container'
import Box from '@mui/material/Box'
import { Grid } from '@mui/material'
import signupImg from '../../img/signup-img.jpg'
import './signup-layout.css'
import CardLayout from './CardLayout'

const SignupLayout = ({children}) => {

  return (
    <Container maxWidth={false} sx={{padding: "0 !Important"}}>
      <Grid container>
        <Grid item md={5}>
          <Box className='box-img-signup'>
            <img src={signupImg} alt='signup' className='signup-img'/>
          </Box>
        </Grid>
        <Grid item md={7} xs={12} sx={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
          <CardLayout additionalClasses='card-signup'>
            {children}
          </CardLayout>
        </Grid>
      </Grid>
    </Container>
  )
}

export default SignupLayout;
