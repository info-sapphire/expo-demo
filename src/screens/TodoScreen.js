import React, { useState, useContext } from 'react'
import { View, StyleSheet } from 'react-native'
import { FontAwesome, AntDesign } from '@expo/vector-icons'

import { EditModal } from '../components/EditModal'
import { AppButton } from '../components/uikit/AppButton'
import { AppCard } from '../components/uikit/AppCard'
import { AppText } from '../components/uikit/AppText'
import { THEME } from '../theme'
import { TodoContext } from '../context/todo/todoContext'
import { ScreenContext } from '../context/screen/screenContext'

export const TodoScreen = () => {
  const { todos, updateTodo, removeTodo } = useContext(TodoContext)
  const { todoId, changeScreen } = useContext(ScreenContext)
  const [modal, setModal] = useState(false)

  const todo = todos.find(todo => todo.id === todoId)

  const onSaveHandler = title => {
    updateTodo(todo.id, title)
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
        <AppButton onPress={() => setModal(true)}>
          <FontAwesome name="edit" size={20} />
        </AppButton>
      </AppCard>

      <View style={styles.buttons}>
        <View style={{ ...styles.button, ...styles.marginRight }}>
          <AppButton
            onPress={() => changeScreen(null)}
            color={THEME.GRAY_COLOR}
          >
            <AntDesign name="back" size={20} color="#fff" />
          </AppButton>
        </View>
        <View style={{ ...styles.button, ...styles.marginLeft }}>
          <AppButton
            onPress={() => removeTodo(todo.id)}
            color={THEME.DANGER_COLOR}
          >
            <FontAwesome name="remove" size={20} color="#fff" />
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
    // width: Dimensions.get('window').width / 3
    // width: Dimensions.get('window').width > 400 ? 150 : 200
  },

  buttons: {
    flexDirection: 'row',
    justifyContent: 'space-between'
  }
})
