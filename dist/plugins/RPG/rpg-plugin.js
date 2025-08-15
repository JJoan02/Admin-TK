import ProfileCommand from '../commands/rpg/ProfileCommand.js';
class RPGPlugin {
    constructor() {
        this.name = 'RPG';
        this.description = 'Comandos de RPG para Admin-TK';
        this.commands = [new ProfileCommand()];
    }
}
export default RPGPlugin;
//# sourceMappingURL=rpg-plugin.js.map