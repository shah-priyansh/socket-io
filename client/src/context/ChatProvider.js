import { createContext, useContext, useEffect, useState } from "react";
import { getUserFromLocalStorage } from "../utils/localStorage";

const ChatContext = createContext();

const ChatProvider = ({ children }) => {
  const [selectedChat, setSelectedChat] = useState();
  const [user, setUser] = useState();
  const [notification, setNotification] = useState([]);
  const [chats, setChats] = useState();

  useEffect(() => {
    const loggedInUser = getUserFromLocalStorage("user");
    setUser(loggedInUser);
  }, []);

  return (
    <ChatContext.Provider
      value={{
        selectedChat,
        setSelectedChat,
        user,
        setUser,
        notification,
        setNotification,
        chats,
        setChats,
      }}
    >
      {children}
    </ChatContext.Provider>
  );
};

const useAppContext = () => {
  return useContext(ChatContext);
};

export { ChatProvider, useAppContext };
