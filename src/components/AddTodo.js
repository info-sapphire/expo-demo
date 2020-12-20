import React, { useState } from 'react'
import { View, TextInput, Button, Alert, StyleSheet } from 'react-native'

export const AddTodo = ({ onSubmit }) => {
  const [value, setValue] = useState('')

  const pressHandler = () => {
    if (value.trim()) {
      onSubmit(value)
      setValue('')
    } else {
      Alert.alert('Название не должно быть пустым')
    }
  }

  return (
    <View style={styles.wrapper}>
      <TextInput
        style={styles.input}
        onChangeText={setValue}
        value={value}
        placeholder="Введите название"
        autoCorrect={false}
        autoCapitalize="none"
      />
      <Button title="Добавить" onPress={pressHandler} />
    </View>
  )
}

const styles = StyleSheet.create({
  wrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 15
  },

  input: {
    flex: 1,
    borderStyle: 'solid',
    borderBottomWidth: 2,
    borderBottomColor: '#3949ab',
    paddingBottom: 10,
    paddingTop: 10
  }
})
