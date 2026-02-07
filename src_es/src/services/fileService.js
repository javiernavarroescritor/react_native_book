import RNFS from 'react-native-fs';
import Share from 'react-native-share';
import { Platform, PermissionsAndroid } from 'react-native';

class ServicioArchivos {
  constructor() {
    this.directorioNotas = `${RNFS.DocumentDirectoryPath}/notas`;
    this.asegurarDirectorioExiste();
  }

  async asegurarDirectorioExiste() {
    try {
      const existe = await RNFS.exists(this.directorioNotas);
      if (!existe) {
        await RNFS.mkdir(this.directorioNotas);
      }
    } catch (error) {
      console.error('Error creando directorio:', error);
    }
  }

  sanitizarNombreArchivo(nombreArchivo) {
    // Remover caracteres no válidos
    return nombreArchivo
      .replace(/[^a-z0-9áéíóúñü\s-]/gi, '')
      .replace(/\s+/g, '-')
      .toLowerCase()
      .substring(0, 50);
  }

  async guardarNotaComoArchivo(nota) {
    try {
      await this.asegurarDirectorioExiste();
      
      const nombreArchivo = this.sanitizarNombreArchivo(nota.titulo);
      const rutaArchivo = `${this.directorioNotas}/${nombreArchivo}-${nota.id}.md`;
      
      const markdown = `# ${nota.titulo}\n\n${nota.contenido}\n\n---\n\n*Creado: ${new Date(nota.creadoEn).toLocaleDateString('es-ES')}*\n*Modificado: ${new Date(nota.actualizadoEn).toLocaleDateString('es-ES')}*`;
      
      await RNFS.writeFile(rutaArchivo, markdown, 'utf8');
      
      return rutaArchivo;
    } catch (error) {
      console.error('Error guardando archivo:', error);
      throw new Error('No se pudo guardar el archivo');
    }
  }

  async exportarNota(nota) {
    try {
      const rutaArchivo = await this.guardarNotaComoArchivo(nota);
      
      await Share.open({
        title: `Exportar ${nota.titulo}`,
        url: `file://${rutaArchivo}`,
        type: 'text/markdown',
        subject: nota.titulo,
        message: nota.titulo,
      });
      
      return true;
    } catch (error) {
      if (error.message !== 'User did not share') {
        console.error('Error exportando:', error);
        throw error;
      }
      return false;
    }
  }

  async exportarTodasLasNotas(notas) {
    try {
      await this.asegurarDirectorioExiste();
      
      // Guardar todas las notas
      const promesas = notas.map(nota => this.guardarNotaComoArchivo(nota));
      await Promise.all(promesas);
      
      // Compartir carpeta completa
      await Share.open({
        title: 'Exportar todas las notas',
        url: `file://${this.directorioNotas}`,
      });
      
      return true;
    } catch (error) {
      console.error('Error exportando notas:', error);
      throw error;
    }
  }

  async importarNotaDesdeArchivo(rutaArchivo) {
    try {
      const contenido = await RNFS.readFile(rutaArchivo, 'utf8');
      
      // Extraer título (primera línea con #)
      const lineas = contenido.split('\n');
      const lineaTitulo = lineas.find(linea => linea.startsWith('# '));
      const titulo = lineaTitulo ? lineaTitulo.substring(2).trim() : 'Nota importada';
      
      // Extraer contenido (todo excepto metadatos al final)
      const indiceSeparador = contenido.lastIndexOf('\n\n---\n');
      const contenidoNota = indiceSeparador > 0 
        ? contenido.substring(0, indiceSeparador).replace(/^#\s+.*\n\n/, '')
        : contenido.replace(/^#\s+.*\n\n/, '');
      
      return {
        titulo,
        contenido: contenidoNota.trim(),
      };
    } catch (error) {
      console.error('Error importando archivo:', error);
      throw new Error('No se pudo leer el archivo');
    }
  }

  async listarNotasGuardadas() {
    try {
      await this.asegurarDirectorioExiste();
      const archivos = await RNFS.readDir(this.directorioNotas);
      
      return archivos
        .filter(archivo => archivo.name.endsWith('.md') && archivo.isFile())
        .map(archivo => ({
          nombre: archivo.name,
          ruta: archivo.path,
          tamano: archivo.size,
          modificadoEn: archivo.mtime,
        }));
    } catch (error) {
      console.error('Error listando archivos:', error);
      return [];
    }
  }

  async eliminarArchivoNota(rutaArchivo) {
    try {
      const existe = await RNFS.exists(rutaArchivo);
      if (existe) {
        await RNFS.unlink(rutaArchivo);
      }
    } catch (error) {
      console.error('Error eliminando archivo:', error);
    }
  }

  async solicitarPermisoAlmacenamiento() {
    if (Platform.OS === 'android' && Platform.Version >= 23) {
      try {
        const concedido = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
          {
            title: 'Permiso de Almacenamiento',
            message: 'La app necesita acceso al almacenamiento para guardar notas',
            buttonPositive: 'Aceptar',
            buttonNegative: 'Cancelar',
          }
        );
        return concedido === PermissionsAndroid.RESULTS.GRANTED;
      } catch (error) {
        console.error('Error solicitando permiso:', error);
        return false;
      }
    }
    return true;
  }
}

export default new ServicioArchivos();
