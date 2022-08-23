import { NavLink, Link } from "react-router-dom";
import Messages from "./Messages";



function Nav() {



    return(
        <>
            <div className="container">
                <div className="row">
                    <div className="col12">
                        <nav className="nav" style={{margin: "15px", backgroundColor: "#00000008"}}>
                            <NavLink className="nav-link" to='/admin/' style={
                                ({ isActive }) => isActive ? {
                                    color: 'crimson'
                                } : null
                                }>Admin</NavLink>
                            <NavLink className="nav-link" to='/admin/services' style={
                                ({ isActive }) => isActive ? {
                                    color: 'crimson'
                                } : null
                                }>Services</NavLink>
                            <NavLink className="nav-link" to='/admin/workers' style={
                                ({ isActive }) => isActive ? {
                                    color: 'crimson'
                                } : null
                                }>Workers</NavLink>
                            <Link className="nav-link" to="/logout">Logout</Link>
                        </nav>
                    </div>
                </div>
            </div>
            <div>
                <Messages/>
            </div>
        </>
    )
}

export default Nav;