import React from 'react'
import '../styles/header.css'
import { Link } from 'react-router-dom';
import { auth } from '../firebase';
import {useStateValue} from '../StateProvider'
const Header = () => {
    const [{ basket, user }, dispatch] = useStateValue();

    const handleAuthentication = () => {
        if (user) {
            const confirmSignOut = window.confirm('Are you sure you want to sign out?');
            if (confirmSignOut) {
                auth.signOut();
            }
        }
    }
    return (
        <div className="header">
            <Link to='/'>
                <img
                    className="logo"
                    src="http://pngimg.com/uploads/amazon/amazon_PNG11.png"
                    alt='logo'
                />
            </Link>
            <div className="title">
                <h3>Admin Dashboard</h3>

            </div>

            <div className="nav">
                <Link to={!user && '/login'} style={{ textDecoration: 'none', color: 'white' }}>
                    <div className="option" onClick={handleAuthentication}>
                        <span className="optionLineOne">
                            Hello {user ? 'Admin' : 'Guest'}
                        </span>
                        <span className="optionLineTwo">
                            {user?'Sign Out':'Sign In'}
                        </span>
                    </div>
                </Link>

                <div className="option">
                    <Link to={'/create'} style={{ textDecoration: 'none', color: 'white' }}>
                        <div className="option">
                            <span className="optionLineOne">
                                Add a new
                            </span>
                            <span className="optionLineTwo">
                                Product
                            </span>
                        </div>
                    </Link>
                </div>
                
                <div className="option">
                    <Link to={'https://react-ff86f.web.app/'}>
                        <div>
                            <span className="optionLineOne">Customer?</span>
                            <span className="optionLineTwo">Visit Us</span>
                        </div>
                    </Link>
                </div>
            </div>
        </div>
    );
}

export default Header;