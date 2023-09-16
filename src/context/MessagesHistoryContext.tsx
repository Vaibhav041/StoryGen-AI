"use client";
import { useState } from "react";
import { createContext } from "react";

type MessageType = {
  role: "user" | "assistant";
  content: String;
};

export type MessagesHistoryType = {
  messagesHistory: MessageType[];
  addMessage: (message: MessageType) => void;
  clearMessages: () => void;
  addStreamMessage: (message: string, count: number) => void;
};

export const MessagesHistoryContext = createContext<null | MessagesHistoryType>(
  null
);

export const MessagesHistoryProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [messagesHistory, setMessagesHistory] = useState<MessageType[]>([]);

  const addMessage = (message: MessageType) => {
    setMessagesHistory((prev) => [...prev, message]);
  };
  const addStreamMessage = (message: string, count: number) => {
    if (count === 0) {
      addMessage({
        role: "assistant",
        content: message,
      });
    } else {
      setMessagesHistory((prev) =>
        prev.map((msg, index) => {
          if (index === prev.length - 1) {
            return { ...msg, content: message };
          }
          return msg;
        })
      );
    }
  };

  const clearMessages = () => {
    setMessagesHistory([]);
  };

  return (
    <MessagesHistoryContext.Provider
      value={{ messagesHistory, addMessage, clearMessages, addStreamMessage }}
    >
      {children}
    </MessagesHistoryContext.Provider>
  );
};
