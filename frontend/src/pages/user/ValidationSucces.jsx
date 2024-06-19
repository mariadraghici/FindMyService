import { Container, Typography } from "@mui/material";
import React from "react";

const ValidationSucces = () => {
    return (
        <Container>
            <Typography variant='h4' color='white' sx={{textAlign: 'center', marginTop: '20px'}}>
                Contul a fost validat cu succes!
            </Typography>
        </Container>
    )
}

export default ValidationSucces;