import { Command } from '../../core/CommandBus.js';
export declare class ReactionCommand extends Command {
    private reactionType;
    private videos;
    private reactEmoji;
    private isNsfw;
    constructor(name: string, description: string, commands: string[], tags: string[], help: string[], reactionType: string, videos: string[], reactEmoji: string, isNsfw?: boolean);
    execute(context: any): Promise<any>;
}
//# sourceMappingURL=ReactionCommand.d.ts.map