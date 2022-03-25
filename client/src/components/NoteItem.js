import React, { useContext } from 'react'
import noteContext from "../context/notes/noteContext"

const NoteItem = (props) => {
    const { note, updateNote } = props;
    const context = useContext(noteContext);
    const { deleteNote } = context;
    return (
        <div className="col-md-3">
            <div className="card">
                <div className="card-body">
                    <h5 className="card-title">{note.title} <span className="badge bg-warning"><font color="black">{note.tag}</font></span></h5>
                    <p className="card-text">{note.description}</p>
                    {/* <div className="row">
                        <div className="col-2">
                            
                        </div>
                        <div className="col-2">

                        </div> */}
                        <div className="btn-group" role="group" aria-label="Basic example">
                            <button type="button" onClick={() => {deleteNote(note._id)}} className="btn btn-warning">
                                <i className="fa-regular fa-trash-can"></i>
                            </button>                            
                            <button type="button" onClick={() => {
                                updateNote(note)
                            }} className="btn btn-warning">
                                <i className="fa-solid fa-pen"></i>
                            </button>                        
                        </div>
                    {/* </div> */}
                </div>
            </div>
            <br />
        </div>
    )
}

export default NoteItem