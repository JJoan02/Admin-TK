// src/events/DomainEvents.js

import { DomainEvent } from '../core/EventStore.js';

// Eventos de Usuario
export class UserCreatedEvent extends DomainEvent {
  constructor(userId, userData) {
    super('UserCreated', { userId, userData }, userId);
  }
}

export class UserUpdatedEvent extends DomainEvent {
  constructor(userId, updatedFields) {
    super('UserUpdated', { userId, updatedFields }, userId);
  }
}

export class UserBannedEvent extends DomainEvent {
  constructor(userId, reason) {
    super('UserBanned', { userId, reason }, userId);
  }
}

export class UserUnbannedEvent extends DomainEvent {
  constructor(userId) {
    super('UserUnbanned', { userId }, userId);
  }
}

// Eventos de Grupo
export class GroupCreatedEvent extends DomainEvent {
  constructor(groupId, groupData) {
    super('GroupCreated', { groupId, groupData }, groupId);
  }
}

export class GroupUpdatedEvent extends DomainEvent {
  constructor(groupId, updatedFields) {
    super('GroupUpdated', { groupId, updatedFields }, groupId);
  }
}

export class GroupBotToggledEvent extends DomainEvent {
  constructor(groupId, isBotEnabled) {
    super('GroupBotToggled', { groupId, isBotEnabled }, groupId);
  }
}

export class GroupWelcomeMessageUpdatedEvent extends DomainEvent {
  constructor(groupId, welcomeMessage) {
    super('GroupWelcomeMessageUpdated', { groupId, welcomeMessage }, groupId);
  }
}

// Eventos de Chat
export class ChatUpdatedEvent extends DomainEvent {
  constructor(chatId, updatedFields) {
    super('ChatUpdated', { chatId, updatedFields }, chatId);
  }
}

export class ChatPersonalityUpdatedEvent extends DomainEvent {
  constructor(chatId, personality) {
    super('ChatPersonalityUpdated', { chatId, personality }, chatId);
  }
}
