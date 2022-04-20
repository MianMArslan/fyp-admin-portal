import React from "react";
import './Navbar.css'
import NotificationsNoneIcon from '@mui/icons-material/NotificationsNone';
import img1 from '../../images/off the beaten track.png'
import img2 from "../../images/img4.jpg";

export default function NavbarAdmin(){

    return(
        <div className="navbar">
            <div className="navbarWrapper">
                <div className="navleft">
                    <img src = {img1} className="navbarAvater" alt="websitelogo"></img>
                </div>
                <div className="navright">
                    <div className="navbarIconContainer">
                    <NotificationsNoneIcon />
                    <span className="navbarBadge">2</span>
                    </div>
                    <img src = {img2} className="navAvater" alt="userprofile"></img>
                </div>
            </div>
        </div>
    )
}