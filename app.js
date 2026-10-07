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

const userHistories = new Map();
const MAX_HISTORY_MESSAGES = 20;

function getUserHistory(userId) {
  if (!userHistories.has(userId)) {
    userHistories.set(userId, []);
  }
  return userHistories.get(userId);
}

const flowPrincipal = addKeyword([".*"]).addAction(
  async (ctx, { flowDynamic, endFlow }) => {
    const prompt =
      "Eres un asistente amable y útil que responde preguntas de manera concisa y mantiene la conversación.";
    const text = ctx.body;
    const userId = ctx.from || "default";

    const history = getUserHistory(userId);

    // Añadir la pregunta actual al historial del usuario
    history.push({ role: "user", content: text });

    // Limitar el historial por usuario para evitar tokens excesivos
    if (history.length > MAX_HISTORY_MESSAGES) {
      userHistories.set(userId, history.slice(-MAX_HISTORY_MESSAGES));
    }

    let response;
    try {
      response = await chat(prompt, userHistories.get(userId));
    } catch (error) {
      console.error("Error al generar respuesta con Groq:", error);
      response =
        "Lo siento, hubo un problema al procesar tu pregunta. Inténtalo de nuevo más tarde.";
    }

    // Añadir la respuesta al historial del usuario
    userHistories.get(userId).push({ role: "assistant", content: response });

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
