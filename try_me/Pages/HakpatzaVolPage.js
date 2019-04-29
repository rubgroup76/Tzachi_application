import React from 'react';
import {
  Notifications,
} from 'expo';
import {
  Text,
  View,
} from 'react-native';

// This refers to the function defined earlier in this guide
import registerForPushNotificationsAsync from '../Components/registerForPushNotificationsAsync';

export default class HakpatzaVol extends React.Component {
  state = {
    notification: {},
  };

  componentDidMount() {
    registerForPushNotificationsAsync();

    // Handle notifications that are received or selected while the app
    // is open. If the app was closed and then opened by tapping the
    // notification (rather than just tapping the app icon to open it),
    // this function will fire on the next tick after the app starts
    // with the notification data.
    this._notificationSubscription = Notifications.addListener(this._handleNotification);
  }

  _handleNotification = (notification) => {
    this.setState({notification: notification});
  };

  render() {
    return (
      <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
        <Text>Origin: {this.state.notification.origin}</Text>
        <Text>Data: {JSON.stringify(this.state.notification.data)}</Text>
      </View>
    );
  }
}

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