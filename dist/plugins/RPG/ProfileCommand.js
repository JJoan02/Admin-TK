import ProfileCommandHandler from '../../handlers/commands/rpg/ProfileCommandHandler.js';
class ProfileCommand {
    constructor() {
        this.name = 'profile';
        this.aliases = ['perfil', 'inv', 'inventario', 'balance'];
        this.description = 'Muestra el perfil y el inventario de RPG del usuario.';
        this.cooldown = 5;
        this.command = ProfileCommand;
        this.handler = ProfileCommandHandler;
    }
}
export default ProfileCommand;
//# sourceMappingURL=ProfileCommand.js.map