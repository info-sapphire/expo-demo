import React from 'react'
import { View, Text, Button, StyleSheet } from 'react-native'
import { THEME } from '../theme'

export const TodoScreen = ({ goBack, todo }) => {
  return (
    <View style={styles.wrapper}>
      <Text>{todo.title}</Text>
      <View style={styles.buttons}>
        <View style={styles.button}>
          <Button title="Назад" color={THEME.GRAY_COLOR} onPress={goBack} />
        </View>
        <View style={styles.button}>
          <Button title="Удалить" color={THEME.DANGER_COLOR}  onPress={goBack} />
        </View>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  wrapper: {},

  button: {
    flex: 1
  },

  buttons: {
    flexDirection: 'row',
    justifyContent: 'space-between'
  }
})
