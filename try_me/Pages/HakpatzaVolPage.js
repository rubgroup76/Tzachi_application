import React from 'react';
import { ScrollView, StyleSheet, View, Text, Alert, ListView, Platform } from 'react-native';
import registerForPushNotificationsAsync from '../Components/registerForPushNotificationsAsync';
import { Notifications } from 'expo';

export default class HakpatzaVol extends React.Component {
 
  constructor(props) {
    super(props);

    this.state = {
      notification: {},
      userID: '',
      notificationsAvailable: [],
      error: '',
    };
  }
  // componentDidMount() {
  //   console.warn('good');
  //   this._notificationSubscription = this._registerForPushNotifications();
  //  // this._clearIconBadgeAsync();  
  // }
  // componentWillUnmount() {
  //   this._notificationSubscription && this._notificationSubscription.remove();
  
    
  // }

  // //use later for push notification description
  render() {
    return (
      <View>
<Text>hi</Text>
        {/* <Text>Origin: {this.state.notification.origin}</Text>
        <Text>Data: {JSON.stringify(this.state.notification.data)}</Text> */}
      </View>

    );
  }

  // _registerForPushNotifications() {
  //   // Send our push token over to our backend so we can receive notifications
  //   // You can comment the following line out if you want to stop receiving
  //   // a notification every time you open the app. Check out the source
  //   // for this function in api/registerForPushNotificationsAsync.js
  //   registerForPushNotificationsAsync();

  //   // Watch for incoming notifications
  //   this._notificationSubscription = Notifications.addListener(
  //     this._handleNotification
  //   );
  // }
  // _handleNotification = (notification) => {
  //   alert('good')
  //   //this.props.navigation.navigate('Notifications');
  //   //this.setState({ notification: notification });
  // };
}

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     paddingTop: 15,
//     backgroundColor: '#fff',
//   },
// });

// import React, { Component } from 'react';
// import styles2 from './pageStyle';
// import {
//   Platform,
//   StyleSheet,
//   Text,
//   View,Button,Picker,TextInput,FormLabel, FormInput
// } from 'react-native';

// import {Notifications} from 'expo';

// import registerForPushNotificationsAsync from '../Components/registerForPushNotificationsAsync';


// export default class HakpatzaVol extends Component {
// 	constructor(){
// 		super();
// 		this.state={
//       notification: {},
//             PickerValue:''	,
//             events:	''	
//         };
//         this.state = {
//             txtAmountPeople:"reut",
//             // txtPass: '123456',
//             // userId:"",
//             // userName:"",
//             // token:"",
//             // userCode:0
//         }
      
		
//   };

//   componentDidMount() {
//     registerForPushNotificationsAsync();

//     // Handle notifications that are received or selected while the app
//     // is open. If the app was closed and then opened by tapping the
//     // notification (rather than just tapping the app icon to open it),
//     // this function will fire on the next tick after the app starts
//     // with the notification data.
//     this._notificationSubscription = Notifications.addListener(this._handleNotification);
    
//   }

//   _handleNotification = (notification) => {
//     this.setState({notification: notification});
//   };

//   // PostActualEvent() {
//   //   let newEvent = {
//   //     EventName: this.state.PickerEventValue,
//   //     Severity: this.state.PickerSeverityValue,
//   //     VolsAmount: this.state.txtAmountPeople,      

//   //   };

//   //   fetch('http://proj.ruppin.ac.il/bgroup76/prod/api/actualevent', {
//   //     method: 'POST',
//   //     body: JSON.stringify(newEvent),
//   //     headers: {
//   //       "Content-type": "application/json; charset=UTF-8"
//   //     }
//   //   })

//   //     //.then(res => res.json())
//   //     .then(response => {
//   //       alert("good");
//   //     })
//   //     .catch(error => console.warn('Error:'+error));
//   // }

//   render() {
//     return (
//       <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
//       <Text>Origin: {this.state.notification.origin}</Text>
//       <Text>Data: {JSON.stringify(this.state.notification.data)}</Text>
//     </View>
//     );
//   }
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     justifyContent: 'center',
//     alignItems: 'center',
//     backgroundColor: '#F5FCFF',
//   },
//   welcome: {
//     fontSize: 18,
//     textAlign: 'right',
//     margin: 10,
//   },
//   instructions: {
//     textAlign: 'right',
//     color: '#333333',
//     marginBottom: 5,
//   },
//   TxtInp: {
//     height: 30,
//     width: 55,
//     borderColor: '#00008b',
//     borderWidth: 1,
//     margin: 10,
//     fontSize:20,
//     padding:6,
//     borderRadius:5,
//     textAlign:'center',
// },
// });