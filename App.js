import React, { useState } from 'react'
import { StyleSheet, View } from 'react-native'
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
    setTodos(prev => prev.filter(todo => todo.id !== id))
  }

  const toHome = () => setTodoId(null)
  const openTodo = id => setTodoId(id)
  const currentTodo = todos.find(todo => todo.id === todoId)

  const content = todoId
  ? <TodoScreen todo={currentTodo} goBack={toHome} />
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
