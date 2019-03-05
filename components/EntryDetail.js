import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View
} from 'react-native';
import { connect } from 'react-redux'
import { white } from '../utils/colors'
import EntryCard from './EntryCard'
import LeftChevron from './LeftChevron'
import TextButton from './TextButton'
import { addEntry } from '../actions'
import { removeEntry } from '../utils/api'
import { timeToString, getDailyReminderValue } from '../utils/helpers'

class EntryDetail extends Component {
  static navigationOptions = ({ navigation }) => {
    console.log('navigation', navigation)
    const { entryId } = navigation.state.params
    const year = entryId.slice(0, 4)
    const month = entryId.slice(5, 7)
    const day = entryId.slice(8)

    return {
      title: `${month}/${day}/${year}`,
      headerLeft: <LeftChevron onPress={() => navigation.goBack()} />
    }
  }

  reset = () => {
    const { entryId, remove, goBack } = this.props

    remove()
    goBack()
    removeEntry(entryId)
  }

  shouldComponentUpdate(nextProps) {
    return nextProps.metrics !== null && !nextProps.metrics.today
  }

  render() {
    const { metrics } = this.props
    return (
      <View style={styles.container}>
        <EntryCard metrics={metrics} />
        <TextButton onPress={this.reset} style={{margin: 20}}>
          Reset
        </TextButton>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: white,
    padding: 15,
  },
})

function mapStateToProps(state, { navigation }) {
  const { entryId } = navigation.state.params

  return {
    entryId,
    metrics: state[entryId],
  }
}

function mapDispatchToProps(dispatch, { navigation }) {
  const { entryId } = navigation.state.params

  return {
    remove: () => dispatch(addEntry({
      [entryId]: timeToString() === entryId
        ? getDailyReminderValue()
        : null
    })),
    goBack: () => navigation.goBack(),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(EntryDetail)