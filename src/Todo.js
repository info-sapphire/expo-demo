import React from 'react'
import { View, Text, StyleSheet } from 'react-native'

export const Todo = ({ todo }) => {
  return (
    <View style={styles.wrapper}>
      <Text>{todo.title}</Text>
    </View>
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
