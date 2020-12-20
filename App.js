import React, { useState } from 'react'
import { Alert, StyleSheet, View } from 'react-native'
import { Navbar } from './src/components/Navbar'
import { MainScreen } from './src/screens/MainScreen'
import { TodoScreen } from './src/screens/TodoScreen'

export default function App() {
  const [todos, setTodos] = useState([])
  const [todoId, setTodoId] = useState(null)

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

  const toHome = () => setTodoId(null)
  const openTodo = id => setTodoId(id)
  const currentTodo = todos.find(todo => todo.id === todoId)

  const content = todoId
  ? <TodoScreen todo={currentTodo} goBack={toHome} onRemove={removeTodo} />
  : <MainScreen {...{ todos, addTodo, removeTodo, openTodo }} />

  return (
    <View>
      <Navbar title="Todo App" />
      <View style={styles.container}>
        {content}
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 30,
    paddingVertical: 20
  }
})
