import React, { useState, useContext, useEffect, useCallback } from 'react'
import { View, Dimensions, FlatList, Image, StyleSheet } from 'react-native'

import { AddTodo } from '../components/AddTodo'
import { Todo } from '../components/Todo'
import { AppButton } from '../components/uikit/AppButton'
import { AppLoader } from '../components/uikit/AppLoader'
import { ScreenContext } from '../context/screen/screenContext'
import { TodoContext } from '../context/todo/todoContext'
import { THEME } from '../theme'

export const MainScreen = () => {
  const { todos, addTodo, removeTodo, fetchTodos, loading, error } = useContext(
    TodoContext
  )
  const { changeScreen } = useContext(ScreenContext)

  const [deviceWidth, setDeviceWidth] = useState(
    Dimensions.get('window').width - THEME.PADDING_HORIZONTAL * 2
  )

  const loadTodos = useCallback(async () => await fetchTodos(), [fetchTodos])

  useEffect(() => {
    loadTodos()
  }, [])

  // выполнится один раз при инициализации т.к нет зависимостей, аналогично mounted
  useEffect(() => {
    const update = () => {
      setDeviceWidth(
        Dimensions.get('window').width - THEME.PADDING_HORIZONTAL * 2
      )
    }

    Dimensions.addEventListener('change', update)

    return () => {
      Dimensions.removeEventListener('change', update)
    }
  }, [])

  if (loading) {
    return <AppLoader />
  }

  if (error) {
    return (
      <View style={styles.errorWrapper}>
        <AppText style={styles.errorText}>{error}</AppText>
        <AppButton onPress={loadTodos}>Повторить</AppButton>
      </View>
    )
  }

  const content =
    todos.length > 0 ? (
      <View style={{ width: deviceWidth }}>
        <FlatList
          data={todos}
          renderItem={({ item }) => (
            <Todo todo={item} onRemove={removeTodo} onOpen={changeScreen} />
          )}
          keyExtractor={item => item.id}
        />
      </View>
    ) : (
      <View style={styles.imageWrapper}>
        <Image
          style={styles.image}
          source={require('../../assets/no-items.png')}
        />
      </View>
    )

  return (
    <View style={styles.wrapper}>
      <AddTodo onSubmit={addTodo} />
      {content}
    </View>
  )
}

const styles = StyleSheet.create({
  wrapper: {},

  errorWrapper: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },

  errorText: {
    fontSize: 20,
    color: THEME.DANGER_COLOR
  },

  imageWrapper: {
    alignItems: 'center',
    justifyContent: 'center',
    height: 300,
    padding: 10
  },

  image: {
    width: '100%',
    height: '100%',
    resizeMode: 'contain'
  }
})
