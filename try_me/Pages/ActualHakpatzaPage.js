 import React, { Component } from 'react'
 import { TouchableOpacity, StyleSheet, Text, View } from 'react-native'
 import { Popup } from 'react-native-map-link'
 
 export default class ActualHakpatza extends Component {
   state = {
     isVisible: false,

   }
 
   render () {
      name = this.props.navigation.state.params.evName;
      num = this.props.navigation.state.params.evNum;
      token = this.props.navigation.state.params.token;
      team = this.props.navigation.state.params.team;
      x_event = this.props.navigation.state.params.x_event;
      y_event = this.props.navigation.state.params.y_event;
      severity=this.props.navigation.state.params.severity;
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
    //justifyContent: 'center',
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