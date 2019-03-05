import React from 'react'
import {
  Platform,
  SafeAreaView,
  StatusBar,
  StyleSheet,
  View,
} from 'react-native'
import AddEntry from './components/AddEntry'
import { createStore } from 'redux'
import { Provider } from 'react-redux'
import reducer from './reducers'
import History from './components/History'
import {
  createAppContainer,
  createBottomTabNavigator,
  createDrawerNavigator,
  createMaterialTopTabNavigator,
  createStackNavigator,
} from 'react-navigation'
import { purple, white, gray } from './utils/colors'
import { FontAwesome, Ionicons } from '@expo/vector-icons'
import { Constants } from 'expo'
import EntryDetail from './components/EntryDetail';
import Live from './components/Live'

const historyStackRoutes = {
  History: {
    screen: History,
    navigationOptions: {
      header: null,
    },
  },
  EntryDetail: {
    screen: EntryDetail,
  },
}
const historyStackOptions = {
  defaultNavigationOptions: {
    headerStyle: {
      backgroundColor: purple,
    },
    headerTintColor: white,
    headerTitleStyle: {
      fontWeight: 'bold',
    },
  },
}
const HistoryStack = createStackNavigator(historyStackRoutes, historyStackOptions)

const tabs = {
  History: {
    screen: HistoryStack,
    navigationOptions: {
      tabBarLabel: 'History',
      tabBarIcon: ({ tintColor }) => <Ionicons name='ios-bookmarks' size={30} color={tintColor} />,
    },
  },
  AddEntry: {
    screen: AddEntry,
    navigationOptions: {
      tabBarLabel: 'Add Entry',
      tabBarIcon: ({ tintColor }) => <FontAwesome name='plus-square' size={30} color={tintColor} />,
    },
  },
  Live: {
    screen: Live,
    navigationOptions: {
      tabBarLabel: 'Live',
      tabBarIcon: ({ tintColor }) => <Ionicons name='ios-speedometer' size={30} color={tintColor} />,
    },
  },
}

const tabOptions = {
  initialRouteName: 'Live',
  tabBarOptions: {
    activeTintColor: Platform.OS === 'ios' ? purple : white,
    style: {
      height: 56,
      backgroundColor: Platform.OS === 'ios' ? white : purple,
      shadowColor: 'rgba(0,0,0,0.24)',
      shadowOffset: {
        width: 0,
        height: 3
      },
      shadowRadius: 6,
      shadowOpacity: 1
    }
  }
}

const TabNavigator = Platform.OS === 'ios'
  ? createBottomTabNavigator(tabs, tabOptions)
  : createMaterialTopTabNavigator(tabs, tabOptions)


const MainNavigator = createAppContainer(TabNavigator)

function UdaciStatusBar({ backgroundColor, ...props }) {
  return (
    <SafeAreaView style={{ backgroundColor, height: Constants.statusBarHeight }}>
      <StatusBar translucent backgroundColor={backgroundColor} {...props} />
    </SafeAreaView>
  )
}

export default class App extends React.Component {
  render() {
    return (
      <Provider store={createStore(reducer)}>
        <View style={styles.container}>
          {/* <StatusBar translucent backgroundColor={purple} barStyle='light-content' /> */}
          {/* <StatusBar translucent style={{ backgroundColor: purple, height: Constants.statusBarHeight }} barStyle='light-content' /> */}
          <UdaciStatusBar backgroundColor={purple} barStyle='light-content' />
          <MainNavigator />
        </View>
      </Provider>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // ...Platform.select({
    //   ios: {
    //     marginTop: 30,
    //   },
    //   android: {
    //     marginTop: 20,
    //   }
    // }),
  },
})