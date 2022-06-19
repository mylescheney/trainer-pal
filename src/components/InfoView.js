import React, { useEffect, useState } from 'react';
import { todayValue, weekOutValue, calcDateValue, getClientsScheduled, getSessionsInfo } from '../resources/dateFunctions';

const InfoView = props => {
    
    const clientsScheduled = getClientsScheduled(props.sessions);
    const { totalUpcomingSessions, upcomingSessionsNext7Days } = getSessionsInfo(props.sessions);

    return (
        <div id="infoView">
            <div id="clientsDataDiv">
                <h5>Clients</h5>
                <p>Total Clients: {props.totalClients}</p>
                <p>Have Session(s) Scheduled: {clientsScheduled}</p>
            </div>
            <div id="weekDataDiv">
                <h5>Upcoming Sessions</h5>
                <p>All Scheduled: {totalUpcomingSessions}</p>
                <p>Remaining This Week: {upcomingSessionsNext7Days}</p>
            </div>
        </div>
    );
}

export default InfoView;