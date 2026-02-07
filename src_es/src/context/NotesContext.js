import React, { createContext, useState, useEffect, useContext } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import servicioArchivos from '../services/fileService';

const NotesContext = createContext();

export const NotesProvider = ({ children }) => {
  const [notas, setNotas] = useState([]);
  const [cargando, setCargando] = useState(true);

  useEffect(() => {
    cargarNotas();
  }, []);

  useEffect(() => {
    if (!cargando) {
      guardarNotas();
    }
  }, [notas]);

  const cargarNotas = async () => {
    try {
      const almacenadas = await AsyncStorage.getItem('notas');
      if (almacenadas) {
        setNotas(JSON.parse(almacenadas));
      }
    } catch (error) {
      console.error('Error cargando notas:', error);
    } finally {
      setCargando(false);
    }
  };

  const guardarNotas = async () => {
    try {
      await AsyncStorage.setItem('notas', JSON.stringify(notas));
    } catch (error) {
      console.error('Error guardando notas:', error);
    }
  };

  const crearNota = (titulo, contenido) => {
    const nuevaNota = {
      id: Date.now().toString(),
      titulo,
      contenido,
      creadoEn: new Date().toISOString(),
      actualizadoEn: new Date().toISOString(),
    };
    setNotas(prev => [nuevaNota, ...prev]);
    return nuevaNota;
  };

  const actualizarNota = (id, titulo, contenido) => {
    setNotas(prev =>
      prev.map(nota =>
        nota.id === id
          ? { ...nota, titulo, contenido, actualizadoEn: new Date().toISOString() }
          : nota
      )
    );
  };

  const eliminarNota = async (id) => {
    const nota = notas.find(n => n.id === id);
    if (nota) {
      // Eliminar archivo si existe
      try {
        const nombreArchivo = servicioArchivos.sanitizarNombreArchivo(nota.titulo);
        const rutaArchivo = `${servicioArchivos.directorioNotas}/${nombreArchivo}-${nota.id}.md`;
        await servicioArchivos.eliminarArchivoNota(rutaArchivo);
      } catch (error) {
        console.log('No se pudo eliminar el archivo:', error);
      }
    }
    setNotas(prev => prev.filter(nota => nota.id !== id));
  };

  const obtenerNota = (id) => {
    return notas.find(nota => nota.id === id);
  };

  const exportarNota = async (id) => {
    const nota = obtenerNota(id);
    if (nota) {
      return await servicioArchivos.exportarNota(nota);
    }
    throw new Error('Nota no encontrada');
  };

  const exportarTodasLasNotas = async () => {
    return await servicioArchivos.exportarTodasLasNotas(notas);
  };

  const importarNota = async (rutaArchivo) => {
    const datosNota = await servicioArchivos.importarNotaDesdeArchivo(rutaArchivo);
    return crearNota(datosNota.titulo, datosNota.contenido);
  };

  return (
    <NotesContext.Provider
      value={{
        notas,
        cargando,
        crearNota,
        actualizarNota,
        eliminarNota,
        obtenerNota,
        exportarNota,
        exportarTodasLasNotas,
        importarNota,
      }}>
      {children}
    </NotesContext.Provider>
  );
};

export const useNotes = () => {
  const contexto = useContext(NotesContext);
  if (!contexto) {
    throw new Error('useNotes debe usarse dentro de NotesProvider');
  }
  return contexto;
};
