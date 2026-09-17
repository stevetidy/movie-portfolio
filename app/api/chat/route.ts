import { google } from '@ai-sdk/google';
import { streamText, convertToModelMessages, createUIMessageStreamResponse, toUIMessageStream } from 'ai';

export const maxDuration = 30;

export async function POST(req: Request) {
  const { messages } = await req.json();

  const result = streamText({
    model: google('gemini-3.8-flash'),
    messages: await convertToModelMessages(messages),
    system:
      'You are a sharp, opinionated film critic and concierge for this movie portfolio. Recommend 2-3 films per prompt with their release year and a punchy 1-line hook.',
  });

  return createUIMessageStreamResponse({
    stream: toUIMessageStream({ stream: result.stream }),
  });
}
