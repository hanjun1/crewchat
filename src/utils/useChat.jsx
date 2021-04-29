import { useEffect, useRef, useState } from "react";
import socketIOClient from "socket.io-client";

const NEW_CHAT_MESSAGE = "NEW_CHAT_MESSAGE";
const NEW_EVENT_CHAT_MESSAGE = "NEW_EVENT_CHAT_MESSAGE";
const NOT_GOING_EVENT = "NOT_GOING_EVENT";
const GOING_EVENT = "GOING_EVENT";
const NEW_POLL_CHAT_MESSAGE = "NEW_POLL_CHAT_MESSAGE";
const UPDATE_POLL_VOTING = "UPDATE_POLL_VOTING";
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
      const incomingMessage = {
        ...message,
        ownedByCurrentUser: message.senderId === socketRef.current.id,
      };
      setMessages((messages) => [...messages, incomingMessage]);
    });

    socketRef.current.on(NEW_POLL_CHAT_MESSAGE, (message) => {
      const incomingMessage = {
        ...message,
        ownedByCurrentUser: message.senderId === socketRef.current.id,
      };
      setMessages((messages) => [...messages, incomingMessage]);
    });

    socketRef.current.on(NOT_GOING_EVENT, (messages) => {
      setMessages(messages);
    });

    socketRef.current.on(GOING_EVENT, (messages) => {
      setMessages(messages);
    });

    socketRef.current.on(UPDATE_POLL_VOTING, (messages) => {
      setMessages(messages);
    });

    return () => {
      console.log("disconnect");
      socketRef.current.disconnect();
    };
  }, [roomId]);

  const sendMessage = (messageBody) => {
    if (!socketRef.current) return;
    socketRef.current.emit(NEW_CHAT_MESSAGE, {
      ...messageBody,
      senderId: socketRef.current.id,
      userId: user._id,
    });
  };

  const sendEventMsg = (messageBody) => {
    if (!socketRef.current) return;
    socketRef.current.emit(NEW_EVENT_CHAT_MESSAGE, {
      ...messageBody,
      userId: user._id,
      senderId: socketRef.current.id,
    });
  };

  const sendPollMsg = (messageBody) => {
    if (!socketRef.current) return;
    socketRef.current.emit(NEW_POLL_CHAT_MESSAGE, {
      ...messageBody,
      userId: user._id,
      senderId: socketRef.current.id,
    });
  };

  const notGoingEvent = (messages) => {
    if (!socketRef.current) return;
    socketRef.current.emit(NOT_GOING_EVENT, messages);
  };

  const goingEvent = (messages) => {
    if (!socketRef.current) return;
    socketRef.current.emit(GOING_EVENT, messages);
  };

  const updatePoll = (messages) => {
    if (!socketRef.current) return;
    socketRef.current.emit(UPDATE_POLL_VOTING, messages);
  };

  return {
    messages,
    setMessages,
    sendMessage,
    sendEventMsg,
    goingEvent,
    notGoingEvent,
    sendPollMsg,
    updatePoll,
  };
};

export default useChat;
