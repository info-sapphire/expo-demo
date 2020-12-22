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
import { Http } from '../../http'

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

      const {
        name: id
      } = await Http.post(
        'https://react-hooks-735b2.firebaseio.com/todos.json',
        { title }
      )

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

      const response = await Http.get(
        'https://react-hooks-735b2.firebaseio.com/todos.json'
      )

      dispatch({
        type: FETCH_TODOS,
        todos:
          response === null
            ? []
            : Object.keys(response).map(key => ({
                ...response[key],
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

      await Http.patch(
        `https://react-hooks-735b2.firebaseio.com/todos/${id}.json`,
        { title }
      )

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
          onPress: async () => {
            await Http.delete(
              `https://react-hooks-735b2.firebaseio.com/todos/${id}.json`
            )
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
