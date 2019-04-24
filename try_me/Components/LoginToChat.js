import React from 'react';
import {
  StyleSheet, Text,
  TextInput,  TouchableOpacity, View,
  Button, ImageEditor,
} from 'react-native';
import firebaseSvc from '../Pages/FirebaseSvc';
import styles from '../Pages/pageStyle';
import { Constants, ImagePicker, Permissions } from 'expo';
import firebase from 'firebase';
import { auth, initializeApp, storage } from 'firebase';
import uuid from 'uuid';

export default class LoginToChat extends React.Component {
  static navigationOptions = {
    title: 'Scv Chatter',
  };  
  
  state = {
        name: 'Enter You Name',
        email: 'Your_email@gmail.com',
        password: 'Enter your Password',
        avatar:'',
      };
      // add login method to handle user press Login button
      onPressLogin = async () => {
        console.log('pressing login... email:' + this.state.email);
        const user = {
          name: this.state.name,
          email: this.state.email,
          password: this.state.password,
          avatar: this.state.avatar,
        };
        const response = firebaseSvc.login(user, this.loginSuccess, this.loginFailed);
      };

      loginSuccess = () => {
        console.log('login successful, navigate to chat.');
        this.props.navigation.navigate('Chat', {
          name: this.state.name,
          email: this.state.email,
          avatar: this.state.avatar,
        });
      };

      loginFailed = () => {
        console.log('login failed ***');
        alert('Login failure. Please tried again.');
      };
      
      // methods to handle user input and update the state
      onChangeTextEmail = email => this.setState({ email });
      onChangeTextPassword = password => this.setState({ password });
  
    render() {
    return (
      <View>
        <Text style={styles.lblText}>Name:</Text>
                    <TextInput
                        style={styles.TxtInp}
                        onChangeText={(text) => this.setState({ name: text })}
                        value={this.state.name}
                    />
      <Text style={styles.lblText}>Email:</Text>
                    <TextInput
                        style={styles.TxtInp}
                        onChangeText={(text) => this.setState({ email: text })}
                        value={this.state.email}
                    />
                    <Text style={styles.lblText}>Password:</Text>
                    <TextInput
                        style={styles.TxtInp}
                        onChangeText={(text) => this.setState({ password: text })}
                        value={this.state.password}
                    />
                    <TouchableOpacity
                        style={styles.Button}
                        onPress={this.onPressLogin}>
                        <Text style={styles.textMedium}>Login</Text>
                    </TouchableOpacity>
                    {/* <TouchableOpacity
                        style={styles.Button}
                        onPress={()=>this.props.navigation.navigate('CreateAccount')}>
                        <Text style={styles.textMedium}>Create New Account</Text>
                    </TouchableOpacity> */}
                    <Button title="Navigate to Create Account"
          onPress = {()=>this.props.navigation.navigate('CreateAccount')}
        /> 
</View>
    );
  }
}