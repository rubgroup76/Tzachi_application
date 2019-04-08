import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  Button,
  TouchableHighlight,
  Image,
  Alert
} from 'react-native';
import styles from './pageStyleTest';

export default class LoginPage extends React.Component {
    static navigationOptions = {
        title: 'הקפץ לאירוע חירום',
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
        this.state = {
            txtName: 'Avi',
            txtPass: '123'
        }
    }

    btnLogin = () => {
        debugger;
        if (this.state.txtName == 'Avi' && this.state.txtPass == '123') {
            this.setState({ lblErr: false });
            this.props.navigation.navigate('Home');
        } else {
            this.setState({ lblErr: true });
        }
    };

    btnPOST_Person = () => {
        let per = {
            Name: this.state.txtName,
            Pass: this.state.txtPass
        };

        // POST adds a random id to the object sent
        fetch('http://proj.ruppin.ac.il/bgroup76/test1/api/login', {
            method: 'POST',
            body: JSON.stringify(per),
            headers: {
                "Content-type": "application/json; charset=UTF-8"
            }
        })
            .then(response => response.json())
            .then(json => {
                if (json != null) {
                    alert(`
                    returned from server\n
                    json= ${json}\n
                    Name=${json.Name}\n
                    Pass=${json.Pass}\n
                    Age=${json.Age}`);
                    this.props.navigation.navigate('Home');
                } else {
                    this.setState({ lblErr: true });
                }
            });
    }

    render() {
        return (
          <View style={styles.containerE}>
          <View style={styles.Header}>
                        <Text style={styles.textBigEmergency}>הקפצת מתנדבים</Text>
                    </View>
                    <Text style={styles.lblText}>סוג אירוע</Text>
                    <View style={styles.inputContainerE}>
              {/* <Image style={styles.inputIcon} source={{uri: 'https://png.icons8.com/message/ultraviolet/50/3498db'}}/> */}
              <TextInput style={styles.inputs}
                  placeholder="Email"
                  keyboardType="email-address"
                  underlineColorAndroid='transparent'
                  onChangeText={(email) => this.setState({email})}/>
            </View>
            <View style={styles.inputContainerE}>
              {/* <Image style={styles.inputIcon} source={{uri: 'https://png.icons8.com/message/ultraviolet/50/3498db'}}/> */}
              <TextInput style={styles.inputs}
                  placeholder="Email"
                  keyboardType="email-address"
                  underlineColorAndroid='transparent'
                  onChangeText={(email) => this.setState({email})}/>
            </View>
            <View style={styles.inputContainerE}>
              {/* <Image style={styles.inputIcon} source={{uri: 'https://png.icons8.com/message/ultraviolet/50/3498db'}}/> */}
              <TextInput style={styles.inputs}
                  placeholder="Email"
                  keyboardType="email-address"
                  underlineColorAndroid='transparent'
                  onChangeText={(email) => this.setState({email})}/>
            </View>
            
            <View style={styles.inputContainerE}>
              {/* <Image style={styles.inputIcon} source={{uri: 'https://png.icons8.com/key-2/ultraviolet/50/3498db'}}/> */}
              <TextInput style={styles.inputs}
                  placeholder="Password"
                  secureTextEntry={true}
                  underlineColorAndroid='transparent'
                  onChangeText={(password) => this.setState({password})}/>
            </View>
    
            <TouchableHighlight style={[styles.buttonContainer, styles.loginButton]} onPress={() => this.props.navigation.navigate('Home')}>
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