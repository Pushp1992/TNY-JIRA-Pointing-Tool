import React, { useState } from 'react';
import firebaseClient from '../src/server/auth/firebase/firebaseClient';
import firebase from 'firebase/app';
import 'firebase/auth';

import Button from '@material-ui/core/Button';

const SignUp = () => {
    firebaseClient();

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleUserSignup = (e) => { 
        e.preventDefault();

         firebase.auth().createUserWithEmailAndPassword(email, password)
        .then(() => {
            window.location.href = '/login';
        }).catch((error) => {
            const message = error.message;
            window.alert(message);
        })
    };

    const handleUserLogin = (e) => { 
        e.preventDefault();

         firebase.auth().signInWithEmailAndPassword(email, password)
        .then(() => {
            window.location.href = '/login';
        }).catch((error) => {
            const message = error.message;
            window.alert(message);
        })
    };

    const googleSignin = (e) => {
        e.preventDefault();

        const provider = firebase.auth().GoogleAuthProvider();
        
        firebase.auth().signInWithPopup(provider)
        .then(() => {
            window.location.href = '/login';
        }).catch((error) => {
            const message = error.message;
            window.alert(message);
        });
    };

    return (
        <div>
            <form>
                <input type="email" label="email" onChange={(e) => setEmail(e.target.value)} value={email} placeholder="enter email" /> <br /> <br />
                <input type="password" label="email" onChange={(e) => setPassword(e.target.value)} value={password} placeholder="enter password" /> <br /> <br />

                <Button variant='contained' disabled={email === '' || password === ''} onClick={async (e) => await handleUserSignup(e)}>Signup</Button> {' '}
                <Button variant='contained' disabled={email === '' || password === ''} onClick={async (e) => await handleUserLogin(e)}>Login</Button>
                <Button variant='contained' onClick={async (e) => await googleSignin(e)}>Login</Button>
            </form>
        </div>
    )
}

export default SignUp;