¡Perfecto! Vamos a crear el **Volumen X** de tu **documento maestro Admin-TK**, completamente detallado y práctico, pensado como **guía paso a paso para iniciar todo el ecosistema**, tomando en cuenta las observaciones y problemas que me proporcionaste. Este será el **manual de inicio, configuración y puesta en marcha de la plataforma**, enfocado en hacer que todo funcione correctamente desde cero. Lo estructuraré por capítulos, con ejemplos, comandos, explicaciones y buenas prácticas.

---

# **Volumen X: Cómo Empezar y Hacer Posible Todo el Ecosistema Admin-TK**

Este volumen sirve como guía de inicio definitiva para el ecosistema **Admin-TK**, incluyendo el **dash, panel, tienda y TK-Coins**. Aquí encontrarás instrucciones para configurar tu VPS, DNS, certificados SSL, dominios, backend, frontend y los sistemas de pagos, evitando errores comunes y problemas de conexión como los que se observan con Paymenter.

---

## **Capítulo 53: Preparación del Entorno**

### 53.1. Evaluación del VPS

Antes de cualquier instalación, debemos confirmar que tu VPS tiene los requisitos necesarios:

* **CPU:** mínimo 2 núcleos (4 recomendados).
* **RAM:** mínimo 4 GB (8 GB recomendado para múltiples servicios).
* **Almacenamiento:** mínimo 50 GB SSD.
* **Sistema operativo:** AlmaLinux 9 / Ubuntu 22.04 LTS / Debian 12.

**Ejemplo de verificación de recursos:**

```bash
lscpu
free -h
df -h
```

### 53.2. Preparación de Acceso y Seguridad

1. **Crear usuario no-root**: Nunca trabajes como root para mayor seguridad.

```bash
adduser admin-tk
usermod -aG sudo admin-tk
```

2. **SSH Key**: Genera y agrega tu clave pública al VPS.

```bash
ssh-keygen -t ed25519 -C "tuemail@dominio.com"
ssh-copy-id admin-tk@IP_VPS
```

3. **Firewall básico y Fail2ban**:

```bash
ufw allow OpenSSH
ufw enable
apt install fail2ban -y
systemctl enable fail2ban
systemctl start fail2ban
```

### 53.3. Actualización del Sistema

```bash
apt update && apt upgrade -y
```

Esto asegura que todos los paquetes estén actualizados antes de instalar dependencias.

---

## **Capítulo 54: Configuración de DNS y Dominios**

### 54.1. Configuración de registros A y CNAME

Debes apuntar tus subdominios correctamente a la IP de tu VPS: **206.183.129.67**

* **Panel:** `panel.tk-host.fun` → A → 206.183.129.67
* **Tienda:** `tienda.tk-host.fun` → A → 206.183.129.67
* **Dash:** `dash.tk-host.fun` → A → 206.183.129.67 (crear nuevo subdominio)

**Ejemplo de archivo DNS en Hostinger:**

| Type  | Name   | Content        | TTL   |
| ----- | ------ | -------------- | ----- |
| A     | @      | 206.183.129.67 | 14400 |
| A     | panel  | 206.183.129.67 | 14400 |
| A     | tienda | 206.183.129.67 | 14400 |
| A     | dash   | 206.183.129.67 | 14400 |
| A     | games  | 206.183.129.67 | 14400 |
| CNAME | www    | tk-host.fun    | 300   |
A
tk-host.fun
206.183.129.67

Redirigido mediante proxy

Automático


**Tip:** Evita problemas de Paymenter: asegúrate de que todos los subdominios tengan conectividad y resuelvan correctamente a tu VPS antes de instalar cualquier aplicación.

---

### 54.2. Nameservers y DNSSEC

* Configura los **nameservers principales y secundarios** en tu panel de dominio.
* Habilita **DNSSEC** para firmar criptográficamente tus registros y prevenir ataques de spoofing.

**Ejemplo de DNSSEC básico:**

* Clave privada: generada en Hostinger.
* Tipo de firma: ECDSA/SHA-256.
* Digest: SHA-256.

---

## **Capítulo 55: Instalación de Dependencias**

### 55.1. Servidor Web y Reverse Proxy

Instala **Nginx** para servir todas las aplicaciones.

```bash
apt install nginx -y
systemctl enable nginx
systemctl start nginx
```

Configura **server blocks** para cada subdominio:

* `/etc/nginx/sites-available/panel.tk-host.fun`
* `/etc/nginx/sites-available/tienda.tk-host.fun`
* `/etc/nginx/sites-available/dash.tk-host.fun`

**Ejemplo básico de server block:**

```nginx
server {
    listen 80;
    server_name panel.tk-host.fun;

    location / {
        proxy_pass http://localhost:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
    }
}
```

Habilita los sites:

```bash
ln -s /etc/nginx/sites-available/panel.tk-host.fun /etc/nginx/sites-enabled/
nginx -t
systemctl reload nginx
```

---

### 55.2. Node.js y PM2

Usa **NVM** para manejar versiones de Node:

```bash
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.5/install.sh | bash
source ~/.nvm/nvm.sh
nvm install 20
nvm use 20
```

Instala PM2:

```bash
npm install -g pm2
pm2 startup systemd
```

---

### 55.3. Base de Datos y Cola de Trabajos

**MongoDB**:

```bash
apt install -y mongodb
systemctl enable mongodb
systemctl start mongodb
```

**Redis** (para BullMQ):

```bash
apt install -y redis
systemctl enable redis
systemctl start redis
```

---

## **Capítulo 56: Configuración SSL**

Usaremos **Let's Encrypt** y Certbot para HTTPS:

```bash
apt install certbot python3-certbot-nginx -y
certbot --nginx -d panel.tk-host.fun -d tienda.tk-host.fun -d dash.tk-host.fun
```

Habilita renovación automática:

```bash
systemctl enable certbot.timer
systemctl start certbot.timer
```

---

## **Capítulo 57: Clonación y Preparación del Código**

### 57.1. Repositorios

* **Panel:** git clone [https://github.com/TuUsuario/panel.git](https://github.com/TuUsuario/panel.git)
* **Dash:** git clone [https://github.com/TuUsuario/dash.git](https://github.com/TuUsuario/dash.git)
* **Tienda:** git clone [https://github.com/TuUsuario/tienda.git](https://github.com/TuUsuario/tienda.git)

### 57.2. Variables de Entorno

Crea archivos `.env.production` con:

```
PORT=3000
MONGO_URI=mongodb://localhost:27017/admin-tk
REDIS_URL=redis://localhost:6379
JWT_SECRET=unaClaveSuperSegura
STRIPE_SECRET_KEY=sk_test_xxx
STRIPE_WEBHOOK_SECRET=whsec_xxx
```

**Tip:** Nunca subas `.env` a Git.

---

### 57.3. Instalación de Dependencias

```bash
cd panel
npm install
cd ../dash
npm install
cd ../tienda
npm install
```

---

## **Capítulo 58: Lanzamiento con PM2**

Crea un **ecosystem.config.js** para PM2:

```javascript
module.exports = {
  apps: [
    {
      name: "panel",
      script: "./index.js",
      env_production: {
        NODE_ENV: "production",
        PORT: 3000
      }
    },
    {
      name: "dash",
      script: "npm",
      args: "start",
      cwd: "./dash",
      env_production: {
        NODE_ENV: "production",
        PORT: 3001
      }
    },
    {
      name: "tienda",
      script: "npm",
      args: "start",
      cwd: "./tienda",
      env_production: {
        NODE_ENV: "production",
        PORT: 3002
      }
    }
  ]
}
```

Inicia las apps:

```bash
pm2 start ecosystem.config.js --env production
pm2 save
```

---

## **Capítulo 59: Pruebas Iniciales y Resolución de Errores**

### 59.1. Verificación de Conexiones

* `ping panel.tk-host.fun` → debe responder.
* `curl -I https://tienda.tk-host.fun` → verificar HTTP 200 y redirección a HTTPS.
* `curl -I https://dash.tk-host.fun` → debe devolver 200.

### 59.2. Errores Comunes y Soluciones

1. **Paymenter no carga estilos:**

   * Revisar que el subdominio `tienda.tk-host.fun` apunte correctamente a la IP y puerto.
   * Verificar Nginx y certificados SSL.

2. **Dash no existe:**

   * Crear subdominio `dash.tk-host.fun`.
   * Configurar server block en Nginx apuntando al puerto correcto (3001).

3. **Facturas bugueadas:**

   * Verifica que la base de datos Mongo esté accesible.
   * Revisa la cola de trabajos en Redis y los logs de PM2 para errores.

---

## **Capítulo 60: Optimización y Buenas Prácticas**

* **Logs:** PM2 + Winston/Pino para logs estructurados.
* **Monitorización:** Integrar Sentry o Datadog para errores y rendimiento.
* **Backups:** Mongodump diario + subida a S3/Backblaze.
* **Actualizaciones:** Mantener Node, Nginx y dependencias siempre actualizadas.

---

## **Capítulo 61: Conclusión y Siguiente Paso**

Siguiendo este volumen:

1. Tu VPS estará preparado y seguro.
2. Todos los dominios y subdominios estarán correctamente apuntados.
3. TLS/HTTPS estará activo y renovable automáticamente.
4. Todas las aplicaciones (dash, panel, tienda) estarán corriendo bajo PM2 con logs y monitorización.
5. La tienda dejará de mostrar solo HTML básico y se cargará completamente con estilos y scripts.
6. Se minimiza el riesgo de errores como los observados con Paymenter.

**Próximo paso:** Integrar TK-Coins, suscripciones automáticas, Stripe y la cola de provisión, siguiendo los volúmenes anteriores (IV, V, VI y VIII).
