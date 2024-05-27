import React, { useState, useEffect } from "react";
import NoteContext from "./NoteContext";

const NoteState = (props) => {
  const host = "https://inotebook-backend-2-8kpe.onrender.com";
  const [notes, setNotes] = useState([]);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [name, setName] = useState(null);

  // Check for token and set authentication state
  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      setIsAuthenticated(true);
      getuser(token); // Fetch user data if authenticated
    }
  }, []);

  // Get notes
  const getNote = async (token) => {
    const response = await fetch(`${host}/api/notes/fetchallnotes`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Auth': token
      }
    });
    const json = await response.json();
    setNotes(json);
  };

  // Add a note
  const addNote = async (title, description, tag) => {
    const token = localStorage.getItem('token');
    const response = await fetch(`${host}/api/notes/addnote`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Auth': token
      },
      body: JSON.stringify({ title, description, tag })
    });
    const json = await response.json();
    setNotes((prevNotes) => [...prevNotes, json]);
  };

  // Delete a note
  const deleteNote = async (id) => {
    const token = localStorage.getItem('token');
    await fetch(`${host}/api/notes/deletenote/${id}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        'Auth': token
      }
    });
    setNotes(notes.filter(note => note._id !== id));
  };

  // Edit a note
  const editNote = async (id, title, description, tag) => {
    const token = localStorage.getItem('token');
    const response = await fetch(`${host}/api/notes/updateNotes/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'Auth': token
      },
      body: JSON.stringify({ title, description, tag })
    });
    const json = await response.json();

    // Update the note in the local state
    const newNotes = notes.map((note) => (note._id === id ? json : note));
    setNotes(newNotes);
  };

  // Get user
  const getuser = async (token) => {
    const response = await fetch(`${host}/api/auth/getuser`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Auth': token
      }
    });
    const json = await response.json();
    
    setName(json.name);
  };

  return (
    <NoteContext.Provider value={{ notes, addNote, deleteNote, editNote, getNote, isAuthenticated, getuser, name,setIsAuthenticated }}>
      {props.children}
    </NoteContext.Provider>
  );
};

export default NoteState;
