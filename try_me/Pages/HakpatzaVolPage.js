import React from 'react';
import { ScrollView, StyleSheet, TouchableHighlight, View, Text, Alert, ListView, Platform } from 'react-native';
import styles from './pageStyleTest';
import geolib from 'geolib'
import { AsyncStorage } from 'react-native';

export default class HakpatzaVol extends React.Component {
  static navigationOptions = {
    title: 'הקפצה לאירוע חירום',
    headerStyle: {
      backgroundColor: '#8FD1DF',
    },
    headerTintColor: '#fff',
    headerTitleStyle: {
      fontWeight: 'bold',
    },
  };
  constructor(props) {
    super(props);
    this.state = {
      noEvent: 0,
      actEvent: '',
      type: ''
    }
  }


  componentWillMount() {
    fetch('http://proj.ruppin.ac.il/bgroup76/prod/api/actualeventnow')
      .then(response => response.json())

      .then(response => {
        if (response.EventName != null) {
          this.setState({ noEvent: 1, event: response.EventName })
        }
        else{
          this.deleteLocalStorage();
        }
      })
      .catch(error => console.warn('Error:', error.message));

  }
  async deleteLocalStorage() {

    try {
      await AsyncStorage.removeItem('Event');
  

      return true;
    }
    catch (exception) {
      return false;
    }


  }
  async UNSAFE_componentWillMount() {
    setTimeout(() => {
      this.getLocalStorage();
    }, 500);


  }
  getLocalStorage = async () => {
    await AsyncStorage.getItem('Event', (err, result) => {
      if (result != null) {
        this.setState({ actEvent: JSON.parse(result) });
      }
      //else alert('err event');
    }
    )

    await AsyncStorage.getItem('Type', (err, result) => {
      if (result != null) {
        this.setState({ type: JSON.parse(result) });
      }
      //else alert('err type');
    }
    )
  }

  volApproves() {
    x = 0;
    y = 0;

    navigator.geolocation.getCurrentPosition(
      (position) => {
        x = position.coords.longitude
        y = position.coords.latitude
        distance = geolib.getDistance(
          { lat: y, lon: x },
          { lat: y_event, lon: x_event }
        );

        VolApproves = {
          Id: id,
          Team: team,
          EventName: name,
          EventNum: num,
          X_Location: x,
          Y_Location: y,
          Token: token,
          X_Event: x_event,
          Y_Event: y_event,
          Distance: distance
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
            response.json;
          })
          .then(alert("אישרת הגעה. אם יוחלט להקפיץ אותך תקבל הודעה על כך"))

          .catch(error => console.warn('Error:' + error));
      },
      (error) => alert("err:" + error.message),
      { enableHighAccuracy: true, timeout: 20000, maximumAge: 1000 }
    );
  }
  render() {

    // if (typeof this.props.navigation.state.params != "undefined") {
    if (this.state.noEvent == 1) {
      if (this.state.type == 1) {
        this.props.navigation.navigate('ActualHakpatza')
      return <View><Text></Text></View>;
      }
      
      else {
        id = this.state.actEvent.id;
        name = this.state.actEvent.eventName;
        num = this.state.actEvent.eventNumber;
        token = this.state.actEvent.token;
        team = this.state.actEvent.team;
        x_event = this.state.actEvent.x_event;
        y_event = this.state.actEvent.y_event;
        // type = this.props.navigation.state.params.type;
        return (
          <View>

            <Text>הוקפצת לאירוע {this.state.actEvent.eventName}</Text>
            <Text>אנא אשר הגעה אם ביכולתך להגיע</Text>
            <TouchableHighlight style={[styles.buttonContainer, styles.loginButton]}
              onPress={this.volApproves}
            >
              <Text style={styles.loginText}>מאשר</Text>
            </TouchableHighlight>
            <Text>{this.state.actEvent.eventNumber}</Text>
            {/* <Text>Origin: {this.state.notification.origin}</Text>
        <Text>Data: {JSON.stringify(this.state.notification.data)}</Text> */}
          </View>

        );
      }
    }
    else
      return (
        <View>
          <Text>
            לא קיים אירוע
      </Text>
        </View>
      )
  }

}
