import React from 'react';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Link from '@mui/material/Link';
import styled from '@mui/material/styles/styled';

const FooterContainer = styled('footer')({
  padding: '10px 0',
  marginTop: 'auto',
});

const Footer = () => {
  return (
    <FooterContainer>
      <Container maxWidth="md">
        <Typography variant="body2" color="textSecondary" align="center">
          {'© '}
          <Link color="inherit">
            FindMyService
          </Link>{' '}
          {new Date().getFullYear()}
          {'.'}
        </Typography>
      </Container>
    </FooterContainer>
  );
};

export default Footer
