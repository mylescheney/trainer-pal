import React, { useState } from 'react';
import { hideModal } from '../resources/modalFunctions';

const DeleteAccountModal = ({ password, deleteAccount }) => {
    const [pwConfirmation, setPWConfirmation] = useState('');

    return (
        <div id="deleteAccountModal">
            <div className='inputDiv'>
                <label htmlFor='deleteConfirmationTF'>Enter Your Password</label>
                <input
                    id='deleteConfirmationTF'
                    className='modalTextInput'
                    onChange={e => setPWConfirmation(e.target.value)}
                >
                </input>
            </div>
            <div className='modalBtns'>
                <div
                    id="cancelDeleteBtn"
                    className='submitBtn'
                    onClick={() => {
                        hideModal('deleteAccountModal', true)
                    }}
                >
                    <p className='submitBtnText'>Cancel</p>
                </div>
                <div
                    id="confirmDeleteAccountBtn"
                    className='submitBtn'
                    onClick={() => {
                        if (password !== '' && pwConfirmation === password) {
                            deleteAccount(password);
                        }
                    }}
                >
                    <p className='submitBtnText'>Delete</p>
                </div>
            </div>
        </div>
    );
}

export default DeleteAccountModal;