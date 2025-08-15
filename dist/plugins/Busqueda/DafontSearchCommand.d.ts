export default DafontSearchPlugin;
declare class DafontSearchPlugin {
    static handleSearch(m: any, conn: any, query: string): Promise<void>;
    static handleDownload(m: any, conn: any, urlFuente: string): Promise<any>;
    static buscarFuentes(consulta: string): Promise<string[]>;
    static obtenerUrlDescarga(urlFuente: string): Promise<string>;
    static descargarFuente(urlZip: string): Promise<string>;
    static enviarFuenteAlUsuario(rutaArchivo: string, conn: Baileys, m: WAMessage): Promise<void>;
    name: string;
    commands: ICommand[];
}
import { ICommand } from '../../types/plugin';
//# sourceMappingURL=DafontSearchCommand.d.ts.map