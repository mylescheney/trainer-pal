import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { auth, db } from '../firebase-config';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { collection, addDoc } from 'firebase/firestore';
import typeEffect from '../resources/typeEffect';

const RegisterScreen = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [passwordConfirm, setPasswordConfirm] = useState('');
    const [errorMess, setErrorMess] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        document.getElementById('nameInput').focus();
        typeEffect('nameInput', 'What\'s Your Name?');
        if (errorMess === '') {
            document.getElementById('regErrMess').style.display = 'none';
        } 
    }, []);

    const usersCollectionRef = collection(db, 'users');

    const registerUser = async () => {
        try {
            if (password === passwordConfirm) {
                const newUser = await createUserWithEmailAndPassword(auth, email, password);
                await addDoc(usersCollectionRef, { name: name, email: email, password: password, clientCount: 0, clients: [], sessions: [] });
                navigate('/home', { state: { email: email } });
            } else {
                setErrorMess('Passwords do not match');
                document.getElementById('regErrMess').style.display = 'block';
            }
        } catch (error) {
            console.log(error.message);
        }
    }

    return (
        <div id="register">
            <div className='loginHeaderDiv'>
                <h1 className='loginHeader'>Your</h1>
                <h1 id='mainLoginHeader' className='loginHeader'>Trainer Pal</h1>
            </div>
            <div className='loginInputs'>
                <input
                    id="nameInput"
                    placeholder="What's Your Name?"
                    value={name}
                    onFocus={() => setErrorMess('')}
                    onChange={e => setName(e.target.value)} />
                <input
                    id="emailInput"
                    placeholder="What's Your Email?"
                    value={email}
                    onFocus={() => setErrorMess('')}
                    onChange={e => setEmail(e.target.value)} />
                <input
                    id="passwordInput"
                    placeholder='Make a Password'
                    type='password'
                    value={password}
                    onFocus={() => setErrorMess('')}
                    onChange={e => setPassword(e.target.value)} />
                <input
                    id="passwordConfirmInput"
                    placeholder='Now Confirm It'
                    type='password'
                    onFocus={() => setErrorMess('')}
                    value={passwordConfirm}
                    onChange={e => setPasswordConfirm(e.target.value)} />
                <div id='registerBtn' onClick={registerUser}>
                    <p>Register</p>
                </div>
                <p id="regErrMess">{errorMess}</p>
            </div>
            <div className='loginFooterDiv'>
                <p>Have an Account?</p>
                <Link to='/' className='link'>Log In</Link>
            </div>
        </div>
    );
}

export default RegisterScreen;