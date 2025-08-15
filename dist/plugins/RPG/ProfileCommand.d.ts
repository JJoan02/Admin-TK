export default ProfileCommand;
declare class ProfileCommand {
    name: string;
    aliases: string[];
    description: string;
    cooldown: number;
    command: typeof ProfileCommand;
    handler: typeof ProfileCommandHandler;
}
import ProfileCommandHandler from '../../handlers/commands/rpg/ProfileCommandHandler.js';
//# sourceMappingURL=ProfileCommand.d.ts.map