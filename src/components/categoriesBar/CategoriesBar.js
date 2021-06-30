import React from "react";
import { useState } from "react";
import { useDispatch } from "react-redux";
import "./_categoriesBar.scss";
import { getPopularVideos, getVideosByCategory } from '../../redux/actions/videos.action'

const keywords = [
  "All",
  "News",
  "React JS",
  "Angular JS",
  "React Native",
  "Comedy",
  "Redux",
  "Music",
  "Data Structures & Algorithms",
  "Competitive Programming",
  "Bollywood",
  "Coding",
  "Cricket",
  "Football",
  "Real Madrid",
  "StandUp",
  "Cooking",
];

const CategoriesBar = () => {
  const [activeElement, setActiveElement] = useState("All");

  const dispatch = useDispatch();

  const handleClick = (value) => {
    setActiveElement(value);
    if(value === 'All')
      dispatch(getPopularVideos());
    else
      dispatch(getVideosByCategory(value));
  };

  return (
    <div className="categoriesBar">
      {keywords.map((value, index) => (
        <span
          onClick={() => handleClick(value)}
          key={index}
          className={activeElement === value ? "active" : ""}
        >
          {value}
        </span>
      ))}
    </div>
  );
};

export default CategoriesBar;
