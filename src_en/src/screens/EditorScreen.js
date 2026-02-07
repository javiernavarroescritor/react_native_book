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
  const { noteId } = route.params || {};
  const { createNote, updateNote, getNote } = useNotes();
  
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [hasChanges, setHasChanges] = useState(false);
  const [showPreview, setShowPreview] = useState(false);
  
  const contentInputRef = useRef(null);
  const [selectionStart, setSelectionStart] = useState(0);

  useEffect(() => {
    if (noteId) {
      const note = getNote(noteId);
      if (note) {
        setTitle(note.title);
        setContent(note.content);
      }
    }
  }, [noteId]);

  useEffect(() => {
    navigation.setOptions({
      title: noteId ? 'Edit Note' : 'New Note',
      headerLeft: () => (
        <TouchableOpacity onPress={handleBack} style={styles.headerButton}>
          <Icon name="arrow-back" size={24} color="#FFFFFF" />
        </TouchableOpacity>
      ),
      headerRight: () => (
        <View style={styles.headerRight}>
          <TouchableOpacity
            onPress={() => setShowPreview(!showPreview)}
            style={styles.headerButton}>
            <Icon
              name={showPreview ? 'edit' : 'visibility'}
              size={24}
              color="#FFFFFF"
            />
          </TouchableOpacity>
          <TouchableOpacity onPress={handleSave} style={styles.headerButton}>
            <Icon name="save" size={24} color="#FFFFFF" />
          </TouchableOpacity>
        </View>
      ),
    });
  }, [navigation, noteId, title, content, hasChanges, showPreview]);

  useEffect(() => {
    if (noteId) {
      const note = getNote(noteId);
      if (note) {
        setHasChanges(title !== note.title || content !== note.content);
      }
    } else {
      setHasChanges(title.length > 0 || content.length > 0);
    }
  }, [title, content, noteId]);

  const handleBack = () => {
    if (hasChanges) {
      Alert.alert(
        'Unsaved changes',
        'Do you want to discard changes?',
        [
          { text: 'Cancel', style: 'cancel' },
          {
            text: 'Discard',
            style: 'destructive',
            onPress: () => navigation.goBack(),
          },
        ]
      );
    } else {
      navigation.goBack();
    }
  };

  const handleSave = () => {
    if (!title.trim()) {
      Alert.alert('Error', 'Please enter a title for the note');
      return;
    }

    if (!content.trim()) {
      Alert.alert('Error', 'Note cannot be empty');
      return;
    }

    try {
      if (noteId) {
        updateNote(noteId, title.trim(), content.trim());
      } else {
        createNote(title.trim(), content.trim());
      }
      navigation.goBack();
    } catch (error) {
      Alert.alert('Error', 'Could not save note');
    }
  };

  const handleInsertMarkdown = (markdown, offset = 0) => {
    const before = content.substring(0, selectionStart);
    const after = content.substring(selectionStart);
    const newContent = before + markdown + after;
    const newPosition = selectionStart + markdown.length + offset;
    
    setContent(newContent);
    
    // Focus and position cursor
    setTimeout(() => {
      contentInputRef.current?.focus();
      contentInputRef.current?.setNativeProps({
        selection: { start: newPosition, end: newPosition },
      });
    }, 100);
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      keyboardVerticalOffset={Platform.OS === 'ios' ? 90 : 0}>
      {!showPreview ? (
        <>
          <TextInput
            style={styles.titleInput}
            placeholder="Note title"
            value={title}
            onChangeText={setTitle}
            placeholderTextColor="#95A5A6"
            autoFocus={!noteId}
          />
          
          <View style={styles.divider} />
          
          <TextInput
            ref={contentInputRef}
            style={styles.contentInput}
            placeholder="Write your note in Markdown..."
            value={content}
            onChangeText={setContent}
            onSelectionChange={(e) => setSelectionStart(e.nativeEvent.selection.start)}
            multiline
            textAlignVertical="top"
            placeholderTextColor="#95A5A6"
          />
          
          <MarkdownToolbar onInsert={handleInsertMarkdown} />
        </>
      ) : (
        <MarkdownPreview content={content} />
      )}
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  titleInput: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#2C3E50',
    padding: 20,
    paddingBottom: 10,
  },
  divider: {
    height: 1,
    backgroundColor: '#ECF0F1',
    marginHorizontal: 20,
  },
  contentInput: {
    flex: 1,
    fontSize: 16,
    color: '#2C3E50',
    padding: 20,
    paddingTop: 20,
    lineHeight: 24,
  },
  headerButton: {
    padding: 8,
    marginHorizontal: 4,
  },
  headerRight: {
    flexDirection: 'row',
    marginRight: 8,
  },
});

export default EditorScreen;
