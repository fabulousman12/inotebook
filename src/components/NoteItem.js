import React, { useContext } from 'react'
import noteContext from '../context/notes/NoteContext';
import '../NoteItem.css';
const NoteItem = (props) => {

  const context = useContext(noteContext);
  const{deleteNote}=context;



    const {note,updatenote} = props;


  return (
    <div className="col-md-4 my-2">
      <div className="note-card card">
        <div className="note-card-body card-body">
          <div className="d-flex align-items-center">
            <h5 className="card-title">{note.title}</h5>
            <i className="fa-solid fa-delete-left mx-3 icon" onClick={() => { deleteNote(note._id); }}></i>
            <i className="fa-solid fa-pen-to-square mx-3 icon" onClick={() => { updatenote(note); }}></i>
          </div>
          <p className="card-text">{note.description}</p>
        </div>
      </div>
    </div>
  )
}

export default NoteItem
