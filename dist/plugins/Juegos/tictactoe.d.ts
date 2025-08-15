export = TicTacToe;
declare class TicTacToe {
    constructor(playerX?: string, playerO?: string);
    playerX: string;
    playerO: string;
    _currentTurn: boolean;
    _x: number;
    _o: number;
    turns: number;
    get board(): number;
    get currentTurn(): string;
    get winner(): string | null;
    turn(player: any, pos: any): 1 | 0 | -1;
    render(): (number | "O" | "X")[];
}
//# sourceMappingURL=tictactoe.d.ts.map