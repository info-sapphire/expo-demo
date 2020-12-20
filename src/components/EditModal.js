import React from 'react'
import { Modal, View, TextInput, Button, StyleSheet } from 'react-native'
import { THEME } from '../theme'

export const EditModal = ({ visible, onCancel }) => {
  return (
    <Modal animationType="fade" visible={visible} transparent={false}>
      <View style={styles.wrapper}>
        <TextInput
          style={styles.input}
          placeholder="Введите название"
          autoCapitalize="none"
          autoCorrect={false}
        />
        <View style={styles.buttons}>
          <Button
            title="Отменить"
            onPress={onCancel}
            color={THEME.DANGER_COLOR}
          />
          <Button title="Сохранить" />
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
