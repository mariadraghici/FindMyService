import './profileLayout.css';
import { Box, Container } from '@mui/material';
import { Grid } from '@mui/material';
import UserSidebar from '../UserSidebar';
import bgImage from '/img/profile-car-img.png';
import CardLayout from '../../utils/CardLayout';

const ProfileLayout = ({ children, withCard }) => {
    return (
        <Container maxWidth={false} sx={{padding: "0 !Important"}}>
            <Box className='box-layout'>
                <img src={bgImage} alt="img-profile" className="img-style" />
                <Container>
                <Grid container direction={'column'} alignItems={'center'}>               
                    <UserSidebar/>
                    {withCard === true && <CardLayout additionalClasses="card-profile">
                        {children}
                    </CardLayout>}
                    {withCard === false && children}
                </Grid>
                </Container>
            </Box>
        </Container>

    );
}

export default ProfileLayout;