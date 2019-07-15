import React from 'react';
import { Text, View, Dimensions, Image } from 'react-native';
import styles from './pageStyle';
import { Button, ActionButton } from 'react-native-material-ui';
import { MapView } from 'expo';
const { Marker } = MapView;
import styles1 from '../Pages/pageStyleTest';

var allMarkers=[];
var id=0;
var markers=[];
export default class LocationPage extends React.Component {

  static navigationOptions = {
    title: 'מפת הקיבוץ',
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
      latitude: 32.378045,
      longitude: 34.983458,
      kibutz:[],
      private:[],
      markers:[]

    }
  }

  componentWillMount() {

    //Get the list of the Kibutz equipment
    fetch('http://proj.ruppin.ac.il/bgroup76/prod/api/equipmentsKibutz')
      .then(response => response.json())
      .then(response => this.setState({kibutz:response }))
      .catch(error => console.warn('Error:', error.message));

    ////Get the list of the Private equipment
    fetch('http://proj.ruppin.ac.il/bgroup76/prod/api/equipmentsPrivate')
      .then(response => response.json())
      .then(response => this.setState({ private: response }))
      .catch(error => console.warn('Error:', error.message));

  }
  createMarkers(){
    this.state.kibutz.map((s, i) => {
      //console.warn(s.EquipmentType)
      //s.EquipmentName='../assets/'+s.Category+'.png'
      markers.push(s)
    })
     this.state.private.map((s, i) => {
       //console.warn(s.EquipmentType)
       //s.EquipmentName='../assets/'+s.Category+'.png'
      //alert(s.EquipmentName)
       markers.push(s)
     })


  }

  btnLocation = () => {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        // const output =
        //   'latitude=' + position.coords.latitude +
        //   '\nlongitude=' + position.coords.longitude +
        //   '\naltitude=' + position.coords.altitude +
        //   '\nheading=' + position.coords.heading +
        //   '\nspeed=' + position.coords.speed

        // alert(output);
        this.setState(
          {
            latitude: position.coords.latitude,// +  Math.random()/1000,
            longitude: position.coords.longitude
          });
      },
      (error) => alert(error.message),
      { enableHighAccuracy: true, timeout: 20000, maximumAge: 1000 }
    );
  };

  render() {
    return (
      <View style={styles1.containerChat}>
        {this.state.private.length!=0&&this.state.kibutz.length!=0&&this.createMarkers()}
        <View style={styles.Header}>
          <Text style={styles1.textBigLogInChat}>ציוד על המפה</Text>
          {/* <Image
            style={{ alignSelf: 'center', width: 80, height: 80 }}
            source={require('../assets/icon.png')} /> */}
        </View>
        <View style={styles.ContentLocation}>
          <View style={{
            borderColor: 'black',
            borderWidth: 2,
          }}>
            <MapView
            mapType="satellite"
              style={{
                flex: 1,
                width: Dimensions.get('window').width - 30,
              }}
              region={{
                latitude: this.state.latitude,
                longitude: this.state.longitude,
                latitudeDelta: 0.0075,
                longitudeDelta: 0.0075,
              }}
            >
              {markers.map(marker => (
                <Marker
                  key={id++}
                  coordinate={{
                    latitude: marker.YCoordinate,
                    longitude: marker.XCoordinate
                  }}
                  //title={marker.EquipmentType}
                //description='מטפה'
                image={require('../assets/equip.png')}
                >
                <Text style={styles1.locationText}>{marker.EquipmentType}</Text>
                </Marker>
              ))}

              {/* <Marker
                coordinate={{
                  latitude: 32.378045,
                  longitude: 34.983800
                }}
                title='קיבוץ המעפיל'
                description='שלום לך !'
                image={require('../assets/LocationBlue.png')}
              />
              <Marker
                coordinate={{
                  latitude: 32.377813,
                  longitude: 34.983394
                }}
                title='קיבוץ המעפיל'
                description='שלום לך !'
                color= 'blue'
                image={require('../assets/LocationBlue.png')}
              /> */}
            </MapView>
          </View>
          <View
            style={{
              position: 'absolute',
              bottom: 0,
              width: Dimensions.get('window').width - 10,
              flexDirection: 'row-reverse'
            }}>
            <ActionButton icon="place" onPress={this.btnLocation} />
          </View>
          {/* <View style={{ margin: 10, justifyContent: 'flex-start' }}>
            <Button
              primary text="Back to Home Page"
              icon="arrow-back"
              onPress={() => {
                this.props.navigation.navigate('Home');
              }} />
          </View> */}
        </View>
      </View>
    );
  }
}