import React, { useState, useContext } from 'react';
import noteContext from '../context/notes/NoteContext';

export const Addnote = (props) => {
  const context = useContext(noteContext);

const { addNote, setNotes, notes } = context;


  const [note, setNote] = useState({ title: "", description: "", tag: "" });

  const handleClick = (e) => {
    e.preventDefault();
    addNote(note.title, note.description, note.tag);
    setNote({ title: "", description: "", tag: "" });
    setNotes((prevNotes) => [...prevNotes, note]);
  };

  const onChange = (e) => {
    setNote({ ...note, [e.target.name]: e.target.value });
  };

  return (
    <div className="container my-5 px-3 text-light" style={{ maxWidth: '700px' }}>
      <div className="bg-dark rounded-4 shadow p-4 p-md-5">
        <h2 className="text-center text-primary mb-4">📝 Add a Note</h2>
        <form>
          <div className="mb-4">
            <label htmlFor="title" className="form-label fw-semibold">Title</label>
            <input
              type="text"
              className="form-control bg-secondary bg-opacity-25 text-white border-0"
              id="title"
              name="title"
              value={note.title}
              onChange={onChange}
              minLength={3}
              required
              placeholder="Enter note title"
            />
          </div>

          <div className="mb-4">
            <label htmlFor="description" className="form-label fw-semibold">Description</label>
            <textarea
              className="form-control bg-secondary bg-opacity-25 text-white border-0"
              id="description"
              name="description"
              value={note.description}
              onChange={onChange}
              minLength={5}
              required
              placeholder="Write your note..."
              rows={5}
            ></textarea>
          </div>

          <div className="mb-4">
            <label htmlFor="tag" className="form-label fw-semibold">Tag</label>
            <input
              type="text"
              className="form-control bg-secondary bg-opacity-25 text-white border-0"
              id="tag"
              name="tag"
              value={note.tag}
              onChange={onChange}
              placeholder="Optional tag (e.g., Work, Personal)"
            />
          </div>

          <button
            type="submit"
            disabled={note.title.length < 3 || note.description.length < 8}
            className="btn btn-primary w-100"
            onClick={handleClick}
          >
            ➕ Add Note
          </button>
        </form>
      </div>
    </div>
  );
};
