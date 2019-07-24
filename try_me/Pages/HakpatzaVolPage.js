import React from 'react';
import { ScrollView, Image, StyleSheet, TouchableHighlight, View, Text, Alert, ListView, Platform } from 'react-native';
import styles from './pageStyleTest';
import geolib from 'geolib'
import { AsyncStorage } from 'react-native';
import { Avatar, Badge, withBadge, colors, Button, ButtonGroup } from 'react-native-elements';

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
    }
    )

    await AsyncStorage.getItem('Type', (err, result) => {
      if (result != null) {
        this.setState({ type: JSON.parse(result) });
      }
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
    if (Platform.OS==='ios') {
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
        return (
          <View>
          <View style={{alignItems: 'center', marginTop: '50%'}}>

            <Text style={stylesIphone.textStyle1}>הוקפצת לאירוע! {this.state.actEvent.eventName}</Text>
            <Text style={stylesIphone.textStyle2}>אנא אשר הגעה אם ביכולתך להגיע</Text>

            <View style={{alignItems: 'center', marginTop: '20%'}}>
              <Button
              title="מאשר"
              titleStyle={{ fontWeight: 'bold', fontSize: 18 }}
              linearGradientProps={{
                colors: ['#98B0E3', '#8FD1DF'],
                start: [1, 0],
                end: [0.2, 0],
              }}
              buttonStyle={{
                borderWidth: 0,
                borderColor: 'transparent',
                borderRadius: 20,
              }}
              containerStyle={{ marginVertical: 10, height: 40, width: 200 }}
              icon={{
                name: 'fire',
                type: 'font-awesome',
                size: 15,
                color: 'white',
              }}
              iconRight
              iconContainerStyle={{ marginLeft: 10, marginRight: -10 }}
              onPress={this.volApproves}
            />
            </View>

          </View>
          </View>
        );
      }
    }
    else
      return (
        <View>
          <Text style={stylesIphone.noEvent}>
            לא קיים אירוע
      </Text>
        </View>
      )
  }
  else{
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
        return (
          <View>
          <View style={{alignItems: 'center', marginTop: '50%'}}>

            <Text style={stylesIphone.textStyle1}>הוקפצת לאירוע! {this.state.actEvent.eventName}</Text>
            <Text style={stylesIphone.textStyle2}>אנא אשר הגעה אם ביכולתך להגיע</Text>
            <View style={{alignItems: 'center', marginTop: '20%'}}>
              <Button
              title="מאשר"
              titleStyle={{ fontWeight: 'bold', fontSize: 18 }}
              linearGradientProps={{
                colors: ['#98B0E3', '#8FD1DF'],
                start: [1, 0],
                end: [0.2, 0],
              }}
              buttonStyle={{
                borderWidth: 0,
                borderColor: 'transparent',
                borderRadius: 20,
              }}
              containerStyle={{ marginVertical: 10, height: 40, width: 200 }}
              icon={{
                name: 'fire',
                type: 'font-awesome',
                size: 15,
                color: 'white',
              }}
              iconRight
              iconContainerStyle={{ marginLeft: 10, marginRight: -10 }}
              onPress={this.volApproves}
            />
            </View>
          </View>
          </View>
        );
      }
    }
    else
      return (
        <View>
          <Text style={stylesIphone.noEvent}>
            לא קיים אירוע
      </Text>
        </View>
      )
  }
}
}

const stylesIphone = StyleSheet.create({
  textStyle1: {
fontSize:40,
fontWeight: 'bold',
textAlign: 'center',
alignItems: 'center',
marginBottom: 10,
color: '#ff8080',
},
textStyle2: {
  fontSize:20,
  textAlign: 'center',
  alignItems: 'center',
  },
  noEvent: {
    fontSize:40,
    fontWeight: 'bold',
    textAlign: 'center',
    alignItems: 'center',
    marginTop: '50%',
  },
});
