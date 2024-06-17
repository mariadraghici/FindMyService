import React from 'react'
import Container from '@mui/material/Container'
import Box from '@mui/material/Box'
import { CardContent, Stack } from '@mui/material';
import CardLayout from '../../components/utils/CardLayout';
import './formWithBgImage.css'


const FormWithBgImage = ({children, bgImage, alt}) => {

    return (
        <Container maxWidth={false} sx={{padding: "0 !Important"}}>
        <Box sx={{display:'flex', flexDirection: 'column', justifyContent: 'center' }}>
          <img src={bgImage} alt={alt} className="img-bg"/>       
          <Stack direction='column' spacing={2} className='card-stack'>
            <CardLayout additionalClasses='card-signin'>
              <CardContent className='card-content'>
                <Stack direction='column' spacing={3} sx={{justifyContent: 'center', alignItems: 'center'}}>
                    {children}
                </Stack>
              </CardContent>
            </CardLayout>
          </Stack>
        </Box>
      </Container>
    )
}

export default FormWithBgImage;