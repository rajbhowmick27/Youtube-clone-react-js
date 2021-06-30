import React, { useState } from "react";
import "./_header.scss";

import { FaBars } from "react-icons/fa";
import { AiOutlineSearch } from "react-icons/ai";
import { RiMicFill, RiVideoAddFill } from "react-icons/ri";
import { MdNotifications, MdApps } from "react-icons/md";
import { useSelector } from "react-redux";
import { useHistory } from "react-router-dom";

const Header = ({ handleToggleSidebar }) => {
  const { user } = useSelector((state) => state.auth);

  const [input, setInput] = useState("");

  const history = useHistory();

  const handleSubmit = (e) => {
    e.preventDefault();

    history.push(`/search/${input}`);
  }

  return (
    <div className="header">
      <div className="header__left">
        <FaBars
          className="header__menu"
          size={26}
          onClick={() => handleToggleSidebar()}
        />


        <div className="header__youtube">
          <img
            src="http://pngimg.com/uploads/youtube/youtube_PNG2.png"
            alt=""
            className="header__logo"
          />
          <div className="header__title">
            <h3>
              YouTube <sup className="region">IN</sup>
            </h3>
          </div>
        </div>
      </div>

      <div className="search__bar">
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Search"
            value={input}
            onChange={(e) => setInput(e.target.value)}
          />
          <button type="submit">
            <AiOutlineSearch size={22} />
          </button>
        </form>
        <RiMicFill className="mic" />
      </div>

      <div className="header__icons">
        <RiVideoAddFill size={28} />
        <MdApps size={28} />
        <MdNotifications size={28} />
        <img src={user?.photoURL} alt={user?.name} />
      </div>
    </div>
  );
};

export default Header;
