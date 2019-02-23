import React, { Component } from 'react'
import { View, Text } from 'react-native'
import { getMetricMetaInfo } from '../utils/helpers'
import UdaciSlider from './UdaciSlider'
import UdaciStepper from './UdaciStepper'
import DateHeader from './DateHeader'

export default class AddEntry extends Component {
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
        ...state,
        [metric]: count > max ? max : count,
      }
    })
  }

  decrement = (metric) => {
    this.setState((currentState) => {
      const count = currentState[metric] - getMetricMetaInfo(metric).step

      return {
        ...state,
        [metric]: count < 0 ? 0 : count,
      }
    })
  }

  slide = (metric, value) => {
    this.setState((currentState) => ({
      [metric]: valaue,
    }))
  }

  render() {
    const metaInfo = getMetricMetaInfo()

    return (
      <View>
        <DateHeader date={(new Date()).toLocaleDateString()} />

        {Object.keys(metaInfo).map((key) => {
          const {getIcon, type, ...rest } = metaInfo[key]
          const value = this.state[key]

          return (
            <View key={key}>
              {getIcon()}
              {type === 'slider'
                ? <UdaciSlider
                    value={value}
                    didChange={(value) => this.slide(key, value)}
                    {...rest}
                  />
                : <UdaciStepper
                    value={value}
                    didIncrement={() => this.increment(key)}
                    didDeccrement={() => this.decrement(key)}
                    {...rest}
                  />
              }
            </View>
          )
        })}
      </View>
    )
  }
}