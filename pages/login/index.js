import React from 'react';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';

import { useAuth } from '../../src/server/auth/auth';
import firebase from 'firebase/app';
import 'firebase/auth';

import Link from 'next/link'
import styles from '../../styles/Login.module.css';

// const Login = () => {
//     return (
//         <div className={styles.main}>
//             <Card className={styles.root}>
//                 <CardActionArea>
//                     <CardMedia
//                         className={styles.media}
//                         image="/static/images/cards/contemplative-reptile.jpg"
//                         title="Contemplative Reptile"
//                     />
//                     <CardContent>
//                         <Typography gutterBottom variant="h5" component="h2">
//                             TNY JIRA Pointing Tool
//                 </Typography>
//                         <Typography variant="body2" color="textSecondary" component="p">
//                             The New Yorker JIRA Pointing tool
//                 </Typography>
//                     </CardContent>
//                 </CardActionArea>
//                 <CardActions>
//                     <Button size="medium" color="primary" variant="contained">
//                         <Link href="/board">
//                             LOGIN
//                     </Link>
//                     </Button>
//                 </CardActions>
//             </Card>
//         </div>
//     )
// };

const Login = () => {
    const { user } = useAuth();

    console.log('user', user);

    const signout = (e) => {
        e.preventDefault();

        firebase.auth().signOut();

    };

    return (
        <>
            <div>
                <h3>Welcome to Login</h3>
                <label>{`USER ID: ${user ? user.uid : 'No user signed in'} `} </label>
            </div>

            <Button variant='outlined' disabled={!user}>
                <Link href='/authenticated'>
                    <a>Go to authenticated route</a>
                </Link>
            </Button>
            <br/>

            <Button variant='outlined' disabled={user}>
                <Link href='/board'>
                    <a>Login</a>
                </Link>
            </Button>

            <Button variant='primary'  onClick={signout}> Signout </Button>
        </>
    )
};

module.exports = Login;