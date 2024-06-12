import Typography from '@mui/material/Typography';
import './facilityTypography.css';

const FacilityTypography = ({text}) => {
    return (
        <Typography gutterBottom variant="h8" component="div" className='color-typography'>
            {text}
        </Typography>
    );
}

export default FacilityTypography;