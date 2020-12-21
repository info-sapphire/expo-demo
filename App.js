import React, { useState } from 'react'
import { Alert, StyleSheet, View } from 'react-native'
import * as Font from 'expo-font'
import AppLoading from 'expo-app-loading'

import { Navbar } from './src/components/Navbar'
import { MainScreen } from './src/screens/MainScreen'
import { TodoScreen } from './src/screens/TodoScreen'

const appLoad = async () => {
  await Font.loadAsync({
    'roboto-regular': require('./assets/fonts/Roboto-Regular.ttf'),
    'roboto-bold': require('./assets/fonts/Roboto-Bold.ttf')
  })
}

export default function App() {
  const [isReady, setIsReady] = useState(false)
  const [todos, setTodos] = useState([])
  const [todoId, setTodoId] = useState(null)

  if (!isReady) {
    return (
      <View>
        <AppLoading
          startAsync={appLoad}
          onError={() => console.error('onError')}
          onFinish={() => setIsReady(true)}
          autoHideSplash
        />
      </View>
    )
  }

  const addTodo = title => {
    setTodos(prev => [
      ...prev,
      {
        id: Date.now().toString(),
        title
      }
    ])
  }

  const removeTodo = id => {
    const { title } = todos.find(todo => todo.id === id)

    Alert.alert(
      'Удаление элемента',
      `Вы уверены что хотите удалить ${title}`,
      [
        { text: 'Отмена', style: 'cancel' },
        {
          text: 'Удалить',
          style: 'destructive',
          onPress: () => {
            toHome()
            setTodos(prev => prev.filter(todo => todo.id !== id))
          }
        }
      ],
      { cancelable: false }
    )
  }

  const updateTodo = (id, title) => {
    setTodos(prev =>
      prev.map(todo => ({
        title: todo.id === id ? title : todo.title,
        id
      }))
    )
  }

  const toHome = () => setTodoId(null)
  const openTodo = id => setTodoId(id)
  const currentTodo = todos.find(todo => todo.id === todoId)

  const content = todoId ? (
    <TodoScreen
      todo={currentTodo}
      goBack={toHome}
      onRemove={removeTodo}
      onSave={updateTodo}
    />
  ) : (
    <MainScreen {...{ todos, addTodo, removeTodo, openTodo }} />
  )

  return (
    <View>
      <Navbar title="Todo App" />
      <View style={styles.container}>{content}</View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 30,
    paddingVertical: 20
  }
})
