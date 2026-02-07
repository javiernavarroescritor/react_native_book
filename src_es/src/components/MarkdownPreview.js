import React from 'react';
import { ScrollView, StyleSheet, Platform } from 'react-native';
import Markdown from 'react-native-markdown-display';

const MarkdownPreview = ({ contenido }) => {
  return (
    <ScrollView style={estilos.contenedor}>
      <Markdown style={estilosMarkdown}>
        {contenido || '# Vista previa\n\nEl contenido aparecerá aquí...'}
      </Markdown>
    </ScrollView>
  );
};

const estilos = StyleSheet.create({
  contenedor: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    padding: 20,
  },
});

const estilosMarkdown = {
  body: {
    fontSize: 16,
    lineHeight: 24,
    color: '#2C3E50',
  },
  heading1: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#2C3E50',
    marginTop: 20,
    marginBottom: 10,
  },
  heading2: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#34495E',
    marginTop: 16,
    marginBottom: 8,
  },
  heading3: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#34495E',
    marginTop: 12,
    marginBottom: 6,
  },
  code_inline: {
    backgroundColor: '#F5F5F5',
    color: '#E74C3C',
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 4,
    fontFamily: Platform.OS === 'ios' ? 'Courier' : 'monospace',
  },
  code_block: {
    backgroundColor: '#F5F5F5',
    padding: 10,
    borderRadius: 6,
    fontFamily: Platform.OS === 'ios' ? 'Courier' : 'monospace',
  },
  fence: {
    backgroundColor: '#F5F5F5',
    padding: 10,
    borderRadius: 6,
    fontFamily: Platform.OS === 'ios' ? 'Courier' : 'monospace',
  },
  blockquote: {
    backgroundColor: '#ECF0F1',
    borderLeftWidth: 4,
    borderLeftColor: '#3498DB',
    paddingLeft: 16,
    paddingVertical: 8,
    marginVertical: 8,
  },
  list_item: {
    marginVertical: 4,
  },
  bullet_list: {
    marginVertical: 8,
  },
  ordered_list: {
    marginVertical: 8,
  },
  link: {
    color: '#3498DB',
    textDecorationLine: 'underline',
  },
  hr: {
    backgroundColor: '#ECF0F1',
    height: 2,
    marginVertical: 16,
  },
  strong: {
    fontWeight: 'bold',
  },
  em: {
    fontStyle: 'italic',
  },
};

export default MarkdownPreview;
