require("dotenv").config();
const { Groq } = require("groq-sdk");

const groqApiKey = process.env.GROQ_API_KEY;

const chat = async (prompt, messages) => {
  try {
    const groq = new Groq({
      apiKey: groqApiKey,
    });

    // Configuración del mensaje para enviar a Groq
    const completion = await groq.chat.completions.create({
      messages: [{ role: "system", content: prompt }, ...messages],
      model: "mixtral-8x7b-32768",
      temperature: 0.7,
      max_tokens: 500,
    });

    const answer = completion.choices[0].message.content;
    return answer;
  } catch (error) {
    console.error("Error al generar respuesta con Groq:", error);
    return "Lo siento, hubo un problema al procesar tu pregunta. Inténtalo de nuevo más tarde.";
  }
};

module.exports = { chat };
