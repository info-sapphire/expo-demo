import React, { useState, useEffect, useContext } from 'react'
import { View, Dimensions, FlatList, Image, StyleSheet } from 'react-native'

import { AddTodo } from '../components/AddTodo'
import { Todo } from '../components/Todo'
import { ScreenContext } from '../context/screen/screenContext'
import { TodoContext } from '../context/todo/todoContext'
import { THEME } from '../theme'

export const MainScreen = () => {
  const { todos, addTodo, removeTodo } = useContext(TodoContext)
  const { changeScreen } = useContext(ScreenContext)

  const [deviceWidth, setDeviceWidth] = useState(
    Dimensions.get('window').width - THEME.PADDING_HORIZONTAL * 2
  )

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
  })

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
