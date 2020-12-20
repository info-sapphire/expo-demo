import React from 'react'
import { View, Text, Button, StyleSheet } from 'react-native'
import { AppCard } from '../components/uikit/AppCard'
import { THEME } from '../theme'

export const TodoScreen = ({ goBack, todo, onRemove }) => {
  return (
    <View style={styles.wrapper}>
      <AppCard style={styles.card}>
        <Text style={styles.text}>{todo.title}</Text>
        <Button title="Редактировать" />
      </AppCard>

      <View style={styles.buttons}>
        <View style={styles.button}>
          <Button title="Назад" color={THEME.GRAY_COLOR} onPress={goBack} />
        </View>
        <View style={styles.button}>
          <Button
            title="Удалить"
            color={THEME.DANGER_COLOR}
            onPress={() => onRemove(todo.id)}
          />
        </View>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  wrapper: {},

  card: {
    marginBottom: 20,
    padding: 15
  },

  text: {},

  button: {
    flex: 1
  },

  buttons: {
    flexDirection: 'row',
    justifyContent: 'space-between'
  }
})
