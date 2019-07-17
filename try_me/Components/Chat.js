import React from 'react';
import { GiftedChat } from 'react-native-gifted-chat';
import firebaseSvc from '../Pages/FirebaseSvc';
import { View, StyleSheet, Text, Image } from 'react-native';
//import MapView, { PROVIDER_GOOGLE } from 'react-native-maps';
import PropTypes from 'prop-types';

const styles = StyleSheet.create({
  mapView: {
    width: 150,
    height: 100,
    borderRadius: 13,
    margin: 3,
  },
});

class Chat extends React.Component {
  constructor(props) {
    super(props);
    console.log(props.navigation.state.params.name);
    console.log(props.navigation.state.params.email);
  }
  static navigationOptions = ({ navigation }) => ({
    title: (navigation.state.params || {}).name || 'Chat!',
    headerStyle: {
      backgroundColor: '#8FD1DF',
    },
    headerTintColor: '#fff',
    headerTitleStyle: {
      fontWeight: 'bold',
    },
  });

  state = {
    messages: [],
  };

  //try using maps in chat
  renderCustomView = (props) => {
    if (props.currentMessage.location) {
      return (
        <View style={props.containerStyle}>
          <MapView
              provider={PROVIDER_GOOGLE}
              style={[styles.mapView]}
              region={{
                latitude: props.currentMessage.location.latitude,
                longitude: props.currentMessage.location.longitude,
                latitudeDelta: 0.1,
                longitudeDelta: 0.1,
              }}
              scrollEnabled={false}
              zoomEnabled={false}
            >
              <MapView.Marker
                coordinate={{
                latitude: props.currentMessage.location.latitude,
                longitude: props.currentMessage.location.longitude
                }}
              />
            </MapView>
        </View>
      );
    }
    return null
  }

  get user() {
    return {
      name: this.props.navigation.state.params.name,
      email: this.props.navigation.state.params.email,
      avatar: this.props.navigation.state.params.avatar,
      id: firebaseSvc.uid,
      _id: firebaseSvc.uid, // need for gifted-chat
    };
  }
  

  render() {
    return (
      <GiftedChat 
      messages={this.state.messages}
        onSend={firebaseSvc.send}
        user={this.user}
        renderCustomView={this.renderCustomView}
      />
    );
  }

  componentDidMount() {
    //alert("componentDidMount");
    firebaseSvc.refOn(message => 
      this.setState(previousState => ({
        //messages: GiftedChat.append(previousState.messages, message),
        messages: GiftedChat.append(previousState.messages, {
           id: message.user.id,
          // name: message.user.name,
          text: message.text,
          createdAt: Date(message.timestamp),
          //crearedAt: new Date(),
          user: {
           _id: message.user._id,
          name: message.user.name,},
        }),
        })
      )
    );
  }

  componentWillUnmount() {
    //alert("componentWillUnmount");
    firebaseSvc.refOff();
  }
}

export default Chat;