import { STALK_USAGE_EXAMPLE, STALK_NO_X_ERROR, STALK_MAX_X_ERROR, STALK_SEARCHING_MESSAGE, STALK_LIST_HEADER, STALK_NO_BIO_MESSAGE, STALK_NO_WHATSAPP_MESSAGE, STALK_NUMBER_LABEL, STALK_BIO_LABEL, STALK_ERROR_MESSAGE } from '../../content/core/rastrear-responses';
class RastreadorPlugin {
    name = "RastreadorPlugin";
    commands = [
        {
            name: "rastrear",
            alias: ["stalk", "nowa", "stalkwhatsapp", "stalknumber"],
            desc: "Busca números de WhatsApp en un rango dado.",
            usage: "{prefix}rastrear 9181011564xxx",
            react: "👹",
            category: "Herramientas",
            execute: async (Yaka, m, { pushName, args, prefix }) => {
                try {
                    if (!args[0]) {
                        return m.reply(STALK_USAGE_EXAMPLE(prefix));
                    }
                    var inputnumber = args[0];
                    if (!inputnumber.includes("x")) {
                        return m.reply(STALK_NO_X_ERROR);
                    }
                    if (inputnumber.includes("xxxx")) {
                        return m.reply(STALK_MAX_X_ERROR);
                    }
                    m.reply(STALK_SEARCHING_MESSAGE);
                    function countInstances(string, word) {
                        return string.split(word).length - 1;
                    }
                    var number0 = inputnumber.split('x')[0];
                    var number1 = inputnumber.split('x')[countInstances(inputnumber, 'x')] ? inputnumber.split('x')[countInstances(inputnumber, 'x')] : '';
                    var random_length = countInstances(inputnumber, 'x');
                    var randomxx;
                    if (random_length === 1) {
                        randomxx = 10;
                    }
                    else if (random_length === 2) {
                        randomxx = 100;
                    }
                    else if (random_length === 3) {
                        randomxx = 1000;
                    }
                    else if (random_length === 4) {
                        randomxx = 10000;
                    }
                    else {
                        randomxx = 10;
                    }
                    var nomerny = `${STALK_LIST_HEADER}\n\n`;
                    var nobio = `\n${STALK_NO_BIO_MESSAGE}\n\n`;
                    var nowhatsapp = `\n${STALK_NO_WHATSAPP_MESSAGE}\n\n`;
                    for (let i = 0; i < randomxx; i++) {
                        var nu = ['1', '2', '3', '4', '5', '6', '7', '8', '9'];
                        var status1 = nu[Math.floor(Math.random() * nu.length)];
                        var status2 = nu[Math.floor(Math.random() * nu.length)];
                        var status3 = nu[Math.floor(Math.random() * nu.length)];
                        var status4 = nu[Math.floor(Math.random() * nu.length)];
                        var dom4 = nu[Math.floor(Math.random() * nu.length)];
                        var rndm;
                        if (random_length === 1) {
                            rndm = `${status1}`;
                        }
                        else if (random_length === 2) {
                            rndm = `${status1}${status2}`;
                        }
                        else if (random_length === 3) {
                            rndm = `${status1}${status2}${status3}`;
                        }
                        else if (random_length === 4) {
                            rndm = `${status1}${status2}${status3}${status4}`;
                        }
                        else if (random_length === 5) {
                            rndm = `${status1}${status2}${status3}${status4}${dom4}`;
                        }
                        else {
                            rndm = `${status1}`;
                        }
                        var anu = await Yaka.onWhatsApp(`${number0}${i}${number1}@s.whatsapp.net`);
                        var anuu = anu.length !== 0 ? anu : false;
                        try {
                            let anu1;
                            try {
                                anu1 = await Yaka.fetchStatus(anu[0].jid);
                            }
                            catch {
                                anu1 = '401';
                            }
                            if (anu1 === '401' || anu1.status.length === 0) {
                                nobio += `wa.me/${anu[0].jid.split("@")[0]}\n`;
                            }
                            else {
                                nomerny += `${STALK_NUMBER_LABEL} wa.me/${anu[0].jid.split("@")[0]}\n${STALK_BIO_LABEL} ${anu1.status}\n\n`;
                            }
                        }
                        catch {
                            nowhatsapp += `${number0}${i}${number1}\n`;
                        }
                    }
                    await Yaka.sendMessage(m.from, { text: `${nomerny} ${nobio} ${nowhatsapp}` }, { quoted: m });
                }
                catch (error) {
                    console.error("Error en el comando de rastreo:", error);
                    m.reply(STALK_ERROR_MESSAGE);
                }
            }
        }
    ];
}
export default RastreadorPlugin;
//# sourceMappingURL=rastrear.js.map