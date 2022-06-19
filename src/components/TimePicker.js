import React from 'react';
import { showModal, hideModal, hideOtherNestModals } from '../resources/modalFunctions';
import { selectHour, selectMinute } from '../resources/datePickerFunctions';

const TimePicker = props => {

    return (
        <>
            <div className='timeSetterRow'>
                <p>Starts</p>
                <div className='dateComponents'>
                    <div className='dateBtn' onClick={() => {
                        if (document.getElementById('startHourPicker').style.display === 'block') {
                            props.setSelectedPicker('');
                            hideModal('startHourPicker', true);
                        } else {
                            props.setSelectedPicker('Set Start Hour');
                            showModal('startHourPicker');
                            hideOtherNestModals('startHourPicker');
                        }
                    }
                    }>
                        <p className='dateBtnText'>{props.startHour}</p>
                    </div>
                    <p className='dateBtnText'>:</p>
                    <div className='dateBtn' onClick={() => {
                        if (document.getElementById('startMinutePicker').style.display === 'block') {
                            props.setSelectedPicker('');
                            hideModal('startMinutePicker', true);
                        } else {
                            props.setSelectedPicker('Set Start Minute');
                            showModal('startMinutePicker');
                            hideOtherNestModals('startMinutePicker');
                        }
                    }
                    }>
                        <p className='dateBtnText'>{props.startMinute}</p>
                    </div>
                    <div className='dateBtn' onClick={() => {
                        if (props.startsAm) {
                            document.getElementById('startAmBtn').innerText = 'pm';
                            props.setStartsAm(false);
                        } else {
                            document.getElementById('startAmBtn').innerText = 'am';
                            props.setStartsAm(true);
                        }
                    }}>
                        <p id='startAmBtn' className='dateBtnText'>am</p>
                    </div>
                </div>
            </div>
            <div className='timeSetterRow'>
                <p>Ends</p>
                <div className='dateComponents'>
                    <div className='dateBtn' onClick={() => {
                        if (document.getElementById('endHourPicker').style.display === 'block') {
                            props.setSelectedPicker('');
                            hideModal('endHourPicker', true);
                        } else {
                            props.setSelectedPicker('Set End Hour');
                            showModal('endHourPicker');
                            hideOtherNestModals('endHourPicker');
                        }
                    }
                    }>
                        <p className='dateBtnText'>{props.endHour}</p>
                    </div>
                    <p className='dateBtnText'>:</p>
                    <div className='dateBtn' onClick={() => {
                        if (document.getElementById('endMinutePicker').style.display === 'block') {
                            props.setSelectedPicker('');
                            hideModal('endMinutePicker', true);
                        } else {
                            props.setSelectedPicker('Set End Minute');
                            showModal('endMinutePicker');
                            hideOtherNestModals('endMinutePicker');
                        }
                    }
                    }>
                        <p className='dateBtnText'>{props.endMinute}</p>
                    </div>
                    <div className='dateBtn' onClick={() => {
                        if (props.endsAm) {
                            document.getElementById('endAmBtn').innerText = 'pm';
                            props.setEndsAm(false);
                        } else {
                            document.getElementById('endAmBtn').innerText = 'am';
                            props.setEndsAm(true);
                        }
                    }}>
                        <p id='endAmBtn' className='dateBtnText'>am</p>
                    </div>
                </div>
            </div>
        </>
    );
}

export const HourPicker = props => {
    return (
        <div id={props.modalId}>
            <div className='dayRow'>
                <div className='dayBtn' onClick={() => selectHour('1', props.startOrEnd, props.setHour)}>
                    <p id={`${props.startOrEnd}Hour1`}>1</p>
                </div>
                <div className='dayBtn' onClick={() => selectHour('2', props.startOrEnd, props.setHour)}>
                    <p id={`${props.startOrEnd}Hour2`}>2</p>
                </div>
                <div className='dayBtn' onClick={() => selectHour('3', props.startOrEnd, props.setHour)}>
                    <p id={`${props.startOrEnd}Hour3`}>3</p>
                </div>
                <div className='dayBtn' onClick={() => selectHour('4', props.startOrEnd, props.setHour)}>
                    <p id={`${props.startOrEnd}Hour4`}>4</p>
                </div>
            </div>
            <div className='dayRow'>
                <div className='dayBtn' onClick={() => selectHour('5', props.startOrEnd, props.setHour)}>
                    <p id={`${props.startOrEnd}Hour5`}>5</p>
                </div>
                <div className='dayBtn' onClick={() => selectHour('6', props.startOrEnd, props.setHour)}>
                    <p id={`${props.startOrEnd}Hour6`}>6</p>
                </div>
                <div className='dayBtn' onClick={() => selectHour('7', props.startOrEnd, props.setHour)}>
                    <p id={`${props.startOrEnd}Hour7`}>7</p>
                </div>
                <div className='dayBtn' onClick={() => selectHour('8', props.startOrEnd, props.setHour)}>
                    <p id={`${props.startOrEnd}Hour8`}>8</p>
                </div>
            </div>
            <div className='dayRow'>
                <div className='dayBtn' onClick={() => selectHour('9', props.startOrEnd, props.setHour)}>
                    <p id={`${props.startOrEnd}Hour9`}>9</p>
                </div>
                <div className='dayBtn' onClick={() => selectHour('10', props.startOrEnd, props.setHour)}>
                    <p id={`${props.startOrEnd}Hour10`}>10</p>
                </div>
                <div className='dayBtn' onClick={() => selectHour('11', props.startOrEnd, props.setHour)}>
                    <p id={`${props.startOrEnd}Hour11`}>11</p>
                </div>
                <div className='dayBtn' onClick={() => selectHour('12', props.startOrEnd, props.setHour)}>
                    <p id={`${props.startOrEnd}Hour12`}>12</p>
                </div>
            </div>
        </div>
    );
}

export const MinutePicker = props => {
    return (
        <div id={props.modalId}>
            <div className='dayRow'>
                <div className='dayBtn' onClick={() => selectMinute('00', props.startOrEnd, props.setMinute)}>
                    <p id={`${props.startOrEnd}Minute0`}>00</p>
                </div>
                <div className='dayBtn' onClick={() => selectMinute('05', props.startOrEnd, props.setMinute)}>
                    <p id={`${props.startOrEnd}Minute5`}>05</p>
                </div>
                <div className='dayBtn' onClick={() => selectMinute('10', props.startOrEnd, props.setMinute)}>
                    <p id={`${props.startOrEnd}Minute10`}>10</p>
                </div>
                <div className='dayBtn' onClick={() => selectMinute('15', props.startOrEnd, props.setMinute)}>
                    <p id={`${props.startOrEnd}Minute15`}>15</p>
                </div>
            </div>
            <div className='dayRow'>
                <div className='dayBtn' onClick={() => selectMinute('20', props.startOrEnd, props.setMinute)}>
                    <p id={`${props.startOrEnd}Minute20`}>20</p>
                </div>
                <div className='dayBtn' onClick={() => selectMinute('25', props.startOrEnd, props.setMinute)}>
                    <p id={`${props.startOrEnd}Minute25`}>25</p>
                </div>
                <div className='dayBtn' onClick={() => selectMinute('30', props.startOrEnd, props.setMinute)}>
                    <p id={`${props.startOrEnd}Minute30`}>30</p>
                </div>
                <div className='dayBtn' onClick={() => selectMinute('35', props.startOrEnd, props.setMinute)}>
                    <p id={`${props.startOrEnd}Minute35`}>35</p>
                </div>
            </div>
            <div className='dayRow'>
                <div className='dayBtn' onClick={() => selectMinute('40', props.startOrEnd, props.setMinute)}>
                    <p id={`${props.startOrEnd}Minute40`}>40</p>
                </div>
                <div className='dayBtn' onClick={() => selectMinute('45', props.startOrEnd, props.setMinute)}>
                    <p id={`${props.startOrEnd}Minute45`}>45</p>
                </div>
                <div className='dayBtn' onClick={() => selectMinute('50', props.startOrEnd, props.setMinute)}>
                    <p id={`${props.startOrEnd}Minute50`}>50</p>
                </div>
                <div className='dayBtn' onClick={() => selectMinute('55', props.startOrEnd, props.setMinute)}>
                    <p id={`${props.startOrEnd}Minute55`}>55</p>
                </div>
            </div>
        </div>
    );
}

export default TimePicker;