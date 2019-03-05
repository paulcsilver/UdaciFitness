import React, { Component } from 'react';
import {
  ActivityIndicator,
  StyleSheet,
  Text,
  TouchableOpacity,
  View
} from 'react-native';
import { Foundation } from '@expo/vector-icons'
import { purple, white } from '../utils/colors'

export default class Live extends Component {
  constructor(props) {
    super(props);
    this.state = {
      coords: null,
      status: 'denied',
      direction: '',
    };
  }

  requestGeoPermission = () => {
    console.log('requesting geolocation permision...')
  }

  render() {
    const { status, coords, direction } = this.state

    if (status === null) {
      return <ActivityIndicator style={{marginTop: 30}} />
    } else if (status === 'denied') {
      return (
        <View style={styles.center}>
          <Foundation name='alert' size={50} />
          <Text>
            You denied access to your location. You fix this by visiting your settings and enabling location services for this app.
          </Text>
        </View>
      );
    } else if (status === 'undetermined') {
      return (
        <View style={styles.center}>
          <Foundation name='alert' size={50} />
          <Text>
            You need to enable location services for this app.
          </Text>
          <TouchableOpacity onPress={this.requestGeoPermission} style={styles.button}>
            <Text style={styles.buttonText}>
              Enable
            </Text>
          </TouchableOpacity>
        </View>
      );
    } else if (status === 'granted') {
      return (
        <View>
          <Text> Live </Text>
          <Text> {JSON.stringify(this.state)} </Text>
        </View>
      );
    }

    return (
      <View>
        <Text> Error </Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'space-between',
  },
  center: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 30,
    marginRight: 30,
  },
  button: {
    padding: 10,
    backgroundColor: purple,
    alignSelf: 'center',
    borderRadius: 5,
    margin: 20,
  },
  buttonText: {
    color: white,
    fontSize: 20,
  },
  directionContainer: {
    flex: 1,
    justifyContent: 'center',
  },
  header: {
    fontSize: 35,
    textAlign: 'center',
  },
  direction: {
    color: purple,
    fontSize: 120,
    textAlign: 'center',
  },
  metricContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    backgroundColor: purple,
  },
  metric: {
    flex: 1,
    paddingTop: 15,
    paddingBottom: 15,
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    marginTop: 20,
    marginBottom: 20,
    marginLeft: 10,
    marginRight: 10,
  },
  subHeader: {
    fontSize: 25,
    textAlign: 'center',
    marginTop: 5,
  },
})
