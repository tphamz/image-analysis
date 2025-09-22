import { openai } from '@ai-sdk/openai';
import { generateText, ModelMessage, ImagePart } from 'ai';
import { SYSTEM_PROMPT } from './prompts';
import { NextResponse } from 'next/server';
type ImageProp = { base64: string; mimeType: string }
type BodyProps = {
    prompt: string;
    images: ImageProp[];
}
export const createPromptAction = async (request: Request) => {
    const body = await request.json();
    const { prompt, images }: BodyProps = body;
    const messages: ModelMessage[] = [
        {
            role: "system",
            content: SYSTEM_PROMPT
        },
        {
            role: "user",
            content: [{
                type: "text",
                text: prompt
            },
            ...images.map((img: ImageProp) => ({
                type: "image",
                image: img.base64,
                mimeType: img.mimeType,
            }) as ImagePart)]
        }
    ];
    try {
        const { text } = await generateText({
            model: openai("gpt-4o"),
            messages,
        });
        return NextResponse.json({ result: text.replace("```json", "").replace("```", ""), status: 200 });
    } catch (error: any) {
        console.error("❌ Error analyzing images:", error);

        return NextResponse.json({ status: 500, error: "Failed to process the request" })
    }
}