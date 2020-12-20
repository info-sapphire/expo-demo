import React, { useState } from 'react'
import { View, Text, Button, StyleSheet } from 'react-native'
import { EditModal } from '../components/EditModal'
import { AppCard } from '../components/uikit/AppCard'
import { THEME } from '../theme'

export const TodoScreen = ({ goBack, todo, onRemove }) => {
  const [modal, setModal] = useState(false)

  return (
    <View style={styles.wrapper}>
      <EditModal visible={modal} onCancel={() => setModal(false)} />

      <AppCard style={styles.card}>
        <Text style={styles.text}>{todo.title}</Text>
        <Button title="Редактировать" onPress={() => setModal(true)} />
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
