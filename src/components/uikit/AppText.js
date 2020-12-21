import React from 'react'
import { Text, StyleSheet } from 'react-native'

export const AppText = ({ style, children, bold = false }) => {
  return <Text style={{ ...styles.wrapper(bold), ...style }}>{children}</Text>
}

const styles = StyleSheet.create({
  wrapper: (isBold) => ({
    fontFamily: isBold ? 'roboto-bold' : 'roboto-regular'
  })
})
