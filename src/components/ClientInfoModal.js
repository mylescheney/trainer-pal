import React, { useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faXmark } from '@fortawesome/free-solid-svg-icons';
import { hideModal } from '../resources/modalFunctions';
import profilePicPlaceholder from '../images/profilePicPlaceholder.png';

const ClientInfoModal = ({ client, allClients, updateClient, deleteClient }) => {

    useEffect(() => {
        if (client) {
            setClientName(client.clientName);
            setClientPhoneNum(client.clientPhoneNum);
            setClientEmail(client.clientEmail);
       //     setClientPic(client.clientPic);
            setClientNotes(client.clientNotes);
        }
    }, [client]);

    const [clientName, setClientName] = useState('');
    const [clientPhoneNum, setClientPhoneNum] = useState('');
    const [clientEmail, setClientEmail] = useState('');
    const [clientPic, setClientPic] = useState();
    const [imgUrl, setImgUrl] = useState();
    const [clientNotes, setClientNotes] = useState('');

    useEffect(() => {
        if (
            client && (
                clientName !== client.clientName ||
                clientPhoneNum !== client.clientPhoneNum ||
                clientEmail !== client.clientEmail ||
                clientPic !== client.clientPic ||
                clientNotes !== client.clientNotes
            )) {
            document.getElementById('saveClientInfoSubmitBtn').style.display = 'block';
            document.getElementById('clientInfoModalBtns').style.justifyContent = 'space-between';
        } else {
            document.getElementById('saveClientInfoSubmitBtn').style.display = 'none';
            document.getElementById('clientInfoModalBtns').style.justifyContent = 'end';
        }
    }, [clientName, clientPhoneNum, clientEmail, clientPic, clientNotes]);

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
        <div id='clientInfoModal'>
            <div className="modalHeader">
                <h2>{clientName ? clientName : 'No Client Selected'}</h2>
                <FontAwesomeIcon
                    icon={faXmark}
                    className='xIcon'
                    onClick={() => {
                        hideModal('clientInfoModal');
                    }} />
            </div>
            <div className='inputDiv'>
                <label htmlFor='clientInfoNameField'>Client's Name</label>
                <input
                    id='clientInfoNameField'
                    className='modalTextInput'
                    value={clientName}
                    onChange={e => setClientName(e.target.value)}>
                </input>
            </div>
            <div className='inputDiv'>
                <label htmlFor='clientInfoPhoneNumTextField'>Client's Phone Number</label>
                <input
                    id='clientInfoPhoneNumTextField'
                    className='modalTextInput'
                    value={clientPhoneNum}
                    onChange={e => setClientPhoneNum(e.target.value)}>
                </input>
            </div>
            <div className='inputDiv'>
                <label htmlFor='clientInfoEmailTextField'>Client's Email</label>
                <input
                    id='clientInfoEmailTextField'
                    className='modalTextInput'
                    value={clientEmail}
                    onChange={e => setClientPhoneNum(e.target.value)}>
                </input>
            </div>
            <div className='inputDiv'>
                <label htmlFor='clientInfoImageUpload'>Upload New Photo</label>
                <input
                    id="clientInfoImageUpload"
                    type="file"
                    accept='.png, .jpg, .jpeg'
                    className='modalTextInput'
                    onChange={imgUploadHandler}
                    title="No Image Chosen"
                />
            </div>
            <div className='inputDiv'>
                <label htmlFor='clientNotesTextField'>Client Notes</label>
                <textarea
                    id='clientInfoNotes'
                    className='modalTextInput'
                    value={clientNotes}
                    onChange={e => setClientNotes(e.target.value)}
                ></textarea>
            </div>
            <div className='modalBtns' id="clientInfoModalBtns">
                <div
                    id="saveClientInfoSubmitBtn"
                    className='submitBtn'
                    onClick={() => {
                        updateClient(allClients, client, clientName, clientPhoneNum, clientEmail, imgUrl, clientNotes);
                    }}
                >
                    <p className='submitBtnText'>Save Changes</p>
                </div>
                <div
                    id="deleteClientBtn"
                    className='submitBtn'
                    onClick={() => {
                        const selectedClientEmail = client ? client.clientEmail : '';
                        deleteClient(allClients, selectedClientEmail);
                    }}
                >
                    <p className='submitBtnText'>Delete Client</p>
                </div>
            </div>
        </div>
    );
}

export default ClientInfoModal;

/*


}

*/