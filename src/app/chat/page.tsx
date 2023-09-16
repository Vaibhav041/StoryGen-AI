"use client";
import React, { useEffect, useRef } from "react";
import {
  MessagesHistoryContext,
  MessagesHistoryType,
} from "@/context/MessagesHistoryContext";
import StoryInput from "@/components/StoryInput";

const ChatPage = () => {
  const { messagesHistory } = React.useContext(
    MessagesHistoryContext
  ) as MessagesHistoryType;
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    scrollRef.current?.scrollTo({
      top: scrollRef.current?.scrollHeight,
      behavior: "smooth",
    });
  }, [messagesHistory]);

  return (
    <div className="flex justify-center items-center w-full h-screen">
      <div className="w-1/2 h-[70%] text-xl overflow-auto" ref={scrollRef}>
        {messagesHistory.slice(1).map((message, index) => {
          return (
            <p
              className={`text-violet-400 my-7 ${
                message.role === "user" ? " text-white" : null
              }`}
              key={index}
            >
              {message.content}
            </p>
          );
        })}
        <StoryInput />
      </div>
    </div>
  );
};

export default ChatPage;
