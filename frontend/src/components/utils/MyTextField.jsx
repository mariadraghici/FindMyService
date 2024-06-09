import React from 'react';
import TextField from '@mui/material/TextField';

const MyTextField = ({ label, functionType, name, value, type, changeFunction, variant, ...props }) => {
    
    if (functionType === 'setter') {
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
            InputLabelProps={
                {style: {color: 'grey'}}
            }
            />
        );
    }

    return (
        <TextField
        {...props}
        size='small'
        type={type}
        name={name}
        fullWidth
        label={label}
        value={value}
        onChange={changeFunction}
        color='secondary'
        variant={variant}
        InputLabelProps={
            {style: {color: 'grey'}}
        }
        />
    );
}

export default MyTextField;