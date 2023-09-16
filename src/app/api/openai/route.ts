import { prompt2 } from "@/helpers/prompt";
import { OpenAIStream, OpenAIStreamPayload } from "@/lib/openai-stream";
import { NextRequest } from "next/server";

export async function POST(request: NextRequest) {
  const { messages } = await request.json();

  messages?.unshift({
    role: "system",
    content: prompt2,
  });

  const payload: OpenAIStreamPayload = {
    model: "gpt-3.5-turbo",
    messages: messages,
    temperature: 0.4,
    top_p: 1,
    frequency_penalty: 0,
    presence_penalty: 0,
    max_tokens: 100,
    stream: true,
    n: 1,
  };

  const stream = await OpenAIStream(payload);
  return new Response(stream);
}
