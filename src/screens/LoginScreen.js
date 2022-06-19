import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { auth } from '../firebase-config';
import { signInWithEmailAndPassword } from 'firebase/auth';
import typeEffect from '../resources/typeEffect';

const LoginScreen = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [errorMess, setErrorMess] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        document.getElementById('emailInput').focus();
        typeEffect('emailInput', 'Enter Your Email');
        if (errorMess === '') {
            document.getElementById('loginErrMess').style.display = 'none';
        }
    }, [errorMess]);

    const loginUser = async () => {
        try {
            const user = await signInWithEmailAndPassword(auth, email, password);
            navigate('/home', { state: { accountId: user.user.uid, email: email } });
        } catch (error) {
            setErrorMess('Invalid Login');
            document.getElementById('loginErrMess').style.display = 'block';
        }
    }
    return (
        <div id="login">
            <div className='loginHeaderDiv'>
                <h1 className='loginHeader'>Your</h1>
                <h1 id='mainLoginHeader' className='loginHeader'>Trainer Pal</h1>
            </div>
            <div className='loginInputs'>
                <input
                    id="emailInput"
                    value={email}
                    onFocus={() => setErrorMess('')}
                    onChange={e => setEmail(e.target.value)} />
                <input
                    id="passwordInput"
                    type='password'
                    placeholder='Enter Your Password'
                    value={password}
                    onFocus={() => setErrorMess('')}
                    onChange={e => setPassword(e.target.value)} />
                <div id="loginBtn" onClick={loginUser}>
                    <p>Log In</p>
                </div>
                <p id="loginErrMess">{errorMess}</p>
            </div>
            <div className='loginFooterDiv'>
                <p>New User?</p>
                <Link to='/register' className='link'>Register</Link>
            </div>
        </div>
    );
}

export default LoginScreen;