// Packages Imported

import { useState, useEffect } from 'react';
import './App.css';
import { db } from './firebase-config';
import {collection, getDocs, addDoc, deleteDoc, doc, updateDoc} from "firebase/firestore"; 



function App() {


  const [input, setInput] = useState("");
  const [newNote, setNewNote ] = useState("");
  const [newData, setNewData ] = useState("");

  const [username, setUsers] = useState([]);
  const usernameCollectionRef = collection(db, "username");



  // To create Note
  const createNote = async () => {
    setNewNote("")
    setNewData("")
    await addDoc(usernameCollectionRef, {name: newNote, notes: newData})
    
  }




  // Delete Note

  const deleteNote = async (id) => {
    const userDoc = doc(db, "username", id);
    await deleteDoc(userDoc);
  }

  // Update Note

  const updateNote = async (id, notes) => {
    const userDoc = doc(db, "username", id);
    const newFields = { notes: notes + ' ' + input};
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


  //Basic Inline Styling 

  const buttonStyle = {
    font: '25',
    color: 'blue'
  }

  const noteStyle = {

    color: 'green'
  }

  const textareaStyle = {
    color: 'red'
  }

  const deleteStyle = {

    color: 'purple'
  }



// Main display for the function

  return (

    <div className="App">
      <input style={textareaStyle} placeholder='New Note Name' onChange={(event) => {setNewNote(event.target.value)}}/>
      <textarea style={textareaStyle} type="textarea" placeholder='Enter Notes' onChange={(event) => {setNewData(event.target.value)}}/>
      <button onClick={createNote}> Create Note</button>
      {" "}
      {username.map((username) => {

        return (
        <div>
          {" "}
          <h1 className='primary'>Name: {username.name} </h1>
          <p style={noteStyle}> Notes: {username.notes} </p>

          <textarea style={noteStyle} type="textarea" value={input} placeholder='Enter Edit' onChange={(event) => {setInput(event.target.value)}}/>
          <button style={buttonStyle} onClick={() => {updateNote(username.id, username.notes)}}>Submit</button>        
          <button style={deleteStyle} onClick={() => {deleteNote(username.id)}}>Delete Note</button>
          
          
        </div>  
        ) 
      })}
    </div>
  );  

}

export default App;



