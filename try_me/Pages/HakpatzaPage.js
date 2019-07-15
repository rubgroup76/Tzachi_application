import React, { Component } from 'react';
import styles2 from './pageStyle';
import {
  Platform,
  StyleSheet,
  Text,
  View, Picker, Dimensions, TextInput, FormLabel, FormInput, TouchableWithoutFeedback, Keyboard
} from 'react-native';
import { Button } from 'react-native-material-ui';
import { MapView } from 'expo';
const { Marker } = MapView;

const DisdmissKeyboard=({children})=>(
<TouchableWithoutFeedback onPress={()=>Keyboard.dismiss()}>
  {children}
</TouchableWithoutFeedback>
);
export default class Hakpatza extends Component {

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
  constructor() {
    super();
    this.state = {
      PickerValue: '',
      events: ''
    };
    this.state = {
      txtAmountPeople: 0,
      txtX: 34.98571,
      txtY: 32.37821,
      latitude: 32.378045,
      longitude: 34.983458,
      marker: null
    }


  };
  clickMe = () => {
    var data = this.state.PickerValue;
    if (data == "") {
      alert("Please Select an Option");
    }
    else {
      this.postActualEvent();
    }
  }
  componentDidMount() {
    fetch('http://proj.ruppin.ac.il/bgroup76/prod/api/emergevents')
      .then(response => response.json())
      .then(response => this.setState({ events: response }))
      .catch(error => console.warn('Error:', error.message));
  }

  postActualEvent() {
    if(this.state.PickerEventValue==undefined || this.state.PickerSeverityValue==undefined || this.state.txtAmountPeople==0){
    alert("עלייך למלא את כל השדות")
    }
    else{
    let ActualEvent = {
      EventName: this.state.PickerEventValue,
      Severity: this.state.PickerSeverityValue,
      VolsAmount: this.state.txtAmountPeople,
      ELocation_X: this.state.txtX,
      ELocation_Y: this.state.txtY,
    };
    alert(this.state.PickerEventValue + " " + ActualEvent.Severity + " " + ActualEvent.VolsAmount)

    fetch('http://proj.ruppin.ac.il/bgroup76/prod/api/actualevent', {
      method: 'POST',
      body: JSON.stringify(ActualEvent),
      headers: {
        "Content-type": "application/json; charset=UTF-8"
      }
    })
      .then(response => {
      })
      .catch(error => console.warn('Error:' + error));
  }
}

  onMapPress(e) {
    this.setState({
      txtX: e.nativeEvent.coordinate.longitude, txtY: e.nativeEvent.coordinate.latitude
    })

    this.setState({
      marker:
      {
        coordinate: e.nativeEvent.coordinate,
        key: 1,
      },
    });
  }

  render() {
    if (this.state.events == null) {
      return (<View>
        <Text>loading..</Text>
      </View>)
    }
    else {
      let eventsItems = this.state.events.map((s, i) => {
        return <Picker.Item key={i} value={s.EventName} label={s.EventName} />
      });

      return (
        <DisdmissKeyboard>
        <View style={styles.container}>
          {/* <Text style={styles.welcome}>
            סוג אירוע
        </Text> */}
          <Picker
            style={styles.picker}
            selectedValue={this.state.PickerEventValue}
            onValueChange={(itemValue, itemIndex) => this.setState({ PickerEventValue: itemValue })}
          >
            <Picker.Item label="בחר את סוג האירוע" value="" />
            {eventsItems}

          </Picker>

          {/* <Text style={styles.welcome}>
            חומרה
        </Text> */}
          <Picker
            style={styles.picker}
            selectedValue={this.state.PickerSeverityValue}
            onValueChange={(itemValue, itemIndex) => this.setState({ PickerSeverityValue: itemValue })}
          >
            <Picker.Item label="בחר את חומרת האירוע" value="" />
            <Picker.Item label="קלה" value="קלה" />
            <Picker.Item label="בינונית" value="בינונית" />
            <Picker.Item label="גבוהה" value="גבוהה" />
          </Picker>

          <Text style={styles.welcome}> בחר כמות אנשים להקפצה:</Text>
          <TextInput
            style={styles.TxtInp}
            onChangeText={(text) => this.setState({ txtAmountPeople: text })}
            keyboardType="numeric"
            
          />
          <Text style={styles.welcome}> מקם את האירוע</Text>
          <MapView
          mapType="satellite"
            style={{
              flex: 2,
              width: Dimensions.get('window').width - 30,

            }}
            onPress={e => this.onMapPress(e)}
            region={{
              latitude: this.state.latitude,
              longitude: this.state.longitude,
              latitudeDelta: 0.0075,
              longitudeDelta: 0.0075,
            }}
          >
            {this.state.marker &&
              <Marker
                key={this.state.marker.key}
                coordinate={this.state.marker.coordinate}
              />
            }
          </MapView>

          <Button style={styles.button}  primary text="הקפץ" onPress={this.clickMe} />
          {/* <Button title="הקפץ" onPress={this.clickMe} /> */}
        </View>
        </DisdmissKeyboard>
      );
    }
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',

  },
  welcome: {
    fontSize: 18,
    textAlign: 'right',
    margin: 10,
    fontWeight:'bold'

  },
  instructions: {
    textAlign: 'right',
    color: '#333333',
    marginBottom: 5,
  },
  TxtInp: {
    height: 35,
    width: 55,
    borderColor: '#00008b',
    borderWidth: 1,
    margin: 10,
    fontSize: 20,
    padding: 6,
    borderRadius: 5,
    textAlign: 'center',
  },
  picker: {
    width: '80%',
    height:'10%',
    transform: [
      { scaleX: 1.1 }, 
      { scaleY: 1.1 },
   ],
  },
  button:{
    width: '10%',
    height:'10%',
    backgroundColor:'#333333',
    fontSize: 30
  }
  
});