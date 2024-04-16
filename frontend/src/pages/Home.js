import React from 'react'
import Header from '../components/Header'
import Footer from '../components/Footer'
import Container from '@mui/material/Container'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'

const Home = () => {
  
  return (
    <Container>
      <Box sx={{display:'flex', flexDirection: 'column' }}>
        <h1>Home</h1>
        {/* <Button onClick={() => refresh()}>Refresh Token</Button> */}
      </Box>
    </Container>
  )
}

export default Home
