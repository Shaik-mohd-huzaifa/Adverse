import { Link, useNavigate } from "react-router-dom"
import "./SideBar.styles.scss"
import { RiMapPinUserFill } from "react-icons/ri";
import { RiCompassDiscoverLine } from "react-icons/ri";
import { FaSignOutAlt } from "react-icons/fa";




export const SideBar = () => {
    const navigate = useNavigate()
    const handleSignOut = () => {
        // userSignOut();
        navigate("/login")
      };
    return (
      <div className="sidebar">
        <div className="header">
          <h2>AdVerse</h2>
        </div>
        <ul>
          <li>
            <RiMapPinUserFill className="icon" />
            <Link to="/dashboard">Ads Generator</Link>
          </li>
          <li>
            <RiCompassDiscoverLine className="icon" />
            <Link to="Organisations">Organisations</Link>
          </li>
        </ul>
        <div className="buttons">
        </div>
      </div>
    );
} 
