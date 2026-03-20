
import { GoogleGenAI, Type } from "@google/genai";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY || "" });

export const getWaterInsights = async (usageData: any, location: string, goals: any) => {
  try {
    const prompt = `Analyze this water consumption data: ${JSON.stringify(usageData)}. 
    User is located in ${location}. 
    User goals: ${JSON.stringify(goals)}.
    Provide 3 actionable water-saving tips and 1 summary insight. 
    Format as JSON.`;

    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: prompt,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            tips: {
              type: Type.ARRAY,
              items: { type: Type.STRING },
              description: "List of 3 actionable water saving tips"
            },
            summary: {
              type: Type.STRING,
              description: "A short, encouraging summary of the user's progress"
            }
          },
          required: ["tips", "summary"]
        }
      }
    });

    return JSON.parse(response.text || "{}");
  } catch (error) {
    console.error("Gemini Insight Error:", error);
    return {
      tips: [
        "Fix dripping faucets immediately.",
        "Use a broom instead of a hose to clean driveways.",
        "Install low-flow showerheads."
      ],
      summary: "Stay hydrated and keep track of your daily goals!"
    };
  }
};
