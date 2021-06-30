import React from "react";
import "./_sidebar.scss";

import {
  MdSubscriptions,
  MdExitToApp,
  MdThumbUp,
  MdHistory,
  MdLibraryBooks,
  MdHome,
  MdExplore,
} from "react-icons/md";

import { RiVideoLine } from "react-icons/ri";
import { useDispatch } from "react-redux";
import { log_out } from "../../redux/actions/auth.action";
import { Link } from "react-router-dom";

const Sidebar = ({ sidebar, handleToggleSidebar, smallScreen }) => {
  const dispatch = useDispatch();

  const logOutHandler = () => {
    dispatch(log_out());
  };

  //   onClick={() => handleToggleSidebar(false)}

  return (
    <nav className={!smallScreen ? "sidebar open" : "sidebar"}>
      <Link to="/" className="text-decoration-none">
        <li>
          <MdHome size={23} />
          <span>Home</span>
        </li>
      </Link>
      <li>
        <MdExplore size={23} />
        <span>Explore</span>
      </li>

      <Link to="/feed/subscriptions" className="text-decoration-none">
        <li>
          <MdSubscriptions size={23} />
          <span>Subscriptions</span>
        </li>
      </Link>

      <li>
        <MdThumbUp size={23} />
        <span>Liked Videos</span>
      </li>

      <li>
        <MdHistory size={23} />
        <span>History</span>
      </li>

      <li>
        <MdLibraryBooks size={23} />
        <span>Library</span>
      </li>
      <li>
        <RiVideoLine size={23} />
        <span>Your Videos</span>
      </li>

      <hr />

      <li onClick={logOutHandler}>
        <MdExitToApp size={23} />
        <span>Log Out</span>
      </li>

      <hr />
    </nav>
  );
};

export default Sidebar;
