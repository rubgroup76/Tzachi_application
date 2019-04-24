import React from 'react';
import { Constants, ImagePicker, Permissions } from 'expo';
import {
  StyleSheet, Text,
  TouchableHighlight,
  TextInput, View,
  Button, ImageEditor,
} from 'react-native';
import firebaseSvc from '../Pages/FirebaseSvc';
import styles1 from '../Pages/pageStyleTest';

export default class CreateAccount extends React.Component{
  static navigationOptions = {
    title: 'Scv Chatter',
  };

  state = {
    name: 'no name',
    email: 'test3@gmail.com',
    password: 'test123',
    avatar: '',
  };

  onPressCreate = async () => {
    try {
      const user = {
        name: this.state.name,
        email: this.state.email,
        password: this.state.password,
      };
      await firebaseSvc.createAccount(user);
    } catch ({ message }) {
      console.log('create account failed. catch error:' + message);
    }
  };

  createAccount = async (user) => {
    firebase.auth()
    .createUserWithEmailAndPassword(user.email, user.password)
    .then(function() {
      var userf = firebase.auth().currentUser;
      userf.updateProfile({ displayName: user.name})
      .then(function() {
        alert("User was created successfully.");
      }, function(error) {
        console.warn("Error update displayName.");
      });
    }, function(error) {
      alert("Create account failed. Error: "+error.message);
    });
  }

  onChangeTextEmail = email => this.setState({ email });
  onChangeTextPassword = password => this.setState({ password });
  onChangeTextName = name => this.setState({ name });

  onImageUpload = async () => {
    const { status: cameraRollPerm } = await Permissions.askAsync(
      Permissions.CAMERA_ROLL
    );
    try {
      // only if user allows permission to camera roll
      if (cameraRollPerm === 'granted') {
        let pickerResult = await ImagePicker.launchImageLibraryAsync({
          allowsEditing: true,
          aspect: [4, 3],
        });
        console.log(
          'ready to upload... pickerResult json:' + JSON.stringify(pickerResult)
        );

        var wantedMaxSize = 150;
        var rawheight = pickerResult.height;
        var rawwidth = pickerResult.width;
        var ratio = rawwidth / rawheight;
        var wantedwidth = wantedMaxSize;
        var wantedheight = wantedMaxSize/ratio;
        // check vertical or horizontal
        if(rawheight > rawwidth){
            wantedwidth = wantedMaxSize*ratio;
            wantedheight = wantedMaxSize;
        }
        let resizedUri = await new Promise((resolve, reject) => {
          ImageEditor.cropImage(pickerResult.uri,
          {
              offset: { x: 0, y: 0 },
              size: { width: pickerResult.width, height: pickerResult.height },
              displaySize: { width: wantedwidth, height: wantedheight },
              resizeMode: 'contain',
          },
          (uri) => resolve(uri),
          () => reject(),
          );
        });
        let uploadUrl = await firebaseSvc.uploadImage(resizedUri);
        this.setState({avatar: uploadUrl});
        await firebaseSvc.updateAvatar(uploadUrl);
      }
    } catch (err) {
      console.log('onImageUpload error:' + err.message);
      alert('Upload image error:' + err.message);
    }
  };

  render() {
    return (
      <View style={styles1.containerChat}>
      <View style={styles1.Header}>
                    <Text style={styles1.textBigLogInChat}>יצירת חשבון</Text>
                </View>
        <Text style={styles.title}>Email:</Text>
        <TextInput
          style={styles.TxtInp}
          placeHolder="test3@gmail.com"
          onChangeText={this.onChangeTextEmail}
          value={this.state.email}
        />
        <Text style={styles.title}>Password:</Text>
        <TextInput
          style={styles.TxtInp}
          onChangeText={this.onChangeTextPassword}
          value={this.state.password}
        />
        <Text style={styles.title}>Name:</Text>
        <TextInput
          style={styles.TxtInp}
          onChangeText={this.onChangeTextName}
          value={this.state.name}
        />
        {/* <Button
          title="Create Account"
          style={styles.buttonText}
          onPress={this.onPressCreate}
        /> */}

<TouchableHighlight style={[styles1.buttonContainer, styles1.loginButton]} 
        onPress={this.onPressCreate}>
          <Text style={styles1.loginText}>Create Account</Text>
        </TouchableHighlight>

        {/* <Button
          title="Upload Avatar Image"
          style={styles.buttonText}
          onPress={this.onImageUpload}
        /> */}

<TouchableHighlight style={[styles1.buttonContainer, styles1.loginButton]} 
        onPress={this.onImageUpload}>
          <Text style={styles1.loginText}>Upload Avatar Image</Text>
        </TouchableHighlight>
        
      </View>
    );
  }
}

const offset = 16;
const styles = StyleSheet.create({
  title: {
    marginTop: offset,
    marginLeft: offset,
    fontSize: offset,
  },
  nameInput: {
    height: offset * 2,
    margin: offset,
    paddingHorizontal: offset,
    borderColor: '#111111',
    borderWidth: 1,
    fontSize: offset,
  },
  buttonText: {
    marginLeft: offset,
    fontSize: 42,
  },
});

//export default CreateAccount;