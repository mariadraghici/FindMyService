import React from 'react'
import Container from '@mui/material/Container'
import Box from '@mui/material/Box'
import { CardContent, Stack } from '@mui/material';
import CardLayout from '../../components/utils/CardLayout';
import './formWithBgImage.css'


const FormWithBgImage = ({children, bgImage, alt}) => {

    return (
      <Container maxWidth={false} sx={{padding: "0 !Important"}}>
        <Box className='box-layout-formatWithBgImage'>
            <img src={bgImage} alt="img-profile" className="img-style-formatWithBgImage" />
            <Container>
            {/* <Stack direction='column' spacing={2} className='card-stack-formatWithBgImage'>
              <CardLayout additionalClasses='card-formatWithBgImage'>
                <CardContent className='card-content-formatWithBgImage'>
                  <Stack direction='column' spacing={3} sx={{justifyContent: 'center', alignItems: 'center'}}>
                      {children}
                  </Stack>
                </CardContent>
              </CardLayout>
            </Stack> */}
            <CardLayout additionalClasses="card-profile-formatWithBgImage">
                        {children}
              </CardLayout>
            </Container>
        </Box>
    </Container>
    )
}

export default FormWithBgImage;