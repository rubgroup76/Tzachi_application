import React from 'react';
import { GiftedChat } from 'react-native-gifted-chat';
import firebaseSvc from '../Pages/FirebaseSvc';
import PropTypes from 'prop-types';

//  user.defaultProps = {
//    name: PropTypes.string,
//    email: PropTypes.string,
//    avatar: PropTypes.string,
//  };

// type Props = {
//   name?: string,
//   email?: string,
//   avatar?: string,
// };

class Chat extends React.Component {
  constructor(props) {
    super(props);
    console.log(props.navigation.state.params.name);
    console.log(props.navigation.state.params.email);
  }
  static navigationOptions = ({ navigation }) => ({
    title: (navigation.state.params || {}).name || 'Chat!',
  });

  state = {
    messages: [],
  };

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
      />
    );
  }

  componentDidMount() {
    firebaseSvc.refOn(message => 
      this.setState(previousState => ({
        messages: GiftedChat.append(previousState.messages, message),
        })
      )
    );
  }

  componentWillUnmount() {
    firebaseSvc.refOff();
  }
}

export default Chat;