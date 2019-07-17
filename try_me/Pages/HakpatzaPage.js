import React, { Component } from 'react';
import styles2 from './pageStyle';
import {
  Platform,
  StyleSheet,
  Text,
  View, Picker, Dimensions,ScrollView, TextInput, FormLabel, FormInput, TouchableWithoutFeedback, Keyboard
} from 'react-native';
import { Button } from 'react-native-elements';
import { MapView } from 'expo';
const { Marker } = MapView;

const DisdmissKeyboard=({children})=>(
<TouchableWithoutFeedback onPress={()=>Keyboard.dismiss()}>
  {children}
</TouchableWithoutFeedback>
);

export default class Hakpatza extends Component {

  static navigationOptions = {
    title: 'הקפצת מתנדבים',
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
    if (Platform.OS==='ios') {
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
        <ScrollView keyboardShouldPersistTaps="handled" showsVerticalScrollIndicator={true} style={stylesIphone.Stylescrollview}>
       <DisdmissKeyboard>
        <View style={stylesIphone.container1}>
          {/* <Text style={styles.welcome}>
            סוג אירוע
        </Text> */}
        {/* <View> */}
        <View style={[{justifyContent: 'flex-start'}, stylesIphone.elementsContainer]}>
        <View style={stylesIphone.pickerview}>
          <Picker
            style={stylesIphone.picker1}
            selectedValue={this.state.PickerEventValue}
            onValueChange={(itemValue, itemIndex) => this.setState({ PickerEventValue: itemValue })}
          >
            <Picker.Item label="בחר את סוג האירוע" value="" />
            {eventsItems}

          </Picker>
          </View>
          {/* <Text style={styles.welcome}>
            חומרה
        </Text> */}
        <View style={stylesIphone.pickerview}>
          <Picker
            style={stylesIphone.picker2}
            selectedValue={this.state.PickerSeverityValue}
            onValueChange={(itemValue, itemIndex) => this.setState({ PickerSeverityValue: itemValue })}
          >
            <Picker.Item label="בחר את חומרת האירוע" value="" />
            <Picker.Item label="קלה" value="קלה" />
            <Picker.Item label="בינונית" value="בינונית" />
            <Picker.Item label="גבוהה" value="גבוהה" />
          </Picker>
          </View>
          <View style={stylesIphone.welcome1}>
          <Text style={stylesIphone.welcome}> בחר כמות אנשים להקפצה:</Text>
          <View style ={{alignItems: 'center', marginTop: -20}}>
          <TextInput
            style={stylesIphone.TxtInp}
            onChangeText={(text) => this.setState({ txtAmountPeople: text })}
            keyboardType="numeric"
            
          />
          </View>
          </View>
          <View style={stylesIphone.picker1}>
          <Text style={stylesIphone.welcome}> מקם את האירוע:</Text>
          <MapView
          mapType="satellite"
            style={{
              flex: 1,
              width: Dimensions.get('window').width - 50,
              height: 300,
              marginRight:40,
              alignItems: 'center'
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
          </View>
          {/* <Button style={styles.button}  primary text="הקפץ" onPress={this.clickMe} /> */}
          <View style={{marginTop: 290 , alignItems: 'center' , marginRight: 40}}>
          <Button
                title="הקפץ"
                iconContainerStyle={{ marginRight: 10, marginTop: 20 }}
                titleStyle={{ fontWeight: '600' }}
                buttonStyle={{
                  //backgroundColor: 'rgba(199, 43, 98, 1)',
                  backgroundColor: '#8FD1DF',
                  borderColor: 'transparent',
                  borderWidth: 0,
                  borderRadius: 20,
                  marginBottom: -10,
                  // position: 'absolute',
                  // marginBottom: 1,
                }}
                containerStyle={{ width: 100 }}
                onPress={this.clickMe}
              />
              </View>
          {/* <Button title="הקפץ" onPress={this.clickMe} /> */}
        {/* </View> */}
        </View>
        </View>
         </DisdmissKeyboard>
         </ScrollView>
      );
    }
  }
  else{
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
          <Text style={styles.welcome}> מקם את האירוע:</Text>
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

          {/* <Button style={styles.button}  primary text="הקפץ" onPress={this.clickMe} /> */}
          {/* <Button title="הקפץ" onPress={this.clickMe} /> */}
          <Button
                title="הקפץ"
                iconContainerStyle={{ marginRight: 10, marginTop: 20 }}
                titleStyle={{ fontWeight: '600' }}
                buttonStyle={{
                  //backgroundColor: 'rgba(199, 43, 98, 1)',
                  backgroundColor: '#8FD1DF',
                  borderColor: 'transparent',
                  borderWidth: 0,
                  borderRadius: 20,
                }}
                containerStyle={{ width: 100 }}
                onPress={this.clickMe}
              />
        </View>
        </DisdmissKeyboard>
      );
    }
  }
  }
}
const stylesIphone = StyleSheet.create({
  container1: {
    flex: 1,
    flexDirection: 'column',
    justifyContent:'space-around',
    backgroundColor: '#f1f1f1',
    alignItems: 'center',
    //marginTop: -20,
    //justifyContent: 'center',
   // fontSize: 30,
},
  welcome: {
    fontSize: 18,
    textAlign: 'right',
    //margin: -5,
    fontWeight:'bold',
    marginBottom: 30,
    marginTop: 10,
    marginRight: 50,
    //marginLeft: -50,
  },
  welcome1: {
    //marginBottom: 10,
    marginTop: 50,
  },
  elementsContainer: {
    flex:1,
    //flexGrow: 1,
    backgroundColor: '#ecf5fd',
    marginLeft: 24,
    //marginRight: 24,
    marginBottom: 10,
    //marginTop: -10,
  },
  Stylescrollview:{
    borderRightColor: 'red',
    borderRadius: 5,
    borderWidth: 1,
  },
  // instructions: {
  //   textAlign: 'right',
  //   color: '#333333',
  //   marginBottom: 5,
  // },

  TxtInp: {
    height: 35,
    width: 70,
    borderColor: '#00008b',
    borderWidth: 1,
    //margin: 10,
    fontSize: 20,
    padding: 6,
    borderRadius: 6,
    textAlign: 'left',
    alignItems: 'center',
  },
  picker1: {
    width: '80%',
    height:'10%',
    //marginBottom: 10,
    marginLeft: 24,
    //marginTop: 10,
    //position: "absolute",
   // margin: -10,
    //padding: 10,
    transform: [
      { scaleX: 1.1 }, 
      { scaleY: 1.1 },
   ],
  },
  picker11: {
    width: '80%',
    height:'10%',
    //marginBottom: 10,
    marginLeft: 24,
    //marginTop: 10,
    //position: "absolute",
   // margin: -10,
    //padding: 10,
  },
  picker2: {
    width: '80%',
    height:'12%',
    marginBottom: 12,
    marginLeft: 24,
    marginTop: 15,
    marginBottom: 20,
    transform: [
      { scaleX: 1.1 }, 
      { scaleY: 1.1 },
   ],
  },
  pickerview: {
    position: "relative",
    //margin: -20,
    //marginBottom: 10,
    marginTop: 10,
    marginBottom: 20,
  },
  button:{
    marginTop:60,
  }
});

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
    marginLeft: 20,
    borderStyle: 'solid',
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