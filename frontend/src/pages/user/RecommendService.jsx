import {React, useState} from 'react'
import toast from 'react-hot-toast';
import TextField from '@mui/material/TextField'
import Button from '@mui/material/Button'
import Typography from '@mui/material/Typography'
import myAxios from '../../axios/axios'
import {useContext} from 'react'
import ProfileContext from '../../context/ProfileContext'
import signinImage from '/img/signin_photo.png'
import '../signin/signin.css'
import './recommendService.css'
import FormWithBgImage from '../../components/utils/FormWithBgImageLayout';
import Stack from '@mui/material/Stack';


const RecommendService = () => {
    const [serviceName, setServiceName] = useState('');
    const [serviceEmail, setServiceEmail] = useState('');
    const [content, setContent] = useState('');
    const [phone, setPhone] = useState('');
    const {user} = useContext(ProfileContext);

    const handleChange = val => event => {
        if (val === 'email') {
            setServiceEmail(event.target.value);
        } else if (val === 'serviceName'){
            setServiceName(event.target.value);
        } else if (val === 'content') {
            setContent(event.target.value);
        } else {
            setPhone(event.target.value);
        }
    }

    const handleSubmit = async () => {

        if (!phone && !serviceEmail) {
            toast.error('Trebuie sa introduci un numar de telefon sau un email');
            return;
        }

        if (!serviceName || !content) {
            toast.error('Numele service-ului si continutul sunt obligatorii');
            return;
        }
        try {
            const res = await myAxios.post('/api/recommendation/create', {
                serviceName,
                serviceEmail,
                content,
                phone,
                userFrom: user._id
            });
            if (res.status === 201) {
                toast.success('Recomandarea a fost trimisa cu succes');
                setServiceName('');
                setServiceEmail('');
                setContent('');
                setPhone('');
            }
        } catch (error) {
            toast.error(error.response.data);
        }
    }

    return (
        <FormWithBgImage bgImage={signinImage} alt='recommend-service'>
            <Stack direction='column' spacing={1} sx={{justifyContent: 'center', alignItems: 'center'}}>
                <Typography variant='h5' align='center' color='primary' >Ajută-ne să creștem platforma ca să te ajutăm și noi pe tine!</Typography>
                <Typography variant='h6' align='center' color='secondary' >Recomandă un service</Typography>
                <TextField value={serviceName} onChange={handleChange('serviceName')} label="Numele service-ului" InputLabelProps={{style: {color: 'black'}}} type='text' InputProps={{style: { color:'black' }}} sx={{ width: '100%'}} className='outlinedInput'/>
                <TextField value={serviceEmail} onChange={handleChange('email')} label="Email-ul service-ului" InputLabelProps={{style: {color: 'black'}}} type='text' InputProps={{style: { color:'black' }}} sx={{ width: '100%'}} className='outlinedInput'/>
                <Typography variant='h7' align='center' color='secondary' >SAU</Typography>
                <TextField value={phone} onChange={handleChange('phone')} label="Numar de telefon" InputLabelProps={{style: {color: 'black'}}} type='text' InputProps={{style: { color:'black' }}} sx={{ width: '100%'}} className='outlinedInput'/>
                <TextField value={content} onChange={handleChange('content')} label="Spune-ne de ce recomanzi service-ul" InputLabelProps={{style: {color: 'black'}}} type='text' InputProps={{style: { color:'black' }}} sx={{ width: '100%'}} className='outlinedInput'/>
                <Button onClick={handleSubmit} variant='contained'>Recomandă</Button>
            </Stack>
        </FormWithBgImage>
    )
}

export default RecommendService;