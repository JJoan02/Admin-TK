import { EVAL_PERMISSION_DENIED, EVAL_DEFAULT_OUTPUT, EVAL_ERROR_MESSAGE } from '../../content/core/ejecutar_codigo-responses';
class EjecutarCodigoPlugin {
    name = "EjecutarCodigoPlugin";
    commands = [
        {
            name: "ejecutar_codigo",
            alias: ["eval", "evaluate"],
            usage: `{prefix}eval <código>`,
            desc: "Evalúa código JavaScript.",
            category: "Core",
            react: "👾",
            execute: async (Yaka, m, { text, isCreator }) => {
                if (!isCreator) {
                    return Yaka.sendMessage(m.from, { text: EVAL_PERMISSION_DENIED }, { quoted: m });
                }
                let out;
                try {
                    const result = eval(text);
                    out = JSON.stringify(result, null, '\t') || EVAL_DEFAULT_OUTPUT;
                }
                catch (error) {
                    out = `${EVAL_ERROR_MESSAGE} ${error.message}`;
                }
                return m.reply(out);
            }
        }
    ];
}
export default EjecutarCodigoPlugin;
//# sourceMappingURL=ejecutar_codigo.js.map