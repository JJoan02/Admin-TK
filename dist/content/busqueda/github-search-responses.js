export const GITHUB_SEARCH_NO_TEXT = (usedPrefix, command) => `🚩 *Ingrese el nombre de un repositorio de github*\n\nEjemplo, ${usedPrefix + command} Megumin-Bot-MD`;
export const GITHUB_SEARCH_NO_RESULTS = (text) => `🚩 *No se encontró resultados de:* ${text}`;
export const GITHUB_SEARCH_ERROR = "*Ocurrió un fallo al buscar en GitHub.*";
export const GITHUB_SEARCH_RESULT_HEADER = "🍟 G I T H U B - S E A R C H 🍟";
export const GITHUB_SEARCH_RESULT_ITEM = (index, repo) => `
🍟 *Resultado:* ${1 + index}
🔗 *Enlace:* ${repo.html_url}
👑 *Creador:* ${repo.owner.login}
🍟 *Nombre:* ${repo.name}
🫂 *Creado:* ${formatDate(repo.created_at)}
💥 *Actualizado:* ${formatDate(repo.updated_at)}
👀 *Visitas:* ${repo.watchers}
✨️ *Bifurcado:* ${repo.forks}
🌟 *Estrellas:* ${repo.stargazers_count}
🍂 *Issues:* ${repo.open_issues}
🍭 *Descripción:* ${repo.description ? `${repo.description}` : 'Sin Descripción'}
⭐️ *Clone:* ${repo.clone_url}
`;
function formatDate(n, locale = 'es') {
    const d = new Date(n);
    return d.toLocaleDateString(locale, { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric', hour: 'numeric', minute: 'numeric', second: 'numeric' });
}
//# sourceMappingURL=github-search-responses.js.map