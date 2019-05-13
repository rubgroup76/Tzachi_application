import React from 'react';
import {
  StyleSheet, Text,
  TouchableHighlight,
  TextInput, Image,  TouchableOpacity, View,
  Button, ImageEditor,
} from 'react-native';
import firebaseSvc from '../Pages/FirebaseSvc';
import styles from '../Pages/pageStyle';
import { Constants, ImagePicker, Permissions } from 'expo';
import firebase from 'firebase';
import { auth, initializeApp, storage } from 'firebase';
import uuid from 'uuid';
import styles1 from '../Pages/pageStyleTest';

export default class LoginToChat extends React.Component {
  static navigationOptions = {
    title: 'התחברות לצאט',
        headerStyle: {
          backgroundColor: '#8FD1DF',
        },
        headerTintColor: '#fff',
        headerTitleStyle: {
          fontWeight: 'bold',
        },
  };  
  
  state = {
        name: 'Nella',
        email: 'Nella@gmail.com',
        password: '123456',
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
      <View style={styles1.containerChat}>
      <View style>
                    <Text style={styles1.textBigLogInChat}>צא'ט המעפיל </Text>
                </View>
        {/* <Text style={styles.lblText}>Name:</Text>
                    <TextInput
                        style={styles.TxtInp}
                        onChangeText={(text) => this.setState({ name: text })}
                        value={this.state.name}
                    /> */}
<View style={styles.ContentLogInChat}>
<View style={styles1.inputContainer}>
          <Image style={styles1.inputIcon} source={{uri: 'https://png.icons8.com/person'}}/>
          <TextInput style={styles1.inputs}
              placeholder="Name"
              // keyboardType="numeric"
              underlineColorAndroid='transparent'
              onChangeText={(text) => this.setState({ name: text })}
              //value={this.state.name}
              // onChangeText={(id) => this.setState({txtID})}
              />
        </View>

        <View style={styles1.inputContainer}>
          <Image style={styles1.inputIcon} source={{uri: 'https://img.icons8.com/ios/50/000000/new-post.png'}}/>
          <TextInput style={styles1.inputs}
              placeholder="Email"
              keyboardType="email-address"
              underlineColorAndroid='transparent'
              onChangeText={(text) => this.setState({ email: text })}
              //value={this.state.email}
              // onChangeText={(id) => this.setState({txtID})}
              />
        </View>

        <View style={styles1.inputContainer}>
          <Image style={styles1.inputIcon} source={{uri: 'https://png.icons8.com/key'}}/>
          <TextInput style={styles1.inputs}
              placeholder="Password"
              secureTextEntry={true}
              // keyboardType="numeric"
              underlineColorAndroid='transparent'
              onChangeText={(text) => this.setState({ password: text })}
              //value={this.state.password}
              // onChangeText={(id) => this.setState({txtID})}
              />
        </View>
      {/* <Text style={styles.lblText}>Email:</Text>
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
                    /> */}
                    {/* <TouchableOpacity
                        style={styles.Button}
                        onPress={this.onPressLogin}>
                        <Text style={styles.textMedium}>Login</Text>
                    </TouchableOpacity> */}

                    <TouchableHighlight style={[styles1.buttonContainer, styles1.LoginToChatButton]} 
        onPress={this.onPressLogin}>
          <Text style={styles1.loginText}>Login</Text>
        </TouchableHighlight>

        <TouchableHighlight style={[styles1.buttonContainer, styles1.createAccountButton]} 
        onPress={()=>this.props.navigation.navigate('CreateAccount')}>
          <Text style={styles1.loginText}>Create Account</Text>
        </TouchableHighlight>
                    {/* <TouchableOpacity
                        style={styles.Button}
                        onPress={()=>this.props.navigation.navigate('CreateAccount')}>
                        <Text style={styles.textMedium}>Create New Account</Text>
                    </TouchableOpacity> */}
                    {/* <Button title="Navigate to Create Account"
          onPress = {()=>this.props.navigation.navigate('CreateAccount')}
        />  */}
        </View>
</View>
    );
  }
}