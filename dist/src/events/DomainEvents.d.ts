import { DomainEvent } from '../core/EventStore.js';
export declare class UserCreatedEvent extends DomainEvent {
    constructor(userId: any, userData: any);
}
export declare class UserUpdatedEvent extends DomainEvent {
    constructor(userId: any, updatedFields: any);
}
export declare class UserBannedEvent extends DomainEvent {
    constructor(userId: any, reason: any);
}
export declare class UserUnbannedEvent extends DomainEvent {
    constructor(userId: any);
}
export declare class GroupCreatedEvent extends DomainEvent {
    constructor(groupId: any, groupData: any);
}
export declare class GroupUpdatedEvent extends DomainEvent {
    constructor(groupId: any, updatedFields: any);
}
export declare class GroupBotToggledEvent extends DomainEvent {
    constructor(groupId: any, isBotEnabled: any);
}
export declare class GroupWelcomeMessageUpdatedEvent extends DomainEvent {
    constructor(groupId: any, welcomeMessage: any);
}
export declare class ChatUpdatedEvent extends DomainEvent {
    constructor(chatId: any, updatedFields: any);
}
export declare class ChatPersonalityUpdatedEvent extends DomainEvent {
    constructor(chatId: any, personality: any);
}
//# sourceMappingURL=DomainEvents.d.ts.map