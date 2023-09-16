import React, { useState, useEffect, useRef } from "react";
import {
  MessagesHistoryContext,
  MessagesHistoryType,
} from "@/context/MessagesHistoryContext";

const StoryInput = () => {
  const { messagesHistory, addMessage, addStreamMessage } = React.useContext(
    MessagesHistoryContext
  ) as MessagesHistoryType;
  const [input, setInput] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);
  const getData = async () => {
    const response = await fetch("/api/openai", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        messages: [
          ...messagesHistory,
          {
            role: "user",
            content: input || "start",
          },
        ],
      }),
    });
    addMessage({
      role: "user",
      content: input,
    });
    if (!response.ok) throw new Error(response.statusText);
    const data = response.body;
    if (!data) return;

    const reader = data.getReader();
    const decoder = new TextDecoder();
    let done = false;
    let result = "";
    let count = 0;

    while (!done) {
      const { value, done: doneReading } = await reader.read();
      done = doneReading;
      const chunkValue = decoder.decode(value);
      result += chunkValue;
      addStreamMessage(result, count++);
    }
    inputRef.current?.focus();
  };

  const handleClick = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      getData();
      setInput("");
    }
  };
  useEffect(() => {
    getData();
  }, []);
  return (
    <input
      className="bg-transparent text-white focus:outline-none mt-5"
      type="text"
      onChange={(e) => setInput(e.target.value)}
      onKeyUp={handleClick}
      value={input}
      ref={inputRef}
    />
  );
};

export default StoryInput;
