import React, { Component } from 'react';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
  listenOrientationChange as lor,
  removeOrientationListener as rol
} from 'react-native-responsive-screen';
import registerForPushNotificationsAsync from '../Components/registerForPushNotificationsAsync';
import { Notifications } from 'expo';

import {
  StyleSheet,
  Text,
  View,
  TextInput,
  Button,
  TouchableHighlight,
  Image,
  Alert,
} from 'react-native';
import styles from './pageStyleTest';

export default class LoginView extends Component {

  static navigationOptions = {
    title: 'כניסה',
    headerStyle: {
      backgroundColor: '#8FD1DF',
    },
    headerTintColor: '#fff',
    headerTitleStyle: {
      fontWeight: 'bold',
    },
  };

  constructor(props) {
    super(props);
    state = {
      email: '',
      password: '',
      txtID: '308010362',
      txtPass: '123456',
      userId: "",
      userName: "",
      token: "",
      userCode: 0
    }
  }

  updateToken(token) {
    fetch('http://proj.ruppin.ac.il/bgroup76/prod/api/volunteers/token/?User=' + this.state.txtID + "&Token=" + token, {

      method: 'POST',
      headers: { "Content-type": "application/json; charset=UTF-8" },
      body: JSON.stringify({}),
    })

      .then(alert(token))
      .then(this.props.navigation.navigate('Home', { userName: this.state.txtID, RoleId: this.state.userRoleId }))
      .catch(error => console.warn('Error:' + error));
  }

  //check if the username and password exist in the DB and navigate to home page
  btnPOST_Person = () => {
    // POST adds a random id to the object sent
    fetch('http://proj.ruppin.ac.il/bgroup76/prod/api/volunteers/?Id=' + this.state.txtID + '&Password=' + this.state.txtPass, {
      method: 'GET',
      // body: JSON.stringify({}),
      headers: {
        "Content-type": "application/json; charset=UTF-8"
      }
    })
      .then(response => response.json())
      .then(response => {
        if (response.Id) {

          this.setState({ userId: response.Id, userName: response.Name, userRoleId: response.RoleId });

          registerForPushNotificationsAsync()
            .then(tok => {
              this.setState({ token: tok });
              this.updateToken(tok)
            })
          this._notificationSubscription = Notifications.addListener(this._handleNotification);      
        }
        else
          alert("Incorrect username or password");
      })
      .catch(error => console.warn('Error:', error.message));

  }
  _handleNotification = (notification) => {
    if (notification.data.type == 0) {
      if (notification.origin == 'selected') {
        this.props.navigation.navigate('HakpatzaVol', { evName: notification.data.eventName, evNum: notification.data.eventNumber, id: notification.data.id, token: notification.data.token, team: notification.data.team, x_event: notification.data.x_event, y_event: notification.data.y_event });
      }
      else if (notification.origin == 'received') {
        this.props.navigation.navigate('HakpatzaVol', { evName: notification.data.eventName, evNum: notification.data.eventNumber, id: notification.data.id, token: notification.data.token, team: notification.data.team, x_event: notification.data.x_event, y_event: notification.data.y_event });
      }
    }
    else if (notification.data.type == 1) {
      if (notification.origin == 'selected') {
        this.props.navigation.navigate('ActualHakpatza', { evName: notification.data.eventName, evNum: notification.data.eventNumber, id: notification.data.id, token: notification.data.token, team: notification.data.team, x_event: notification.data.x_event, y_event: notification.data.y_event, severity: notification.data.severity });
      }
      else if (notification.origin == 'received') {
        this.props.navigation.navigate('ActualHakpatza', { evName: notification.data.eventName, evNum: notification.data.eventNumber, id: notification.data.id, token: notification.data.token, team: notification.data.team, x_event: notification.data.x_event, y_event: notification.data.y_event , severity: notification.data.severity});
      }
    }
  };
  onClickListener = (viewId) => {
    Alert.alert("Alert", "Button pressed " + viewId);
  }

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.Header}>
          <Text style={styles.textBigLogIn}>ברוכים הבאים</Text>
        </View>
        <Image
          style={{ position: 'absolute', top: '20%', height: hp('20%'), width: wp('40%') }}
          source={require('../assets/hamaapilLogo.png')} />
        <View style={styles.inputContainer}>
          <Image style={styles.inputIcon} source={{ uri: 'https://png.icons8.com/person' }} />
          <TextInput style={styles.inputs}
            placeholder="ID"
            keyboardType="numeric"
            underlineColorAndroid='transparent'
            onChangeText={(text) => this.setState({ txtID: text })}

          />
        </View>

        <View style={styles.inputContainer}>
          <Image style={styles.inputIcon} source={{ uri: 'https://png.icons8.com/key' }} />
          <TextInput style={styles.inputs}
            placeholder="Password"
            secureTextEntry={true}
            underlineColorAndroid='transparent'
            onChangeText={(text) => this.setState({ txtPass: text })}
          />
        </View>

        <TouchableHighlight style={[styles.buttonContainer, styles.loginButton]}
          onPress={this.btnPOST_Person}>
          <Text style={styles.loginText}>Login</Text>
        </TouchableHighlight>

        <TouchableHighlight style={[styles.buttonContainer, styles.loginButton]}
          onPress={() => this.props.navigation.navigate('LoginToChat')}>
          <Text style={styles.loginText}>Login To Chat</Text>
        </TouchableHighlight>

        <TouchableHighlight style={styles.buttonContainer} onPress={() => this.onClickListener('restore_password')}>
          <Text>Forgot your password?</Text>
        </TouchableHighlight>

        <TouchableHighlight style={styles.buttonContainer} onPress={() => this.onClickListener('register')}>
          <Text>Register</Text>
        </TouchableHighlight>
      </View>
    );
  }
}
