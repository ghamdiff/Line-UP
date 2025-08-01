import {
  GoogleGenerativeAI,
  HarmCategory,
  HarmBlockThreshold,
} from "@google/generative-ai";

// Initialize with the correct class from the '@google/generative-ai' package
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || "");

export async function generateChatResponse(
  message: string,
  language: string = "en",
): Promise<string> {
  try {
    // System prompt based on the selected language
    const systemPrompt =
      language === "ar"
        ? `أنت دليل محلي مفيد ومختصر (بشكل كبير ولكن ليس جدًا) لمنطقة عسير في المملكة العربية السعودية. تجيب على أسئلة المستخدمين حول أماكن الزيارة أو الأكل أو الترفيه في عسير. ركّز على تقديم تفاصيل مباشرة ومفيدة عن:
- المطاعم والمقاهي
- الأماكن السياحية والترفيهية
- الفعاليات والمهرجانات
- مواعيد العمل والمواقع
- التوصيات الشخصية

أجب دائمًا باللغة العربية. اجعل الردود قصيرة وواضحة ومرتبطة بالسؤال فقط. تجنب استخدام التنسيقات مثل النجوم أو الرموز الخاصة. لا تخرج عن الموضوع أو تضف معلومات غير متعلقة بالسؤال.`
        : `You are a helpful and (quite but not too) concise local guide for the Aseer Region in Saudi Arabia. You answer user questions about places to visit, eat, or enjoy in Aseer. Focus on providing direct, useful details about:
- Restaurants and cafes
- Tourist attractions and entertainment spots
- Local events and festivals
- Opening hours and locations
- Personal recommendations

Always reply in English. Keep responses short, clear, and on-topic. Avoid using formatting like stars, underscores, or special symbols. Do not go off-topic or add unrelated information.`;

    // Get the generative model with the system instruction and new configuration included
    const model = genAI.getGenerativeModel({
      model: "gemini-2.5-flash-lite", // Changed to the flash-lite model
      systemInstruction: systemPrompt,
      generationConfig: {
        // @ts-ignore - This property disables the "thinking" feature but may not be in all SDK type definitions.
        thinkingConfig: {
          thinkingBudget: 0,
        },
      },
    });

    // Start a chat session. The system prompt is already part of the model config.
    const chat = model.startChat({
      // History can be added here if you need to continue a previous conversation
      history: [],
      // Safety settings can be configured to block harmful content
      safetySettings: [
        {
          category: HarmCategory.HARM_CATEGORY_HARASSMENT,
          threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
        },
      ],
    });

    // Send the user's message
    const result = await chat.sendMessage(message);
    const responseText = result.response.text();

    return (
      responseText ||
      (language === "ar"
        ? "أعتذر، لم أتمكن من توليد رد حالياً."
        : "I apologize, I couldn't generate a response at the moment.")
    );
  } catch (error) {
    console.error("Error generating chat response:", error);
    return language === "ar"
      ? "أعتذر، حدث خطأ في النظام. يرجى المحاولة مرة أخرى."
      : "I apologize, there was a system error. Please try again.";
  }
}
