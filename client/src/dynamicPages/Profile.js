import React from 'react'
import Box from '@material-ui/core/Box';
import PasswordChangeForm from '../components/profile/PasswordChange';
import UsernameChangeForm from '../components/profile/UsernameChange';
import UserInfo from '../components/profile/UserInfo';
import Grid from '@material-ui/core/Grid';

export default function Profile() {
    return (
        <Box>
            <Grid container spacing={3}>

                <Grid Item xs={12}>
                    <UserInfo/>
                </Grid>
                <Grid Item xs={12} lg={6}>
                    <UsernameChangeForm/>
                </Grid>
                <Grid Item xs={12} lg={6}>
                    <PasswordChangeForm/>
                </Grid>
            </Grid>

        </Box>
    )
}
