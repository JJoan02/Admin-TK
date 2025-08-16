/**
 * Clase base para todos los eventos de dominio.
 */
export declare class DomainEvent {
    constructor(type: any, payload: any, aggregateId?: null);
}
/**
 * El EventStore es responsable de persistir eventos de dominio
 * y de publicarlos en el EventBus.
 */
export declare class EventStore {
    #private;
    constructor(dbService: any, logger: any);
    /**
     * Persiste un evento en la base de datos y lo publica en el EventBus.
     * @param {DomainEvent} event - La instancia del evento de dominio a persistir y publicar.
     */
    publish(event: any): Promise<void>;
    /**
     * Recupera eventos de la base de datos.
     * @param {string} [type=null] - Tipo de evento a filtrar. Si es null, recupera todos.
     * @param {string} [aggregateId=null] - ID del agregado a filtrar. Si es null, no filtra por agregado.
     * @returns {Promise<DomainEvent[]>} Lista de eventos recuperados.
     */
    getEvents(type?: null, aggregateId?: null): Promise<any>;
}
export default EventStore;
//# sourceMappingURL=EventStore.d.ts.map