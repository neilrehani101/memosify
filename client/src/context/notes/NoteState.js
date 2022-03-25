import React, { useState } from "react";
import NoteContext from "./noteContext";

const NoteState = props => {
    const host = "http://localhost:5000"
    const notesInitial = [];
    const [notes, setNotes] = useState(notesInitial)

    // Add note
    const addNote = async (title, description, tag) => {
        const response = await fetch(`${host}/notes/addMemo`, {
            method: 'POST', // *GET, POST, PUT, DELETE, etc.
            headers: {
                'Content-Type': 'application/json',
                "auth-token": localStorage.getItem('token')
            },
            body: JSON.stringify({title, description, tag}) // body data type must match "Content-Type" header
        });
        const note = await response.json
        setNotes(notes.concat(note))
    }

    const getNotes = async () => {
        const response = await fetch(`${host}/notes/fetchAllMemos`, {
            method: 'GET', // *GET, POST, PUT, DELETE, etc.
            headers: {
                'Content-Type': 'application/json',
                "auth-token": localStorage.getItem('token')
            },
        });
        const json = await response.json()
        setNotes(json)
    }

    // Delete note
    const deleteNote = async (id) => {
    const response = await fetch(`${host}/notes/deleteMemo/${id}`, {
            method: 'DELETE', // *GET, POST, PUT, DELETE, etc.
            headers: {
                'Content-Type': 'application/json',
                "auth-token": localStorage.getItem('token')
            },
        });
        const newNotes = notes.filter((note)=>{return note._id !== id})
        setNotes(newNotes)
        props.showAlert("Deleted your memo successfully!", "success")
    }

    // Edit note
    const editNote = async (id, title, description, tag) => {
        const response = await fetch(`${host}/notes/updateMemo/${id}`, {
            method: 'PUT', // *GET, POST, PUT, DELETE, etc.
            headers: {
                'Content-Type': 'application/json',
                "auth-token": localStorage.getItem('token')
            },
            body: JSON.stringify({title, description, tag}) // body data type must match "Content-Type" header
        });
        const json = await response.json();
        console.log(json)
        let newNotes = JSON.parse(JSON.stringify(notes))
        for (let i = 0; i < newNotes.length; i++) {
            const element = newNotes[i];
            if (element._id === id) {
                newNotes[i].title = title;
                newNotes[i].description = description;
                newNotes[i].tag = tag;
                break;
            }
            ;
        }
        setNotes(newNotes)

    }

    return (
        <NoteContext.Provider value={{ notes, getNotes, setNotes, addNote, editNote, deleteNote }}>
            {props.children}
        </NoteContext.Provider>
    )
}

export default NoteState