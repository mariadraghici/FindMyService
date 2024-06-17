import FormWithBgImage from "../components/utils/FormWithBgImageLayout";
import { Button, Typography } from "@mui/material";
import { useState } from "react";
import MyTextField from "../components/utils/MyTextField";
import myAxios from "../components/axios/axios";
import { toast } from "react-hot-toast";
import bgImage from "/img/signin_photo.png";
import { useSearchParams } from 'react-router-dom';
import { FormControl, InputLabel, OutlinedInput, InputAdornment, IconButton, FormHelperText } from "@mui/material";
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';

const ResetPassword = () => {
    const [searchParams] = useSearchParams();
    const token = searchParams.get('token');
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);

    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [resetSuccess, setResetSuccess] = useState(false);

    const handleClickShowPassword = () => setShowPassword((show) => !show);

    const handleMouseDownPassword = (event) => {
        event.preventDefault();
    };
    
    const handleChangePassword = (event) => {
        setPassword(event.target.value);
    };

    const handleClickShowConfirmPassword = () => setShowConfirmPassword((show) => !show);

    const handleMouseDownConfirmPassword = (event) => {
        event.preventDefault();
    };
    
    const handleChangeConfirmPassword = (event) => {
        setConfirmPassword(event.target.value);
    };
    
    const handleSubmit = async () => {
        if (!password || !confirmPassword) {
            toast.error("Both fields are required");
            return;
        }
    
        if (password !== confirmPassword) {
            toast.error("Passwords do not match");
            return;
        }
    
        try {
        const res = await myAxios.put("/api/updatePassword", {
            token,
            password,
            confirmPassword,
        });
        if (res.status === 200) {
            toast.success(res.data.message);
            setPassword("");
            setConfirmPassword("");
            setResetSuccess(true);
        }
        } catch (error) {
            toast.error(error.response.data.error);
            console.log(error);
        }
    };
    
    return (
        <>
        {!resetSuccess && <FormWithBgImage bgImage={bgImage} alt="reset-password">
            <Typography variant="h5" textAlign={"center"}>
                Reset Password
            </Typography>
            <FormControl variant="outlined" sx={{width: '100%'}}>
                  <InputLabel required htmlFor="outlined-adornment-password" sx={{color: 'placeholder.primary'}}>Password</InputLabel>
                  
                  <OutlinedInput
                    value={password} onChange={handleChangePassword}
                    id="outlined-adornment-password"
                    inputProps={{
                      style: { color: 'black' }
                    }}
                    type={showPassword ? 'text' : 'password'}
                    endAdornment={
                      <InputAdornment position="end">
                        <IconButton
                          aria-label="toggle password visibility"
                          onClick={handleClickShowPassword}
                          onMouseDown={handleMouseDownPassword}
                          edge="end"
                        >
                          {showPassword ? <Visibility /> : <VisibilityOff />}
                        </IconButton>
                      </InputAdornment>
                    }
                    label="Password"
                  />
                   <FormHelperText sx={{margin: '0', color: 'black !important'}}>
                    Parola trebuie să conțină cel puțin o literă mare, o literă mica, o cifră și un caracter special (?,!,#,..)</FormHelperText>
                </FormControl>
                <FormControl variant="outlined" sx={{width: '100%'}}>
                  <InputLabel required htmlFor="outlined-adornment-password" sx={{color: 'placeholder.primary'}}>Password</InputLabel>
                  
                  <OutlinedInput
                    value={confirmPassword} onChange={handleChangeConfirmPassword}
                    id="outlined-adornment-password"
                    inputProps={{
                      style: { color: 'black' }
                    }}
                    type={showConfirmPassword ? 'text' : 'password'}
                    endAdornment={
                      <InputAdornment position="end">
                        <IconButton
                          aria-label="toggle password visibility"
                          onClick={handleClickShowConfirmPassword}
                          onMouseDown={handleMouseDownConfirmPassword}
                          edge="end"
                        >
                          {showConfirmPassword ? <Visibility /> : <VisibilityOff />}
                        </IconButton>
                      </InputAdornment>
                    }
                    label="Confirm Password"
                  />
                </FormControl>
            <Button variant="contained" color="primary" onClick={handleSubmit}>
                Reset Password
            </Button>
        </FormWithBgImage>}
        {resetSuccess && (
            <Typography variant="h5" textAlign={"center"} mt={10} color='primary'>
            Password reset successfully!
            </Typography>
        )}
        </>
    );
}

export default ResetPassword;