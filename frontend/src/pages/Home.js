import React from 'react'
import Container from '@mui/material/Container'
import Box from '@mui/material/Box'
import ServiceContext from '../components/context/ServiceContext'
import './home.css'
import { Grid, Typography } from '@mui/material'
import { Stack } from 'react-bootstrap'
import zIndex from '@mui/material/styles/zIndex'

const Home = () => {
  const {service} = React.useContext(ServiceContext);
  console.log(service);
  
  return (
    <Container maxWidth={false} sx={{padding: "0 !Important"}}>
       <Box sx={{display:'flex', flexDirection: 'column', justifyContent: 'center'}}>
        <img src={require("../img/landing_page.png")} alt="home" className="img-width-home" />
        <Grid container spacing={1} direction="column" sx={{position: 'absolute', alignItems: 'center', justifyContent: 'center', marginBottom: '10%'}}>
          <Grid item sx={{display: 'flex', justifyContent: 'center'}}>
          <img src={require("../img/logo_light_mare.png")} alt="logo" className='big-logo'/>
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
