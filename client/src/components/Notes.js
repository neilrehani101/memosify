import React, { useContext, useEffect, useRef, useState } from 'react'
import noteContext from "../context/notes/noteContext"
import AddNote from './AddNote';
import { Link } from 'react-router-dom'
import NoteItem from './NoteItem';
import AlertSuccess from './AlertSuccess';
import { useNavigate } from 'react-router-dom'

const Notes = (props) => {
    const context = useContext(noteContext);
    const { notes, editNote, getNotes } = context;
    // const closeRef = useRef(null)
    const obj = {};
    let navigate = useNavigate()
    const [note, setNote] = useState({ etitle: "", edescription: "", etag: "", id: "" });
    useEffect(() => {
        if(localStorage.getItem('token')) {
            getNotes()
        } 
        else {
            navigate("/login")
        }
    }, [])
    const updateNote = (currentNote) => {
        ref.current.click()
        setNote({ id: currentNote._id, etitle: currentNote.title, edescription: currentNote.description, etag: currentNote.tag })
    }
    const ref = useRef(null)
    const handleClick = (e) => {
        e.preventDefault()
        editNote(note.id, note.etitle, note.edescription, note.etag)
        props.showAlert("Edited your memo successfully!", "success")
    }
    const onChange = (e) => {
        setNote({ ...note, [e.target.name]: e.target.value })
    }
    return (
        <>
            {/* <AlertSuccess functionDone="deleted note" show={true} type="success" /> */}
            <hr />
            <button type="button" className="btn btn-primary d-none" data-bs-toggle="modal" data-bs-target="#exampleModal" ref={ref}>
                Launch demo modal
            </button>
            <div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <form>
                            <div className="modal-header">
                                <h5 className="modal-title" id="exampleModalLabel">Edit your memo</h5>
                                <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                            </div>
                            <div className="modal-body">

                                <div className="form-floating mb-3">
                                    <input onChange={onChange} type="text" className="form-control" id="etitle" placeholder="Title" name="etitle" value={note.etitle} />
                                    <label htmlFor="title">Title <span className="badge bg-secondary">Optional</span></label>
                                </div>
                                <div className="form-floating">
                                    <textarea onChange={onChange} name="edescription" type="text" className="form-control" id="edescription" placeholder="Description" value={note.edescription} />
                                    <label htmlFor="description">Description <span className="badge bg-secondary">Optional</span></label>
                                </div>
                                <br />
                                <div className="form-floating mb-3">
                                    <input onChange={onChange} name="etag" type="text" className="form-control" id="etag" placeholder="General" value={note.etag} />
                                    <label htmlFor="tag">Tag <span className="badge bg-secondary">Optional</span></label>
                                </div>
                            </div>
                            <div className="modal-footer">
                                {/* <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button> */}
                                <button type="submit" disabled={note.etitle.length < 3 || note.edescription.length < 5}  className="btn btn-warning" onClick={handleClick} data-bs-dismiss="modal" >Update Note</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
            <h1>Your Memos</h1>
            <Link to='/add'>
                <button type="button" className="btn btn-warning floting">
                    <i className="fa-solid fa-plus"></i>
                </button>
            </Link>
            <hr />
            {/* {notes.map((notes) => {
                return <NoteItem title={notes.tix`tle} description={notes.description} tag={notes.tag} />;
            })} */}
            <div className="row my-3">
                <div className="container">
                    {notes.length === 0 && "No memos to show🤷‍♂️! Add a memo by clicking the ➕ button!"}
                </div>
                {
                    notes.map((note) => {
                        return <NoteItem updateNote={updateNote} key={note._id} note={note} />
                    })
                }
            </div>
                {/* <Alert key={idx} variant={variant}>
                    This is a {variant} alert—check it out!
                </Alert> */}
        </>
    )
}

export default Notes