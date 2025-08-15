// config/pluginConfig.js

export default {
  loadPlugins: process.env.LOAD_PLUGINS === 'true', // Configurable desde el entorno

  // Documentación adicional:
  // - loadPlugins: Si está en true, se habilita la carga dinámica de plugins.
  // - Asegúrate de que los plugins sean seguros y estén actualizados.
  
  // Puedes agregar más configuraciones relacionadas con los plugins aquí si es necesario.
  // Por ejemplo, puedes definir un tiempo de espera para la carga de plugins o un directorio específico.
  pluginLoadTimeout: parseInt(process.env.PLUGIN_LOAD_TIMEOUT, 10) || 5000, // Tiempo de espera en milisegundos
  pluginDirectory: process.env.PLUGIN_DIRECTORY || './src/plugins', // Directorio donde se encuentran los plugins
};
