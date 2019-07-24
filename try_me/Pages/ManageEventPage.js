import React, { Component } from 'react'
import { TouchableOpacity, StyleSheet, Text, View } from 'react-native'
import { Popup } from 'react-native-map-link'

export default class ManageEvent extends Component {

  static navigationOptions = {
    title: 'ניהול אירוע',
    headerStyle: {
      backgroundColor: '#8FD1DF',
    },
    headerTintColor: '#fff',
    headerTitleStyle: {
      fontWeight: 'bold',
    },
  };
  state = {
    isVisible: false,
    event: '',
    vols: '',
    noEvent: false

  }

  componentWillMount() {
    fetch('http://proj.ruppin.ac.il/bgroup76/prod/api/actualeventnow')
      .then(response => response.json())

      .then(response => {
        if (response.EventName == null) {
          this.setState({ noEvent: true })
        }
        
        this.setState({ event: response }, () => {
          fetch('http://proj.ruppin.ac.il/bgroup76/prod/api/volunteers/?EventNumber=' + this.state.event.EventNumber)
            .then(response => response.json())
            .then(response => this.setState({ vols: response }))
            .catch(error => console.warn('Error:', error.message));
        })
      })
      .catch(error => console.warn('Error:', error.message));


  }

  render() {
    if (this.state.noEvent) {
      return (<View style={styles.container}>
        <Text style={styles.welcome}>לא קיים אירוע</Text>
      </View>)
    }
    else if (this.state.event == '') {
      return (<View>
        <Text style={styles.welcome}>loading..</Text>
      </View>)
    }
    else {
      lon = this.state.event.ELocation_X
      lat = this.state.event.ELocation_Y
      return (

        <View style={styles.container}>
          <Text style={styles.welcome}>אירוע {this.state.event.EventName} בחומרה {this.state.event.Severity} מתרחש בקיבוץ</Text>
          <Popup
            isVisible={this.state.isVisible}
            onCancelPressed={() => this.setState({ isVisible: false })}
            onAppPressed={() => this.setState({ isVisible: false })}
            onBackButtonPressed={() => this.setState({ isVisible: false })}
            options={{
              latitude: lat,
              longitude: lon,
              dialogTitle: 'נווט באמצעות',
              dialogMessage: ' ',
              cancelText: 'ביטול'
            }}
          />
          <TouchableOpacity style={styles.borderNav} onPress={() => { this.setState({ isVisible: true }) }}>
            <Text style={styles.nav}>
              נווט למקום האירוע
          </Text>
          </TouchableOpacity>
          <Text style={styles.mini}>מספר המתנדבים שהוקפצו: {this.state.event.VolsAmount}</Text>
          <Text style={styles.mini}>המתנדבים שהקופצו לאירוע: </Text>
          {this.state.vols!=''&&this.state.vols.map((s, i) => (
            <Text style={styles.vols} key={i}>
              {s.Name} {s.FamilyName} {s.CellPhone}
            </Text>
          ))}
        </View>
      )
    }
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
    margin: 10,
    fontWeight: 'bold'
  },
  nav: {
    fontSize: 20,
    textAlign: 'center',
    color: '#4682BC',
    margin: 10
  },
  mini: {
    fontSize: 20,
    textAlign: 'center',
    color: '#4682BC',
    margin: 10,
    fontWeight: 'bold'
  },
  vols: {
    fontSize: 20,
    textAlign: 'center',
    color: '#000',
    margin: 10,
    fontWeight: 'bold'
  },
  borderNav: {

    borderColor: '#4682BC',
    borderWidth: 2,
    margin: 20
  }

}) 