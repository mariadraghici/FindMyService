import FormWithBgImageLayout from '../components/utils/FormWithBgImageLayout';
import { Button, FormControl, InputAdornment, OutlinedInput, Stack, InputLabel, Typography } from '@mui/material';
import signinImage from '/img/signin_photo.png';
import { useState } from 'react';
import MyTextField from '../components/utils/MyTextField';
import myAxios from '../axios/axios';
import { toast } from 'react-hot-toast';

const ForgotPassword = () => {
    const [email, setEmail] = useState('');

    const handleChangeEmail = (event) => {
        setEmail(event.target.value);
    }

    const handleSubmit = async () => {
        if (!email) {
            toast.error('Email-ul este obligatoriu!');
            return;
        }
        try {
            const res = await myAxios.post('/api/forgotPassword', {email});
            if (res.status === 200) {
                toast.success(res.data.message);
                setEmail('');
            }
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <FormWithBgImageLayout bgImage={signinImage} alt='forgot-password'>
            
                <Typography variant='h5' textAlign={'center'}>Forgot Password</Typography>
                <MyTextField label={'Email'} value={email} changeFunction={handleChangeEmail} name='email'
                    type='text' variant='outlined'/>
                <Button
                    variant="contained"
                    color="primary"
                    onClick={handleSubmit}
                >
                    Send Email
                </Button>
        </FormWithBgImageLayout>
    )
}

export default ForgotPassword;