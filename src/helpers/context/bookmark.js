import React, { createContext, useContext } from "react";
import useToggle from "../../Hooks/useToggle";

const BookmarkContext = createContext();

const BookmarkProvider = ({ children }) => {
  const [isOpen, toggleBookmarkModal] = useToggle(false);

  return (
    <BookmarkContext.Provider value={[isOpen, toggleBookmarkModal]}>
      {children}
    </BookmarkContext.Provider>
  );
};

const useBookmarkContext = () => {
  const context = useContext(BookmarkContext);

  
  return context;
};

export { BookmarkProvider, useBookmarkContext };