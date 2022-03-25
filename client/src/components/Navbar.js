import React from 'react'
import {
    NavLink,
    Link,
    useNavigate
} from 'react-router-dom'

const Navbar = (props) => {
    let navigate = useNavigate()
    const handleLogout = () => {
        localStorage.removeItem("token");
        props.showAlert("Logged out successfully", "success")
        navigate("/login")
    }
    return (
        <>
            <nav className="navbar navbar-light bg-warning navbar-expand-lg">
                <div className="container-fluid">
                    <NavLink className="navbar-brand" to="/">
                        <div className="container-fluid">
                            <img src="../memosify.png" alt="" width="30" height="30" className="d-inline-block align-text-top" />
                            Memosify <span className="badge bg-secondary">By Neil Rehani</span>
                        </div>
                    </NavLink>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarSupportedContent">
                        <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                            <li className="nav-item">
                                <NavLink className="nav-link" aria-current="page" to="/">Home</NavLink>
                            </li>
                            <li className="nav-item">
                                <NavLink className="nav-link" to="/about">About</NavLink>
                            </li>
                            {/* <li className="nav-item">
                                <NavLink className="nav-link" to="/add">Add Memo</NavLink>
                            </li> */}
                        </ul>

                        {localStorage.getItem('token') ? <form className='d-flex'>
                            <button className="btn btn-outline-dark mx-2" onClick={handleLogout}>Logout</button>

                        </form> : <form className="d-flex"> <Link to='/signUp'>
                            <button className="btn btn-outline-dark mx-2">Sign Up</button>
                        </Link>
                            <Link to='/login'>
                                <button className="btn btn-outline-dark mx-2">Login</button>
                            </Link></form>}

                    </div>
                </div>
            </nav>
        </>
    )
}

export default Navbar

