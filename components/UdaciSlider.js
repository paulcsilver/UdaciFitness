import React from 'react'
import { Slider, StyleSheet, Text, View } from 'react-native'
import { gray } from '../utils/colors'

export default function UdaciSlider({ max, unit, step, value, onChange }) {
  return (
    <View style={styles.row}>
      <Slider
        style={{flex: 1}}
        minimumValue={0}
        maximumValue={max}
        step={step}
        value={value}
        onValueChange={onChange}
      />
      <View style={styles.metrics}>
        <Text style={{fontSize: 24, textAlign: 'center'}}>{value}</Text>
        <Text style={{fontSize: 18, color: gray}}>{unit}</Text>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  row: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
  },
  metrics: {
    width: 85,
    justifyContent: 'center',
    alignItems: 'center',
  },
})