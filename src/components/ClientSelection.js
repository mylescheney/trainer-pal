import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import { showModal } from '../resources/modalFunctions';

const PlusBlock = () => {
    return (
        <div id="plusBlock" onClick={() => showModal('addClientModal')}>
            <FontAwesomeIcon icon={faPlus} id="plusIcon" />
        </div>
    )
};

const ClientBlock = props => {
    const { clientName, clientEmail, clientPic } = props;
    return (
        <div
            className="clientBlock"
            onClick={() => {
                props.viewClient(props.allClients, clientEmail);
                showModal('clientInfoModal');
            }}>
            <img alt={clientName + " profile picture"} src={clientPic} className="profilePic" />
            <div className='nameDiv'>
                <p style={{ textAlign: 'center' }}>{clientName}</p>
            </div>
        </div>
    );
}

const ClientSelection = props => {
    const clients = props.clients ? props.clients.map(client => <ClientBlock
        key={client.key}
        clientName={client.clientName}
        clientEmail={client.clientEmail}
        clientPic={client.clientPic}
        allClients={props.clients}
        viewClient={props.viewClient}
    />) : null;
    return (
        <div id="clientSelection">
            <h2 id="clientsHeading">Your Clients</h2>
            <div id="clientsRow">
                <div id="clientList">
                    {clients}
                </div>
                <PlusBlock />
            </div>
        </div>
    )
}

export default ClientSelection;