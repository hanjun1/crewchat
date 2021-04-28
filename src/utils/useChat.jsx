import { useEffect, useRef, useState } from "react";
import socketIOClient from "socket.io-client";

const NEW_CHAT_MESSAGE = "NEW_CHAT_MESSAGE";
const NEW_EVENT_CHAT_MESSAGE = "NEW_EVENT_CHAT_MESSAGE";
const SOCKET_SERVER_URL = "http://localhost:3001";

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

    socketRef.current.on(NEW_EVENT_CHAT_MESSAGE, (message) => {
      console.log("EVENT MSG SENT");
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
      type: "text",
      text: {
        content: messageBody,
      },
      senderId: socketRef.current.id,
      userId: user._id,
      senderName: user.name,
      time: Date.now(),
    });
  };

  const sendEventMsg = (messageBody) => {
    if (!socketRef.current) return;
    console.log("sendEventMsg triggered");
    socketRef.current.emit(NEW_EVENT_CHAT_MESSAGE, {
      ...messageBody,
      type: "event",
      userId: user._id,
      time: Date.now(),
      senderId: socketRef.current.id,
    });
  };

  return {
    messages,
    setMessages,
    sendMessage,
    sendEventMsg,
  };
};

export default useChat;
