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
    // if(this.props.navigation.state.params.evName!=null)
    // name=this.props.navigation.state.params.evName;
    // else
    // name='';
    return (
      <View>
{/* <Text>{name}</Text>  */}
 <Text>aviv</Text>  
        {/* <Text>Origin: {this.state.notification.origin}</Text>
        <Text>Data: {JSON.stringify(this.state.notification.data)}</Text> */}
      </View>

    );
  }

}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 15,
    backgroundColor: '#fff',
  },
});
