import React from 'react';
import { getDateString } from '../resources/dateFunctions';

const SessionBlock = props => {
    const { client, month, day, year, startHour, startMinute, startsAm, endHour, endMinute, endsAm } = props.session;
    const amStart = startsAm ? 'am' : 'pm';
    const amEnd = endsAm ? 'am' : 'pm';
    const timeString = `${startHour}:${startMinute}${amStart} - ${endHour}:${endMinute}${amEnd}`;
    let dateString = getDateString(month, day, year);
    return (
        <div className="sessionBlock">
            <div className='dateText'>{dateString}</div>
            <div className='timeText'>{timeString}</div>
            <div className='sessionNameText'>{client.clientName}</div>
        </div>
    )
}

export default SessionBlock;