# Estrategia de Pruebas para Admin-TK

Este documento describe la estrategia de pruebas para el proyecto Admin-TK, cubriendo pruebas unitarias, de integración y end-to-end (E2E). El objetivo es asegurar la calidad, fiabilidad y mantenibilidad del código a medida que el proyecto evoluciona.

## 1. Filosofía de Pruebas

Adoptamos una filosofía de pruebas en forma de pirámide, donde la base son las pruebas unitarias (rápidas y aisladas), seguidas por las pruebas de integración (verifican la interacción entre componentes) y, en la cima, un número menor de pruebas E2E (simulan el comportamiento del usuario final).

-   **Rapidez:** Las pruebas deben ejecutarse rápidamente para proporcionar retroalimentación instantánea a los desarrolladores.
-   **Aislamiento:** Las pruebas unitarias deben ser independientes entre sí y de factores externos (red, base de datos real, etc.).
-   **Fiabilidad:** Las pruebas deben ser deterministas; siempre deben producir el mismo resultado para la misma entrada.
-   **Cobertura:** Apuntar a una alta cobertura de código para las unidades críticas, pero sin obsesionarse con el 100% si no añade valor real.

## 2. Herramientas de Pruebas

-   **Jest:** Framework de pruebas principal para JavaScript. Se utiliza para pruebas unitarias y de integración.
-   **Supertest (para WebServer):** Librería para probar APIs HTTP de forma sencilla.
-   **SQLite en memoria:** Para pruebas de integración que involucren la base de datos, se recomienda usar una base de datos SQLite en memoria para mayor velocidad y aislamiento.

## 3. Estructura de Directorios de Pruebas

Los archivos de prueba se encuentran en el directorio `__tests__/` y se organizan de la siguiente manera:

```
__tests__/
├── unit/             # Pruebas unitarias: componentes individuales aislados
│   ├── core/         # Tests para src/core/
│   │   ├── UserManager.test.js
│   │   ├── FeatureFlagManager.test.js
│   │   └── ...
│   ├── services/     # Tests para src/services/
│   │   ├── AIService.test.js
│   │   └── ...
│   ├── handlers/     # Tests para src/handlers/
│   │   └── PingCommandHandler.test.js
│   │   └── ...
│   ├── ia/
│   ├── utils/
│   └── ...
├── integration/      # Pruebas de integración: interacción entre varios componentes
│   ├── MessageFlow.test.js
│   └── ...
└── e2e/              # Pruebas End-to-End: simulación de usuario final (pocos y críticos)
    └── BotInteraction.test.js
```

## 4. Pruebas Unitarias

Las pruebas unitarias se centran en verificar el comportamiento de unidades de código individuales (funciones, clases, módulos) de forma aislada. Todas las dependencias externas deben ser *mockeadas*.

### Principios Clave:

-   **Aislamiento:** Cada prueba debe ser independiente. Mockea todo lo que no sea la unidad bajo prueba.
-   **Mocking:** Utiliza `jest.fn()` para mockear funciones y `jest.mock()` para módulos completos. Esto te permite controlar el comportamiento de las dependencias y verificar si fueron llamadas correctamente.
-   **Clases con Inyección de Dependencias:** Si una clase recibe sus dependencias en el constructor, mockea esas dependencias y pásalas al constructor de la clase bajo prueba.

### Ejemplo: `UserManager.test.js`

```javascript
// __tests__/unit/UserManager.test.js

import UserManager from '../../src/core/UserManager.js';
import DependencyContainer from '../../src/core/DependencyContainer.js';
import { UserCreatedEvent, UserUpdatedEvent, UserBannedEvent, UserUnbannedEvent } from '../../src/events/DomainEvents.js';

describe('UserManager', () => {
  let userManager;
  let mockDbService;
  let mockLogger;
  let mockCache;
  let mockEventStore;
  let mockConfig;

  beforeEach(() => {
    // Resetear el contenedor de dependencias para cada prueba
    DependencyContainer.reset();

    // Mockear las dependencias
    mockDbService = {
      get: jest.fn(),
      run: jest.fn(),
      all: jest.fn(),
      getDB: jest.fn(() => ({ run: jest.fn(), all: jest.fn(), get: jest.fn() }))
    };
    mockLogger = {
      info: jest.fn(),
      warn: jest.fn(),
      error: jest.fn(),
      debug: jest.fn(),
    };
    mockCache = {
      set: jest.fn(),
      get: jest.fn(),
      has: jest.fn(),
      delete: jest.fn(),
    };
    mockEventStore = {
      publish: jest.fn(),
    };
    mockConfig = {
      ownerNumbers: ['1234567890'],
      roles: { user: 'user', owner: 'owner' },
    };

    // Registrar las dependencias mockeadas en el contenedor
    DependencyContainer.getInstance().register('config', () => mockConfig);
    DependencyContainer.getInstance().register('dbService', () => mockDbService);
    DependencyContainer.getInstance().register('logger', () => mockLogger);
    DependencyContainer.getInstance().register('cache', () => mockCache);
    DependencyContainer.getInstance().register('eventStore', () => mockEventStore);

    // Resolver UserManager a través del contenedor para que reciba las dependencias mockeadas
    userManager = DependencyContainer.getInstance().resolve(UserManager);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('getUser', () => {
    it('debería crear un nuevo usuario si no existe', async () => {
      mockDbService.get.mockResolvedValue(null);

      const jid = '12345@s.whatsapp.net';
      const pushName = 'TestUser';
      const user = await userManager.getUser(jid, pushName);

      expect(mockDbService.get).toHaveBeenCalledWith('SELECT * FROM users WHERE jid = ?', jid);
      expect(mockDbService.run).toHaveBeenCalled();
      expect(user).toHaveProperty('jid', jid);
      expect(user).toHaveProperty('name', pushName);
      expect(mockEventStore.publish).toHaveBeenCalledWith(expect.any(UserCreatedEvent));
    });

    // ... más tests para getUser ...
  });

  describe('banUser', () => {
    it('debería banear a un usuario y publicar un evento', async () => {
      const jid = 'user1@s.whatsapp.net';
      const userData = { jid, isBanned: false };
      userManager.users.set(jid, userData); // Simular que el usuario está en caché
      mockDbService.run.mockResolvedValue({});

      await userManager.banUser(jid);

      expect(userData.isBanned).toBe(true);
      expect(mockDbService.run).toHaveBeenCalled();
      expect(mockEventStore.publish).toHaveBeenCalledWith(expect.any(UserBannedEvent));
    });

    // ... más tests para banUser ...
  });

  // ... otros describe blocks para otros métodos ...
});
```

### Ejemplo: `PingCommandHandler.test.js`

```javascript
// __tests__/unit/PingCommandHandler.test.js

import PingCommandHandler from '../../src/commandHandlers/PingCommandHandler.js';
import { PingCommand } from '../../src/commands/PingCommand.js';
import DependencyContainer from '../../src/core/DependencyContainer.js';

describe('PingCommandHandler', () => {
  let pingCommandHandler;
  let mockLogger;
  let mockContext;

  beforeEach(() => {
    DependencyContainer.reset();

    mockLogger = {
      info: jest.fn(),
      warn: jest.fn(),
      error: jest.fn(),
      debug: jest.fn(),
    };

    mockContext = {
      reply: jest.fn(),
      sock: {
        sendMessage: jest.fn(),
        user: { id: 'botJid' },
      },
      chat: { id: 'chatJid' },
      message: { key: { remoteJid: 'chatJid', id: 'messageId' } },
    };

    DependencyContainer.getInstance().register('logger', () => mockLogger);

    pingCommandHandler = DependencyContainer.getInstance().resolve(PingCommandHandler);
  });

  it('debería responder con Pong! y la latencia', async () => {
    const command = new PingCommand(mockContext);
    await pingCommandHandler.handle(command);

    expect(mockContext.reply).toHaveBeenCalledWith('🏓 ¡Pong! Refactorizado!');
    expect(mockContext.sock.sendMessage).toHaveBeenCalledWith(
      'chatJid',
      expect.objectContaining({ text: expect.stringContaining('⏱️ Latencia:') })
    );
  });

  // ... más tests para PingCommandHandler ...
});
```

### Ejemplo: `AIService.test.js`

```javascript
// __tests__/unit/AIService.test.js

import AIService from '../../src/services/AIService.js';
import DependencyContainer from '../../src/core/DependencyContainer.js';
import { GoogleGenerativeAI } from '@google/generative-ai';

// Mockear GoogleGenerativeAI
jest.mock('@google/generative-ai', () => ({
  GoogleGenerativeAI: jest.fn().mockImplementation(() => ({
    getGenerativeModel: jest.fn().mockReturnValue({
      generateContent: jest.fn().mockResolvedValue({
        response: {
          text: jest.fn().mockReturnValue('Mocked AI response'),
        },
      }),
    }),
  })),
}));

describe('AIService', () => {
  let aiService;
  let mockConfig;
  let mockLogger;
  let mockMemoryService;
  let mockChatManager;
  let mockErrorHandler;

  beforeEach(() => {
    DependencyContainer.reset();

    mockConfig = {
      api: { geminiApiKey: 'test-api-key' },
      botName: 'TestBot',
    };
    mockLogger = {
      info: jest.fn(),
      warn: jest.fn(),
      error: jest.fn(),
      debug: jest.fn(),
    };
    mockMemoryService = {
      getRecentInteractions: jest.fn().mockResolvedValue([]),
      getFactsForChat: jest.fn().mockResolvedValue([]),
      addInteraction: jest.fn().mockResolvedValue(true),
    };
    mockChatManager = {
      updateChat: jest.fn().mockResolvedValue(true),
      getChat: jest.fn().mockResolvedValue({ personality_profile: null }),
    };
    mockErrorHandler = {
      handleError: jest.fn(),
      startCorrelation: jest.fn().mockReturnValue('corrId'),
      endCorrelation: jest.fn(),
    };

    DependencyContainer.getInstance().register('config', () => mockConfig);
    DependencyContainer.getInstance().register('logger', () => mockLogger);
    DependencyContainer.getInstance().register('memoryService', () => mockMemoryService);
    DependencyContainer.getInstance().register('chatManager', () => mockChatManager);
    DependencyContainer.getInstance().register('errorHandler', () => mockErrorHandler);

    aiService = DependencyContainer.getInstance().resolve(AIService);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('debería generar una respuesta estándar de IA para grupos', async () => {
    const context = {
      isGroup: true,
      user: { jid: 'user1@s.whatsapp.net', name: 'TestUser' },
      chat: { id: 'group1@g.us' },
      group: { subject: 'TestGroup' },
      message: { key: { id: 'msg1' } },
      messageText: 'Hello AI',
      sock: { user: { id: 'botJid', name: 'Bot' } },
    };

    const response = await aiService.generateResponse(context);

    expect(response.text).toBe('Mocked AI response');
    expect(GoogleGenerativeAI).toHaveBeenCalledWith('test-api-key');
    // ... más aserciones ...
  });

  // ... otros tests para AIService ...
});
```

### Ejemplo: `FeatureFlagManager.test.js`

```javascript
// __tests__/unit/FeatureFlagManager.test.js

import FeatureFlagManager from '../../src/core/FeatureFlagManager.js';
import DependencyContainer from '../../src/core/DependencyContainer.js';

describe('FeatureFlagManager', () => {
  let featureFlagManager;
  let mockDbService;
  let mockLogger;

  beforeEach(() => {
    DependencyContainer.reset();

    mockDbService = {
      getDB: jest.fn(() => ({
        all: jest.fn(),
        run: jest.fn(),
      })),
    };
    mockLogger = {
      info: jest.fn(),
      warn: jest.fn(),
      error: jest.fn(),
      debug: jest.fn(),
    };

    DependencyContainer.getInstance().register('dbService', () => mockDbService);
    DependencyContainer.getInstance().register('logger', () => mockLogger);

    featureFlagManager = DependencyContainer.getInstance().resolve(FeatureFlagManager);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('init', () => {
    it('debería cargar los flags existentes de la base de datos', async () => {
      mockDbService.getDB().all.mockResolvedValueOnce([
        { name: 'featureA', is_enabled: 1 },
        { name: 'featureB', is_enabled: 0 },
      ]);

      await featureFlagManager.init();

      expect(mockDbService.getDB().all).toHaveBeenCalledWith('SELECT * FROM feature_flags');
      expect(featureFlagManager.isEnabled('featureA')).toBe(true);
      expect(featureFlagManager.isEnabled('featureB')).toBe(false);
      expect(featureFlagManager.getAllFlags().size).toBe(2);
    });

    // ... más tests para init ...
  });

  // ... otros describe blocks para otros métodos ...
});
```

## 5. Pruebas de Integración

Las pruebas de integración verifican que múltiples componentes o módulos funcionan correctamente juntos. Se mockean las dependencias externas al subsistema que se está probando (ej. APIs externas, servicios de terceros).

### Principios Clave:

-   **Flujos de Negocio:** Enfocarse en probar flujos de negocio completos que involucren varias capas de la aplicación.
-   **Base de Datos en Memoria:** Para pruebas que interactúan con la base de datos, utiliza una base de datos SQLite en memoria (`:memory:`) para un entorno de prueba rápido y aislado.

### Ejemplo: Flujo de Mensajes a Comandos

```javascript
// __tests__/integration/MessageToCommandFlow.test.js

import MessageHandler from '../../src/handlers/MessageHandler.js';
import DependencyContainer from '../../src/core/DependencyContainer.js';
import { ProcessTextCommand } from '../../src/commands/ProcessTextCommand.js';
import { PingCommand } from '../../src/commands/PingCommand.js';

describe('Integration: Message to Command Flow', () => {
  let messageHandler;
  let mockCommandBus;
  let mockPluginLoader;
  let mockConfig;
  let mockLogger;
  let mockErrorHandler;
  let mockJobQueue;

  beforeEach(() => {
    DependencyContainer.reset();

    mockCommandBus = {
      dispatch: jest.fn(),
      register: jest.fn(),
    };
    mockPluginLoader = {
      getDependencies: jest.fn(() => ({ jobQueue: mockJobQueue })),
      getCommand: jest.fn(),
    };
    mockConfig = { prefix: '.' };
    mockLogger = {
      info: jest.fn(),
      warn: jest.fn(),
      error: jest.fn(),
      debug: jest.fn(),
    };
    mockErrorHandler = {
      handleError: jest.fn(),
      startCorrelation: jest.fn(() => 'corrId'),
      endCorrelation: jest.fn(),
    };
    mockJobQueue = {
      add: jest.fn(),
      processor: jest.fn(),
    };

    // Registrar mocks en el contenedor
    DependencyContainer.getInstance().register('config', () => mockConfig);
    DependencyContainer.getInstance().register('logger', () => mockLogger);
    DependencyContainer.getInstance().register('errorHandler', () => mockErrorHandler);
    DependencyContainer.getInstance().register('commandBus', () => mockCommandBus);
    DependencyContainer.getInstance().register('pluginLoader', () => mockPluginLoader);
    DependencyContainer.getInstance().register('jobQueue', () => mockJobQueue);

    // Resolver MessageHandler
    messageHandler = DependencyContainer.getInstance().resolve(MessageHandler);

    // Asignar el procesador de la JobQueue (normalmente hecho en app.js)
    mockJobQueue.processor = messageHandler._processJob.bind(messageHandler);
  });

  it('debería encolar un mensaje y luego procesarlo como un comando', async () => {
    const mockMessage = {
      key: { fromMe: false, remoteJid: '123@s.whatsapp.net', id: 'msg1' },
      message: { conversation: '.ping' },
    };
    const mockSock = { sendMessage: jest.fn(), groupMetadata: jest.fn() };

    // Simular que el pluginLoader encuentra el comando 'ping'
    mockPluginLoader.getCommand.mockReturnValue({
      name: 'ping',
      command: PingCommand, // El Command real
      handler: jest.fn(), // El Handler real (no se invoca directamente aquí)
    });

    // Simular el evento de mensaje entrante
    await messageHandler.handle({ messages: [mockMessage], type: 'notify' }, mockSock);

    // Verificar que el mensaje fue añadido a la cola
    expect(mockJobQueue.add).toHaveBeenCalledTimes(1);
    const enqueuedContext = mockJobQueue.add.mock.calls[0][0];
    expect(enqueuedContext.messageText).toBe('.ping');
    expect(enqueuedContext.isCommand).toBe(true);
    expect(enqueuedContext.command).toBe('ping');

    // Simular el procesamiento del trabajo por la JobQueue
    await mockJobQueue.processor(enqueuedContext);

    // Verificar que el CommandBus fue despachado con el ProcessTextCommand
    expect(mockCommandBus.dispatch).toHaveBeenCalledTimes(1);
    const dispatchedCommand = mockCommandBus.dispatch.mock.calls[0][0];
    expect(dispatchedCommand).toBeInstanceOf(ProcessTextCommand);
    expect(dispatchedCommand.context.command).toBe('ping');

    // Verificar que el CommandBus intentó despachar el PingCommand (simulado por el PluginLoader)
    // Esto es más complejo de verificar directamente aquí sin mockear el CommandBus para que llame al handler real.
    // En una prueba de integración más profunda, se podría verificar que el handler real fue invocado.
  });

  // ... más tests de integración ...
});
```

## 6. Pruebas End-to-End (E2E)

Las pruebas E2E simulan la interacción completa de un usuario con el sistema, desde la interfaz de usuario (o API externa) hasta la base de datos y viceversa. Son las más lentas y frágiles, por lo que deben ser pocas y cubrir los flujos más críticos.

### Herramientas Sugeridas:

-   **Jest-Puppeteer:** Si el bot tiene una interfaz web o si se puede simular la interacción con WhatsApp Web.
-   **Simulador de Baileys:** Si se puede construir un entorno que simule el envío y recepción de mensajes de Baileys sin una conexión real a WhatsApp.

### Principios Clave:

-   **Escenarios Críticos:** Enfocarse en los flujos de usuario más importantes (ej. registro, envío de comandos clave, interacción con la IA).
-   **Entorno Aislado:** Utilizar un entorno de prueba completamente aislado (base de datos limpia, sesiones nuevas) para cada ejecución de E2E.

### Ejemplo (Conceptual): Interacción Básica del Bot

```javascript
// __tests__/e2e/BotInteraction.test.js

// NOTA: La implementación real de E2E dependerá en gran medida de cómo se simule
// la interacción con WhatsApp (ej. Baileys en modo headless, Puppeteer, etc.).
// Este es un ejemplo conceptual.

describe('E2E: Basic Bot Interaction', () => {
  let botClient; // Simulación del cliente de WhatsApp del bot
  let userClient; // Simulación del cliente de WhatsApp del usuario
  let dbService; // Acceso a la DB para verificar estado

  beforeAll(async () => {
    // Inicializar el bot en un entorno de prueba
    // Esto podría implicar arrancar una instancia del bot con una DB en memoria
    // y un mock de la API de WhatsApp.
    // botInstance = await startTestBot(); 

    // Inicializar clientes simulados de WhatsApp
    // userClient = new WhatsAppTestClient('user1');
    // botClient = new WhatsAppTestClient('bot');

    // Obtener acceso al DBService para verificaciones
    // dbService = DependencyContainer.getInstance().resolve('dbService');
  });

  afterAll(async () => {
    // Limpiar el entorno de prueba
    // await stopTestBot();
  });

  it('debería responder a un comando de ping', async () => {
    // Simular el envío de un mensaje del usuario al bot
    // await userClient.sendMessage('botJid', '.ping');

    // Esperar la respuesta del bot
    // const botResponse = await botClient.waitForMessage('userJid');

    // Verificar la respuesta
    // expect(botResponse.text).toContain('Pong!');
    // expect(botResponse.text).toContain('Latencia:');
  });

  it('debería activar el modo IA en un grupo y responder inteligentemente', async () => {
    // Simular creación de grupo y añadir bot
    // const groupId = await userClient.createGroup('Test Group', [botClient.jid]);

    // Simular comando para activar IA
    // await userClient.sendMessage(groupId, '.on ia');
    // await botClient.waitForMessage(groupId, 'Modo IA autónomo ACTIVADO');

    // Simular pregunta a la IA
    // await userClient.sendMessage(groupId, '¿Cuál es la capital de Francia?');
    // const aiResponse = await botClient.waitForMessage(groupId);
    // expect(aiResponse.text).toContain('París');

    // Verificar estado en la DB
    // const groupData = await dbService.getGroup(groupId);
    // expect(groupData.isAiEnabled).toBe(true);
  });

  // ... más escenarios E2E ...
});
```

## 7. Integración Continua (CI)

La Integración Continua (CI) automatiza la ejecución de pruebas y otras verificaciones de calidad de código cada vez que se realiza un cambio en el repositorio. Esto asegura que los errores se detecten temprano y que la base de código se mantenga saludable.

### Configuración con GitHub Actions

Para proyectos alojados en GitHub, GitHub Actions es la herramienta recomendada. Crea un archivo `.github/workflows/ci.yml` en la raíz de tu repositorio con el siguiente contenido:

```yaml
name: CI Admin-TK

on: 
  push:
    branches:
      - main
  pull_request:
    branches:
      - main

jobs:
  build-and-test:
    runs-on: ubuntu-latest

    steps:
    - name: Checkout code
      uses: actions/checkout@v3

    - name: Setup Node.js
      uses: actions/setup-node@v3
      with:
        node-version: '18' # Asegúrate de que coincida con tu versión de Node.js

    - name: Install dependencies
      run: npm ci

    - name: Run tests
      run: npm test

    - name: Run linter
      run: npm run lint

    # Opcional: Si tienes un paso de build para producción
    # - name: Build project
    #   run: npm run build
```

### Pasos para Configurar CI:

1.  Crea el archivo `.github/workflows/ci.yml` con el contenido anterior.
2.  Asegúrate de que los scripts `npm test` y `npm run lint` estén definidos en tu `package.json` y funcionen correctamente de forma local.
3.  Haz commit y push de este archivo a tu repositorio. GitHub Actions detectará el archivo y comenzará a ejecutar los flujos de trabajo automáticamente en cada push o pull request.

## 8. Cómo Escribir Nuevas Pruebas

Sigue los ejemplos proporcionados y los principios clave para cada tipo de prueba. Aquí hay un resumen rápido:

-   **Pruebas Unitarias:**
    -   Crea un archivo `[NombreModulo].test.js` en el subdirectorio `__tests__/unit/[categoria]/` correspondiente.
    -   Importa la clase/función a probar y `DependencyContainer`.
    -   En `beforeEach`, mockea todas las dependencias que la clase bajo prueba recibe en su constructor o utiliza directamente (ej. `DBService`, `logger`, `EventStore`).
    -   Utiliza `DependencyContainer.getInstance().resolve(YourClass)` para obtener una instancia de la clase con tus mocks inyectados.
    -   Escribe `it` bloques para cada escenario de prueba, utilizando `expect` para las aserciones.
    -   Verifica que las funciones mockeadas fueron llamadas con los argumentos correctos (`toHaveBeenCalledWith`).

-   **Pruebas de Integración:**
    -   Crea un archivo `[NombreFlujo].test.js` en `__tests__/integration/`.
    -   Mockea solo las dependencias externas al flujo que estás probando (ej. el socket de Baileys, pero usa una DB en memoria si el flujo interactúa con la DB).
    -   Simula las entradas y verifica las salidas a través de múltiples componentes.

-   **Pruebas E2E:**
    -   Crea un archivo `[NombreEscenario].test.js` en `__tests__/e2e/`.
    -   Requieren un entorno de prueba más complejo que simule la interacción real con el bot.
    -   Enfócate en los flujos de usuario más críticos.

Al seguir esta guía, podrás expandir la cobertura de pruebas de Admin-TK de manera efectiva, asegurando un desarrollo continuo y de alta calidad.
