#!/usr/bin/env node
/**
 * Script de migración para convertir archivos JavaScript a TypeScript
 * Este script renombra archivos .js a .ts y añade tipos básicos
 */

const fs = require('fs');
const path = require('path');

const ROOT_DIR = __dirname;
const EXCLUDE_DIRS = ['node_modules', 'dist', 'coverage', '.git'];
const EXCLUDE_FILES = ['package.json', 'package-lock.json', 'migrate-to-ts.js'];

function shouldProcessFile(filePath) {
  const ext = path.extname(filePath);
  const basename = path.basename(filePath);
  
  return ext === '.js' && 
         !EXCLUDE_FILES.includes(basename) &&
         !filePath.includes('node_modules') &&
         !filePath.includes('dist') &&
         !filePath.includes('coverage');
}

function addBasicTypes(filePath) {
  const content = fs.readFileSync(filePath, 'utf8');
  const tsContent = content
    .replace(/require\(/g, 'import(')
    .replace(/module\.exports\s*=\s*/g, 'export default ')
    .replace(/exports\.(\w+)\s*=\s*/g, 'export const $1 = ')
    .replace(/const\s+(\w+)\s*=\s*require\(['"]([^'"]+)['"]\)/g, 'import $1 from \'$2\'')
    .replace(/const\s*{([^}]+)}\s*=\s*require\(['"]([^'"]+)['"]\)/g, 'import { $1 } from \'$2\'');
  
  return tsContent;
}

function migrateFile(jsFilePath) {
  const tsFilePath = jsFilePath.replace(/\.js$/, '.ts');
  
  console.log(`Migrando: ${jsFilePath} -> ${tsFilePath}`);
  
  try {
    const tsContent = addBasicTypes(jsFilePath);
    fs.writeFileSync(tsFilePath, tsContent);
    fs.unlinkSync(jsFilePath);
    console.log(`✓ Migrado exitosamente`);
  } catch (error) {
    console.error(`✗ Error al migrar ${jsFilePath}:`, error.message);
  }
}

function findAndMigrateFiles(dir) {
  const files = fs.readdirSync(dir);
  
  for (const file of files) {
    const filePath = path.join(dir, file);
    const stat = fs.statSync(filePath);
    
    if (stat.isDirectory() && !EXCLUDE_DIRS.includes(file)) {
      findAndMigrateFiles(filePath);
    } else if (stat.isFile() && shouldProcessFile(filePath)) {
      migrateFile(filePath);
    }
  }
}

console.log('🚀 Iniciando migración de JavaScript a TypeScript...');
findAndMigrateFiles(ROOT_DIR);
console.log('✅ Migración completada!');
