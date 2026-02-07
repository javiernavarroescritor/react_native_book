import React, { useState, useEffect, useRef } from 'react';
import {
  View,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  Alert,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import { useNotes } from '../context/NotesContext';
import MarkdownToolbar from '../components/MarkdownToolbar';
import MarkdownPreview from '../components/MarkdownPreview';
import Icon from 'react-native-vector-icons/MaterialIcons';

const EditorScreen = ({ route, navigation }) => {
  const { notaId } = route.params || {};
  const { crearNota, actualizarNota, obtenerNota } = useNotes();
  
  const [titulo, setTitulo] = useState('');
  const [contenido, setContenido] = useState('');
  const [hayCambios, setHayCambios] = useState(false);
  const [mostrarVistaPrevia, setMostrarVistaPrevia] = useState(false);
  
  const inputContenidoRef = useRef(null);
  const [inicioSeleccion, setInicioSeleccion] = useState(0);

  useEffect(() => {
    if (notaId) {
      const nota = obtenerNota(notaId);
      if (nota) {
        setTitulo(nota.titulo);
        setContenido(nota.contenido);
      }
    }
  }, [notaId]);

  useEffect(() => {
    navigation.setOptions({
      title: notaId ? 'Editar Nota' : 'Nueva Nota',
      headerLeft: () => (
        <TouchableOpacity onPress={manejarVolver} style={estilos.botonHeader}>
          <Icon name="arrow-back" size={24} color="#FFFFFF" />
        </TouchableOpacity>
      ),
      headerRight: () => (
        <View style={estilos.botonesDerechaHeader}>
          <TouchableOpacity
            onPress={() => setMostrarVistaPrevia(!mostrarVistaPrevia)}
            style={estilos.botonHeader}>
            <Icon
              name={mostrarVistaPrevia ? 'edit' : 'visibility'}
              size={24}
              color="#FFFFFF"
            />
          </TouchableOpacity>
          <TouchableOpacity onPress={manejarGuardar} style={estilos.botonHeader}>
            <Icon name="save" size={24} color="#FFFFFF" />
          </TouchableOpacity>
        </View>
      ),
    });
  }, [navigation, notaId, titulo, contenido, hayCambios, mostrarVistaPrevia]);

  useEffect(() => {
    if (notaId) {
      const nota = obtenerNota(notaId);
      if (nota) {
        setHayCambios(titulo !== nota.titulo || contenido !== nota.contenido);
      }
    } else {
      setHayCambios(titulo.length > 0 || contenido.length > 0);
    }
  }, [titulo, contenido, notaId]);

  const manejarVolver = () => {
    if (hayCambios) {
      Alert.alert(
        'Cambios sin guardar',
        '¿Deseas descartar los cambios?',
        [
          { text: 'Cancelar', style: 'cancel' },
          {
            text: 'Descartar',
            style: 'destructive',
            onPress: () => navigation.goBack(),
          },
        ]
      );
    } else {
      navigation.goBack();
    }
  };

  const manejarGuardar = () => {
    if (!titulo.trim()) {
      Alert.alert('Error', 'Por favor ingresa un título para la nota');
      return;
    }

    if (!contenido.trim()) {
      Alert.alert('Error', 'La nota no puede estar vacía');
      return;
    }

    try {
      if (notaId) {
        actualizarNota(notaId, titulo.trim(), contenido.trim());
      } else {
        crearNota(titulo.trim(), contenido.trim());
      }
      navigation.goBack();
    } catch (error) {
      Alert.alert('Error', 'No se pudo guardar la nota');
    }
  };

  const manejarInsertarMarkdown = (markdown, desplazamiento = 0) => {
    const antes = contenido.substring(0, inicioSeleccion);
    const despues = contenido.substring(inicioSeleccion);
    const nuevoContenido = antes + markdown + despues;
    const nuevaPosicion = inicioSeleccion + markdown.length + desplazamiento;
    
    setContenido(nuevoContenido);
    
    // Enfocar y posicionar cursor
    setTimeout(() => {
      inputContenidoRef.current?.focus();
      inputContenidoRef.current?.setNativeProps({
        selection: { start: nuevaPosicion, end: nuevaPosicion },
      });
    }, 100);
  };

  return (
    <KeyboardAvoidingView
      style={estilos.contenedor}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      keyboardVerticalOffset={Platform.OS === 'ios' ? 90 : 0}>
      {!mostrarVistaPrevia ? (
        <>
          <TextInput
            style={estilos.inputTitulo}
            placeholder="Título de la nota"
            value={titulo}
            onChangeText={setTitulo}
            placeholderTextColor="#95A5A6"
            autoFocus={!notaId}
          />
          
          <View style={estilos.divisor} />
          
          <TextInput
            ref={inputContenidoRef}
            style={estilos.inputContenido}
            placeholder="Escribe tu nota en Markdown..."
            value={contenido}
            onChangeText={setContenido}
            onSelectionChange={(e) => setInicioSeleccion(e.nativeEvent.selection.start)}
            multiline
            textAlignVertical="top"
            placeholderTextColor="#95A5A6"
          />
          
          <MarkdownToolbar alInsertar={manejarInsertarMarkdown} />
        </>
      ) : (
        <MarkdownPreview contenido={contenido} />
      )}
    </KeyboardAvoidingView>
  );
};

const estilos = StyleSheet.create({
  contenedor: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  inputTitulo: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#2C3E50',
    padding: 20,
    paddingBottom: 10,
  },
  divisor: {
    height: 1,
    backgroundColor: '#ECF0F1',
    marginHorizontal: 20,
  },
  inputContenido: {
    flex: 1,
    fontSize: 16,
    color: '#2C3E50',
    padding: 20,
    paddingTop: 20,
    lineHeight: 24,
  },
  botonHeader: {
    padding: 8,
    marginHorizontal: 4,
  },
  botonesDerechaHeader: {
    flexDirection: 'row',
    marginRight: 8,
  },
});

export default EditorScreen;
