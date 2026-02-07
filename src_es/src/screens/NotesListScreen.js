import React, { useState } from 'react';
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  StyleSheet,
  Alert,
} from 'react-native';
import { useNotes } from '../context/NotesContext';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { Menu, IconButton } from 'react-native-paper';
import DocumentPicker from 'react-native-document-picker';

const NotesListScreen = ({ navigation }) => {
  const { notas, eliminarNota, exportarNota, exportarTodasLasNotas, importarNota } = useNotes();
  const [menuVisible, setMenuVisible] = useState(false);

  React.useEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <View style={estilos.botonesHeader}>
          <Menu
            visible={menuVisible}
            onDismiss={() => setMenuVisible(false)}
            anchor={
              <IconButton
                icon="more-vert"
                iconColor="#FFFFFF"
                onPress={() => setMenuVisible(true)}
              />
            }>
            <Menu.Item
              onPress={manejarExportarTodas}
              title="Exportar todas"
              leadingIcon="file-export"
            />
            <Menu.Item
              onPress={manejarImportar}
              title="Importar nota"
              leadingIcon="file-import"
            />
          </Menu>
          
          <IconButton
            icon="add"
            iconColor="#FFFFFF"
            onPress={() => navigation.navigate('Editor')}
          />
        </View>
      ),
    });
  }, [navigation, menuVisible]);

  const manejarExportarTodas = async () => {
    setMenuVisible(false);
    
    if (notas.length === 0) {
      Alert.alert('Sin notas', 'No hay notas para exportar');
      return;
    }

    try {
      await exportarTodasLasNotas();
    } catch (error) {
      Alert.alert('Error', 'No se pudieron exportar las notas');
    }
  };

  const manejarImportar = async () => {
    setMenuVisible(false);
    
    try {
      const resultado = await DocumentPicker.pick({
        type: [DocumentPicker.types.plainText, DocumentPicker.types.allFiles],
      });
      
      if (resultado && resultado[0]) {
        await importarNota(resultado[0].uri);
        Alert.alert('Éxito', 'Nota importada correctamente');
      }
    } catch (error) {
      if (!DocumentPicker.isCancel(error)) {
        Alert.alert('Error', 'No se pudo importar la nota');
      }
    }
  };

  const manejarEliminar = (id) => {
    Alert.alert(
      'Eliminar nota',
      '¿Estás seguro de que deseas eliminar esta nota?',
      [
        { text: 'Cancelar', style: 'cancel' },
        {
          text: 'Eliminar',
          style: 'destructive',
          onPress: () => eliminarNota(id),
        },
      ]
    );
  };

  const manejarExportar = async (id) => {
    try {
      await exportarNota(id);
    } catch (error) {
      Alert.alert('Error', 'No se pudo exportar la nota');
    }
  };

  const renderizarNota = ({ item }) => (
    <TouchableOpacity
      style={estilos.tarjetaNota}
      onPress={() => navigation.navigate('Editor', { notaId: item.id })}
      activeOpacity={0.7}>
      <View style={estilos.contenidoNota}>
        <Text style={estilos.tituloNota} numberOfLines={1}>
          {item.titulo}
        </Text>
        <Text style={estilos.vistaPrevia} numberOfLines={2}>
          {item.contenido}
        </Text>
        <Text style={estilos.fecha}>
          {new Date(item.actualizadoEn).toLocaleDateString('es-ES', {
            day: 'numeric',
            month: 'short',
            year: 'numeric',
          })}
        </Text>
      </View>
      
      <View style={estilos.accionesNota}>
        <TouchableOpacity
          onPress={() => manejarExportar(item.id)}
          style={estilos.botonAccion}>
          <Icon name="file-download" size={20} color="#3498DB" />
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => manejarEliminar(item.id)}
          style={estilos.botonAccion}>
          <Icon name="delete" size={20} color="#E74C3C" />
        </TouchableOpacity>
      </View>
    </TouchableOpacity>
  );

  if (notas.length === 0) {
    return (
      <View style={estilos.contenedorVacio}>
        <Icon name="note-add" size={80} color="#BDC3C7" />
        <Text style={estilos.textoVacio}>No hay notas</Text>
        <Text style={estilos.subtextoVacio}>
          Toca el botón + para crear tu primera nota
        </Text>
      </View>
    );
  }

  return (
    <View style={estilos.contenedor}>
      <FlatList
        data={notas}
        renderItem={renderizarNota}
        keyExtractor={item => item.id}
        contentContainerStyle={estilos.lista}
      />
    </View>
  );
};

const estilos = StyleSheet.create({
  contenedor: {
    flex: 1,
    backgroundColor: '#F8F9FA',
  },
  botonesHeader: {
    flexDirection: 'row',
    marginRight: 8,
  },
  lista: {
    padding: 16,
  },
  tarjetaNota: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    flexDirection: 'row',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  contenidoNota: {
    flex: 1,
  },
  tituloNota: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#2C3E50',
    marginBottom: 4,
  },
  vistaPrevia: {
    fontSize: 14,
    color: '#7F8C8D',
    marginBottom: 8,
  },
  fecha: {
    fontSize: 12,
    color: '#95A5A6',
  },
  accionesNota: {
    justifyContent: 'center',
    marginLeft: 8,
  },
  botonAccion: {
    padding: 8,
  },
  contenedorVacio: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F8F9FA',
  },
  textoVacio: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#7F8C8D',
    marginTop: 16,
  },
  subtextoVacio: {
    fontSize: 16,
    color: '#95A5A6',
    marginTop: 8,
    textAlign: 'center',
  },
});

export default NotesListScreen;
