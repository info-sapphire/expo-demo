import React from 'react'
import { View, ActivityIndicator, StyleSheet } from 'react-native'

import { THEME } from '../../theme'

export const AppLoader = () => (
  <View style={styles.wrapper}>
    <ActivityIndicator size="large" color={THEME.MAIN_COLOR} />
  </View>
)

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  }
})
