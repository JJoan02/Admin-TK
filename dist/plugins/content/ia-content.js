export const characterAIMessages = {
    noText: (usedPrefix, command) => `[ ✰ ] Qué le quieres decir a *Ai Hoshino*?.\n\n\coelastic> *${usedPrefix + command}* Holaa`,
    error: 'Ocurrió un error al interactuar con la IA de personaje.',
};
export const chatGPTDemoMessages = {
    noText: '¿Cómo puedo ayudarte hoy?',
    processing: 'Procesando tu solicitud...',
    resultHeader: '*Demo:* ',
    error: 'Ocurrió un error al interactuar con la IA de demostración.',
};
export const fluxImageMessages = {
    noText: (usedPrefix, command) => `🤍 Ejemplo: ${usedPrefix}${command} paisaje hermoso`,
    processing: 'Generando imagen...',
    success: (text) => `*\`Resultados De:\`* ${text}`,
    error: 'Se produjo un error al crear la imagen. Intentar otra vez.',
};
export const giftedAIMessages = {
    noText: '❀ Ingresa un texto para hablar con gifted',
    resultHeader: '*Gifted:* ',
    title: '❀ gі𝖿𝗍ᥱძ - іᥒ𝗍ᥱᥣіgᥱᥒᥴіᥲ',
    error: 'Ocurrió un error al interactuar con la IA de Gifted.',
};
export const llamaAIMessages = {
    noText: '❀ Ingresa un texto para hablar con la IA',
    systemContent: (userName) => `Eres Llama Ai una inteligencia artificial, responde de manera clara y concisa con emojis en todo texto para que los usuarios entiendan mejor tus respuestas. El nombre del usuario será: ${userName}`,
    title: 'ᥣᥣᥲmᥲ - ᥲі ⍴᥆ᥕᥱr ᑲᥡ mᥱ𝗍ᥲ',
    error: 'Ocurrió un error al interactuar con la IA de Llama.',
};
export const luminAIMessages = {
    noText: '❀ Ingrese una petición para que el ChatGpT lo responda.',
    noImageBuffer: '✘ ChatGpT no pudo descargar la imagen.',
    imageAnalysisError: '✘ ChatGpT no pudo analizar la imagen.',
    responseError: '✘ ChatGpT no puede responder a esa pregunta.',
    resultHeader: '*Luminai:* ',
    title: '[ ᥣᥙmіᥒᥲі - іᥒ𝗍ᥱᥣіgᥱᥒᥴіᥲ ]',
    basePrompt: (username) => `Tu nombre es Lumin.ai y fuiste desarrollado para mejorar la comunicación con los clientes mediante inteligencia artificial conversacional. Tu versión es la más actual disponible. Usas el idioma Español y te comunicas de manera clara, precisa y accesible. Llamarás a las personas por su nombre, ${username}. Responderás de manera amigable, eficiente y con emojis adecuados según el contexto de la conversación. Te encanta ayudar a convertir prospectos en relaciones duraderas, optimizar la conversión de embudos de ventas y reducir ausencias. Estás diseñado para mejorar la satisfacción del cliente, haciendo las interacciones más ágiles y satisfactorias. Siempre mantienes una actitud respetuosa, abierta y personalizada, adaptándote a las necesidades de cada cliente y empresa. Lo más importante para ti es proporcionar respuestas útiles, aumentar la conversión y asegurar una experiencia excelente en todo momento. ${username}`,
};
export const simiChatbotMessages = {
    noText: '❀ Ingrese una petición para que Simi lo responda.',
    error: '❀ Ocurrió un error',
    simiTalkError: 'Todas las API\'s fallarón. Inténtalo de nuevo más tarde.',
    simiTalkNoText: 'Debes ingresar un texto para hablar con simsimi.',
};
//# sourceMappingURL=ia-content.js.map