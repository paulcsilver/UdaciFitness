import React, { Component } from 'react'
import { Platform, StyleSheet, Text, TouchableOpacity, View, } from 'react-native'
import { connect } from 'react-redux'
import { receiveEntries, addEntry } from '../actions'
import { timeToString, getDailyReminderValue } from '../utils/helpers'
import { fetchCalendarEntries } from '../utils/api'
import UdaciFitnessCalendar from 'udacifitness-calendar'
import { white } from '../utils/colors'
import DateHeader from './DateHeader'
import EntryCard from './EntryCard'

class History extends Component {
  componentDidMount() {
    const { dispatch } = this.props

    fetchCalendarEntries()
      .then(entries => dispatch(receiveEntries(entries)))
      .then(({ entries }) => {
        if (!entries[timeToString()]) {
          dispatch(addEntry({
            [timeToString()]: getDailyReminderValue()
          }))
        }
      })
      .then(() => this.setState(() => ({ready: true})))
  }

  renderEntry = ({ today, ...metrics }, formattedDate, key) => (
    <View style={styles.entry}>
      {today
        ? <View>
            <DateHeader date={formattedDate} />
            <Text style={styles.noDataText}>
              {today}
            </Text>
          </View>
        : <TouchableOpacity onPress={() => console.log('Pressed')}>
            <EntryCard date={formattedDate} metrics={metrics} />
          </TouchableOpacity>
      }
    </View>
  )

  renderEmptyDate = (formattedDate) => {
    return (
      <View style={styles.entry}>
        <DateHeader date={formattedDate} />
        <Text style={styles.noDataText}>
          You didn't log any data on this day.
        </Text>
      </View>
    )
  }

  render() {
    const { entries } = this.props

    return (
      <UdaciFitnessCalendar
        items={entries}
        renderItem={this.renderEntry}
        renderEmptyDate={this.renderEmptyDate}
      />
    )
  }
}

const styles = StyleSheet.create({
  entry: {
    backgroundColor: white,
    padding: 20,
    marginLeft: 10,
    marginRight: 10,
    marginTop: 17,
    justifyContent: 'center',
    shadowRadius: 3,
    shadowOpacity: 0.8,
    shadowColor: 'rgba(0,0,0,0.24)',
    shadowOffset: {
      width: 0,
      height: 3
    },
    ...Platform.select({
      ios: {
        borderRadius: 8,
      },
      android: {
        borderRadius: 2,
      }
    })
  },
  noDataText: {
    fontSize: 20,
    paddingTop: 20,
    paddingBottom: 20,
  },
})

function mapStateToProps(entries) {
  return {
    entries,
  }
}

export default connect(mapStateToProps)(History)