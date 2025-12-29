
import { GoogleGenAI } from "@google/genai";

export const aiRewrite = async (text: string): Promise<string> => {
  const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
  
  const prompt = `
    Act as a "Fiverr Safety Filter & Editor." I will provide you with a draft message intended for a client. 
    Your goal is to rewrite the message to bypass Fiverr's automated warning filters while keeping the meaning clear.

    Rules for rewriting:
    1. Identify restricted words (e.g., email, phone, whatsapp, skype, telegram, pay, payment, dollar, $).
    2. Obfuscate these words using hyphens or spaces to avoid detection (e.g., change "number" to "num-ber", "email" to "e-mail", "whatsapp" to "what-s-app", "pay" to "p-ay").
    3. Keep the rest of the sentence natural and professional.
    4. **Bold** the words you have modified in the final text using Markdown double asterisks like **word**.

    Original Message: "${text}"
    
    Return ONLY the rewritten text.
  `;

  try {
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: prompt,
      config: {
        temperature: 0.4, // Lower temperature for more consistent formatting
      }
    });

    return response.text || text;
  } catch (error) {
    console.error("AI Rewrite failed:", error);
    return text;
  }
};
