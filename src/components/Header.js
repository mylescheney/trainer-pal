import React from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faRightFromBracket, faUser } from '@fortawesome/free-solid-svg-icons';
import { showModal } from '../resources/modalFunctions';

const Header = props => {
    const firstName = props.userName.split(' ')[0];
    return (
        <div id="header">
            <h1 id="welcomeMessage">Welcome, {firstName}</h1>
            <div id="headerIcons">
                <FontAwesomeIcon
                    icon={faUser}
                    className='iconClass'
                    style={{margin: '0'}}
                    onClick={() => {
                        showModal('userInfoModal');
                    }}
                />
                <Link to="/">
                    <FontAwesomeIcon
                        icon={faRightFromBracket}
                        className='iconClass signOutIcon'
                        style={{margin: '0'}}
                    />
                </Link>
            </div>
        </div>
    )
}

export default Header;