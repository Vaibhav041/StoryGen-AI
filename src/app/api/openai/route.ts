import { prompt2 } from "@/helpers/prompt";
import { NextRequest, NextResponse } from "next/server";
import { openai } from "@/lib/openai";
import { CreateChatCompletionRequestMessage } from "openai/resources/chat";

const messageHistory: CreateChatCompletionRequestMessage[] = [
  { role: "system", content: prompt2 },
  {
    role: "assistant",
    content: "ok ready, whenever you start",
  },
];

const extract = (response: string) => {
  // const values = response.split("\n");
  // const story = values.reduce((acc, curr, index) => {
  //   if (index >= values.length - 3) return acc;
  //   return acc + curr;
  // }, "");
  // const choices = [
  //   values[values.length - 3],
  //   values[values.length - 2],
  //   values[values.length - 1],
  // ];
  // return { story, choices };
  const storyData = JSON.parse(response);
  return {
    story: storyData.story,
    choices: storyData.options,
  };
};

export async function POST(request: NextRequest) {
  const { option } = await request.json();
  if (option !== "default")
    messageHistory.push({ role: "user", content: option });
  console.log(messageHistory);
  const chatCompletion = await openai.chat.completions.create({
    model: "gpt-3.5-turbo",
    messages: messageHistory,
    temperature: 0.61,
  });
  messageHistory.push({
    role: "assistant",
    content: chatCompletion.choices[0].message.content,
  });
  const result = extract(chatCompletion.choices[0].message.content as string);
  return NextResponse.json(result, {
    status: 200,
  });
}
