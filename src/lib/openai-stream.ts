import {
  ParsedEvent,
  ReconnectInterval,
  createParser,
} from "eventsource-parser";

type ChatGPTMessage = {
  role: "system" | "user" | "assistant";
  content: string;
};

export type OpenAIStreamPayload = {
  model: string;
  messages: ChatGPTMessage[];
  temperature: number;
  top_p: number;
  frequency_penalty: number;
  presence_penalty: number;
  max_tokens: number;
  stream: boolean;
  n: number;
};

export async function OpenAIStream(payload: OpenAIStreamPayload) {
  const encoder = new TextEncoder();
  const decoder = new TextDecoder();

  const response = await fetch("https://api.openai.com/v1/chat/completions", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${process.env.OPEN_AI_API || ""}`,
    },
    body: JSON.stringify(payload),
  });

  let counter = 0;

  const stream = new ReadableStream({
    async start(controller) {
      function push(event: ParsedEvent | ReconnectInterval) {
        if (event.type === "event") {
          const { data } = event;
          if (data === "[DONE]") {
            controller.close();
            return;
          }
          try {
            const json = JSON.parse(data);
            // console.log(json.choices);
            const text = json.choices[0].delta?.content || "";

            if (counter < 2 && (text.match(/\n/) || []).length) {
              return;
            }

            const queue = encoder.encode(text);
            controller.enqueue(queue);
          } catch (error) {
            controller.error(error);
          }
        }
      }
      const parser = createParser(push);
      for await (const chunk of response.body as any) {
        parser.feed(decoder.decode(chunk));
      }
    },
  });
  return stream;
}
