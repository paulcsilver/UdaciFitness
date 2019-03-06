import React, { Component } from 'react'
import {
  Platform,
  StyleSheet,
  Text,
  TouchableOpacity,
  View
} from 'react-native'
import { NavigationActions, } from 'react-navigation'
import {
  clearLocalNotification,
  getDailyReminderValue,
  getMetricMetaInfo,
  setLocalNotification,
  timeToString,
} from '../utils/helpers'
import UdaciSlider from './UdaciSlider'
import UdaciStepper from './UdaciStepper'
import DateHeader from './DateHeader'
import { Ionicons } from '@expo/vector-icons'
import TextButton from './TextButton'
import { submitEntry, removeEntry } from '../utils/api'
import { connect } from 'react-redux'
import { addEntry } from '../actions'
import { white, purple } from '../utils/colors'

function SubmitButton({ onPress }) {
  return (
    <TouchableOpacity style={styles.submitButton}  onPress={onPress}>
      <View>
        <Text style={styles.submitButtonText}>Submit</Text>
      </View>
    </TouchableOpacity>
  )
}

class AddEntry extends Component {
  state = {
    run: 0,
    bike: 0,
    swim: 0,
    sleep: 0,
    eat: 0,
  }

  increment = (metric) => {
    const { max, step } = getMetricMetaInfo(metric)

    this.setState((currentState) => {
      const count = currentState[metric] + step

      return {
        ...currentState,
        [metric]: count > max ? max : count,
      }
    })
  }

  decrement = (metric) => {
    this.setState((currentState) => {
      const count = currentState[metric] - getMetricMetaInfo(metric).step

      return {
        ...currentState,
        [metric]: count < 0 ? 0 : count,
      }
    })
  }

  slide = (metric, value) => {
    this.setState((currentState) => ({
      [metric]: value,
    }))
  }

  submit = () => {
    const key = timeToString()
    const entry = this.state

    this.props.dispatch(addEntry({
      [key]: entry
    }))

    this.setState(() => ({
      run: 0,
      bike: 0,
      swim: 0,
      sleep: 0,
      eat: 0,
    }))

    this.toHome()

    submitEntry({ key, entry })

    clearLocalNotification()
      .then(setLocalNotification())
  }

  reset = () => {
    const key = timeToString()
    console.log('reset', key)
    this.props.dispatch(addEntry({
      [key]: getDailyReminderValue()
    }))

    this.toHome()

    removeEntry(key)
  }

  toHome = () => {
    console.log('props', this.props)
    this.props.navigation.dispatch(NavigationActions.back({
      key: 'AddEntry',
    }))
  }

  render() {
    const metaInfo = getMetricMetaInfo()

    if (this.props.alreadyLogged) {
      return (
        <View style={styles.tada}>
          <Ionicons name={Platform.OS === 'ios' ? 'ios-happy' : 'md-happy'} size={100} />
          <Text>You already logged your information for today</Text>
          <TextButton style={{padding: 10}} onPress={this.reset}>
            Reset
          </TextButton>
        </View>
      )
    }

    return (
      <View style={styles.container}>
        <DateHeader date={(new Date()).toLocaleDateString()} />

        {Object.keys(metaInfo).map((key) => {
          const { getIcon, type, ...rest } = metaInfo[key]
          const value = this.state[key]

          return (
            <View style={styles.row} key={key}>
              {getIcon()}
              {type === 'slider'
                ? <UdaciSlider
                  value={value}
                  onChange={(value) => this.slide(key, value)}
                  {...rest} />
                : <UdaciStepper
                  value={value}
                  onIncrement={() => this.increment(key)}
                  onDecrement={() => this.decrement(key)}
                  {...rest} />
              }
            </View>
          )
        })}

        <SubmitButton onPress={this.submit} />
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: white,
  },
  row: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
  },
  submitButton: {
    backgroundColor: purple,
    padding: 10,
    height: 45,
    ...Platform.select({
      ios: {
        borderRadius: 7,
        marginLeft: 40,
        marginRight: 40,
      },
      android: {
        borderRadius: 2,
        paddingLeft: 30,
        paddingRight: 30,
        alignSelf: 'flex-end',
        justifyContent: 'center',
        alignItems: 'center',
      }
    })
  },
  submitButtonText: {
    color: white,
    fontSize: 22,
    textAlign: 'center',
  },
  tada: {
    flex: 1,
    marginLeft: 30,
    marginRight: 30,
    justifyContent: 'center',
    alignItems: 'center',
  },
})

function mapStateToProps(state) {
  const key = timeToString()

  return {
    alreadyLogged: state[key] && typeof state[key].today === 'undefined'
  }
}

export default connect(mapStateToProps)(AddEntry)