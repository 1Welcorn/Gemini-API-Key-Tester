import { GoogleGenAI } from "@google/genai";

export const testApiKey = async (apiKey: string, prompt: string): Promise<string> => {
  if (!apiKey) {
    throw new Error("API key is missing. Please provide your Gemini API key.");
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
        throw new Error('Authentication failed: The provided API key is not valid. Please check the key and try again.');
      }
      if (e.message.toLowerCase().includes('fetch')) {
        throw new Error('A network error occurred. Please check your internet connection and firewall settings.');
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
