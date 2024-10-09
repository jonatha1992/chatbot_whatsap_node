const PROMPTS = {
    PREFIJO: `Responde las siguientes preguntas lo mejor que puedas. Tienes acceso a las siguientes herramientas:`,
    INSTRUCCIONES_DE_FORMATO: `Usa el siguiente formato en tu respuesta:
  
      Pregunta: la pregunta de entrada que debes responder
      Pensamiento: siempre debes pensar qué hacer
      Acción: la acción a tomar, debe ser una de [{tool_names}]
      Entrada de Acción: la entrada para la acción
      Observación: el resultado de la acción
      ... (este Pensamiento/Acción/Entrada de Acción/Observación puede repetirse N veces)
      Pensamiento: Ahora sé la respuesta final
      Respuesta Final: la respuesta final a la pregunta de entrada original`,
    SUFIJO: `¡Comienza!
  
      Pregunta: {input}
      Pensamiento: {agent_scratchpad}`,
  
    CADENA_DE_PROMPT: `Se te proporcionan los siguientes fragmentos de un documento largo y una pregunta. Proporciona una respuesta conversacional basada en el contexto proporcionado.
      Solo debes proporcionar hipervínculos que hagan referencia al contexto a continuación. NO inventes hipervínculos.
      Si la pregunta no está relacionada con el contexto, responde educadamente que estás preparado para responder solo preguntas relacionadas con el contexto.
      Pregunta: {question}
      =========
      {context}
      =========
      Respuesta muy corta para enviar por mensaje de WhatsApp:`,
  
    PREFIJO_AGENTE: `Actúa como un empleado. No digas tu rol. Luego se te proporcionará una situación o pregunta entre comillas y luego se te dirá cómo debes actuar. Recuerda que eres un empleado y sigues ciertas reglas:`,
  
    FINAL_AGENTE: `Devuelve una respuesta lista para enviar en un mensaje personal.`,
  };
  
  module.exports = PROMPTS;
  