 import React, { Component } from 'react'
 import { TouchableOpacity, StyleSheet, Text, View } from 'react-native'
 import { Popup } from 'react-native-map-link'
 import {AsyncStorage} from 'react-native';

 export default class ActualHakpatza extends Component {
  static navigationOptions = {
    title: 'אירוע הקפצה',
    headerStyle: {
      backgroundColor: '#8FD1DF',
    },
    headerTintColor: '#fff',
    headerTitleStyle: {
      fontWeight: 'bold',
    },
    right: <button title='Home Page' onPress={() => this.props.navigation.navigate('Home')} />
  };
  state = {
     isVisible: false,
     actEvent1:''

   }
   async UNSAFE_componentWillMount() {
    setTimeout(() => {
      this.getLocalStorage();
    }, 500);


  }
  getLocalStorage = async () => {
    await AsyncStorage.getItem('Event', (err, result) => {
      if (result != null) {
        this.setState({ actEvent1: JSON.parse(result) });
      }
    }
    )
  }
   render () {

    name = this.state.actEvent1.eventName;
    x_event = this.state.actEvent1.x_event;
    y_event = this.state.actEvent1.y_event;
     return (
       <View style={styles.container}>
         <Text style={styles.welcome}>הוקפצת לאירוע {name}</Text>
         <Popup
           isVisible={this.state.isVisible}
           onCancelPressed={() => this.setState({ isVisible: false })}
           onAppPressed={() => this.setState({ isVisible: false })}
           onBackButtonPressed={() => this.setState({ isVisible: false })}
           options={{
             latitude: y_event,
             longitude: x_event,
             dialogTitle: 'נווט באמצעות',
             dialogMessage: ' ',
             cancelText: 'ביטול'
           }}
         />
         <TouchableOpacity style={{ padding: 20 }} onPress={() => { this.setState({ isVisible: true }) }}>
           <Text style={styles.nav}>
             נווט למקום האירוע
           </Text>
         </TouchableOpacity>
       </View>
     )
   }
 }

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: '#F5FCFF'
  },
  welcome: {
    fontSize: 25,
    textAlign: 'center',
    color: '#4682BC',
    margin: 10
  },
  nav: {
    fontSize: 20,
    textAlign: 'center',
    color: '#4682BC',
    margin: 10
  }
}) 