import React, { useState, useEffect } from 'react'
import { View, Dimensions, FlatList, Image, StyleSheet } from 'react-native'

import { AddTodo } from '../components/AddTodo'
import { Todo } from '../components/Todo'
import { THEME } from '../theme'

export const MainScreen = ({ addTodo, todos, removeTodo, openTodo }) => {
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
      <FlatList
        data={todos}
        renderItem={({ item }) => (
          <Todo todo={item} onRemove={removeTodo} onOpen={openTodo} />
        )}
        keyExtractor={item => item.id}
      />
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
