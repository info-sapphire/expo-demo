import React from 'react'
import {
  View,
  TouchableOpacity,
  TouchableNativeFeedback,
  Platform,
  StyleSheet
} from 'react-native'

import { AppText } from './AppText'
import { THEME } from '../../theme'

export const AppButton = ({
  style,
  children,
  onPress,
  color = THEME.MAIN_COLOR
}) => {
  const Wrapper =
    Platform.OS === 'android' ? TouchableNativeFeedback : TouchableOpacity

  return (
    <Wrapper onPress={onPress} activeOpacity={0.7}>
      <View style={{ ...styles.wrapper, backgroundColor: color, ...style }}>
        <AppText style={styles.text} bold={true}>
          {children}
        </AppText>
      </View>
    </Wrapper>
  )
}

const styles = StyleSheet.create({
  wrapper: {
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 5,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center'
  },

  text: {
    color: '#fff'
  }
})
