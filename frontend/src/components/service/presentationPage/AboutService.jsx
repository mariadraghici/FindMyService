
import React from 'react';
import { Box, Typography, Card, CardContent, Stack } from '@mui/material';
import RoomRoundedIcon from '@mui/icons-material/RoomRounded';
import EmailRoundedIcon from '@mui/icons-material/EmailRounded';
import LocalPhoneRoundedIcon from '@mui/icons-material/LocalPhoneRounded';
import star from '/img/star.png';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';

const convertNewlinesToBreaks = (text) => {
    if (!text) {
        return (
            <React.Fragment>
                <br />
            </React.Fragment>
        )
    }
    return text.split('\n').map((item, index) => {
        return (
            <React.Fragment key={index}>
                {item}
                <br />
            </React.Fragment>
        );
    });
};

const AboutService = ({ service, location, scheduleEditButton, onOwnPage,
    setScheduleEditButton, setSchedule, handleScheduleEditing, schedule }) => {
    const { name, email, phone } = service;

    return (
        <Card sx={{borderRadius: '0px 0px 7px 7px', width: '100%', marginBottom: '3%', backgroundColor: '#EEEEEE'}}>
            <CardContent>
                <Stack spacing={2} direction="row" justifyContent="space-between" sx={{marginBottom: '3%'}}>
                    <Typography gutterBottom variant="h5">
                        {name}
                    </Typography>
                    <Stack spacing={2} direction="row" justifyContent="flex-end">
                        <img src={star} alt="rating" />
                        <Typography gutterBottom variant="h5" component="div">
                            {service.rating} / 5.0
                        </Typography>
                    </Stack>
                </Stack>
                <Box sx={{display: 'flex', flexDirection: 'row'}}>
                    <RoomRoundedIcon sx={{color: 'primary.main', marginRight: '1%'}}/>
                        <Typography gutterBottom variant="h8" component="div">
                            {location}
                        </Typography>
                </Box>
                <Box sx={{display: 'flex', flexDirection: 'row', marginTop: '2%'}}>
                    <EmailRoundedIcon sx={{color: 'primary.main', marginRight: '1%'}}/>
                    <Typography gutterBottom variant="h8" component="div">
                        {email}
                    </Typography>
                </Box>
                <Box sx={{display: 'flex', flexDirection: 'row', marginTop: '2%'}}>
                    <LocalPhoneRoundedIcon sx={{color: 'primary.main', marginRight: '1%'}}/>
                        <Typography gutterBottom variant="h8" component="div">
                            {phone}
                        </Typography>
                </Box>

                        <Stack spacing={2} direction="row" justifyContent="space-between" sx={{marginTop: "2%"}}>
                            <Typography gutterBottom variant="h6" component="div">
                                Program
                            </Typography>
                            {scheduleEditButton === false && onOwnPage && <Button onClick={() => setScheduleEditButton(true)}>EDITEAZĂ</Button>}
                            </Stack>
                             {scheduleEditButton === false &&
                             <Typography gutterBottom variant="h8" component="div">
                             {convertNewlinesToBreaks(schedule)}
                            </Typography>}
                            {scheduleEditButton === true && onOwnPage &&
                            <TextField
                            size='medium' variant="filled" onChange={(e) => setSchedule(e.target.value)}
                            type="text" name="program"
                            value={schedule}
                            fullWidth
                            label='Program'
                            InputLabelProps={{
                                style: { color: '#8E8E8E' },
                            }}
                            multiline/>}
                            <Stack spacing={2} direction="row" justifyContent="flex-end" >
                            {scheduleEditButton === true && <Button onClick={handleScheduleEditing} variant='contained' color='primary'>Gata</Button>}
                            </Stack>
                        </CardContent>
                    </Card>
    );
}

export default AboutService;