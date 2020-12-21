import React, { useState } from 'react'
import { View, StyleSheet } from 'react-native'

import { EditModal } from '../components/EditModal'
import { AppButton } from '../components/uikit/AppButton'
import { AppCard } from '../components/uikit/AppCard'
import { AppText } from '../components/uikit/AppText'
import { THEME } from '../theme'

export const TodoScreen = ({ goBack, todo, onRemove, onSave }) => {
  const [modal, setModal] = useState(false)

  const onSaveHandler = title => {
    onSave(todo.id, title)
    setModal(false)
  }

  return (
    <View style={styles.wrapper}>
      <EditModal
        value={todo.title}
        visible={modal}
        onCancel={() => setModal(false)}
        onSave={onSaveHandler}
      />

      <AppCard style={styles.card}>
        <AppText style={styles.text} bold={true}>
          {todo.title}
        </AppText>
        <AppButton onPress={() => setModal(true)}>Редактировать</AppButton>
      </AppCard>

      <View style={styles.buttons}>
        <View style={{ ...styles.button, ...styles.marginRight }}>
          <AppButton onPress={goBack} color={THEME.GRAY_COLOR}>
            Назад
          </AppButton>
        </View>
        <View style={{ ...styles.button, ...styles.marginLeft }}>
          <AppButton
            onPress={() => onRemove(todo.id)}
            color={THEME.DANGER_COLOR}
          >
            Удалить
          </AppButton>
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

  marginRight: {
    marginRight: 10
  },

  marginLeft: {
    marginLeft: 10
  },

  button: {
    flex: 1
  },

  buttons: {
    flexDirection: 'row',
    justifyContent: 'space-between'
  }
})
