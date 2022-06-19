import { calcDateValue } from "./dateFunctions";
import { hideModal } from "./modalFunctions";

export function getMonthName(month) {
    switch (month) {
        case 1:
            return 'January';
        case 2:
            return 'February';
        case 3:
            return 'March';
        case 4:
            return 'April';
        case 5:
            return 'May';
        case 6:
            return 'June';
        case 7:
            return 'July';
        case 8:
            return 'August';
        case 9:
            return 'September';
        case 10:
            return 'October';
        case 11:
            return 'November';
        case 12:
            return 'December';
        default:
            return 'January';
    }
}

export function getMonthLength(month = 1, year = 22) {
    if (year % 4 === 0) {
        switch (month) {
            case 1: case 3: case 5: case 7: case 8: case 10: case 12:
                return 31;
            case 2:
                return 29;
            case 4: case 6: case 9: case 11:
                return 30;
        }
    } else {
        switch (month) {
            case 1: case 3: case 5: case 7: case 8: case 10: case 12:
                return 31;
            case 2:
                return 28;
            case 4: case 6: case 9: case 11:
                return 30;
        }
    }
    
}

export function selectMonth(month, setMonth) {
    setMonth(month);
    for (let i = 1; i <= 12; i++) {
        if (document.getElementById(`month${i}`).innerText == month) {
            document.getElementById(`month${i}`).style.color = '#7df9ff';
        } else {
            document.getElementById(`month${i}`).style.color = 'white';
        }
    }
}

export function getDayRange(startDay, month, year, day, setDay) {
    const monthLength = getMonthLength(month, year);
    for (let i = 1; i <= startDay + 1; i++) {
       document.getElementById(`day${i}`).innerText = '';
    }
    for (let i = 1; i <= monthLength; i++) {
        document.getElementById(`day${i + startDay}`).innerText = i;
        document.getElementById(`day${i + startDay}`).addEventListener('click', () => {
            setDay(i);
        });
        if (document.getElementById(`day${i + startDay}`).innerText == day) {
            document.getElementById(`day${i + startDay}`).style.color = '#7df9ff';
        } else {
            document.getElementById(`day${i + startDay}`).style.color = 'white';
        }
    }
    for (let i = (startDay + 1) + monthLength; i <= 37; i++) {
        document.getElementById(`day${i}`).innerText = '';
    }

    if (document.getElementById('day36').innerText === '') {
        document.getElementById('sixthDayRow').style.display = 'none';
    } else {
        document.getElementById('sixthDayRow').style.display = 'flex';
    }
}

export function selectHour(hour, startOrEnd, setHour) {
    setHour(hour);
    for (let i = 1; i <= 12; i++) {
        if (document.getElementById(`${startOrEnd}Hour${i}`).innerText == hour) {
            document.getElementById(`${startOrEnd}Hour${i}`).style.color = '#7df9ff';
        } else {
            document.getElementById(`${startOrEnd}Hour${i}`).style.color = 'white';
        }
    }
}

export function selectMinute(minute, startOrEnd, setMinute) {
    setMinute(minute);
    for (let i = 0; i <= 55; i+=5) {
        if (document.getElementById(`${startOrEnd}Minute${i}`).innerText == minute) {
            document.getElementById(`${startOrEnd}Minute${i}`).style.color = '#7df9ff';
        } else {
            document.getElementById(`${startOrEnd}Minute${i}`).style.color = 'white';
        }
    }
}