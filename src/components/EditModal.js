import React, { useState } from 'react'
import { Modal, View, TextInput, StyleSheet, Alert } from 'react-native'

import { AppButton } from './uikit/AppButton'
import { THEME } from '../theme'

export const EditModal = ({ value, visible, onCancel, onSave }) => {
  const [title, setTitle] = useState(value)

  const saveHandler = () => {
    if (title.trim().length < 3) {
      Alert.alert('Ошибка', 'Минимальная длина названия 3 символа')
    } else {
      onSave(title)
    }
  }

  return (
    <Modal animationType="fade" visible={visible} transparent={false}>
      <View style={styles.wrapper}>
        <TextInput
          value={title}
          onChangeText={setTitle}
          style={styles.input}
          placeholder="Введите название"
          autoCapitalize="none"
          autoCorrect={false}
        />
        <View style={styles.buttons}>
          <AppButton onPress={onCancel} color={THEME.DANGER_COLOR}>
            Отменить
          </AppButton>
          <AppButton onPress={saveHandler}>Сохранить</AppButton>
        </View>
      </View>
    </Modal>
  )
}

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },

  input: {
    padding: 10,
    borderBottomColor: THEME.MAIN_COLOR,
    borderBottomWidth: 2,
    width: '80%'
  },

  buttons: {
    width: '80%',
    marginTop: 10,
    flexDirection: 'row',
    justifyContent: 'space-between'
  }
})
