import React from 'react'
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native'

export const Todo = ({ todo, onRemove }) => {
  return (
    <TouchableOpacity 
      activeOpacity={0.5} 
      style={styles.wrapper}
      onPress={() => console.log('Pressed: ', todo.id)}
      onLongPress={() => onRemove(todo.id)}
    >
      <Text>{todo.title}</Text>
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  wrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 15,
    borderWidth: 1,
    borderColor: '#eee',
    borderRadius: 5,
    marginBottom: 10
  }
})
