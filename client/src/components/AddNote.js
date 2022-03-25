import React, { useContext, useState } from 'react'
import noteContext from "../context/notes/noteContext"
import { Link, Navigate } from 'react-router-dom'

const AddNote = (props) => {
    const context = useContext(noteContext);
    const { notes, addNote, responseAddNote } = context;

    const [note, setNote] = useState({title: "", description:"", tag:""});
    const [redirect, setRedirect] = useState(false)
    const handleClick = (e) => {
        e.preventDefault()
        // if (response)
        addNote(note.title, note.description, note.tag === "" ? "General" : note.tag)
        setRedirect(true)
        props.showAlert("Added your memo sucessfully", "success")
    }
    const onChange = (e) => {
        setNote({...note, [e.target.name]: e.target.value})
    }
    return (
        <>
             { redirect ? (<Navigate to="/"/>) : null }
            <hr />
            <h1>Add a memo</h1>
            <hr />
            <form>
                <div className="form-floating mb-3">
                    <input onChange={onChange} type="text" className="form-control" id="title" placeholder="Title" name="title" minLength={3} required />
                    <label htmlFor="title">Title</label>
                </div>
                <div className="form-floating">
                    <textarea onChange={onChange} name="description" type="text" className="form-control" id="description" placeholder="Description" minLength={5} required />
                    <label htmlFor="description">Description</label>
                </div>
                <br />
                <div className="form-floating mb-3">
                    <input onChange={onChange} name="tag" type="text" className="form-control" id="tag" placeholder="General" />
                    <label htmlFor="tag">Tag</label>
                </div>
                <button disabled={note.title.length < 3 || note.description.length < 5} type="submit" className="btn btn-warning" onClick={handleClick}>Add Note</button>
            </form>
            <hr />
            <Link to='/'>
                <button type="button" className="btn btn-warning flotingUp">
                    <i className="fa-solid fa-house"></i>                
                </button>
            </Link>
        </>
    )
}

export default AddNote