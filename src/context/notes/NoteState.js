import React, { useState, useEffect } from "react";
import NoteContext from "./NoteContext";

const NoteState = (props) => {
  const host = ""; // Change this to your backend URL
  const [notes, setNotes] = useState([]);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [name, setName] = useState(null);
  const [chosecat, setchosecat] = useState("All");
  const [images, setImages] = useState([]);
  const categories = ['All','Maths', 'Physics', 'Bio', 'Chem' , 'Stat' , 'Computer' , 'English' , 'Constituition','Electronics','tech','Biochem','others'];

  // Check for token and set authentication state

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
  // get the img
  const getimg = async () => {
    const token = localStorage.getItem('token');
    const response = await fetch(`${host}/api/img/files`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Auth': token
      }
    });
    const json = await response.json();
 
    setImages(json);
    return json;
  };

  // Delete an image
  const deleteimg = async (imgid) => {
    const token = localStorage.getItem('token');
    await fetch(`${host}/api/img/delete/${imgid}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        'Auth': token
      }
    });
    setImages(images.filter(img => img._id !== imgid));
  };

  // Add an 
  const Imgadd = async (formData) => {
    const token = localStorage.getItem('token');

    const response = await fetch(`${host}/api/img/upload`, {
      method: 'POST',
      headers: {
        'Auth': token,
      },
      body: formData
    });
    const json = await response.json();
    setImages((prevImages) => [...prevImages, json]);
  };

  return (
    <NoteContext.Provider value={{ notes, addNote, deleteNote, editNote, getNote, isAuthenticated, getuser, name,setIsAuthenticated,host,categories,getimg,chosecat, setchosecat,images,deleteimg,Imgadd }}>
      {props.children}
    </NoteContext.Provider>
  );
};

export default NoteState;
