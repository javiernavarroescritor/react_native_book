import React, { createContext, useState, useEffect, useContext } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import fileService from '../services/fileService';

const NotesContext = createContext();

export const NotesProvider = ({ children }) => {
  const [notes, setNotes] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadNotes();
  }, []);

  useEffect(() => {
    if (!loading) {
      saveNotes();
    }
  }, [notes]);

  const loadNotes = async () => {
    try {
      const stored = await AsyncStorage.getItem('notes');
      if (stored) {
        setNotes(JSON.parse(stored));
      }
    } catch (error) {
      console.error('Error loading notes:', error);
    } finally {
      setLoading(false);
    }
  };

  const saveNotes = async () => {
    try {
      await AsyncStorage.setItem('notes', JSON.stringify(notes));
    } catch (error) {
      console.error('Error saving notes:', error);
    }
  };

  const createNote = (title, content) => {
    const newNote = {
      id: Date.now().toString(),
      title,
      content,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
    setNotes(prev => [newNote, ...prev]);
    return newNote;
  };

  const updateNote = (id, title, content) => {
    setNotes(prev =>
      prev.map(note =>
        note.id === id
          ? { ...note, title, content, updatedAt: new Date().toISOString() }
          : note
      )
    );
  };

  const deleteNote = async (id) => {
    const note = notes.find(n => n.id === id);
    if (note) {
      // Delete file if exists
      try {
        const filename = fileService.sanitizeFilename(note.title);
        const filepath = `${fileService.notesDirectory}/${filename}-${note.id}.md`;
        await fileService.deleteNoteFile(filepath);
      } catch (error) {
        console.log('Could not delete file:', error);
      }
    }
    setNotes(prev => prev.filter(note => note.id !== id));
  };

  const getNote = (id) => {
    return notes.find(note => note.id === id);
  };

  const exportNote = async (id) => {
    const note = getNote(id);
    if (note) {
      return await fileService.exportNote(note);
    }
    throw new Error('Note not found');
  };

  const exportAllNotes = async () => {
    return await fileService.exportAllNotes(notes);
  };

  const importNote = async (filepath) => {
    const noteData = await fileService.importNoteFromFile(filepath);
    return createNote(noteData.title, noteData.content);
  };

  return (
    <NotesContext.Provider
      value={{
        notes,
        loading,
        createNote,
        updateNote,
        deleteNote,
        getNote,
        exportNote,
        exportAllNotes,
        importNote,
      }}>
      {children}
    </NotesContext.Provider>
  );
};

export const useNotes = () => {
  const context = useContext(NotesContext);
  if (!context) {
    throw new Error('useNotes must be used within NotesProvider');
  }
  return context;
};
