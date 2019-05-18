import React from 'react';
import firebase from '@firebase/app';
import { createAppContainer, createStackNavigator } from 'react-navigation';
import NavigationService from './NavigationService';
import { Provider } from 'react-redux';

import store from './store';
import AuthScreen from './screens/AuthScreen';
import DashScreen from './screens/DashScreen';
import UploadScreen from './screens/UploadScreen';
import EditScreen from './screens/EditScreen';

const TopLevelNavigator = createStackNavigator({
  auth: AuthScreen,
  dashboard: {
    screen: createStackNavigator({
      dashboard: DashScreen,
      upload: UploadScreen,
      edit: EditScreen
    })
  }
}, {
  
    headerMode: 'none',
    navigationOptions: {
      header: null
    },
      lazy: true
    }
);

const AppContainer = createAppContainer(TopLevelNavigator);

export default class App extends React.Component {
  state = { loggedIn: null };

  componentDidMount() {
    firebase.initializeApp({
      apiKey: 'AIzaSyD8FbjAUfa8asG6iZvuZl4kQein4X6923U',
      authDomain: 'scratch-6885a.firebaseapp.com',
      databaseURL: 'https://scratch-6885a.firebaseio.com',
      projectId: 'scratch-6885a',
      storageBucket: 'scratch-6885a.appspot.com',
      messagingSenderId: '382880702291'
    });
  }
  
  render() {
    return (
      <Provider store={store}>
        <AppContainer
          ref={navigatorRef => {
            NavigationService.setTopLevelNavigator(navigatorRef);
          }}
      />
      </Provider>
    );
  }
}
