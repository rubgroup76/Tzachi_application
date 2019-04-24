// import React, { Component } from 'react'; 
// import {
//   widthPercentageToDP as wp,
//   heightPercentageToDP as hp,
//   listenOrientationChange as lor,
//   removeOrientationListener as rol
// } from 'react-native-responsive-screen';

// import registerForPushNotificationsAsync from '../Components/registerForPushNotificationsAsync';
// import { Notifications } from 'expo';

// import {
//   StyleSheet,
//   Text,
//   View,
//   TextInput,
//   Button,
//   TouchableHighlight,
//   Image,
//   Alert,
//   Picker
// } from 'react-native';

// import styles from './pageStyleTest';

// export default class LoginView extends Component {

//     static navigationOptions = {
//         title: 'הקפצה לאירוע חירום',
//         headerStyle: {
//           backgroundColor: '#483d8b',
//         },
//         headerTintColor: '#fff',
//         headerTitleStyle: {
//           fontWeight: 'bold',
//         },
//       };

//   constructor(props) {
//     super(props);
//     state = {

//       PickerValue: '',
//        choosenindex: ''
 
//     }
//   }
//   render() {
//     return (
//       <View style={styles.container}>
//       <View style={styles.Header}>
//                     <Text style={styles.textBigLogIn}>ברוכים הבאים</Text>
//                 </View>
//                 <Image
//                    //style={{position: 'absolute',top:130,right:-75, width:150, height:150}}
//                     //style={{justifyContent: 'center',width:150, height:150}}
//                    // style={{height: hp('30%'), width: wp('55%')}}
//                    style={{marginBottom: 40, marginTop:10, height: hp('20%'),width: wp('40%') }}
//                         source={require('../assets/hamaapilLogo.png')} />
//         <View style={styles.inputContainer}>
//           <Image style={styles.inputIcon} source={{uri: 'https://png.icons8.com/person'}}/>
//           <TextInput style={styles.inputs}
//               placeholder="ID"
//               keyboardType="numeric"
//               underlineColorAndroid='transparent'
//               onChangeText={(text) => this.setState({ txtID: text })}
              
//               // onChangeText={(id) => this.setState({txtID})}
//               />
//         </View >
//         <View style={styles.container}>
//  <Picker
//  style={{width:'80%'}}
//  selectedValue={this.state.PickerValue}
//  onValueChange={(itemValue, itemIndex)=>setState({PickerValue
//   :itemValue})}
//  >
// <Picker.Item label="aviv" value="Aviv"/>
// <Picker.Item label="reut" value="Reut"/>
//  </Picker>
//         </View>
//         <View style={styles.inputContainer}>
//           <Image style={styles.inputIcon} source={{uri: 'https://png.icons8.com/key'}}/>
//           <TextInput style={styles.inputs}
//               placeholder="Password"
//               secureTextEntry={true}
//               underlineColorAndroid='transparent'
//               onChangeText={(text) => this.setState({ txtPass: text })}/>
//         </View>

//         <TouchableHighlight style={[styles.buttonContainer, styles.loginButton]} 
//         onPress={this.btnPOST_Person}>
//           <Text style={styles.loginText}>Login</Text>
//         </TouchableHighlight>

//         <TouchableHighlight style={styles.buttonContainer} onPress={() => this.onClickListener('restore_password')}>
//             <Text>Forgot your password?</Text>
//         </TouchableHighlight>

//         <TouchableHighlight style={styles.buttonContainer} onPress={() => this.onClickListener('register')}>
//             <Text>Register</Text>
//         </TouchableHighlight>
//       </View>
//     );
//   }
// }
