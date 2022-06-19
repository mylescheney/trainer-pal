import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faXmark } from '@fortawesome/free-solid-svg-icons';
import profilePicPlaceholder from '../images/profilePicPlaceholder.png';
import { hideModal } from '../resources/modalFunctions';

const AddClientModal = props => {
    const [nameInput, setNameInput] = useState('');
    const [phoneNumInput, setPhoneNumInput] = useState('');
    const [emailInput, setEmailInput] = useState('');
    const [clientPic, setClientPic] = useState();
    const [imgUrl, setImgUrl] = useState(profilePicPlaceholder);
    const [clientNotes, setClientNotes] = useState('');

    const imgUploadHandler = (e) => {
        let selectedImage;
        if (e.target.files && e.target.files.length === 1) {
            selectedImage = e.target.files[0];
            setClientPic(selectedImage);
        } else {
            setClientPic(null);
        }
    }

    useEffect(() => {
        if (!clientPic) {
            setImgUrl(profilePicPlaceholder);
            return
        }
        const fileReader = new FileReader();
        fileReader.onload = () => {
            setImgUrl(fileReader.result);
        }
        fileReader.readAsDataURL(clientPic);
    }, [clientPic]);

    return (
        <div id="addClientModal">
            <div className="modalHeader">
                <h2>Add Client</h2>
                <FontAwesomeIcon icon={faXmark} onClick={() => hideModal('addClientModal')} className='xIcon' />
            </div>
            <div className='inputDiv'>
                <label htmlFor='nameTextField'>New Client's Name</label>
                <input
                    id='nameTextField'
                    className='modalTextInput'
                    value={nameInput}
                    onChange={e => setNameInput(e.target.value)}>
                </input>
            </div>
            <div id="emailAndPhoneNumDiv">
                <div className='inputDiv'>
                    <label htmlFor='phoneNumTextField'>Phone Number</label>
                    <input
                        id='phoneNumTextField'
                        className='modalTextInput'
                        value={phoneNumInput}
                        onChange={e => setPhoneNumInput(e.target.value)}>
                    </input>
                </div>
                <div className='inputDiv'>
                    <label htmlFor='emailTextField'>Email Address</label>
                    <input
                        id='emailTextField'
                        className='modalTextInput'
                        value={emailInput}
                        onChange={e => setEmailInput(e.target.value)}>
                    </input>
                </div>
            </div>
            <div className='inputDiv'>
                <label htmlFor='imageUpload'>Profile Picture</label>
                <input
                    id="imageUpload"
                    type="file"
                    accept='.png, .jpg, .jpeg'
                    className='modalTextInput'
                    onChange={imgUploadHandler}
                    title="No Image Chosen"
                />
            </div>
            <div className='inputDiv'>
                <label htmlFor='clientNotes'>Notes</label>
                <textarea
                    id='clientNotes'
                    className='modalTextInput'
                    value={clientNotes}
                    onChange={e => setClientNotes(e.target.value)}
                ></textarea>
            </div>
            <div
                id="addClientSubmitBtn"
                className='submitBtn'
                onClick={() => {
                    props.addClient(nameInput, phoneNumInput, emailInput, imgUrl, clientNotes);
                    setNameInput('');
                    setPhoneNumInput('');
                    setEmailInput('');
                    setClientPic(null);
                    setImgUrl(profilePicPlaceholder);
                    setClientNotes('');
                }}>
                <p className='submitBtnText'>Submit</p>
            </div>
        </div>
    )
}

export default AddClientModal;