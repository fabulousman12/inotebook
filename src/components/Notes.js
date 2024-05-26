import React, { useContext, useEffect, useRef, useState } from 'react';
import NoteContext from '../context/notes/NoteContext';
import NoteItem from './NoteItem';
import { Addnote } from './Addnote';
import {useHistory} from "react-router"
const Notes = (props) => {
    const context = useContext(NoteContext);
    const { notes, getNote, editNote } = context;
    let history = useHistory()
    useEffect(() => {
        let token = localStorage.getItem('token')
        if(token){
            getNote(token);
        }else{
             history.push('/login')
        }
       
    }, [getNote]);

    const ref = useRef(null);
    const refClose = useRef(null); // Ref to close the modal after updating

    const [note, setNote] = useState({ id: "", etitle: "", edescription: "", etag: "" });

    const updatenote = (currentnote) => {
        ref.current.click();
        setNote({ id: currentnote._id, etitle: currentnote.title, edescription: currentnote.description, etag: currentnote.tag });
     
    };

    const handleClick = (e) => {
        e.preventDefault();
        editNote(note.id, note.etitle, note.edescription, note.etag);
     
        refClose.current.click(); // Close the modal after updating
    };

    const onChange = (e) => {
        const { name, value } = e.target;
        setNote(prevNote => ({
            ...prevNote,
            [name]: value || "" // Ensure a defined value, use an empty string if value is undefined
        }));
    };

    return (
        <>
            <Addnote />
            <button type="button" ref={ref} className="btn btn-primary" data-bs-toggle="modal" data-bs-target="#exampleModal" style={{ display: "none" }}>
                Launch demo modal
            </button>

            <div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true" style={{color:'black'}}>
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h1 className="modal-title fs-5" id="exampleModalLabel">Edit Note</h1>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body">
                            <form>
                                <div className="mb-3">
                                    <label htmlFor="etitle" className="form-label">Title</label>
                                    <input type="text" className="form-control" id="etitle" name="etitle" value={note.etitle} onChange={onChange} minLength={3} required/>
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="edescription" className="form-label">Description</label>
                                    <textarea className="form-control" id="edescription" name="edescription" value={note.edescription} onChange={onChange} minLength={5} required ></textarea>
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="etag" className="form-label">Tag</label>
                                    <input type="text" className="form-control" id="etag" name="etag" value={note.etag} onChange={onChange} />
                                </div>
                            </form>
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-secondary" data-bs-dismiss="modal" ref={refClose}>Close</button>
                            <button type="button" className="btn btn-primary" disabled={note.etitle.length<3 || note.edescription.length<5} onClick={handleClick}>Update Changes</button>
                        </div>
                    </div>
                </div>
            </div>
            <div className="container row my-3">
                <h1>Your Notes</h1>
                <div className="conatiner mx-2">
                {notes.length===0&&'No notes to display'}
                </div>
                {notes && notes.map((note, index) => {
                    return <NoteItem key={note._id + index} updatenote={updatenote} note={note} />
                })}
            </div>
        </>
    );
};

export default Notes;
