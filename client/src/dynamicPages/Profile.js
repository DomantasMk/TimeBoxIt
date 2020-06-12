import React,{useState, useEffect} from 'react'
import Box from '@material-ui/core/Box';
import PasswordChangeForm from '../components/profile/PasswordChange';
import UsernameChangeForm from '../components/profile/UsernameChange';
import UserInfo from '../components/profile/UserInfo';
import Grid from '@material-ui/core/Grid';
import axios from 'axios';

export default function Profile() {
    const [userDetails, setUserDetails] = useState({email:"",username:""});

    useEffect(() => {
        axios({
          url: 'http://localhost:5000/graphiql',
          method: 'post',
          data: {
              query: `
              query{
                user{
                  email
                  username
                }
              }
                `
            }
        }).then((result) => {
            setUserDetails(result.data.data.user);
        }).catch((err) =>{console.log(err)});
      },[]);
    return (
        <Box>
            <Grid container spacing={3}>
                <Grid item xs={12}>
                    <UserInfo email={userDetails.email} username={userDetails.username}/>
                </Grid>
                <Grid item xs={12} lg={6}>
                    <UsernameChangeForm/>
                </Grid>
                <Grid item  xs={12} lg={6}>
                    <PasswordChangeForm/>
                </Grid>
            </Grid>

        </Box>
    )
}
