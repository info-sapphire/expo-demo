import React from 'react'
import { View, StyleSheet } from 'react-native'

export const AppCard = ({ style, children }) => {
  return <View style={{ ...styles.wrapper, ...style }}>{children}</View>
}

const styles = StyleSheet.create({
  wrapper: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 20,
    shadowColor: '#000',
    shadowRadius: 2,
    shadowOpacity: 0.3,
    shadowOffset: { width: 2, height: 2 },
    backgroundColor: '#fff',
    borderRadius: 10,
    elevation: 8
  }
})
