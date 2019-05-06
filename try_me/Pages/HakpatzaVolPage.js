import React from 'react';
import { ScrollView, StyleSheet, TouchableHighlight, View, Text, Alert, ListView, Platform } from 'react-native';
import registerForPushNotificationsAsync from '../Components/registerForPushNotificationsAsync';
import { Notifications } from 'expo';
import styles from './pageStyleTest';

export default class HakpatzaVol extends React.Component {
 
  constructor(props) {
    super(props);

    this.state = {
      notification: {},
      x: 0,
      notificationsAvailable: [],
      y: 0,
    };
  }

  volApproves(){
    pos=null;
    navigator.geolocation.getCurrentPosition(
      (position) => {
       this.setState({x:position.coords.longitude, y:position.coords.latitude});
        const output =
          'latitude=' + position.coords.latitude +
          '\nlongitude=' + position.coords.longitude +
          '\naltitude=' + position.coords.altitude +
          '\nheading=' + position.coords.heading +
          '\nspeed=' + position.coords.speed

          alert(position.coords.longitude);
      });
    //x="34.98571";
    //y="32.37821";
    // VolApproves={
    //   Id:id,
    //   Team:team,
    //   EventName:name,
    //   EventNum:num,
    //   X_Location:this.state.x,
    //   Y_Location:this.state.y,
    //   Token:token
    // }
    // fetch('http://proj.ruppin.ac.il/bgroup76/prod/api/volapproves', {
    //   method: 'POST',
    //   body: JSON.stringify(VolApproves),
    //   headers: {
    //     "Content-type": "application/json; charset=UTF-8"
    //   }
    // })
    //    .then(response => {
    //     response.json;
    //   })
    //   .then(alert("אישרת הגעה"))
    //   .catch(error => console.warn('Error:'+error));
  }
  render() {

    if(typeof this.props.navigation.state.params!="undefined"){
      id=this.props.navigation.state.params.id;
     name=this.props.navigation.state.params.evName;
     num=this.props.navigation.state.params.evNum;
     token=this.props.navigation.state.params.token;
     team=this.props.navigation.state.params.team;
    }
    else
    name='לא קיים אירוע';
    return (
      <View>
 
 <Text>הוקפצת לאירוע {name}</Text> 
  <Text>אנא אשר הגעה אם ביכולתך להגיע</Text>
  <TouchableHighlight style={[styles.buttonContainer, styles.loginButton]} 
        onPress={this.volApproves}
        >
          <Text style={styles.loginText}>מאשר</Text>
        </TouchableHighlight>

        {/* <Text>Origin: {this.state.notification.origin}</Text>
        <Text>Data: {JSON.stringify(this.state.notification.data)}</Text> */}
      </View>

    );
  }

}
