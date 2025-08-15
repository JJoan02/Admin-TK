// public/js/dashboard.js

document.addEventListener('DOMContentLoaded', () => {
    const loginForm = document.getElementById('login-form');
    const registerForm = document.getElementById('register-form');
    const forgotPasswordForm = document.getElementById('forgot-password-form');
    const validateResetCodeForm = document.getElementById('validate-reset-code-form');
    const dashboardContent = document.getElementById('dashboard-content');

    const loginFormElement = document.getElementById('login-form-element');
    const registerFormElement = document.getElementById('register-form-element');
    const forgotPasswordFormElement = document.getElementById('forgot-password-form-element');
    const validateResetCodeFormElement = document.getElementById('validate-reset-code-form-element');

    const loginMessage = document.getElementById('login-message');
    const registerMessage = document.getElementById('register-message');
    const forgotPasswordMessage = document.getElementById('forgot-password-message');
    const validateResetCodeMessage = document.getElementById('validate-reset-code-message');

    const registerLink = document.getElementById('register-link');
    const backToLoginLink = document.getElementById('back-to-login-link');
    const forgotPasswordLink = document.getElementById('forgot-password-link');
    const backToLoginFromFpLink = document.getElementById('back-to-login-from-fp-link');
    const backToLoginFromVrcLink = document.getElementById('back-to-login-from-vrc-link');
    const logoutButton = document.getElementById('logout-button');

    const botStatusIndicator = document.getElementById('bot-status-indicator');
    const botStatusText = document.getElementById('bot-status-text');
    const botConnectionIndicator = document.getElementById('bot-connection-indicator');
    const botConnectionText = document.getElementById('bot-connection-text');
    const botLinkedAccount = document.getElementById('bot-linked-account');
    const botLastConnection = document.getElementById('bot-last-connection');
    const botMessagesProcessed = document.getElementById('bot-messages-processed');
    const qrCodeContainer = document.getElementById('qr-code-container');
    const qrMessage = document.getElementById('qr-message');
    const generateNewQrButton = document.getElementById('generate-new-qr');
    const serversTableBody = document.getElementById('servers-table-body');

    let ws; // WebSocket connection

    // --- Funciones de Utilidad --- //
    function showForm(formToShow) {
        loginForm.style.display = 'none';
        registerForm.style.display = 'none';
        forgotPasswordForm.style.display = 'none';
        validateResetCodeForm.style.display = 'none';
        dashboardContent.style.display = 'none';
        formToShow.style.display = 'flex';
    }

    function showDashboard() {
        loginForm.style.display = 'none';
        registerForm.style.display = 'none';
        forgotPasswordForm.style.display = 'none';
        validateResetCodeForm.style.display = 'none';
        dashboardContent.style.display = 'block';
        fetchServers();
        connectWebSocket();
    }

    function setAuthMessage(element, message, isError = false) {
        element.textContent = message;
        element.style.color = isError ? '#f56565' : '#48bb78';
    }

    function clearAuthMessages() {
        loginMessage.textContent = '';
        registerMessage.textContent = '';
        forgotPasswordMessage.textContent = '';
        validateResetCodeMessage.textContent = '';
    }

    function saveToken(token) {
        localStorage.setItem('jwtToken', token);
    }

    function getToken() {
        return localStorage.getItem('jwtToken');
    }

    function removeToken() {
        localStorage.removeItem('jwtToken');
    }

    // --- Manejo de Autenticación --- //
    async function handleLogin(event) {
        event.preventDefault();
        clearAuthMessages();

        const username = loginFormElement.querySelector('#username').value;
        const password = loginFormElement.querySelector('#password').value;

        try {
            const response = await fetch('/api/auth/login', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ username, password })
            });

            const data = await response.json();

            if (response.ok) {
                saveToken(data.token);
                setAuthMessage(loginMessage, 'Inicio de sesión exitoso.');
                showDashboard();
            } else {
                setAuthMessage(loginMessage, data.error || 'Error al iniciar sesión.', true);
            }
        } catch (error) {
            setAuthMessage(loginMessage, 'Error de conexión.', true);
            console.error('Error de login:', error);
        }
    }

    async function handleRegister(event) {
        event.preventDefault();
        clearAuthMessages();

        const username = registerFormElement.querySelector('#reg-username').value;
        const password = registerFormElement.querySelector('#reg-password').value;
        const confirmPassword = registerFormElement.querySelector('#reg-confirm-password').value;

        if (password !== confirmPassword) {
            setAuthMessage(registerMessage, 'Las contraseñas no coinciden.', true);
            return;
        }

        try {
            const response = await fetch('/api/auth/register', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ username, password })
            });

            const data = await response.json();

            if (response.ok) {
                setAuthMessage(registerMessage, data.message || 'Registro exitoso.');
                setTimeout(() => showForm(loginForm), 1500);
            } else {
                setAuthMessage(registerMessage, data.error || 'Error al registrar.', true);
            }
        } catch (error) {
            setAuthMessage(registerMessage, 'Error de conexión.', true);
            console.error('Error de registro:', error);
        }
    }

    async function handleForgotPassword(event) {
        event.preventDefault();
        clearAuthMessages();

        const username = forgotPasswordFormElement.querySelector('#fp-username').value;
        const whatsappNumber = forgotPasswordFormElement.querySelector('#fp-whatsapp').value;

        try {
            const response = await fetch('/api/auth/reset-password', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ username, whatsappNumber })
            });

            const data = await response.json();

            if (response.ok) {
                setAuthMessage(forgotPasswordMessage, data.message || 'Código de restablecimiento enviado.');
                // Pre-llenar el username en el formulario de validación
                validateResetCodeFormElement.querySelector('#vrc-username').value = username;
                showForm(validateResetCodeForm);
            } else {
                setAuthMessage(forgotPasswordMessage, data.error || 'Error al solicitar restablecimiento.', true);
            }
        } catch (error) {
            setAuthMessage(forgotPasswordMessage, 'Error de conexión.', true);
            console.error('Error al solicitar restablecimiento:', error);
        }
    }

    async function handleValidateResetCode(event) {
        event.preventDefault();
        clearAuthMessages();

        const username = validateResetCodeFormElement.querySelector('#vrc-username').value;
        const code = validateResetCodeFormElement.querySelector('#vrc-code').value;
        const newPassword = validateResetCodeFormElement.querySelector('#vrc-new-password').value;

        try {
            const response = await fetch('/api/auth/validate-reset-code', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ username, code, newPassword })
            });

            const data = await response.json();

            if (response.ok) {
                setAuthMessage(validateResetCodeMessage, data.message || 'Contraseña actualizada con éxito.');
                setTimeout(() => showForm(loginForm), 1500);
            } else {
                setAuthMessage(validateResetCodeMessage, data.error || 'Error al validar código o actualizar contraseña.', true);
            }
        } catch (error) {
            setAuthMessage(validateResetCodeMessage, 'Error de conexión.', true);
            console.error('Error al validar código:', error);
        }
    }

    function handleLogout() {
        removeToken();
        showForm(loginForm);
        // Cerrar conexión WebSocket si está abierta
        if (ws && ws.readyState === WebSocket.OPEN) {
            ws.close();
        }
    }

    // --- Manejo de WebSocket para estado del Bot --- //
    function connectWebSocket() {
        if (ws && ws.readyState === WebSocket.OPEN) {
            return; // Ya conectado
        }

        ws = new WebSocket(`ws://${window.location.host}`);

        ws.onopen = () => {
            console.log('Conectado al WebSocket.');
            // Enviar token JWT para autenticar el WebSocket
            const token = getToken();
            if (token) {
                ws.send(JSON.stringify({ type: 'authenticate', token: token }));
            }
        };

        ws.onmessage = (event) => {
            const data = JSON.parse(event.data);
            console.log('Mensaje WebSocket recibido:', data);

            switch (data.type) {
                case 'auth_required':
                    // El servidor solicita autenticación, ya la enviamos en onopen
                    break;
                case 'auth_success':
                    console.log('WebSocket autenticado con éxito.');
                    // Ahora podemos solicitar datos en tiempo real o esperar actualizaciones
                    break;
                case 'auth_error':
                    console.error('Error de autenticación WebSocket:', data.message);
                    handleLogout(); // Forzar cierre de sesión si la autenticación WebSocket falla
                    break;
                case 'qr':
                    qrCodeContainer.innerHTML = `<img src="${data.qr}" alt="QR Code">`;
                    qrMessage.textContent = 'Escanea este código QR con WhatsApp Mobile para vincular tu cuenta.';
                    break;
                case 'status':
                    if (data.message === 'connected') {
                        botStatusIndicator.className = 'status-online w-2 h-2 rounded-full mr-2';
                        botStatusText.textContent = 'En Línea';
                        botConnectionIndicator.className = 'status-online w-2 h-2 rounded-full mr-2';
                        botConnectionText.textContent = 'Conectado';
                        qrCodeContainer.innerHTML = ''; // Limpiar QR
                        qrMessage.textContent = 'Bot WhatsApp conectado.';
                    } else if (data.message === 'disconnected') {
                        botStatusIndicator.className = 'status-offline w-2 h-2 rounded-full mr-2';
                        botStatusText.textContent = 'Desconectado';
                        botConnectionIndicator.className = 'status-offline w-2 h-2 rounded-full mr-2';
                        botConnectionText.textContent = 'Desconectado';
                        qrCodeContainer.innerHTML = ''; // Limpiar QR
                        qrMessage.textContent = 'Bot WhatsApp desconectado. Genera un nuevo QR para reconectar.';
                    }
                    break;
                case 'log':
                    // Mostrar logs en alguna parte del dashboard si es necesario
                    console.log('Log del servidor:', data.message);
                    break;
                // Otros tipos de mensajes en tiempo real (ej. uso de CPU/RAM, interacciones)
                case 'system_metrics':
                    // Actualizar gráficos de CPU/RAM
                    updateChart(cpuChart, data.cpu, 'CPU Usage (%)');
                    updateChart(ramChart, data.ram, 'RAM Usage (GB)');
                    break;
                case 'recent_interaction':
                    // Añadir nueva interacción al panel
                    addRecentInteraction(data.interaction);
                    break;
            }
        };

        ws.onclose = () => {
            console.log('Desconectado del WebSocket. Intentando reconectar en 5 segundos...');
            botStatusIndicator.className = 'status-offline w-2 h-2 rounded-full mr-2';
            botStatusText.textContent = 'Desconectado';
            botConnectionIndicator.className = 'status-offline w-2 h-2 rounded-full mr-2';
            botConnectionText.textContent = 'Desconectado';
            setTimeout(connectWebSocket, 5000);
        };

        ws.onerror = (error) => {
            console.error('Error en WebSocket:', error);
            ws.close();
        };
    }

    // --- Carga de Datos del Dashboard --- //
    async function fetchServers() {
        const token = getToken();
        if (!token) {
            console.error('No hay token JWT para obtener servidores.');
            return;
        }

        try {
            const response = await fetch('/api/servers', {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                }
            });

            if (response.ok) {
                const servers = await response.json();
                renderServers(servers);
            } else {
                console.error('Error al obtener servidores:', response.statusText);
                // Podría forzar un logout si el token es inválido
            }
        } catch (error) {
            console.error('Error de conexión al obtener servidores:', error);
        }
    }

    function renderServers(servers) {
        serversTableBody.innerHTML = ''; // Limpiar tabla
        if (servers.length === 0) {
            serversTableBody.innerHTML = '<tr><td colspan="5" class="px-6 py-4 text-center text-gray-500">No tienes servidores registrados.</td></tr>';
            return;
        }

        servers.forEach(server => {
            const row = document.createElement('tr');
            const statusClass = server.status === 'online' ? 'status-online' : 'status-offline';
            const statusText = server.status === 'online' ? 'En Línea' : 'Apagado';

            row.innerHTML = `
                <td class="px-6 py-4 whitespace-nowrap">
                    <div class="flex items-center">
                        <div class="flex-shrink-0 h-10 w-10 rounded-full bg-blue-500 flex items-center justify-center">
                            <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 12h14M5 12a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v4a2 2 0 01-2 2M5 12a2 2 0 00-2 2v4a2 2 0 002 2h14a2 2 0 002-2v-4a2 2 0 00-2-2m-2-4h.01M17 16h.01" />
                            </svg>
                        </div>
                        <div class="ml-4">
                            <div class="text-sm font-medium">${server.name}</div>
                            <div class="text-sm text-gray-400">ID: ${server.id}</div>
                        </div>
                    </div>
                </td>
                <td class="px-6 py-4 whitespace-nowrap">
                    <span class="${statusClass} px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full">${statusText}</span>
                </td>
                <td class="px-6 py-4 whitespace-nowrap">
                    <div class="text-sm">N/A</div>
                    <div class="w-full bg-gray-700 rounded-full h-2 mt-1">
                        <div class="bg-blue-500 h-2 rounded-full" style="width: 0%"></div>
                    </div>
                </td>
                <td class="px-6 py-4 whitespace-nowrap">
                    <div class="text-sm">N/A</div>
                    <div class="w-full bg-gray-700 rounded-full h-2 mt-1">
                        <div class="bg-purple-500 h-2 rounded-full" style="width: 0%"></div>
                    </div>
                </td>
                <td class="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <button class="text-blue-500 hover:text-blue-700 mr-3" onclick="alert('Administrar ${server.name}')">Administrar</button>
                    <button class="text-gray-400 hover:text-gray-200" onclick="alert('Detalles de ${server.name}')">Detalles</button>
                </td>
            `;
            serversTableBody.appendChild(row);
        });
    }

    // --- Gráficos de Uso de Recursos --- //
    const cpuCtx = document.getElementById('cpuChart').getContext('2d');
    const cpuChart = new Chart(cpuCtx, {
        type: 'line',
        data: {
            labels: [], // Se llenará con timestamps
            datasets: [{
                label: 'CPU Usage (%)',
                data: [], // Se llenará con datos
                borderColor: '#9f7aea',
                backgroundColor: 'rgba(159, 122, 234, 0.1)',
                fill: true,
                tension: 0.4
            }]
        },
        options: {
            responsive: true,
            plugins: {
                legend: {
                    position: 'top',
                    labels: {
                        color: '#e2e8f0'
                    }
                }
            },
            scales: {
                y: {
                    beginAtZero: true,
                    max: 100,
                    grid: {
                        color: 'rgba(255, 255, 255, 0.1)'
                    },
                    ticks: {
                        color: '#e2e8f0'
                    }
                },
                x: {
                    grid: {
                        color: 'rgba(255, 255, 255, 0.1)'
                    },
                    ticks: {
                        color: '#e2e8f0'
                    }
                }
            }
        }
    });

    const ramCtx = document.getElementById('ramChart').getContext('2d');
    const ramChart = new Chart(ramCtx, {
        type: 'line',
        data: {
            labels: [], // Se llenará con timestamps
            datasets: [{
                label: 'RAM Usage (GB)',
                data: [], // Se llenará con datos
                borderColor: '#4299e1',
                backgroundColor: 'rgba(66, 153, 225, 0.1)',
                fill: true,
                tension: 0.4
            }]
        },
        options: {
            responsive: true,
            plugins: {
                legend: {
                    position: 'top',
                    labels: {
                        color: '#e2e8f0'
                    }
                }
            },
            scales: {
                y: {
                    beginAtZero: true,
                    grid: {
                        color: 'rgba(255, 255, 255, 0.1)'
                    },
                    ticks: {
                        color: '#e2e8f0'
                    }
                },
                x: {
                    grid: {
                        color: 'rgba(255, 255, 255, 0.1)'
                    },
                    ticks: {
                        color: '#e2e8f0'
                    }
                }
            }
        }
    });

    function updateChart(chart, newData, label) {
        const now = new Date().toLocaleTimeString();
        chart.data.labels.push(now);
        chart.data.datasets[0].data.push(newData);

        // Mantener solo los últimos 20 puntos de datos
        const maxDataPoints = 20;
        if (chart.data.labels.length > maxDataPoints) {
            chart.data.labels.shift();
            chart.data.datasets[0].data.shift();
        }
        chart.update();
    }

    function addRecentInteraction(interaction) {
        const recentInteractionsContainer = document.getElementById('recent-interactions');
        const interactionDiv = document.createElement('div');
        const bgColorClass = interaction.from === 'bot' ? 'bg-blue-500' : 'bg-gray-700';
        const textColorClass = interaction.from === 'bot' ? 'text-blue-100' : 'text-gray-400';

        interactionDiv.className = `${bgColorClass} rounded-lg p-3`;
        interactionDiv.innerHTML = `
            <div class="text-sm ${textColorClass} mb-1">${interaction.sender} - ${interaction.time}</div>
            <div>${interaction.message}</div>
        `;
        recentInteractionsContainer.prepend(interactionDiv); // Añadir al principio

        // Limitar el número de interacciones mostradas
        const maxInteractions = 10;
        while (recentInteractionsContainer.children.length > maxInteractions) {
            recentInteractionsContainer.removeChild(recentInteractionsContainer.lastChild);
        }
    }

    // --- Event Listeners --- //
    loginFormElement.addEventListener('submit', handleLogin);
    registerFormElement.addEventListener('submit', handleRegister);
    forgotPasswordFormElement.addEventListener('submit', handleForgotPassword);
    validateResetCodeFormElement.addEventListener('submit', handleValidateResetCode);

    registerLink.addEventListener('click', () => showForm(registerForm));
    backToLoginLink.addEventListener('click', () => showForm(loginForm));
    forgotPasswordLink.addEventListener('click', () => showForm(forgotPasswordForm));
    backToLoginFromFpLink.addEventListener('click', () => showForm(loginForm));
    backToLoginFromVrcLink.addEventListener('click', () => showForm(loginForm));
    logoutButton.addEventListener('click', handleLogout);

    generateNewQrButton.addEventListener('click', () => {
        if (ws && ws.readyState === WebSocket.OPEN) {
            ws.send(JSON.stringify({ type: 'generate_qr' }));
            qrMessage.textContent = 'Generando nuevo QR...';
        } else {
            alert('No se pudo conectar al WebSocket. Intente recargar la página.');
        }
    });

    // --- Inicialización --- //
    const token = getToken();
    if (token) {
        // Validar token con el backend si es necesario, o asumir que es válido por ahora
        showDashboard();
    } else {
        showForm(loginForm);
    }
});