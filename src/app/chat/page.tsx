"use client";
import Navbar from "@/components/Navbar";
import { Button } from "@/components/ui/button";
import axios from "axios";
import React, { useEffect, useState } from "react";

const ChatPage = () => {
  const [selectedOption, setSelectedOption] = useState<string>("default");
  const [options, setOptions] = useState<string[]>([]);
  const [story, setStory] = useState<string>("");
  const getData = async () => {
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
    getData();
  }, [selectedOption, getData]);

  return (
    <div className="p-36">
      <p className="text-violet-600 text-xl font-semibold">{story}</p>
      {options?.map((option, index) => {
        return (
          <Button
            key={index}
            variant="option"
            onClick={() => setSelectedOption(option)}
          >
            {option}
          </Button>
        );
      })}
    </div>
  );
};

export default ChatPage;
