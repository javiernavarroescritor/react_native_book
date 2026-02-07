/**
 * Formatea una fecha en formato legible en español
 * @param {string|Date} fecha - Fecha a formatear
 * @returns {string} Fecha formateada
 */
export const formatearFecha = (fecha) => {
  if (!fecha) return '';
  
  const fechaObj = new Date(fecha);
  return fechaObj.toLocaleDateString('es-ES', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
  });
};

/**
 * Obtiene el tiempo relativo desde una fecha (ej: "Hace 2 horas")
 * @param {string|Date} fecha - Fecha a comparar
 * @returns {string} Tiempo relativo
 */
export const obtenerTiempoRelativo = (fecha) => {
  if (!fecha) return '';
  
  const ahora = new Date();
  const diferencia = ahora - new Date(fecha);
  const segundos = Math.floor(diferencia / 1000);
  const minutos = Math.floor(segundos / 60);
  const horas = Math.floor(minutos / 60);
  const dias = Math.floor(horas / 24);
  
  if (dias > 0) return `Hace ${dias} ${dias === 1 ? 'día' : 'días'}`;
  if (horas > 0) return `Hace ${horas} ${horas === 1 ? 'hora' : 'horas'}`;
  if (minutos > 0) return `Hace ${minutos} ${minutos === 1 ? 'minuto' : 'minutos'}`;
  return 'Ahora';
};

/**
 * Formatea una fecha y hora completa
 * @param {string|Date} fecha - Fecha a formatear
 * @returns {string} Fecha y hora formateada
 */
export const formatearFechaHora = (fecha) => {
  if (!fecha) return '';
  
  const fechaObj = new Date(fecha);
  return fechaObj.toLocaleString('es-ES', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  });
};
