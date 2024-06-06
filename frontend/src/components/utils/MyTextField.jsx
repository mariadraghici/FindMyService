import React from 'react';
import TextField from '@mui/material/TextField';
import { useEffect } from 'react';

const MyTextField = ({ label, name, value, type, changeFunction, variant, ...props }) => {
    return (
        <TextField
        {...props}
        size='small'
        type={type}
        name={name}
        fullWidth
        label={label}
        value={value}
        onChange={(e) => changeFunction(e.target.value)}
        color='secondary'
        variant={variant}
        InputLabelProps={{
            style: { color: '#8E8E8E' },
        }}/>
    );
}

export default MyTextField;