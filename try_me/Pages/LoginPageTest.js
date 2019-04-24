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
          backgroundColor: '#483d8b',
        },
        headerTintColor: '#fff',
        headerTitleStyle: {
          fontWeight: 'bold',
        },
      };

  constructor(props) {
    super(props);
    state = {
      email   : '',
      password: '',
      txtID:'308010362',
      txtPass: '123456',
      userId:"",
      userName:"",
      token:"",
      userCode:0
    }
  }
  updateToken(token)
  {   
    fetch('http://proj.ruppin.ac.il/bgroup76/prod/api/volunteers/token/?User='+this.state.txtID+"&Token="+token, {

      method: 'POST',
      headers: { "Content-type": "application/json; charset=UTF-8" },
      body: JSON.stringify({}),
    })

      .then(res => res.json())
      .then(response => {alert(token);
      })

      .catch(error => console.warn('Error:'+error));
  }

//check if the username and password exist in the DB and navigate to home page
btnPOST_Person = () => {
  // POST adds a random id to the object sent
  fetch('http://proj.ruppin.ac.il/bgroup76/prod/api/volunteers/?Id='+this.state.txtID+'&Password='+this.state.txtPass, {
      method: 'GET',
      // body: JSON.stringify({}),
      headers: {
          "Content-type": "application/json; charset=UTF-8"
      }
  })
      .then(response => response.json())
      .then(response => {
          if (response.Id) {
              this.setState({ userId: response.Id, userName:response.Name});
              this.props.navigation.navigate('Home',{userName: this.state.userName});

              
                  registerForPushNotificationsAsync()
                  .then(tok => {
                      this.setState({ token: tok });
                  });
                   alert(this.state.token);
              this._notificationSubscription = Notifications.addListener(this._handleNotification);
//alert(this.state.token)
          this.updateToken(this.state.token);
          
            }
          else
            alert("Incorrect username or password");
        })
        .catch(error => console.warn('Error:', error.message));

}
  onClickListener = (viewId) => {
    Alert.alert("Alert", "Button pressed "+viewId);
  }

  render() {
    return (
      <View style={styles.container}>
      <View style={styles.Header}>
                    <Text style={styles.textBigLogIn}>ברוכים הבאים</Text>
                </View>
                <Image
                   //style={{position: 'absolute',top:130,right:-75, width:150, height:150}}
                    //style={{justifyContent: 'center',width:150, height:150}}
                   // style={{height: hp('30%'), width: wp('55%')}}
                   style={{marginBottom: 40, marginTop:10, height: hp('20%'),width: wp('40%') }}
                        source={require('../assets/hamaapilLogo.png')} />
        <View style={styles.inputContainer}>
          <Image style={styles.inputIcon} source={{uri: 'https://png.icons8.com/person'}}/>
          <TextInput style={styles.inputs}
              placeholder="ID"
              keyboardType="numeric"
              underlineColorAndroid='transparent'
              onChangeText={(text) => this.setState({ txtID: text })}
              
              // onChangeText={(id) => this.setState({txtID})}
              />
        </View>
        
        <View style={styles.inputContainer}>
          <Image style={styles.inputIcon} source={{uri: 'https://png.icons8.com/key'}}/>
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
