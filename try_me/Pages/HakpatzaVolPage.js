import React from 'react';
import { ScrollView, StyleSheet, TouchableHighlight, View, Text, Alert, ListView, Platform } from 'react-native';
import registerForPushNotificationsAsync from '../Components/registerForPushNotificationsAsync';
import { Notifications } from 'expo';
import styles from './pageStyleTest';
import geolib from 'geolib'

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
    x=0;
    y=0;

    navigator.geolocation.getCurrentPosition(
      (position) => {
        x=position.coords.longitude
        y=position.coords.latitude
        console.warn(x_event);
        console.warn(y_event);
        //alert(position.coords.longitude)
        //alert(position.coords.latitude)
        distance=geolib.getDistance(
          { lat: y, lon: x },
          { lat: y_event, lon: x_event }
            );
        //    console.log(distance)


        VolApproves={
          Id:id,
          Team:team,
          EventName:name,
          EventNum:num,
          X_Location:x,
          Y_Location:y,
          Token:token,
          X_Event:x_event,
          Y_Event:y_event,
          Distance:distance
        }
        //alert(VolApproves.Distance)
        fetch('http://proj.ruppin.ac.il/bgroup76/prod/api/volapproves', {
          method: 'POST',
          body: JSON.stringify(VolApproves),
          headers: {
            "Content-type": "application/json; charset=UTF-8"
          }
        })
           .then(response => {
            response.json;})
            .then(alert("good"))
          
          .catch(error => console.warn('Error:'+error));
      },
      (error) => alert("err:"+error.message),
      { enableHighAccuracy: true, timeout: 20000, maximumAge: 1000 }
    );
  }
  render() {

    if(typeof this.props.navigation.state.params!="undefined"){
      id=this.props.navigation.state.params.id;
     name=this.props.navigation.state.params.evName;
     num=this.props.navigation.state.params.evNum;
     token=this.props.navigation.state.params.token;
     team=this.props.navigation.state.params.team;
     x_event=this.props.navigation.state.params.x_event;
     y_event=this.props.navigation.state.params.y_event;
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
    else
    return(
    <View>
      <Text>
      לא קיים אירוע
      </Text>
    </View>
    )
  }

}
