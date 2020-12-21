import React, { useReducer, useContext } from 'react'
import { Alert } from 'react-native'

import { ScreenContext } from '../screen/screenContext'
import { TodoContext } from './todoContext'
import { todoReducer } from './todoReducer'
import { ADD_TODO, UPDATE_TODO, REMOVE_TODO } from '../types'

export const TodoState = ({ children }) => {
  const initialState = {
    todos: []
  }
  const { changeScreen } = useContext(ScreenContext)
  const [state, dispatch] = useReducer(todoReducer, initialState)

  const addTodo = title => dispatch({ type: ADD_TODO, title })
  const updateTodo = (id, title) => dispatch({ type: UPDATE_TODO, id, title })
  const removeTodo = id => {
    const todo = state.todos.find(todo => todo.id === id)

    Alert.alert(
      'Удаление элемента',
      `Вы уверены что хотите удалить ${todo.title}`,
      [
        { text: 'Отмена', style: 'cancel' },
        {
          text: 'Удалить',
          style: 'destructive',
          onPress: () => {
            changeScreen(null)
            dispatch({ type: REMOVE_TODO, id })
          }
        }
      ],
      { cancelable: false }
    )
  }

  return (
    <TodoContext.Provider
      value={{
        todos: state.todos,
        addTodo,
        updateTodo,
        removeTodo
      }}
    >
      {children}
    </TodoContext.Provider>
  )
}
