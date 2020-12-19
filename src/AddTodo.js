import React from 'react'
import { View, TextInput, Button, StyleSheet } from 'react-native'

export const AddTodo = ({ onSubmit }) => {

  const pressHandler = () => {
    onSubmit('test todo')
  }

  return (
    <View style={styles.wrapper}>
      <TextInput style={styles.input} />
      <Button title="Добавить" onPress={pressHandler} />
    </View>
  )
}

const styles = StyleSheet.create({
  wrapper: {
    flexDirection: 'row',
    alignItems: 'center'
  },

  input: {
    flex: 1,
    borderStyle: 'solid',
    borderBottomWidth: 2,
    borderBottomColor: '#3949ab'
  }
})
