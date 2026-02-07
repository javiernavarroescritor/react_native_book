import RNFS from 'react-native-fs';
import Share from 'react-native-share';
import { Platform, PermissionsAndroid } from 'react-native';

class FileService {
  constructor() {
    this.notesDirectory = `${RNFS.DocumentDirectoryPath}/notes`;
    this.ensureDirectoryExists();
  }

  async ensureDirectoryExists() {
    try {
      const exists = await RNFS.exists(this.notesDirectory);
      if (!exists) {
        await RNFS.mkdir(this.notesDirectory);
      }
    } catch (error) {
      console.error('Error creating directory:', error);
    }
  }

  sanitizeFilename(filename) {
    // Remove invalid characters
    return filename
      .replace(/[^a-z0-9\s-]/gi, '')
      .replace(/\s+/g, '-')
      .toLowerCase()
      .substring(0, 50);
  }

  async saveNoteAsFile(note) {
    try {
      await this.ensureDirectoryExists();
      
      const filename = this.sanitizeFilename(note.title);
      const filepath = `${this.notesDirectory}/${filename}-${note.id}.md`;
      
      const markdown = `# ${note.title}\n\n${note.content}\n\n---\n\n*Created: ${new Date(note.createdAt).toLocaleDateString('en-US')}*\n*Modified: ${new Date(note.updatedAt).toLocaleDateString('en-US')}*`;
      
      await RNFS.writeFile(filepath, markdown, 'utf8');
      
      return filepath;
    } catch (error) {
      console.error('Error saving file:', error);
      throw new Error('Could not save file');
    }
  }

  async exportNote(note) {
    try {
      const filepath = await this.saveNoteAsFile(note);
      
      await Share.open({
        title: `Export ${note.title}`,
        url: `file://${filepath}`,
        type: 'text/markdown',
        subject: note.title,
        message: note.title,
      });
      
      return true;
    } catch (error) {
      if (error.message !== 'User did not share') {
        console.error('Error exporting:', error);
        throw error;
      }
      return false;
    }
  }

  async exportAllNotes(notes) {
    try {
      await this.ensureDirectoryExists();
      
      // Save all notes
      const promises = notes.map(note => this.saveNoteAsFile(note));
      await Promise.all(promises);
      
      // Share complete folder
      await Share.open({
        title: 'Export all notes',
        url: `file://${this.notesDirectory}`,
      });
      
      return true;
    } catch (error) {
      console.error('Error exporting notes:', error);
      throw error;
    }
  }

  async importNoteFromFile(filepath) {
    try {
      const content = await RNFS.readFile(filepath, 'utf8');
      
      // Extract title (first line with #)
      const lines = content.split('\n');
      const titleLine = lines.find(line => line.startsWith('# '));
      const title = titleLine ? titleLine.substring(2).trim() : 'Imported note';
      
      // Extract content (everything except metadata at the end)
      const separatorIndex = content.lastIndexOf('\n\n---\n');
      const noteContent = separatorIndex > 0 
        ? content.substring(0, separatorIndex).replace(/^#\s+.*\n\n/, '')
        : content.replace(/^#\s+.*\n\n/, '');
      
      return {
        title,
        content: noteContent.trim(),
      };
    } catch (error) {
      console.error('Error importing file:', error);
      throw new Error('Could not read file');
    }
  }

  async listSavedNotes() {
    try {
      await this.ensureDirectoryExists();
      const files = await RNFS.readDir(this.notesDirectory);
      
      return files
        .filter(file => file.name.endsWith('.md') && file.isFile())
        .map(file => ({
          name: file.name,
          path: file.path,
          size: file.size,
          modifiedAt: file.mtime,
        }));
    } catch (error) {
      console.error('Error listing files:', error);
      return [];
    }
  }

  async deleteNoteFile(filepath) {
    try {
      const exists = await RNFS.exists(filepath);
      if (exists) {
        await RNFS.unlink(filepath);
      }
    } catch (error) {
      console.error('Error deleting file:', error);
    }
  }

  async requestStoragePermission() {
    if (Platform.OS === 'android' && Platform.Version >= 23) {
      try {
        const granted = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
          {
            title: 'Storage Permission',
            message: 'The app needs storage access to save notes',
            buttonPositive: 'OK',
            buttonNegative: 'Cancel',
          }
        );
        return granted === PermissionsAndroid.RESULTS.GRANTED;
      } catch (error) {
        console.error('Error requesting permission:', error);
        return false;
      }
    }
    return true;
  }
}

export default new FileService();
