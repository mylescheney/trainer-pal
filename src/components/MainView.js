import React from 'react';
import Header from './Header';
import ClientSelection from './ClientSelection';
import AddClientModal from './AddClientModal';
import ClientInfoModal from './ClientInfoModal';
import UserInfoModal from './UserInfoModal';
import InfoView from './InfoView';

const MainView = props => {
    return (
        <>
            <div id="mainView">
                <Header userName={props.user ? props.user.name : ''} />
                <ClientSelection clients={props.clients} viewClient={props.viewClient} />
                <InfoView totalClients={props.clients ? props.clients.length : 0} sessions={props.sessions} />
                <div
                    id='seeSessionsBtn'
                    className='mobileSwitchBtn'
                    onClick={() => {
                        document.getElementById('clientSelection').style.display = 'none';
                        document.getElementById('clientsDataDiv').style.display = 'none';
                        document.getElementById('seeSessionsBtn').style.display = 'none';
                        document.getElementById('seeClientsBtn').style.display = 'block';
                        document.getElementById('scheduleContainer').style.display = 'flex';
                        document.getElementById('weekDataDivMobile').style.display = 'block';
                    }}>
                    See Schedule
                </div>
            </div>
            <AddClientModal addClient={props.addClient} />
            <ClientInfoModal
                client={props.selectedClient}
                allClients={props.clients}
                updateClient={props.updateClient}
                deleteClient={props.deleteClient} 
            />
            <UserInfoModal
                user={props.user}
                updateUsername={props.updateUsername}
                updateUserEmail={props.updateUserEmail}
                updateUserPassword={props.updateUserPassword}
                deleteAccount={props.deleteAccount}
            />
        </>
    );

}

export default MainView;