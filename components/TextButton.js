import React from 'react'
import { StyleSheet, Text, TouchableOpacity } from 'react-native'
import { purple } from  '../utils/colors'

export default function TextButton ({ children, onPress, style = {} }) {
  return (
    <TouchableOpacity onPress={onPress}>
      <Text style={[styles.reset, style]}>{children}</Text>
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  reset: {
    fontSize: 15,
    textAlign: 'center',
    color: purple,
  },
})