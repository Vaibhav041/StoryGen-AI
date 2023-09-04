"use client";
import { Button } from "@/components/ui/button";
import axios from "axios";
import React, { useEffect, useState } from "react";

const ChatPage = () => {
  const [options, setOptions] = useState<string[]>([]);
  const [story, setStory] = useState<string>("");

  const getData = async (selectedOption: string) => {
    const { data } = await axios.post(
      "/api/openai",
      {
        option: selectedOption,
      },
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    setStory(data.story);
    setOptions(data.choices);
  };

  useEffect(() => {
    getData("default");
  }, []);

  return (
    <div className="p-36">
      <p className="text-violet-600 text-xl font-semibold">{story}</p>
      {options?.map((option, index) => {
        return (
          <Button key={index} variant="option" onClick={() => getData(option)}>
            {option}
          </Button>
        );
      })}
    </div>
  );
};

export default ChatPage;
