import React from 'react';
import { Text, View, FlatList, Image, Dimensions, TouchableOpacity, Animated } from 'react-native';
import styles from './pageStyle';
import { Button, ActionButton } from 'react-native-material-ui';
import Rider from '../Components/Rider';
import RiderDialog from '../Components/RiderDialog';
import { Avatar, Badge, withBadge, colors } from 'react-native-elements';
import { FloatingAction } from 'react-native-floating-action';
import styles1 from '../Pages/pageStyleTest';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
  listenOrientationChange as lor,
  removeOrientationListener as rol
} from 'react-native-responsive-screen';

export default class HomePage extends React.Component {

  static navigationOptions = {
    title: 'דף בית',
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
    //console.warn(props.navigation.state.params.RoleId);
    this.state = {
      itemClickedObj: null,
      showDialog: false,
    }
  }

  getItemClicked = (itemk) => {
    this.setState({
      itemClickedObj: itemk,
      showDialog: true
    });
  };

  changeShowDialogState = (SDState) => {
    this.setState({ showDialog: SDState });
  };


  render() {
    role = this.props.navigation.state.params.RoleId;
    return (
      <View style={styles1.containerChat}>
        
        <View style>
          <Text style={styles1.textBigLogInChat}>ברוכים הבאים </Text>
        </View>
        <Image
          style={styles1.imgCon}
          source={require('../images/HamaapilPic.jpg')} />
        <View style={styles.Content}>
          <View style={styles.buttonMain}>
            <Avatar
              rounded
              icon={{ name: 'exclamation', color: '#FFFFFF', type: 'font-awesome', size: 80 }}
              overlayContainerStyle={{ backgroundColor: '#8FD1DF' }}
              size="xlarge"
              containerStyle={{ borderWidth: 2, borderColor: '#FFFFFF' }}
              onPress={() => {
                if (role == 0)
                  this.props.navigation.navigate('Hakpatza');
                else
                  this.props.navigation.navigate('HakpatzaVol');
              }}
            />
            {<Badge
              containerStyle={{ position: 'absolute', top: 110, right: 200 }}
              value={<Text style={{ color: '#FFFFFF', fontWeight: 'bold', fontSize: 13 }}>הקפצה</Text>}
              badgeStyle={{ width: 90, height: 25, backgroundColor: '#8FD1DF', borderColor: '#8FD1DF' }}
              size='xlarge'
            />}
            <Avatar
              rounded
              icon={{ name: 'file-text', color: '#FFFFFF', type: 'font-awesome', size: 80 }}
              overlayContainerStyle={{ backgroundColor: '#8FD1DF' }}
              size="xlarge"
              containerStyle={{ marginLeft: 20, borderWidth: 2, borderColor: '#FFFFFF' }}
              onPress={() => this.props.navigation.navigate('EmergencyScenario')}
            />
            {<Badge
              containerStyle={{ position: 'absolute', top: 110, right: 30 }}
              value={<Text style={{ color: '#FFFFFF', fontWeight: 'bold', fontSize: 13 }}>תרחישי חירום</Text>}
              badgeStyle={{ width: 90, height: 25, backgroundColor: '#8FD1DF', borderColor: '#8FD1DF' }}
              size='xlarge'
            />}
          </View>
          <View style={styles.buttonMainDown}>
            <Avatar
              rounded
              icon={{ name: 'weixin', color: '#FFFFFF', type: 'font-awesome', size: 80 }}
              overlayContainerStyle={{ backgroundColor: '#8FD1DF' }}
              size="xlarge"
              containerStyle={{ borderWidth: 2, borderColor: '#FFFFFF' }}
              onPress={() => this.props.navigation.navigate('LoginToChat')}
            />
            {<Badge
              containerStyle={{ position: 'absolute', top: 110, right: 200 }}
              value={<Text style={{ color: '#FFFFFF', fontWeight: 'bold', fontSize: 13 }}>צ'אט</Text>}
              badgeStyle={{ width: 90, height: 25, backgroundColor: '#8FD1DF', borderColor: '#8FD1DF' }}
              size='xlarge'
            />}
            <Avatar
              rounded
              icon={{ name: 'map-o', color: '#FFFFFF', type: 'font-awesome', size: 80 }}
              overlayContainerStyle={{ backgroundColor: '#8FD1DF' }}
              size="xlarge"
              containerStyle={{ marginLeft: 20, borderWidth: 2, borderColor: '#FFFFFF' }}
              onPress={() => this.props.navigation.navigate('Location')}
            />
            {<Badge
              containerStyle={{ position: 'absolute', top: 110, right: 30 }}
              value={<Text style={{ color: '#FFFFFF', fontWeight: 'bold', fontSize: 13 }}>מפה</Text>}
              badgeStyle={{ width: 90, height: 25, backgroundColor: '#8FD1DF', borderColor: '#8FD1DF' }}
              size='xlarge'
            />}
          </View>
          <View style={styles.Content}>
            <View style={{ position: 'absolute', bottom: 0 }}>
              
              <Button
                 primary text="צפייה באירוע"
                icon="info"
                style={{fontSize:20}}
                onPress={() => {
                  this.props.navigation.navigate('ManageEvent');
                }} />
            </View>

            {this.state.showDialog &&
              <RiderDialog
                item={this.state.itemClickedObj}
                changeShowDialogState={this.changeShowDialogState} />}
           
          </View>
        </View>
      </View>
    );
  }
}