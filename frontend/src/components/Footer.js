import React from 'react';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';

function Footer() {
  return (
    <Container sx={{bottom: 0, position:'fixed', textAlign: 'center', minWidth: '100%', padding:'1%'}}>
      <Typography variant="h9" sx={{textAlign:'center'}}>Copyright @ 2024 FindMyService </Typography>
    </Container>
  )
}

export default Footer
