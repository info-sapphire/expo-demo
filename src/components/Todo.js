import React from 'react'
import { StyleSheet, TouchableOpacity } from 'react-native'

import { AppText } from './uikit/AppText'

export const Todo = ({ todo, onRemove, onOpen }) => {
  return (
    <TouchableOpacity 
      activeOpacity={0.5} 
      style={styles.wrapper}
      onPress={() => onOpen(todo.id)}
      onLongPress={() => onRemove(todo.id)}
    >
      <AppText style={styles.title}>{todo.title}</AppText>
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
  },

  title: {
    fontFamily: 'roboto-bold'
  }
})
