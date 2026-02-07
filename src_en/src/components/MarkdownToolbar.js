import React from 'react';
import { View, TouchableOpacity, Text, StyleSheet, ScrollView } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';

const MarkdownToolbar = ({ onInsert }) => {
  const tools = [
    { id: 'h1', icon: 'title', label: 'H1', insert: '# ' },
    { id: 'h2', icon: 'title', label: 'H2', insert: '## ' },
    { id: 'bold', icon: 'format-bold', label: '**', insert: '****', offset: -2 },
    { id: 'italic', icon: 'format-italic', label: '*', insert: '**', offset: -1 },
    { id: 'list', icon: 'format-list-bulleted', label: '•', insert: '- ' },
    { id: 'number', icon: 'format-list-numbered', label: '1.', insert: '1. ' },
    { id: 'check', icon: 'check-box', label: '✓', insert: '- [ ] ' },
    { id: 'quote', icon: 'format-quote', label: '>', insert: '> ' },
    { id: 'code', icon: 'code', label: '<>', insert: '``', offset: -1 },
    { id: 'link', icon: 'insert-link', label: '🔗', insert: '[text](url)' },
  ];

  return (
    <View style={styles.container}>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}>
        {tools.map(tool => (
          <TouchableOpacity
            key={tool.id}
            style={styles.toolButton}
            onPress={() => onInsert(tool.insert, tool.offset)}>
            {tool.icon ? (
              <Icon name={tool.icon} size={20} color="#34495E" />
            ) : (
              <Text style={styles.toolLabel}>{tool.label}</Text>
            )}
          </TouchableOpacity>
        ))}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    borderTopWidth: 1,
    borderTopColor: '#ECF0F1',
    backgroundColor: '#F8F9FA',
    paddingVertical: 8,
  },
  scrollContent: {
    paddingHorizontal: 8,
  },
  toolButton: {
    width: 44,
    height: 44,
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: 4,
    borderRadius: 6,
    backgroundColor: '#FFFFFF',
  },
  toolLabel: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#34495E',
  },
});

export default MarkdownToolbar;
