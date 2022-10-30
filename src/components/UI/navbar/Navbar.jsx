import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from '../../../context/index';
import MyButton from "../button/MyButton";

const Navbar = () => {

    const {isAuth, setIsAuth} = useContext(AuthContext)

    const logout = () => {
        setIsAuth(false)
        localStorage.removeItem('auth')
    }

    return (
        <div className='navbar'>
            <MyButton onClick={logout}>
                Logout
            </MyButton>
            <div className='navbar-links'>
                <Link to={"/about"}>About</Link>
                <Link to={"/posts"}>Notes</Link>
            </div>
        </div>
    );
}

export default Navbar;