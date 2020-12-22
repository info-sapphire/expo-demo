import React, { useReducer, useContext } from 'react'
import { Alert } from 'react-native'

import { ScreenContext } from '../screen/screenContext'
import { TodoContext } from './todoContext'
import { todoReducer } from './todoReducer'
import {
  ADD_TODO,
  UPDATE_TODO,
  REMOVE_TODO,
  SHOW_LOADER,
  HIDE_LOADER,
  SHOW_ERROR,
  CLEAR_ERROR,
  FETCH_TODOS
} from '../types'

export const TodoState = ({ children }) => {
  const initialState = {
    todos: [],
    loading: false,
    error: null
  }
  const { changeScreen } = useContext(ScreenContext)
  const [state, dispatch] = useReducer(todoReducer, initialState)

  const addTodo = async title => {
    try {
      showLoader()
      clearError()

      const response = await fetch(
        'https://react-hooks-735b2.firebaseio.com/todos.json',
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ title })
        }
      )
      const { name: id } = await response.json()

      dispatch({ type: ADD_TODO, id, title })
    } catch (error) {
      // console.error(error)

      showError('Что-то пошло не так, попробуйте снова')
    } finally {
      hideLoader()
    }
  }

  fetchTodos = async () => {
    try {
      showLoader()
      clearError()

      const response = await fetch(
        'https://react-hooks-735b2.firebaseio.com/todos.json',
        {
          method: 'GET',
          headers: { 'Content-Type': 'application/json' }
        }
      )

      const responseData = await response.json()

      dispatch({
        type: FETCH_TODOS,
        todos:
          responseData === null
            ? []
            : Object.keys(responseData).map(key => ({
                ...responseData[key],
                id: key
              }))
      })
    } catch (error) {
      // console.error(error)

      showError('Что-то пошло не так, попробуйте снова')
    } finally {
      hideLoader()
    }
  }

  const updateTodo = async (id, title) => {
    try {
      showLoader()
      clearError()

      await fetch(`https://react-hooks-735b2.firebaseio.com/todos/${id}.json`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ title })
      })

      dispatch({ type: UPDATE_TODO, id, title })
    } catch (error) {
      // console.error(error)

      showError('Что-то пошло не так, попробуйте снова')
    } finally {
      hideLoader()
    }
  }

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

  const showLoader = () => dispatch({ type: SHOW_LOADER })

  const hideLoader = () => dispatch({ type: HIDE_LOADER })

  const showError = error => dispatch({ type: SHOW_ERROR, error })

  const clearError = () => dispatch({ type: CLEAR_ERROR })

  return (
    <TodoContext.Provider
      value={{
        todos: state.todos,
        loading: state.loading,
        error: state.error,
        fetchTodos,
        addTodo,
        updateTodo,
        removeTodo
      }}
    >
      {children}
    </TodoContext.Provider>
  )
}
