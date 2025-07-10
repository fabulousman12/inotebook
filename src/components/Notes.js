import React, { useContext, useEffect, useRef, useState } from 'react';
import NoteContext from '../context/notes/NoteContext';
import NoteItem from './NoteItem';
import { Addnote } from './Addnote';
import {useHistory} from "react-router"
import "../NoteItem.css"
const Notes = (props) => {
    const context = useContext(NoteContext);
    const { notes, getNote, editNote,getimg } = context;
    const [searchQuery, setSearchQuery] = useState('');
    let history = useHistory()
    console.log = console.warn = console.error = () => {};

// Look ma, no error!
console.error('Something bad happened.');
    useEffect(() => {
        let token = localStorage.getItem('token')
        if(token){
            getNote(token);
            //getimg()
        }else{
             history.push('/login')
        }
        // const tooltipTriggerList = document.querySelectorAll('[data-bs-toggle="tooltip"]');
        // const tooltipList = [...tooltipTriggerList].map(tooltipTriggerEl => new bootstrap.Tooltip(tooltipTriggerEl));
       
    }, []);

    const ref = useRef(null);

    const refClose = useRef(null); // Ref to close the modal after updating
    const refSecondModal = useRef(null);  // Reference to open the second modal
    const refCloseSecondModal = useRef(null);  
    const [note, setNote] = useState({ id: "", etitle: "", edescription: "", etag: "" });
    const [havenote, sethaveNote] = useState({ id: "", title: "", description: "", tag: "" });

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
    const handleInputChange = (event) => {
        setSearchQuery(event.target.value);
      };
      const handleInputChangebtn = (event) => {
        setSearchQuery(event.target.value);
      };
      const styles = {
        container: {
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '10px'
        },
        input: {
          padding: '10px',
          fontSize: '16px',
          borderRadius: '4px',
          border: '1px solid #ccc',
          marginRight: '10px'
        },
        button: {
          padding: '10px 20px',
          fontSize: '16px',
          borderRadius: '4px',
          border: 'none',
          backgroundColor: '#007BFF',
          color: '#fff',
          cursor: 'pointer'
        },
        
      };
  
      const loadnote =(currentnote)=>{
       refSecondModal.current.click()
       sethaveNote({ id: currentnote._id, title: currentnote.title, description: currentnote.description, tag: currentnote.tag });
      }


    return (
        <>
            <Addnote />
            <button type="button" ref={ref} className="btn btn-primary" data-bs-toggle="modal" data-bs-target="#exampleModal" style={{ display: "none" }}>
                Launch demo modal
            </button>
            <button type="button" ref={refSecondModal} className="btn btn-secondary" data-bs-toggle="modal" data-bs-target="#secondModal" style={{ display: "none" }}>
                Launch second modal
            </button>

{/* Edit Note Modal */}
<div
  className="modal fade"
  id="exampleModal"
  tabIndex="-1"
  aria-labelledby="exampleModalLabel"
  aria-hidden="true"
>
  <div className="modal-dialog">
    <div className="modal-content text-dark bg-light rounded-3 shadow">
      <div className="modal-header">
        <h1 className="modal-title fs-5" id="exampleModalLabel">Edit Note</h1>
        <button
          type="button"
          className="btn-close"
          data-bs-dismiss="modal"
          aria-label="Close"
        ></button>
      </div>
      <div className="modal-body">
        <form>
          <div className="mb-3">
            <label htmlFor="etitle" className="form-label fw-semibold">Title</label>
            <input
              type="text"
              className="form-control border border-primary-subtle rounded-2 shadow-sm"
              id="etitle"
              name="etitle"
              value={note.etitle}
              onChange={onChange}
              minLength={3}
              required
              placeholder="Enter title"
            />
          </div>

          <div className="mb-3">
            <label htmlFor="edescription" className="form-label fw-semibold">Description</label>
            <textarea
              className="form-control custom-textarea border border-primary-subtle rounded-2 shadow-sm"
              id="edescription"
              name="edescription"
              value={note.edescription}
              onChange={onChange}
              minLength={5}
              required
              placeholder="Enter description"
              rows="4"
              style={{ resize: "vertical" }}
            ></textarea>
          </div>

          <div className="mb-3">
            <label htmlFor="etag" className="form-label fw-semibold">Tag</label>
            <input
              type="text"
              className="form-control border border-secondary-subtle rounded-2 shadow-sm"
              id="etag"
              name="etag"
              value={note.etag}
              onChange={onChange}
              placeholder="e.g. Work, Personal, Study"
            />
          </div>
        </form>
      </div>
      <div className="modal-footer">
        <button
          type="button"
          className="btn btn-outline-secondary"
          data-bs-dismiss="modal"
          ref={refClose}
        >
          Close
        </button>
        <button
          type="button"
          className="btn btn-primary"
          disabled={note.etitle.length < 3 || note.edescription.length < 5}
          onClick={handleClick}
        >
          Update Changes
        </button>
      </div>
    </div>
  </div>
</div>


{/* View Note Modal */}
{/* View Note Modal */}
<div
  className="modal fade"
  id="secondModal"
  tabIndex="-1"
  aria-labelledby="secondModalLabel"
  aria-hidden="true"
>
  <div className="modal-dialog modal-lg">
    <div className="modal-content bg-light text-dark rounded-3 shadow">
      <div className="modal-header">
        <h1 className="modal-title fs-5" id="secondModalLabel">Your Note</h1>
        <button
          type="button"
          className="btn-close"
          data-bs-dismiss="modal"
          aria-label="Close"
        ></button>
      </div>
      <div className="modal-body">
        <div className="mb-3">
          <label className="form-label fw-semibold">Title</label>
          <p className="form-control-plaintext border rounded px-3 py-2 bg-white">
            {havenote.title || <em className="text-muted">No title</em>}
          </p>
        </div>

        <div className="mb-3">
          <label className="form-label fw-semibold">Description</label>
          <div className="form-control-plaintext border rounded px-3 py-2 bg-white" style={{ whiteSpace: 'pre-wrap' }}>
            {havenote.description || <em className="text-muted">No description</em>}
          </div>
        </div>

        <div className="mb-3">
          <label className="form-label fw-semibold">Tag</label>
          <p className="form-control-plaintext border rounded px-3 py-2 bg-white">
            {havenote.tag || <em className="text-muted">No tag</em>}
          </p>
        </div>
      </div>
      <div className="modal-footer">
        <button
          type="button"
          className="btn btn-secondary"
          data-bs-dismiss="modal"
          ref={refCloseSecondModal}
        >
          Close
        </button>
      </div>
    </div>
  </div>
</div>


            <div className="container row my-3">
            <div style={styles.container}>
      <input 
        type="text" 
        value={searchQuery} 
        onChange={handleInputChange} 
        placeholder="Enter search query" 
        style={styles.input}
      />
      <button onClick={handleInputChangebtn} style={styles.button}>Search</button>
    </div>
                <h1>Your Notes</h1>
                <div className="conatiner mx-2">
                {notes.length===0&&'No notes to display'}
                </div>
                {notes && notes.filter((item)=>{
                    return searchQuery.toLowerCase() === "" ? item : item.title.toLowerCase().includes(searchQuery)
                }).map((note, index) => {
                    return <NoteItem key={note._id + index} updatenote={updatenote} note={note}  loadnote={loadnote} />
                })}
            </div>
        </>
    );
};

export default Notes;
