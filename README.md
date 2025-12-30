# 📦 Itsuki Nakano AI

<p align="center">
  <img src="https://h.uguu.se/TWZcBwLl.jpg" width="900" alt="Banner del Proyecto" />
</p>

<p align="center">
  <a href="https://github.com/leodevxyz"><img src="http://readme-typing-svg.herokuapp.com?font=Fira+Code&pause=1000&color=7AF7FF&center=true&vCenter=true&width=435&lines=Proyecto+Oficial;Desarrollo+Activo+2025" alt="Proyecto Oficial"/></a>
</p>

> **Nombre del repositorio:** `Itsuki-NakanoV5`

## 📋 Tabla de contenidos

* [Descripción](#-descripción)
* [Características](#-características)
* [Requisitos](#-requisitos)
* [Instalación rápida (Termux)](#-instalación-rápida-termux)
* [Despliegue 24/7 (PM2 / Docker / Replit)](#-despliegue-247-pm2--docker--replit)
* [Configuración](#-configuración)
* [Comandos importantes](#-comandos-importantes)
* [Estructura del proyecto](#-estructura-del-proyecto)
* [Changelog](#-changelog)
* [Contribuir](#-contribuir)
* [Seguridad](#-seguridad)
* [Licencia y créditos](#-licencia-y-créditos)
* [Contacto](#-contacto)

## 🧾 🔍 Descripción

**Itsuki Nakano AI** es un bot modular, estable y fácil de desplegar pensado para funcionar en Termux, Replit, servidores Linux/Windows y entornos Docker. Está diseñado para ser extensible (comandos como módulos), con administración de usuarios y un enfoque en la estabilidad y operaciones 24/7.

## ✨ Características principales

* Arquitectura modular (habilita/deshabilita comandos).
* Soporte multiplataforma: Termux, Replit, Windows, Docker.
* Gestión de permisos y niveles de usuario.
* Integraciones opcionales con APIs externas.
* Logs rotativos, backups automáticos y actualizaciones seguras.

## ⚙️ Requisitos

* Node.js v20
* npm o Yarn
> En sistemas con recursos limitados (Termux o Replit), preferir builds ligeros y activar solo los módulos necesarios.

## 🛠 Instalación rápida (ejemplo Termux)

```bash
# permisos y actualizaciones
termux-setup-storage
apt update && apt upgrade -y

# dependencias básicas
pkg install -y git nodejs ffmpeg imagemagick yarn

# clonar e instalar
git clone https://github.com/leoxito/Itsuki-NakanoV5.git
cd Itsuki-Nakano
# usar yarn o npm
yarn install
# crear archivo de configuración desde la plantilla
cp config.example.js .env.example .env

# iniciar
npm start
```

> Para Windows: instala Node.js desde la web oficial, clona el repo y ejecuta `npm install` + `npm start`.

## 🚀 Despliegue 24/7

### Usando PM2 (recomendado para VPS)

```bash
npm i -g pm2
pm run build # si aplica
pm start # probar localmente
pm2 start index.js --name "Itsuki-Nakano"
pm2 save
pm2 logs Itsuki-Nakano
```

Ejemplo de `ecosystem.config.js` para PM2:

```js
module.exports = {
  apps: [
    {
      name: 'Itsuki-Nakano',
      script: 'index.js',
      instances: 1,
      autorestart: true,
      watch: false,
      max_memory_restart: '250M',
      env: {
        NODE_ENV: 'production',
      },
    },
  ],
};
```

### Docker (opcional)

`Dockerfile` mínimo:

```dockerfile
FROM node:18-alpine
WORKDIR /app
COPY package*.json ./
RUN npm ci --only=production
COPY . .
CMD ["node", "index.js"]
```

### Replit

* Crea un repl, sube el código o conecta con GitHub.
* Define variables de entorno en Secrets/Environment.
* Usa un script `start` en package.json.

---

## 🔧 Configuración

* `config.example.js` — plantilla con todas las variables de entorno necesarias (token, credenciales de APIs, paths, opciones de módulos).
* **IMPORTANTE:** nunca subas tus credenciales reales al repositorio.

### Ejemplo `.env`

```
NODE_ENV=production
PORT=3000
BOT_TOKEN=tu_token_aqui
OWNER_ID=1234567890
DB_URL=mongodb://usuario:pass@host:27017/tu-db
LOG_LEVEL=info
```

---

## 📚 Comandos importantes

* `npm start` — iniciar en modo producción.
* `npm run dev` — iniciar en modo desarrollo (watch + nodemon).
* `npm test` — ejecutar tests (si los tienes).
* `npm run backup` — crear respaldo rápido de la base de datos (script opcional).

Incluye en `package.json` scripts útiles:

```json
"scripts": {
  "start": "node index.js",
  "dev": "nodemon index.js",
  "lint": "eslint .",
  "backup": "bash ./scripts/backup-db.sh"
}
```

---

## 📝 Changelog (ejemplo)

* **2025-12-29 — v1.0.0** — Lanzamiento inicial, estructura modular, docs básicas.
* **2025-12-22 — v0.9.2** — Optimización de arranque, script de backup.
* **2025-11-10 — v0.9.0** — Logs rotativos, soporte PM2, primeros comandos multimedia.

> Mantén el changelog actualizado con el formato `YYYY-MM-DD — vX.Y.Z`.

---

## 🤝 Cómo contribuir

1. Haz fork del repositorio.
2. Crea una branch `feature/tu-cambio`.
3. Escribe commits claros y abre un Pull Request describiendo los cambios.

**Guía de estilo:** ESLint + Prettier. Añade tests cuando sea posible.

---

## 🔐 Reporte de vulnerabilidades / Seguridad

* Si encuentras una vulnerabilidad, por favor reporta a `hola@leodev.xyz` (o usa el canal privado que el proyecto defina).
* No publiques exploits ni credenciales en issues públicos.

---

## ⚠️ Troubleshooting (problemas comunes)

* `ERROR: Cannot find module` → ejecuta `npm install` y revisa `NODE_PATH`.
* `Permission denied` en Termux → ejecuta `termux-setup-storage` y verifica permisos.
* Problemas multimedia → asegúrate de que `ffmpeg` e `imagemagick` estén instalados y accesibles en PATH.

---

## 🧾 Licencia

Este proyecto se publica bajo **MIT License**. Cambia a la licencia que prefieras si aplica.

---

## 👥 Equipo y créditos

| Avatar                                      |         Nombre | Rol                  |
| ------------------------------------------- | -------------: | :------------------- |
| ![LeoDev](https://github.com/leodevxyz.png) | **LeoDev.xyz** | Creador Principal    |
| ![Maicol](https://github.com/maicol.png)    |     **Maicol** | Colaborador (Código) |
| ![Joan TK](https://github.com/JJoan02.png)  |    **Joan TK** | Soporte & Asesoría   |

---

## 📬 Contacto

* Web: [https://leoDev.xyz](https://leoDev.xyz)
* GitHub: [https://github.com/leodevxyz](https://github.com/leodevxyz)
* Soporte: [https://github.com/JJoan02](https://github.com/JJoan02)
* Email: `hola@leodev.xyz` *(reemplaza por el contacto real antes de publicar)*

---

> ¿Quieres que adapte este README directamente al contenido real del repo (añadiendo tus scripts, `package.json`, y enlaces reales para Maicol y Joan TK)? Si sí, los incorporo ya mismo en el README.
