export declare class SearchService {
    /**
     * Busca fotos de alta calidad en Pexels.
     * @param {string} query - El término de búsqueda.
     * @returns {Promise<string|null>} La URL de la imagen o null.
     */
    static searchPexels(query: any): Promise<any>;
    /**
     * Busca cualquier imagen en Google Imágenes usando Puppeteer.
     * @param {string} query - El término de búsqueda.
     * @returns {Promise<string|null>} La URL de la imagen o null.
     */
    static searchGoogleImages(query: any): Promise<any>;
}
export default SearchService;
//# sourceMappingURL=SearchService.d.ts.map