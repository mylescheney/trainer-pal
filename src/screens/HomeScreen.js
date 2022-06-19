import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import MainView from '../components/MainView';
import Schedule from '../components/Schedule';
import { useLocation } from 'react-router-dom';
import { db } from '../firebase-config';
import { collection, getDocs, updateDoc, doc } from 'firebase/firestore';
import { calcDateValueWithTime } from '../resources/dateFunctions';
import { getAuth, updateEmail, updatePassword, signInWithEmailAndPassword, deleteUser } from 'firebase/auth';
import { auth } from '../firebase-config';

const HomeScreen = () => {

  const [user, setUser] = useState();
  const [clients, setClients] = useState([]);
  const [clientCount, setClientCount] = useState(0);
  const [selectedClient, setSelectedClient] = useState();
  const [sessions, setSessions] = useState([]);
  const location = useLocation();
  const navigate = useNavigate();

  const usersCollectionRef = collection(db, 'users');

  useEffect(() => {
    const getUsers = async () => {
      const data = await getDocs(usersCollectionRef);
      const users = data.docs.map(doc => ({ ...doc.data(), id: doc.id }));
      for (let i = 0; i < users.length; i++) {
        if (users[i].email === auth.currentUser.email) {
          setUser(users[i]);
          setClients(users[i].clients);
          setClientCount(users[i].clientCount);
          setSessions(users[i].sessions);
        }
      }
    }
    if (!user) {
      getUsers();
    }
  }, [sessions]);

  const addClient = async (clientName, clientPhoneNum, clientEmail, clientPic, clientNotes) => {
    const userDoc = doc(db, 'users', user.id);
    const newClient = {
      key: clientCount + 1,
      clientName: clientName,
      clientPhoneNum: clientPhoneNum,
      clientEmail: clientEmail,
      clientPic: clientPic,
      clientNotes, clientNotes
    }
    clients.push(newClient);

    // Sorts clients by their last name
    clients.sort((a, b) => a.clientName.split(' ')[a.clientName.split(' ').length - 1].localeCompare(b.clientName.split(' ')[b.clientName.split(' ').length - 1]));

    try {
      await updateDoc(userDoc, { clientCount: clientCount + 1, clients: clients });
      setClients(clients);
      setClientCount(clientCount)
      window.location.reload();
    } catch (error) {
      console.log(error.message)
    }
  }

  const viewClient = (allClients, selectedClientEmail) => {
    const client = allClients.filter(client => client.clientEmail === selectedClientEmail)[0];
    setSelectedClient(client);
  }

  const updateClient = async (allClients, selectedClient, nameInput, phoneInput, emailInput, picInput, notesInput) => {
    const userDoc = doc(db, 'users', user.id);

    const clientIndex = allClients.indexOf(selectedClient);
    const clientsUpdated = allClients;
    const updatedClient = {
      key: selectedClient.key,
      clientName: nameInput,
      clientPhoneNum: phoneInput,
      clientEmail: emailInput,
      clientPic: picInput,
      clientNotes: notesInput
    } 

    clientsUpdated.splice(clientIndex, 1, updatedClient);

    try {
      await updateDoc(userDoc, { clients: clientsUpdated });
      setClients(clients);
      window.location.reload();
    } catch (error) {
      console.log(error.message)
    } 
  }

  const deleteClient = async (allClients, selectedClientEmail) => {
    const userDoc = doc(db, 'users', user.id);

    const clientsToKeep = allClients.filter(client => client.clientEmail != selectedClientEmail);

    try {
      await updateDoc(userDoc, { clients: clientsToKeep });
      setClients(clients);
      window.location.reload();
    } catch (error) {
      console.log(error.message)
    }
  }

  const addSession = async (client, month, day, year, startHour, startMinute, startsAm, endHour, endMinute, endsAm) => {
    const userDoc = doc(db, 'users', user.id);
    const newSession = {
      key: client.clientEmail + month + day + year + startHour + startMinute + startsAm,
      client: client,
      month: month,
      day: day,
      year: year,
      startHour: startHour,
      startMinute: startMinute,
      startsAm: startsAm,
      endHour: endHour,
      endMinute: endMinute,
      endsAm: endsAm
    }
    const newSessionDateValue = calcDateValueWithTime(newSession.month, newSession.day, newSession.year, newSession.startHour, newSession.startMinute, newSession.startsAm);
    if (sessions.length !== 0) {
      for (let i = 0; i < sessions.length; i++) {
        const sessionDateValue = calcDateValueWithTime(sessions[i].month, sessions[i].day, sessions[i].year, sessions[i].startHour, sessions[i].startMinute, sessions[i].startsAm);
        if (sessions.length > 1 && sessions[i + 1]) {
          const nextSessionDateValue = calcDateValueWithTime(sessions[i + 1].month, sessions[i + 1].day, sessions[i + 1].year, sessions[i + 1].startHour, sessions[i + 1].startMinute, sessions[i].startsAm);
          if (newSessionDateValue < sessionDateValue) {
            sessions.splice(i, 0, newSession);
            break;
          } else if (newSessionDateValue < nextSessionDateValue) {
            sessions.splice(i + 1, 0, newSession);
            break;
          } else {
            continue;
          }
        } else if (sessions.length === 1) {
          if (newSessionDateValue < sessionDateValue) {
            sessions.unshift(newSession);
            break;
          }
        } else {
          sessions.push(newSession);
          break;
        }
      }
    } else {
      sessions.push(newSession);
    }

    try {
      await updateDoc(userDoc, { sessions: sessions });
      setSessions(sessions);
      window.location.reload();
    } catch (error) {
      console.log(error.message)
    }
  }

  const updateUsername = async (username) => {
    const userDoc = doc(db, 'users', user.id);
    try {
      await updateDoc(userDoc, { name: username });
      window.location.reload();
    } catch (error) {
      console.log(error.message)
    }
  }

  const updateUserEmail = async (newEmail) => {
    const auth = getAuth();
    // NEED TO PASS IN THEIR ACTUAL PASSWORD, CAN'T JUST USE PASSWORD AS DEFAULT
    await signInWithEmailAndPassword(auth, auth.currentUser.email, user.password);
    updateEmail(auth.currentUser, newEmail).then(async () => {
      try {
        const userDoc = doc(db, 'users', user.id);
        await updateDoc(userDoc, { email: newEmail });
      } catch (error) {
        console.log(error.message)
      }
    }).catch((error) => {
      console.log(error);
    });
  }

  const updateUserPassword = async (newPassword) => {
    const auth = getAuth();
    await signInWithEmailAndPassword(auth, auth.currentUser.email, user.password);
    updatePassword(auth.currentUser, newPassword).then(async () => {
      try {
        const userDoc = doc(db, 'users', user.id);
        await updateDoc(userDoc, { password: newPassword });
      } catch (error) {
        console.log(error.message)
      }
    }).catch((error) => {
      console.log(error);
    });
  }

  const deleteAccount = async (password) => {
    const auth = getAuth();
    const user = auth.currentUser;
    await signInWithEmailAndPassword(auth, auth.currentUser.email, password);
    deleteUser(user).then(() => {
      navigate('/register');
    })
    .catch((error) => {
      console.log(error);
    });
  }

  return (
    <div id="home">
      <div id='blocker' />
      <MainView
        user={user}
        clients={clients}
        addClient={addClient}
        selectedClient={selectedClient}
        viewClient={viewClient}
        sessions={sessions}
        updateUsername={updateUsername}
        updateUserEmail={updateUserEmail}
        updateUserPassword={updateUserPassword}
        deleteAccount={deleteAccount}
        updateClient={updateClient}
        deleteClient={deleteClient}
      />
      <Schedule
        clients={clients}
        sessions={sessions}
        addSession={addSession}
      />
    </div>
  )
}

export default HomeScreen;