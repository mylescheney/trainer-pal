import SessionBlock from '../components/SessionBlock';
import { todayValue, weekOutValue, calcDateValue } from './dateFunctions';

export function getSessions(dateRange, sessions) {
    if (dateRange === 'All Upcoming') {
        const allUpcomingSessions = [];
        for (let i = 0; i < sessions.length; i++) {
            const sessionDateValue = calcDateValue(sessions[i].month, sessions[i].day, sessions[i].year);
            if (sessionDateValue >= todayValue) {
                allUpcomingSessions.push(sessions[i]);
            }
        }
        sessions = allUpcomingSessions.map(session => {
            const sessionKey = session.client.clientEmail + session.month + session.day + session.year;
            return <SessionBlock key={sessionKey} session={session} />
        });
        return sessions;
    } else if (dateRange === 'Next 7 Days') {
        let sessionsNext7Days = [];
        for (let i = 0; i < sessions.length; i++) {
            const sessionDateValue = calcDateValue(sessions[i].month, sessions[i].day, sessions[i].year);
            if (sessionDateValue >= todayValue && sessionDateValue < weekOutValue) {
                sessionsNext7Days.push(sessions[i]);
            }
        }
        sessions = sessionsNext7Days.map(session => {
            const sessionKey = session.client.clientEmail + session.month + session.day + session.year;
            return <SessionBlock key={sessionKey} session={session} />
        });
        return sessions;
    } else {
        let sessionHistory = [];
        for (let i = 0; i < sessions.length; i++) {
            const sessionDateValue = calcDateValue(sessions[i].month, sessions[i].day, sessions[i].year);
            if (sessionDateValue < todayValue) {
                sessionHistory.push(sessions[i]);
            }
        }
        sessions = sessionHistory.map(session => {
            const sessionKey = session.client.clientEmail + session.month + session.day + session.year;
            return <SessionBlock key={sessionKey} session={session} />
        });
        return sessions;
    }
}