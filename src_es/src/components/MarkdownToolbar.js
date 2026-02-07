import React from 'react';
import { View, TouchableOpacity, Text, StyleSheet, ScrollView } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';

const MarkdownToolbar = ({ alInsertar }) => {
  const herramientas = [
    { id: 'h1', icono: 'title', etiqueta: 'H1', insertar: '# ' },
    { id: 'h2', icono: 'title', etiqueta: 'H2', insertar: '## ' },
    { id: 'negrita', icono: 'format-bold', etiqueta: '**', insertar: '****', desplazamiento: -2 },
    { id: 'italica', icono: 'format-italic', etiqueta: '*', insertar: '**', desplazamiento: -1 },
    { id: 'lista', icono: 'format-list-bulleted', etiqueta: '•', insertar: '- ' },
    { id: 'numero', icono: 'format-list-numbered', etiqueta: '1.', insertar: '1. ' },
    { id: 'check', icono: 'check-box', etiqueta: '✓', insertar: '- [ ] ' },
    { id: 'cita', icono: 'format-quote', etiqueta: '>', insertar: '> ' },
    { id: 'codigo', icono: 'code', etiqueta: '<>', insertar: '``', desplazamiento: -1 },
    { id: 'enlace', icono: 'insert-link', etiqueta: '🔗', insertar: '[texto](url)' },
  ];

  return (
    <View style={estilos.contenedor}>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={estilos.contenidoScroll}>
        {herramientas.map(herramienta => (
          <TouchableOpacity
            key={herramienta.id}
            style={estilos.botonHerramienta}
            onPress={() => alInsertar(herramienta.insertar, herramienta.desplazamiento)}>
            {herramienta.icono ? (
              <Icon name={herramienta.icono} size={20} color="#34495E" />
            ) : (
              <Text style={estilos.etiquetaHerramienta}>{herramienta.etiqueta}</Text>
            )}
          </TouchableOpacity>
        ))}
      </ScrollView>
    </View>
  );
};

const estilos = StyleSheet.create({
  contenedor: {
    borderTopWidth: 1,
    borderTopColor: '#ECF0F1',
    backgroundColor: '#F8F9FA',
    paddingVertical: 8,
  },
  contenidoScroll: {
    paddingHorizontal: 8,
  },
  botonHerramienta: {
    width: 44,
    height: 44,
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: 4,
    borderRadius: 6,
    backgroundColor: '#FFFFFF',
  },
  etiquetaHerramienta: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#34495E',
  },
});

export default MarkdownToolbar;
