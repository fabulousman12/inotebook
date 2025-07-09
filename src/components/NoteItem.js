import React, { useContext } from 'react'
import noteContext from '../context/notes/NoteContext';
import '../NoteItem.css';
const NoteItem = (props) => {

  const context = useContext(noteContext);
  const{deleteNote}=context;
  console.log = console.warn = console.error = () => {};

  // Look ma, no error!
  console.error('Something bad happened.');

  const truncateDescription = (description, charCount) => {
    if (description.length <= charCount) {
        return description;
    } else {
        return description.substring(0, charCount) + '...';
    }
};

    const {note,updatenote,loadnote} = props;


  return (
    <div className="col-md-4 my-2">
    <div className="note-card card">
        <div className="note-card-body card-body">
            <div className="d-flex align-items-center justify-content-between">
                <h5 className="card-title mb-0">{note.title}</h5>
                <div>
                    <i className="fa-solid fa-delete-left mx-3 icon" data-bs-toggle="tooltip"
                                title="Delete Note" onClick={() => deleteNote(note._id)}></i>
                    <i className="fa-solid fa-pen-to-square mx-3 icon" data-bs-toggle="tooltip"
                                title="Edit Note" onClick={() => updatenote(note)}></i>
                    <i className="fa-solid fa-door-open mx-3 icon fa-2x" data-bs-toggle="tooltip"
                                title="Open Note" onClick={()=> loadnote(note)}></i>
                </div>
            </div>
            <p className="card-text">{ note.description && truncateDescription(note.description, 25)}</p>
        </div>
    </div>
</div>
  )
}

export default NoteItem
