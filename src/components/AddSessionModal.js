import React, { useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faXmark } from '@fortawesome/free-solid-svg-icons';
import { hideModal } from '../resources/modalFunctions';
import { clientSearch } from '../resources/clientSearch';
import DatePicker, { MonthPicker, DayPicker } from './DatePicker';
import TimePicker, { HourPicker, MinutePicker } from './TimePicker';
import { getMonthName, getDayRange } from '../resources/datePickerFunctions';

const SearchBlock = props => {
    return (
        <div className='searchBlock' onClick={() => {
            if (props.client !== props.selectedClient) {
                props.setSelectedClient(props.client);
            } else {
                document.getElementById('clientResults').style.display = 'none';
            }
        }}>
            <h5 className='searchBlockTopText'>{props.client.clientName}</h5>
            <div className="searchBlockBottomRow">
                <p className='searchBlockBottomText'>{props.client.clientEmail}</p>
                <p className='searchBlockBottomText'>{props.client.clientPhoneNum}</p>
            </div>
        </div>
    );
}

const AddSessionModal = props => {

    const [searchInput, setSearchInput] = useState('');
    const [selectedClient, setSelectedClient] = useState();
    const selectedClientName = selectedClient ? selectedClient.clientName : '';

    useEffect(() => {
        document.getElementById('clientResults').style.display = 'none';
    }, [selectedClient])

    const currentDate = new Date();
    const [month, setMonth] = useState(currentDate.getMonth() + 1);
    const [day, setDay] = useState(currentDate.getDate());
    const [year, setYear] = useState(currentDate.getFullYear() - 2000);
    let monthName = getMonthName(month);
    let startDay = new Date(`${monthName} 1, 20${year}`).getDay();

    useEffect(() => {
        getDayRange(startDay, month, year, day, setDay);
    }, [startDay, day, month, year]);

    const [selectedPicker, setSelectedPicker] = useState('');
    const [startHour, setStartHour] = useState('9');
    const [startMinute, setStartMinute] = useState('00');
    const [startsAm, setStartsAm] = useState(true);
    const [endHour, setEndHour] = useState('10');
    const [endMinute, setEndMinute] = useState('00');
    const [endsAm, setEndsAm] = useState(true);

    // Rearranges clients alphabetically (last name) 
    const clientsSorted = props.clients.sort((a, b) => a.clientName.split(' ')[a.clientName.split(' ').length - 1].localeCompare(b.clientName.split(' ')[b.clientName.split(' ').length - 1]));
    const possibleClients = clientSearch(clientsSorted, searchInput);
    const clientNames = possibleClients.map(client =>
        <SearchBlock
            key={client.clientEmail}
            client={client}
            selectedClient={selectedClient}
            setSelectedClient={setSelectedClient}
        />);
    return (
        <div id='addSessionModal'>
            <div className='modalHeader'>
                <h2>{selectedClientName}</h2>
                <FontAwesomeIcon
                    icon={faXmark}
                    className='xIcon'
                    onClick={() => {
                        setSelectedClient(null);
                        hideModal('addSessionModal')
                    }}
                />
            </div>
            <div className='inputDiv'>
                <input
                    type="text"
                    id="clientSearch"
                    className='modalTextInput'
                    placeholder='Search Clients...'
                    onFocus={() => document.getElementById('clientResults').style.display = "block"}
                    onChange={e => {
                        setSearchInput(e.target.value);
                    }} />
                <div id="clientResults" style={{ display: 'none' }}>
                    {clientNames}
                </div>
            </div>
            <div id='dateTimeModals'>
                <div className='inputDiv'>
                    <TimePicker
                        startHour={startHour}
                        setStartHour={setStartHour}
                        startMinute={startMinute}
                        setStartMinute={setStartMinute}
                        startsAm={startsAm}
                        setStartsAm={setStartsAm}
                        endHour={endHour}
                        setEndHour={setEndHour}
                        endMinute={endMinute}
                        setEndMinute={setEndMinute}
                        endsAm={endsAm}
                        setEndsAm={setEndsAm} 
                        setSelectedPicker={setSelectedPicker} />
                    <DatePicker
                        month={month}
                        setMonth={setMonth}
                        day={day}
                        setDay={setDay}
                        year={year}
                        setYear={setYear} 
                        setSelectedPicker={setSelectedPicker} />
                </div>
    
                    <div id='dateTimeSelectorDiv'>
                        <div id="dateTimeModalsHeader">
                            <h5>{selectedPicker}</h5>
                        </div>
                        <HourPicker modalId='startHourPicker' startOrEnd='start' setHour={setStartHour}/>
                        <MinutePicker modalId='startMinutePicker' startOrEnd='start' setMinute={setStartMinute}/>
                        <HourPicker modalId='endHourPicker' startOrEnd='end' setHour={setEndHour} />
                        <MinutePicker modalId='endMinutePicker' startOrEnd='end' setMinute={setEndMinute}/>
                        <MonthPicker setMonth={setMonth}/>
                        <DayPicker
                            startDay={startDay}
                            month={month}
                            year={year}
                            day={day}
                            setDay={setDay}  />
                    </div>
 
            </div>
            <div id="addSessionSubmitBtn" className='submitBtn' onClick={() => {
                props.addSession(selectedClient, month, day, year, startHour, startMinute, startsAm, endHour, endMinute, endsAm);
            }}>
                <p className='submitBtnText'>Schedule Session</p>
            </div>
        </div>
    );
}

export default AddSessionModal;