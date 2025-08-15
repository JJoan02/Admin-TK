// src/core/DependencyContainer.js

import { initializeLogger } from '../utils/logger.js';
const logger = initializeLogger();

class DependencyContainer {
  static #instance;
  #registrations = new Map();

  constructor() {
    if (DependencyContainer.#instance) {
      return DependencyContainer.#instance;
    }
    DependencyContainer.#instance = this;
    logger.info('DependencyContainer inicializado.');
  }

  static getInstance() {
    if (!DependencyContainer.#instance) {
      DependencyContainer.#instance = new DependencyContainer();
    }
    return DependencyContainer.#instance;
  }

  register(name, resolver, { dependencies = [], isSingleton = true } = {}) {
    if (this.#registrations.has(name)) {
      logger.warn(`La dependencia '${name}' ya está registrada. Sobrescribiendo.`);
    }
    this.#registrations.set(name, { resolver, isSingleton, instance: null, dependencies });
    logger.debug(`Dependencia '${name}' registrada como ${isSingleton ? 'singleton' : 'transient'}.`);
  }

  resolve(name) {
    const registration = this.#registrations.get(name);
    if (!registration) {
      throw new Error(`Dependencia '${name}' no registrada.`);
    }

    if (registration.isSingleton) {
      if (!registration.instance) {
        registration.instance = this.#executeResolver(registration.resolver, registration.dependencies);
      }
      return registration.instance;
    } else {
      return this.#executeResolver(registration.resolver, registration.dependencies);
    }
  }

  #executeResolver(resolver, explicitDependencies = []) {
    // Si el resolver es una clase, la instanciamos con sus dependencias.
    if (typeof resolver === 'function' && /^(class\s|function\s*\w*\s*\()/.test(resolver.toString())) {
      const dependencies = explicitDependencies.map(depName => this.resolve(depName));
      return new resolver(...dependencies);
    }
    // Si el resolver es una función (factory), la ejecutamos.
    if (typeof resolver === 'function') {
      return resolver(this); // Pasamos el contenedor por si la factory lo necesita
    }
    // Si el resolver es una instancia directa, la devolvemos tal cual.
    return resolver;
  }

  clear() {
    this.#registrations.clear();
    logger.info('DependencyContainer limpiado.');
  }
}

export default DependencyContainer;