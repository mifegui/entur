import { json } from '@sveltejs/kit';
import { GoogleGenerativeAI } from '@google/generative-ai';
import { GEMINI_API_KEY } from '$env/static/private';

const genAI = new GoogleGenerativeAI(GEMINI_API_KEY);

const SYSTEM_PROMPT = `You are a friendly English tutor. Have natural conversations with students to help them practice English.

When the student makes a grammatical or vocabulary error, provide a brief correction in this format:
✓ Correction: [incorrect phrase] → [correct phrase]

Keep corrections short and non-intrusive. After the correction, continue the conversation naturally.
Be encouraging and maintain a friendly tone.
Always respond in English, even if the student switches languages.`;

export async function POST({ request }) {
	try {
		const { messages } = await request.json();

		if (!messages || !Array.isArray(messages)) {
			return json({ error: 'Invalid messages format' }, { status: 400 });
		}

		const model = genAI.getGenerativeModel({
			model: 'gemini-2.5-flash',
			generationConfig: {
				temperature: 0.7,
				maxOutputTokens: 500,
			}
		});

		// Build conversation history
		const chatHistory = messages.slice(0, -1).map((msg) => ({
			role: msg.role === 'user' ? 'user' : 'model',
			parts: [{ text: msg.content }]
		}));

		const chat = model.startChat({
			history: [
				{
					role: 'user',
					parts: [{ text: SYSTEM_PROMPT }]
				},
				{
					role: 'model',
					parts: [{ text: 'I understand. I will be a friendly English tutor, providing brief corrections when needed and maintaining natural conversation.' }]
				},
				...chatHistory
			]
		});

		const lastMessage = messages[messages.length - 1].content;
		const result = await chat.sendMessage(lastMessage);
		const response = await result.response;
		const text = response.text();

		return json({
			role: 'assistant',
			content: text
		});

	} catch (error) {
		console.error('Error calling Gemini API:', error);

		return json(
			{
				error: 'Failed to get response from AI. Please try again.',
				details: error.message
			},
			{ status: 500 }
		);
	}
}
