const {
  createBot,
  createProvider,
  createFlow,
  addKeyword,
} = require("@bot-whatsapp/bot");
const QRPortalWeb = require("@bot-whatsapp/portal");
const BaileysProvider = require("@bot-whatsapp/provider/baileys");
const MockAdapter = require("@bot-whatsapp/database/mock");
const { chat } = require("./scripts/chatgroq");

let conversationHistory = [];

const flowPrincipal = addKeyword([".*"]).addAction(
  async (ctx, { flowDynamic, endFlow }) => {
    const prompt =
      "Eres un asistente amable y útil que responde preguntas de manera concisa y mantiene la conversación.";
    const text = ctx.body;

    // Añadir la pregunta actual al historial
    conversationHistory.push({ role: "user", content: text });

    // Limitar el historial a las últimas 10 interacciones para evitar tokens excesivos
    if (conversationHistory.length > 20) {
      conversationHistory = conversationHistory.slice(-20);
    }

    let response;
    try {
      response = await chat(prompt, conversationHistory);
    } catch (error) {
      console.error("Error al generar respuesta con Groq:", error);
      response =
        "Lo siento, hubo un problema al procesar tu pregunta. Inténtalo de nuevo más tarde.";
    }

    // Añadir la respuesta al historial
    conversationHistory.push({ role: "assistant", content: response });

    await flowDynamic(response);
  }
);

const main = async () => {
  const adapterDB = new MockAdapter();
  const adapterFlow = createFlow([flowPrincipal]);
  const adapterProvider = createProvider(BaileysProvider);

  createBot({
    flow: adapterFlow,
    provider: adapterProvider,
    database: adapterDB,
  });

  QRPortalWeb();
};

main();
