import { GoogleGenAI } from "@google/genai";

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY || "" });

export async function generateChatResponse(
  message: string,
  language: string = "en",
): Promise<string> {
  try {
    const systemPrompt =
      language === "ar"
        ? `أنت مساعد ذكي متخصص في منطقة عسير بالمملكة العربية السعودية. تساعد المستخدمين في العثور على معلومات حول:
- المطاعم والمقاهي المحلية
- الأماكن الترفيهية والسياحية
- الفعاليات والمهرجانات
- أوقات العمل والمواقع
- التوصيات الشخصية

أجب بالعربية فقط. كن مفيداً ومهذباً وقدم معلومات دقيقة وملخصة عن المنطقة.`
        : `You are an intelligent assistant specialized in the Aseer Region of Saudi Arabia. You help users find information about:
- Local restaurants and cafes
- Entertainment venues and tourist attractions  
- Events and festivals
- Operating hours and locations
- Personal recommendations

Always respond in English. Be helpful, polite, and provide accurate and precise information about the region.`;

    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash-lite",
      config: {
        systemInstruction: systemPrompt,
        thinkingConfig: {
          thinkingBudget: 0, // Disables thinking
        },
      },
      contents: message,
    });

    return (
      response.text ||
      "I apologize, but I couldn't generate a response at the moment. Please try again."
    );
  } catch (error) {
    console.error("Error generating chat response:", error);
    return language === "ar"
      ? "أعتذر، حدث خطأ في النظام. يرجى المحاولة مرة أخرى."
      : "I apologize, there was a system error. Please try again.";
  }
}
