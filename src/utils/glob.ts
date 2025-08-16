import { glob } from 'glob';
import { promisify } from 'util';

const globPromise = promisify(glob);

/**
 * Busca archivos en el sistema de archivos utilizando patrones glob.
 * @param {string} pattern - El patrón glob a buscar.
 * @param {object} [options] - Opciones para la búsqueda glob.
 * @returns {Promise<string[]>} Una promesa que se resuelve con una lista de rutas de archivo.
 */
export async function findFiles(pattern, options): void {
  try {
    const files = await globPromise(pattern, options);
    return files;
  } catch (error) {
    console.error('Error al buscar archivos:', error);
    throw error;
  }
}
