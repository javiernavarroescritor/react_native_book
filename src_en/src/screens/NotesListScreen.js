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
  const { notes, deleteNote, exportNote, exportAllNotes, importNote } = useNotes();
  const [menuVisible, setMenuVisible] = useState(false);

  React.useEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <View style={styles.headerButtons}>
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
              onPress={handleExportAll}
              title="Export all"
              leadingIcon="file-export"
            />
            <Menu.Item
              onPress={handleImport}
              title="Import note"
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

  const handleExportAll = async () => {
    setMenuVisible(false);
    
    if (notes.length === 0) {
      Alert.alert('No notes', 'There are no notes to export');
      return;
    }

    try {
      await exportAllNotes();
    } catch (error) {
      Alert.alert('Error', 'Could not export notes');
    }
  };

  const handleImport = async () => {
    setMenuVisible(false);
    
    try {
      const result = await DocumentPicker.pick({
        type: [DocumentPicker.types.plainText, DocumentPicker.types.allFiles],
      });
      
      if (result && result[0]) {
        await importNote(result[0].uri);
        Alert.alert('Success', 'Note imported successfully');
      }
    } catch (error) {
      if (!DocumentPicker.isCancel(error)) {
        Alert.alert('Error', 'Could not import note');
      }
    }
  };

  const handleDelete = (id) => {
    Alert.alert(
      'Delete note',
      'Are you sure you want to delete this note?',
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Delete',
          style: 'destructive',
          onPress: () => deleteNote(id),
        },
      ]
    );
  };

  const handleExport = async (id) => {
    try {
      await exportNote(id);
    } catch (error) {
      Alert.alert('Error', 'Could not export note');
    }
  };

  const renderNote = ({ item }) => (
    <TouchableOpacity
      style={styles.noteCard}
      onPress={() => navigation.navigate('Editor', { noteId: item.id })}
      activeOpacity={0.7}>
      <View style={styles.noteContent}>
        <Text style={styles.noteTitle} numberOfLines={1}>
          {item.title}
        </Text>
        <Text style={styles.notePreview} numberOfLines={2}>
          {item.content}
        </Text>
        <Text style={styles.noteDate}>
          {new Date(item.updatedAt).toLocaleDateString('en-US', {
            day: 'numeric',
            month: 'short',
            year: 'numeric',
          })}
        </Text>
      </View>
      
      <View style={styles.noteActions}>
        <TouchableOpacity
          onPress={() => handleExport(item.id)}
          style={styles.actionButton}>
          <Icon name="file-download" size={20} color="#3498DB" />
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => handleDelete(item.id)}
          style={styles.actionButton}>
          <Icon name="delete" size={20} color="#E74C3C" />
        </TouchableOpacity>
      </View>
    </TouchableOpacity>
  );

  if (notes.length === 0) {
    return (
      <View style={styles.emptyContainer}>
        <Icon name="note-add" size={80} color="#BDC3C7" />
        <Text style={styles.emptyText}>No notes</Text>
        <Text style={styles.emptySubtext}>
          Tap the + button to create your first note
        </Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <FlatList
        data={notes}
        renderItem={renderNote}
        keyExtractor={item => item.id}
        contentContainerStyle={styles.list}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8F9FA',
  },
  headerButtons: {
    flexDirection: 'row',
    marginRight: 8,
  },
  list: {
    padding: 16,
  },
  noteCard: {
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
  noteContent: {
    flex: 1,
  },
  noteTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#2C3E50',
    marginBottom: 4,
  },
  notePreview: {
    fontSize: 14,
    color: '#7F8C8D',
    marginBottom: 8,
  },
  noteDate: {
    fontSize: 12,
    color: '#95A5A6',
  },
  noteActions: {
    justifyContent: 'center',
    marginLeft: 8,
  },
  actionButton: {
    padding: 8,
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F8F9FA',
  },
  emptyText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#7F8C8D',
    marginTop: 16,
  },
  emptySubtext: {
    fontSize: 16,
    color: '#95A5A6',
    marginTop: 8,
    textAlign: 'center',
  },
});

export default NotesListScreen;
