import React from 'react'
import { View, Text, Button, StyleSheet } from 'react-native'

export const TodoScreen = ({ goBack, todo }) => {
  return (
    <View style={styles.wrapper}>
      <Text>{todo.title}</Text>
      <Button title="Назад" onPress={goBack}  />
    </View>
  )
}

const styles = StyleSheet.create({
  wrapper: {}
})
