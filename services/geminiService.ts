import { GoogleGenAI } from "@google/genai";

export const runPrompt = async (prompt: string): Promise<string> => {
  const apiKey = process.env.API_KEY;
  if (!apiKey) {
    throw new Error(
      'Configuration Error: A Google Gemini API key is required, but it has not been configured.\n\nPlease go to your deployment settings (e.g., on Vercel, Netlify, or your hosting provider) and add an environment variable named API_KEY with your key as the value.'
    );
  }
  
  const ai = new GoogleGenAI({ apiKey });

  try {
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: prompt,
    });
    return response.text;
  } catch (e) {
    if (e instanceof Error) {
      if (e.message.includes('API key not valid')) {
        throw new Error('Authentication Failed: The API key provided in the environment is not valid. Please ensure it is correct and has the necessary permissions.');
      }
      if (e.message.toLowerCase().includes('fetch')) {
        throw new Error('Network Error: A network problem occurred. Please check your internet connection and any firewall settings.');
      }
      if (e.message.includes('400')) {
         throw new Error(`Bad Request (400): The request was malformed. Details: ${e.message}`);
      }
       if (e.message.includes('500')) {
         throw new Error(`Server Error (500): An internal error occurred on the Gemini API server. Please try again later.`);
      }
    }
    // Re-throw other errors
    throw e;
  }
};