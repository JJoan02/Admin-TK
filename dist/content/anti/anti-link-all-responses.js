export const ANTI_LINK_ALL_DETECTED_HEADER = "*≡ Enlace Detectado*";
export const ANTI_LINK_ALL_MESSAGE = (user, isBotAdmin) => `

No se permiten enlaces de ningún tipo, *@${user}*. Serás expulsado.${isBotAdmin ? '' : '\n\n(No soy admin, así que no puedo expulsarte)'}`;
//# sourceMappingURL=anti-link-all-responses.js.map