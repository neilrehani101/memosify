import React, { useState } from "react";
import './App.css';
import {
  BrowserRouter as Router,
  Routes,
  Route
} from "react-router-dom";
import AlertSuccess from './components/AlertSuccess';
import Navbar from './components/Navbar';
import Notes from "./components/Notes";
import { About } from "./components/About";
import NoteState from "./context/notes/NoteState";
import AddNote from "./components/AddNote";
import Login from "./components/Login";
import SignUp from "./components/SignUp";

function App() {
  const [alert, setAlert] = useState({
    msg: "message",
    type: "type",
    show: false
  });

  const showAlert = (message, type) => {
    setAlert({
      msg: message,
      type: type,
      show: true
    })
    setTimeout(() => {
      setAlert({
        show: false
      });
    }, 3000);
  }
  return (
    <>
      <NoteState showAlert={showAlert}>
        <Router>
          <Navbar showAlert={showAlert} />
          <AlertSuccess functionDone={alert.msg} show={alert.show} type={alert.type} />
          <div className="container">
            <Routes>
              <Route path="/" element={<Notes showAlert={showAlert} />} />
              <Route path="/about" element={<About />} />
              <Route path="/add" element={<AddNote showAlert={showAlert} />} />
              <Route path="/login" element={<Login showAlert={showAlert} />} />
              <Route path="/signUp" element={<SignUp showAlert={showAlert} />} />
            </Routes>
          </div>
        </Router>
      </NoteState>
    </>
  );
}

export default App;
