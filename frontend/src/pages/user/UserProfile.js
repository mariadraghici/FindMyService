import React from "react";
import { useContext } from "react";
import UserSidebar from "../../components/user/UserSidebar";
import ProfileContext from "../../components/context/ProfileContext";
import Container from "@mui/material/Container";
import { Grid, Card, CardContent, Divider } from "@mui/material";

const UserProfile = () => {
    const {user} = useContext(ProfileContext);
    const {name, email, createdAt, role} = user;

    return (
        <Container>
            <Grid container spacing={2} sx={{marginTop: '3%'}}>
                <Grid item xs={3}>
                    <UserSidebar/>
                </Grid>

                <Grid item xs={9}>
                    <Card sx={{padding: '3%', borderRadius: '7px'}}>
                    <h4>Profilul meu</h4>
                    <Divider sx={{opacity: 1}}/>
                    <CardContent>
                        <p>Name: {name}</p>
                        <p>Email: {email}</p>
                        <p>Joined at: {new Date(createdAt).toLocaleDateString()}</p>
                    </CardContent>
                    </Card>
                </Grid>
            {role === 1 ? <a href="/admin/dashboard"> Go to admin panel </a> : <div></div>}
            </Grid>
        </Container>
    )
}

export default UserProfile;