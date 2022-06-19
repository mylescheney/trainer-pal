import { type } from "@testing-library/user-event/dist/type";

const currentDate = new Date();
const month = currentDate.getMonth() + 1;
const day = currentDate.getDate();
const year = currentDate.getFullYear() - 2000;
// The current day value + 1 week (1440 * 7)
export const todayValue = calcDateValue(month, day, year);
export const weekOutValue = calcDateValue(month, day, year) + 10080;

export function calcDateValue(month, day, year) {
    let monthValue;
    switch (month) {
        case 2:
            monthValue = 31 * 1440;
            break;
        case 3:
            monthValue = 59 * 1440;
            break;
        case 4:
            monthValue = 90 * 1440;
            break;
        case 5:
            monthValue = 120 * 1440;
            break;
        case 6:
            monthValue = 151 * 1440;
            break;
        case 7:
            monthValue = 181 * 1440;
            break;
        case 8:
            monthValue = 212 * 1440;
            break;
        case 9:
            monthValue = 242 * 1440;
            break;
        case 10:
            monthValue = 273 * 1440;
            break;
        case 11:
            monthValue = 303 * 1440;
            break;
        case 12:
            monthValue = 334 * 1440;
            break;
        default:
            monthValue = 0;
            break;
    }
    let dayValue;
    if (day > 1) {
        dayValue = (day - 1) * 1440;
    } else {
        dayValue = 0;
    }
    let yearValue = year * 1440 * 365;
    const leapYears = Math.floor(year / 4);
    yearValue += leapYears * 1440;
    return monthValue + dayValue + yearValue;
}

export function calcDateValueWithTime(month, day, year, hour, minute, startsAm) {
    let monthValue;
    switch (month) {
        case 2:
            monthValue = 31 * 1440;
            break;
        case 3:
            monthValue = 59 * 1440;
            break;
        case 4:
            monthValue = 90 * 1440;
            break;
        case 5:
            monthValue = 120 * 1440;
            break;
        case 6:
            monthValue = 151 * 1440;
            break;
        case 7:
            monthValue = 181 * 1440;
            break;
        case 8:
            monthValue = 212 * 1440;
            break;
        case 9:
            monthValue = 242 * 1440;
            break;
        case 10:
            monthValue = 273 * 1440;
            break;
        case 11:
            monthValue = 303 * 1440;
            break;
        case 12:
            monthValue = 334 * 1440;
            break;
        default:
            monthValue = 0;
            break;
    }
    let dayValue;
    if (day > 1) {
        dayValue = (day - 1) * 1440;
    } else {
        dayValue = 0;
    }
    let yearValue = year * 1440 * 365;
    const leapYears = Math.floor(year / 4);
    yearValue += leapYears * 1440;

    let hourValue = Number(hour) * 60;
    if (!startsAm) {
       hourValue *= 12;
    }
    return monthValue + dayValue + yearValue + hourValue + Number(minute);
}

// Calculates how many clients are scheduled for upcoming sessions
export function getClientsScheduled(sessions) {
    let clientsScheduled = [];
    for (let i = 0; i < sessions.length; i++) {
        const sessionDateValue = calcDateValue(sessions[i].month, sessions[i].day, sessions[i].year);
        if (sessionDateValue >= todayValue) {
            if (!clientsScheduled.includes(sessions[i].client.clientEmail)) {
                clientsScheduled.push(sessions[i].client.clientEmail);
            }
        }
    }
    return clientsScheduled.length;
}
// Calculates how many upcoming sessions total their are in the next 7 days and total
export function getSessionsInfo(sessions) {
    let upcomingSessionsNext7Days = 0;
    let totalUpcomingSessions = 0;
    for (let i = 0; i < sessions.length; i++) {
        const sessionDateValue = calcDateValue(sessions[i].month, sessions[i].day, sessions[i].year);
        if (sessionDateValue >= todayValue && sessionDateValue < weekOutValue) {
            upcomingSessionsNext7Days += 1;
            totalUpcomingSessions += 1;
        } else if (sessionDateValue >= todayValue) {
            totalUpcomingSessions += 1;
        }
    }
    return { upcomingSessionsNext7Days, totalUpcomingSessions };
}

export function getDateString(sessionMonth, sessionDay, sessionYear) {
    let monthName;
    switch (sessionMonth) {
        case 1:
            monthName = 'January';
            break;
        case 2:
            monthName = 'February';
            break;
        case 3:
            monthName = 'March';
            break;
        case 4:
            monthName = 'April';
            break;
        case 5:
            monthName = 'May';
            break;
        case 6:
            monthName = 'June';
            break;
        case 7:
            monthName = 'July';
            break;
        case 8:
            monthName = 'August';
            break;
        case 9:
            monthName = 'September';
            break;
        case 10:
            monthName = 'October';
            break;
        case 11:
            monthName = 'November';
            break;
        case 12:
            monthName = 'December';
            break;
        default:
            monthName = 'Error';
            break;
    }

    const dayWithSuffix = addDaySuffix(sessionDay);
    let dayName;
    const dayNum = new Date(`${monthName} ${sessionDay}, ${2000 + sessionYear}`).getDay();
    switch (dayNum) {
        case 0:
            dayName = 'Sunday';
            break;
        case 1:
            dayName = 'Monday';
            break;
        case 2:
            dayName = 'Tuesday';
            break;
        case 3:
            dayName = 'Wednesday';
            break;
        case 4:
            dayName = 'Thursday';
            break;
        case 5:
            dayName = 'Friday';
            break;
        case 6:
            dayName = 'Saturday';
            break;
    }

    let dateString;
    let sessionDateValue = calcDateValue(sessionMonth, sessionDay, sessionYear);
    if (sessionDateValue === todayValue) {
        dateString = 'Today';
    } else if (sessionYear === year) {
        dateString = `${dayName}, ${monthName} ${dayWithSuffix}`;
    } else {
        dateString = `${dayName}, ${monthName} ${dayWithSuffix}, ${2000 + year}`;
    }

   return dateString;
}

export function addDaySuffix(selectedDay) {
    switch (selectedDay) {
        case 1:
        case 21:
        case 31:
            selectedDay = selectedDay + 'st';
            break;
        case 2:
        case 22:
            selectedDay = selectedDay + 'nd';
            break;
        case 3:
        case 23:
            selectedDay = selectedDay + 'rd';
            break;
        default:
            selectedDay = selectedDay + 'th';
            break;
    }
    return selectedDay;
}