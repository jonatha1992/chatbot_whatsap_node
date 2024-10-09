require("dotenv").config();
const OpenAI = require("openai");

const openaiApiKey = process.env.OPENAI_API_KEY;

const chat = async (prompt, messages) => {
  try {
    const openai = new OpenAI({
      apiKey: openaiApiKey,
    });

    const completion = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [{ role: "system", content: prompt }, ...messages],
    });

    const answer = completion.choices[0].message.content;
    return answer;
  } catch (error) {
    if (error.code === "insufficient_quota") {
      console.error("Error de cuota insuficiente:", error);
      response =
        "Lo siento, he excedido la cuota disponible para responder preguntas en este momento. Por favor, intenta nuevamente más tarde.";
    } else {
      console.error("Error al generar respuesta con GPT-3.5:", error);
      response =
        "Lo siento, hubo un problema al procesar tu pregunta. Inténtalo de nuevo más tarde.";
    }
  }
};

module.exports = { chat };
