import React from 'react';
import { showModal, hideModal, hideOtherNestModals } from '../resources/modalFunctions';
import { getMonthName, selectMonth } from '../resources/datePickerFunctions';

const DatePicker = props => {

    let monthName = getMonthName(props.month);
    const startDay = new Date(`${monthName} 1, 20${props.year}`).getDay();

    return (
        <div className='dateComponents'>
            <p className='dateBtnText'>On</p>
            <div className='dateBtn' onClick={() => {
                if (document.getElementById('monthPicker').style.display === 'block') {
                    props.setSelectedPicker('')
                    hideModal('monthPicker', true);
                } else {
                    props.setSelectedPicker('Set Month')
                    showModal('monthPicker');
                    hideOtherNestModals('monthPicker');
                }
            }}>
                <p className='dateBtnText'>{props.month}</p>
            </div>
            <p className='dateBtnText'>/</p>
            <div className='dateBtn' onClick={() => {
                if (document.getElementById('dayPicker').style.display === 'block') {
                    props.setSelectedPicker('')
                    hideModal('dayPicker', true);
                } else {
                    props.setSelectedPicker('Set Day')
                    showModal('dayPicker');
                    hideOtherNestModals('dayPicker');
                }
            }}>
                <p className='dateBtnText'>{props.day}</p>
            </div>
            <p className='dateBtnText'>/</p>
            <div
                className='dateBtn'
                onMouseOver={() => {
                    document.getElementById('yearInput').style.background = '#7df9ff';
                    document.getElementById('yearInput').style.color = 'black';
                    document.getElementById('yearInput').classList.add('activeDateBtnPlaceholder')
                }}
                onMouseOut={() => {
                    document.getElementById('yearInput').style.background = '#282828';
                    document.getElementById('yearInput').style.color = 'white';
                    document.getElementById('yearInput').classList.add('inactiveDateBtnPlaceholder');
                }}>
                <input
                    type='text'
                    id='yearInput'
                    className='dateBtnText'
                    maxLength={2}
                    placeholder='YY'
                    value={props.year}
                    onFocus={() => {
                        props.setSelectedPicker('');
                        hideOtherNestModals('');
                    }}
                    onChange={e => props.setYear(e.target.value)} />
            </div>
        </div>
    );
}

export default DatePicker;

export const MonthPicker = props => {
    return (
        <div id='monthPicker'>
            <div className='monthRow'>
                <div
                    className='monthBtn'
                    onClick={() => selectMonth(1, props.setMonth)}>
                    <p id='month1' className='dateBtnText'>1</p>
                </div>
                <div
                    className='monthBtn'
                    onClick={() => selectMonth(2, props.setMonth)}>
                    <p id='month2' className='dateBtnText'>2</p>
                </div>
                <div
                    className='monthBtn'
                    onClick={() => selectMonth(3, props.setMonth)}>
                    <p id='month3' className='dateBtnText'>3</p>
                </div>
                <div
                    className='monthBtn'
                    onClick={() => selectMonth(4, props.setMonth)}>
                    <p id='month4' className='dateBtnText'>4</p>
                </div>
            </div>
            <div className='monthRow'>
                <div
                    className='monthBtn'
                    onClick={() => selectMonth(5, props.setMonth)}>
                    <p id='month5' className='dateBtnText'>5</p>
                </div>
                <div
                    className='monthBtn'
                    onClick={() => selectMonth(6, props.setMonth)}>
                    <p id='month6' className='dateBtnText'>6</p>
                </div>
                <div
                    className='monthBtn'
                    onClick={() => selectMonth(7, props.setMonth)}>
                    <p id='month7' className='dateBtnText'>7</p>
                </div>
                <div
                    className='monthBtn'
                    onClick={() => selectMonth(8, props.setMonth)}>
                    <p id='month8' className='dateBtnText'>8</p>
                </div>
            </div>
            <div className='monthRow'>
                <div
                    className='monthBtn'
                    onClick={() => selectMonth(9, props.setMonth)}>
                    <p id='month9' className='dateBtnText'>9</p>
                </div>
                <div
                    className='monthBtn'
                    onClick={() => selectMonth(10, props.setMonth)}>
                    <p id='month10' className='dateBtnText'>10</p>
                </div>
                <div
                    className='monthBtn'
                    onClick={() => selectMonth(11, props.setMonth)}>
                    <p id='month11' className='dateBtnText'>11</p>
                </div>
                <div
                    className='monthBtn'
                    onClick={() => selectMonth(12, props.setMonth)}>
                    <p id='month12' className='dateBtnText'>12</p>
                </div>
            </div>
        </div>
    );
}

export const DayPicker = props => {

    return (
        <div id="dayPicker">
            <div className='dayRow'>
                <div className='dayBtn'>
                    <p id="day1"></p>
                </div>
                <div className='dayBtn'>
                    <p id="day2"></p>
                </div>
                <div className='dayBtn'>
                    <p id="day3"></p>
                </div>
                <div className='dayBtn'>
                    <p id="day4"></p>
                </div>
                <div className='dayBtn'>
                    <p id="day5"></p>
                </div>
                <div className='dayBtn'>
                    <p id="day6"></p>
                </div>
                <div className='dayBtn'>
                    <p id="day7"></p>
                </div>
            </div>
            <div className='dayRow'>
                <div className='dayBtn'>
                    <p id="day8"></p>
                </div>
                <div className='dayBtn'>
                    <p id="day9"></p>
                </div>
                <div className='dayBtn'>
                    <p id="day10"></p>
                </div>
                <div className='dayBtn'>
                    <p id="day11"></p>
                </div>
                <div className='dayBtn'>
                    <p id="day12"></p>
                </div>
                <div className='dayBtn'>
                    <p id="day13"></p>
                </div>
                <div className='dayBtn'>
                    <p id="day14"></p>
                </div>
            </div>
            <div className='dayRow'>
                <div className='dayBtn'>
                    <p id="day15"></p>
                </div>
                <div className='dayBtn'>
                    <p id="day16"></p>
                </div>
                <div className='dayBtn'>
                    <p id="day17"></p>
                </div>
                <div className='dayBtn'>
                    <p id="day18"></p>
                </div>
                <div className='dayBtn'>
                    <p id="day19"></p>
                </div>
                <div className='dayBtn'>
                    <p id="day20"></p>
                </div>
                <div className='dayBtn'>
                    <p id="day21"></p>
                </div>
            </div>
            <div className='dayRow'>
                <div className='dayBtn'>
                    <p id="day22"></p>
                </div>
                <div className='dayBtn'>
                    <p id="day23"></p>
                </div>
                <div className='dayBtn'>
                    <p id="day24"></p>
                </div>
                <div className='dayBtn'>
                    <p id="day25"></p>
                </div>
                <div className='dayBtn'>
                    <p id="day26"></p>
                </div>
                <div className='dayBtn'>
                    <p id="day27"></p>
                </div>
                <div className='dayBtn'>
                    <p id="day28"></p>
                </div>
            </div>
            <div className='dayRow'>
                <div className='dayBtn'>
                    <p id="day29"></p>
                </div>
                <div className='dayBtn'>
                    <p id="day30"></p>
                </div>
                <div className='dayBtn'>
                    <p id="day31"></p>
                </div>
                <div className='dayBtn'>
                    <p id="day32"></p>
                </div>
                <div className='dayBtn'>
                    <p id="day33"></p>
                </div>
                <div className='dayBtn'>
                    <p id="day34"></p>
                </div>
                <div className='dayBtn'>
                    <p id="day35"></p>
                </div>
            </div>
            <div id='sixthDayRow' className='dayRow'>
                <div className='dayBtn'>
                    <p id="day36"></p>
                </div>
                <div className='dayBtn'>
                    <p id="day37"></p>
                </div>
                <div className='dayBtn' />
                <div className='dayBtn' />
                <div className='dayBtn' />
                <div className='dayBtn' />
                <div className='dayBtn' />
            </div>
        </div>
    );
}