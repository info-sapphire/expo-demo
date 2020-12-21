import React from 'react'
import { View, Platform, StyleSheet } from 'react-native'

import { THEME } from '../theme'
import { AppText } from './uikit/AppText'

export const Navbar = ({ title }) => {
  return (
    <View
      style={{
        ...styles.navbar,
        ...Platform.select({
          android: styles.navbarAndroid,
          ios: styles.navbarIos
        })
      }}
    >
      <AppText style={styles.text} bold={true}>
        {title}
      </AppText>
    </View>
  )
}

const styles = StyleSheet.create({
  navbar: {
    height: 70,
    alignItems: 'center',
    justifyContent: 'flex-end',
    paddingBottom: 10
  },

  navbarAndroid: {
    backgroundColor: THEME.MAIN_COLOR
  },

  navbarIos: {
    borderBottomColor: THEME.MAIN_COLOR,
    borderBottomWidth: 1
  },

  text: {
    color: Platform.OS === 'ios' ? THEME.MAIN_COLOR : 'white',
    fontSize: 20
  }
})
