import React from 'react'
import {
  Platform,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native'
import { FontAwesome, Entypo } from '@expo/vector-icons'
import { white, gray, purple } from '../utils/colors'

export default function UdaciStepper({ max, unit, step, value, onIncrement, onDecrement }) {
  return (
    <View style={[styles.row, {justifyContent: 'space-between'}]}>
      <View style={{flexDirection: 'row'}}>
        <TouchableOpacity
          style={[styles.button, styles.minusStep]}
          onPress={onDecrement}>
          {Platform.OS === 'ios'
            ? <Entypo name='minus' size={30} color={purple} />
            : <FontAwesome name='minus' size={30} color={white} />
          }
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.button, styles.plusStep]}
          onPress={onIncrement}>
          {Platform.OS === 'ios'
            ? <Entypo name='plus' size={30} color={purple} />
            : <FontAwesome name='plus' size={30} color={white} />
          }
        </TouchableOpacity>
      </View>
      <View style={styles.metrics}>
        <Text style={{fontSize: 24, textAlign: 'center'}}>{value}</Text>
        <Text style={{fontSize: 18, color: gray}}>{unit}</Text>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  button: {
    ...Platform.select({
      ios: {
        backgroundColor: white,
        borderColor: purple,
        borderWidth: 1,
        borderRadius: 3,
        padding: 5,
        paddingLeft: 25,
        paddingRight: 25,
      },
      android: {
        margin: 5,
        backgroundColor: purple,
        padding: 10,
        borderRadius: 2,
      },
    })
  },
  metrics: {
    width: 85,
    justifyContent: 'center',
    alignItems: 'center',
  },
  minusStep: {
    ...Platform.select({
      ios: {
        borderTopRightRadius: 0,
        borderBottomRightRadius: 0,
      },
      android: {},
    })
  },
  plusStep: {
    ...Platform.select({
      ios: {
        borderTopLeftRadius: 0,
        borderBottomLeftRadius: 0,
      },
      android: {},
    })
  },
  row: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
  },
})