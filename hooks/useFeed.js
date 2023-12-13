import React, { useContext } from "react";
import FeedContext from "../context/FeedContext";

const useFeed = () => {
  return useContext(FeedContext);
};

export default useFeed;
