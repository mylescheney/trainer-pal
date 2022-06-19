import React, { useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faXmark } from '@fortawesome/free-solid-svg-icons';
import { showModal, hideModal } from '../resources/modalFunctions';
import DeleteAccountModal from './DeleteAccountModal';

const UserInfoModal = ({ user, updateUsername, updateUserEmail, updateUserPassword, deleteAccount }) => {

    useEffect(() => {
        if (user) {
            setUsername(user.name);
            setUserEmail(user.email);
        }
    }, [user]);

    const [username, setUsername] = useState('');
    const [userEmail, setUserEmail] = useState('');
    const [newPW, setNewPW] = useState('');
    const [confirmNewPW, setConfirmNewPW] = useState('');

    useEffect(() => {
        if (
            user && (
                username !== user.name ||
                userEmail !== user.email ||
                newPW !== '' ||
                confirmNewPW !== ''
            )) {
            document.getElementById('saveUserInfoSubmitBtn').style.display = 'block';
            document.getElementById('userInfoModalBtns').style.justifyContent = 'space-between';
        } else {
            document.getElementById('saveUserInfoSubmitBtn').style.display = 'none';
            document.getElementById('userInfoModalBtns').style.justifyContent = 'end';
        }
    }, [username, userEmail, newPW, confirmNewPW]);

    return (
        <>
            <div id='userInfoModal'>
                <div className="modalHeader">
                    <h2>Your Account</h2>
                    <FontAwesomeIcon
                        icon={faXmark}
                        className='xIcon'
                        onClick={() => {
                            setUsername('');
                            setUserEmail('');
                            setNewPW('');
                            setConfirmNewPW('');
                            hideModal('userInfoModal');
                        }} />
                </div>
                <div className='inputDiv'>
                    <label htmlFor='usernameTextField'>Your Name</label>
                    <input
                        id='usernameTextField'
                        className='modalTextInput'
                        value={username}
                        onChange={e => setUsername(e.target.value)}>
                    </input>
                </div>
                <div className='inputDiv'>
                    <label htmlFor='userEmailTextField'>Your Email</label>
                    <input
                        id='userEmailTextField'
                        className='modalTextInput'
                        value={userEmail}
                        onChange={e => setUserEmail(e.target.value)}>
                    </input>
                </div>
                <div className='inputDiv'>
                    <label htmlFor='usernameTextField'>Set a New Password</label>
                    <input
                        id='newPWTextField'
                        className='modalTextInput'
                        type='password'
                        value={newPW}
                        onChange={e => setNewPW(e.target.value)}>
                    </input>
                </div>
                <div className='inputDiv'>
                    <label htmlFor='confirmNewPWTextField'>Confirm Your New Password</label>
                    <input
                        id='confirmNewPWTextField'
                        className='modalTextInput'
                        type='password'
                        value={confirmNewPW}
                        onChange={e => setConfirmNewPW(e.target.value)}>
                    </input>
                </div>
                <div className='modalBtns' id="userInfoModalBtns">
                    <div
                        id="saveUserInfoSubmitBtn"
                        className='submitBtn'
                        onClick={() => {
                            if (username && username !== user.name) {
                                updateUsername(username);
                            }
                            if (userEmail && userEmail !== user.email) {
                                updateUserEmail(userEmail);
                            }
                            if (newPW && newPW !== user.password && newPW === confirmNewPW) {
                                updateUserPassword(newPW);
                            }
                            hideModal('userInfoModal');
                        }}>
                        <p className='submitBtnText'>Save Changes</p>
                    </div>
                    <div
                        id="deleteAccountBtn"
                        className='submitBtn'
                        onClick={() => {
                            showModal('deleteAccountModal');
                        }}
                    >
                        <p className='submitBtnText'>Delete Account</p>
                    </div>
                </div>
            </div>
            <div id='deleteBlocker' />
            <DeleteAccountModal deleteAccount={deleteAccount} password={user ? user.password : ''} />
        </>
    );
}

export default UserInfoModal;