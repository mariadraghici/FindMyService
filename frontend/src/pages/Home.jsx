import React, { useContext } from 'react'
import Container from '@mui/material/Container'
import Box from '@mui/material/Box'
import ServiceContext from '../components/context/ServiceContext'
import './home.css'
import { Grid, Typography } from '@mui/material'
import landingpage from '../img/landing_page.png'
import logo from '../img/logo_light_mare.png'
import  ProfileContext from '../components/context/ProfileContext'

const Home = () => {
  // const {service} = React.useContext(ServiceContext);
  const {user} = useContext(ProfileContext);
  
  return (
    <Container maxWidth={false} sx={{padding: "0 !Important"}}>
       <Box sx={{display:'flex', flexDirection: 'column', justifyContent: 'center'}} className='box-home'>
        <img src={landingpage} alt="home" className="img-width-home" />
        <Grid container spacing={1} direction="column" sx={{position: 'absolute', alignItems: 'center', justifyContent: 'center', marginBottom: '10%'}}>
          <Grid item sx={{display: 'flex', justifyContent: 'center'}}>
          <img src={logo} alt="logo" className='big-logo'/>
          </Grid>
          <Grid item sx={{display: 'flex', justifyContent: 'center'}}>
          <Typography component="div" align='center' className='big-text'>
            Îngrijește-ți mașina azi, pentru drumuri sigure mâine.
          </Typography>
          </Grid>
        </Grid>
       </Box>
     </Container>
  )
}

export default Home
