import React from 'react'
import Container from '@mui/material/Container'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import Typography from '@mui/material/Typography'
import Stack from '@mui/material/Stack'

const Signup = () => {

  return (
    <Container>
      <Box sx={{display:'flex', flexDirection: 'column', alignItems:'center' }}>
        <Typography sx={{margin: '2%'}} variant='h5'>Înregistrează-te</Typography>
        <Stack spacing={2} direction="row" sx={{justifyContent: 'center', marginTop: '2%'}}>
          <Button variant='contained' sx={{width: '10%'}} href='/signup/user'>User</Button>
          <Button variant='contained' sx={{width: '10%'}} href='/signup/service'>Service</Button>
        </Stack>
      </Box>
    </Container>
  )
}

export default Signup
