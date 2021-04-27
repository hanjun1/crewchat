import { useEffect, useRef, useState } from "react";
import socketIOClient from "socket.io-client";

const NEW_CHAT_MESSAGE = "NEW_CHAT_MESSAGE";
const SOCKET_SERVER_URL = "/";

const useChat = (roomId, user) => {
  const [messages, setMessages] = useState([]);
  const socketRef = useRef();

  useEffect(() => {
    socketRef.current = socketIOClient(SOCKET_SERVER_URL, {
      query: { roomId },
    });

    socketRef.current.on("connect", () => {
      console.log(socketRef.current.id);
    });

    socketRef.current.on(NEW_CHAT_MESSAGE, (message) => {
      const incomingMessage = {
        ...message,
        ownedByCurrentUser: message.senderId === socketRef.current.id,
      };
      setMessages((messages) => [...messages, incomingMessage]);
    });

    return () => {
      console.log("disconnect");
      socketRef.current.disconnect();
    };
  }, [roomId]);

  const sendMessage = (messageBody) => {
    if (!socketRef.current) return;
    socketRef.current.emit(NEW_CHAT_MESSAGE, {
      body: messageBody,
      senderId: socketRef.current.id,
      userId: user._id,
      senderName: user.name,
      time: Date.now(),
    });
  };

  return {
    messages,
    setMessages,
    sendMessage,
  };
};

export default useChat;
