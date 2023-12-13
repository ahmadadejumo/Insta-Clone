import { createContext, useState } from "react";

const FeedContext = createContext();

export const FeedProvider = ({ children }) => {
  const [data, setData] = useState("");

  return (
    <FeedContext.Provider
      value={{
        data,
        setData,
      }}
    >
      {children}
    </FeedContext.Provider>
  );
};

export default FeedContext;
