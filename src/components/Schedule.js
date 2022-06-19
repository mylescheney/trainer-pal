import React from 'react';
import AddSessionModal from './AddSessionModal';
import { getSessionsInfo } from '../resources/dateFunctions';
import { showModal } from '../resources/modalFunctions';
import { getSessions } from '../resources/scheduleFunctions';

class Schedule extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            dateRange: 'Next 7 Days',
            scheduledClientsCount: 0,
            upcomingSessionsCount: 0,
            upcomingSessionsNext7Days: 0
        }
        this.toggleDateRange = this.toggleDateRange.bind(this);
    }

    toggleDateRange() {
        let newRange;
        switch (this.state.dateRange) {
            case 'Next 7 Days':
                newRange = 'All Upcoming';
                break;
            case 'All Upcoming':
                newRange = 'History';
                break;
            case 'History':
                newRange = 'Next 7 Days';
                break;
            default:
                break;
        }
        this.setState({
            dateRange: newRange
        });
    }

    render() {
        
        let sessions = getSessions(this.state.dateRange, this.props.sessions);
        const { totalUpcomingSessions, upcomingSessionsNext7Days } = getSessionsInfo(this.props.sessions);

        return (
            <>
                <div id="scheduleContainer">
                    <div onClick={this.toggleDateRange}>
                        <h4 id="dateRange">{this.state.dateRange}</h4>
                    </div>
                    <div id="schedule">
                        {sessions}
                    </div>
                    <div id="addSessionBtn" onClick={() => showModal('addSessionModal')}>
                        <p id="addText">Add Session</p>
                    </div>
                    <div id="weekDataDivMobile">
                        <h5>Upcoming Sessions</h5>
                        <p>All Scheduled: {totalUpcomingSessions}</p>
                        <p>Remaining This Week: {upcomingSessionsNext7Days}</p>
                    </div>
                    <div
                        id='seeClientsBtn'
                        className='mobileSwitchBtn'
                        onClick={() => {
                            document.getElementById('scheduleContainer').style.display = 'none';
                            document.getElementById('seeClientsBtn').style.display = 'none';
                            document.getElementById('seeSessionsBtn').style.display = 'block';
                            document.getElementById('clientSelection').style.display = 'flex';
                            document.getElementById('clientsDataDiv').style.display = 'block';
                            document.getElementById('weekDataDivMobile').style.display = 'none';
                        }}>
                        See Clients
                    </div>
                </div>
                <AddSessionModal clients={this.props.clients} addSession={this.props.addSession} />
            </>
        )
    }
}

export default Schedule;