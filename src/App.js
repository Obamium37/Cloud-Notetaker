import { useState, useEffect } from 'react';
import './App.css';
import { db } from './firebase-config';
import {collection, getDocs, addDoc, deleteDoc, doc, updateDoc} from "firebase/firestore"; 
import { async } from '@firebase/util';


function App() {


  const [input, setInput] = useState("");
  const [newNote, setNewNote ] = useState("");
  const [newData, setNewData ] = useState("");

  const [username, setUsers] = useState([]);
  const usernameCollectionRef = collection(db, "username");




  const createNote = async () => {
    setNewNote("")
    setNewData("")
    await addDoc(usernameCollectionRef, {name: newNote, notes: newData})
    
  }






  const deleteNote = async (id) => {
    const userDoc = doc(db, "username", id);
    await deleteDoc(userDoc);
  }


  const updateNote = async (id, notes) => {
    const userDoc = doc(db, "username", id);
    const newFields = { notes: notes + ' ' + input };
    setInput("")
    await updateDoc(userDoc, newFields);
  };

  



  useEffect(() => {

    const getUsers = async () => {
      const data = await getDocs(usernameCollectionRef);
      setUsers(data.docs.map((doc) => ({...doc.data(), id: doc.id })))

    }

    getUsers();
  }, [usernameCollectionRef])




  return (

    <div className="App">
      <input placeholder='New Note Name' onChange={(event) => {setNewNote(event.target.value)}}/>
      <textarea type="textarea" placeholder='Enter Notes' onChange={(event) => {setNewData(event.target.value)}}/>
      <button onClick={createNote}> Create Note</button>
      {" "}
      {username.map((username) => {

        return (
        <div>
          {" "}
          <h1>Name: {username.name} </h1>
          <p>Notes: {username.notes} </p>

          <textarea type="textarea" value={input} placeholder='Enter Edit' onChange={(event) => {setInput(event.target.value)}}/>
          <button onClick={() => {updateNote(username.id, username.notes)}}>Submit</button>        
          <button onClick={() => {deleteNote(username.id)}}>Delete Note</button>
          
        </div>
        ) 
      })}
    </div>
  );

}

export default App;
