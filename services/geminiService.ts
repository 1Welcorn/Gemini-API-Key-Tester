import { GoogleGenAI } from "@google/genai";

export const runPrompt = async (prompt: string, apiKey: string): Promise<string> => {
  if (!apiKey) {
    throw new Error(
      'API Key is missing. Please enter your Google Gemini API key in the input field.'
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
        throw new Error('Authentication Failed: The API key provided is not valid. Please ensure it is correct and has the necessary permissions.');
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