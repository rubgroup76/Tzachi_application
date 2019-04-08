import React from 'react';
import { Text, View, FlatList, Image, Dimensions ,TouchableOpacity, Animated} from 'react-native';
import styles from './pageStyle';
import { Button, ActionButton } from 'react-native-material-ui';
import Rider from '../Components/Rider';
import RiderDialog from '../Components/RiderDialog';
import { Avatar, Badge, withBadge, colors } from 'react-native-elements';
import { FloatingAction } from 'react-native-floating-action';

export default class HomePage extends React.Component {

  static navigationOptions = {
    title: 'דף בית                           ברוך הבא,עמיאל',
    headerStyle: {
      backgroundColor: '#483d8b',
    },
    headerTintColor: '#fff',
    headerTitleStyle: {
      fontWeight: 'bold',
    },
  };

  constructor(props) {
    super(props);
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
    return (
      <View style={styles.container}>
        <View style={styles.Header}>
          <Text style={styles.textBig}>צח"י</Text>
        </View>
        <View style={styles.Content}> 
        <View style={styles.buttonMain}>
                        <Avatar
                            rounded
                            icon={{name: 'exclamation', color: '#d3d3d3', type: 'font-awesome', size: 80 }}
                            overlayContainerStyle={{backgroundColor: '#483d8b'}}
                            size="xlarge"
                            containerStyle={{borderWidth: 2,borderColor: 'black'}}
                            onPress={() => this.props.navigation.navigate('Emergency')}
                        />
                        { <Badge
                            containerStyle={{ position: 'absolute', top: 110, right: 200 }}
                            value={<Text style={{ color: '#d3d3d3', fontSize: 13 }}>הקפצה</Text>}
                            badgeStyle={{ width: 90, height: 25, backgroundColor: '#483d8b',borderColor: '#483d8b'}}
                            size='xlarge'
                        /> }
                        <Avatar
                            rounded
                            icon={{ name: 'file-text', color: '#d3d3d3', type: 'font-awesome', size: 80}}
                            overlayContainerStyle={{backgroundColor: '#483d8b'}}
                            size="xlarge"
                            containerStyle={{marginLeft: 20,borderWidth: 2,borderColor: 'black'}}
                        />
                        { <Badge
                            containerStyle={{ position: 'absolute', top: 110, right: 30 }}
                            value={<Text style={{ color: '#d3d3d3', fontSize: 13 }}>תרחישי חירום</Text>}
                            badgeStyle={{ width: 90, height: 25, backgroundColor: '#483d8b',borderColor: '#483d8b'}}
                            size='xlarge'
                        /> }
                    </View>
                    <View style={styles.buttonMainDown}>
                        <Avatar
                            rounded
                            icon={{ name: 'weixin', color: '#d3d3d3', type: 'font-awesome', size: 80 }}
                            overlayContainerStyle={{backgroundColor: '#483d8b', float: 'left'}}
                            size="xlarge"
                            containerStyle={{borderWidth: 2,borderColor: 'black'}}
                            onPress={() => this.props.navigation.navigate('Elements')}
                        />
                        { <Badge
                            containerStyle={{ position: 'absolute', top: 110, right: 200 }}
                            value={<Text style={{ color: '#d3d3d3', fontSize: 13 }}>דיווחים</Text>}
                            badgeStyle={{ width: 90, height: 25, backgroundColor: '#483d8b',borderColor: '#483d8b'}}
                            size='xlarge'
                        /> }
                        <Avatar
                            rounded
                            icon={{ name: 'map-o', color: '#d3d3d3', type: 'font-awesome', size: 80 }}
                            overlayContainerStyle={{backgroundColor: '#483d8b'}}
                            size="xlarge"
                            containerStyle={{marginLeft: 20,borderWidth: 2,borderColor: 'black'}}
                            onPress={() => this.props.navigation.navigate('Location')} 
                        />
                        { <Badge
                            containerStyle={{ position: 'absolute', top: 110, right: 30 }}
                            value={<Text style={{ color: '#d3d3d3', fontSize: 13 }}>מפה</Text>}
                            badgeStyle={{ width: 90, height: 25, backgroundColor: '#483d8b',borderColor: '#483d8b'}}
                            size='xlarge'
                        /> }
                    </View>
        <View style={styles.Content}>
          <View style={{ marginTop: 350 }}>
            <Button
              primary text="back to Login Page"
              icon="arrow-back"
              onPress={() => {
                this.props.navigation.navigate('Login');
              }} />
          </View>
          {/* <FlatList
            data={[
              { key: 'Tokio', imgSrc: require('../images/Tokio.jpg'), lat: 120.321654, long: 120.325411 },
              { key: 'El Profesor', imgSrc: require('../images/El_Profesor.jpg'), lat: 121.321654, long: 120.325411 },
              { key: 'Raquel Murillo', imgSrc: require('../images/Raquel_Murillo.jpg'), lat: 122.321654, long: 120.325411 },
              { key: 'Nairobi', imgSrc: require('../images/Nairobi.jpg'), lat: 120.321654, long: 120.325411 },
              { key: 'Rio', imgSrc: require('../images/Rio.jpg'), lat: 121.321654, long: 120.325411 },
              { key: 'Denver', imgSrc: require('../images/Denver.jpg'), lat: 122.321654, long: 120.325411 },
              { key: 'Berlin', imgSrc: require('../images/Berlin.jpg'), lat: 122.321654, long: 120.325411 },
            ]}
            renderItem={({ item }) => <Rider item={item} getItemClicked={this.getItemClicked} />}
          /> */}

          {this.state.showDialog &&
            <RiderDialog
              item={this.state.itemClickedObj}
              changeShowDialogState={this.changeShowDialogState} />}
          <View
              style={{
                position: 'absolute',
                bottom: 100, 
                width: Dimensions.get('window').width - 10,
                flexDirection: 'row',
                paddingLeft: 20
              }}>
              <TouchableOpacity onPress={() => this.props.navigation.navigate('Elements')}>
                <View style={{
                  width: 55,
                  height: 55,
                  borderRadius: 40,
                  justifyContent: 'center',
                  backgroundColor: 'white' 
                }}>
                  <Image
                    style={{
                      alignSelf: 'center', width: 25, height: 25,
                      borderRadius: 50
                    }}
                    source={require('../assets/RNElements.png')} />
                </View>
              </TouchableOpacity>
            </View>
          <View
            style={{
              //flex: 1,
              position: 'absolute',
              bottom: 0,
              alignSelf: 'flex-start',
              flexDirection: 'row-reverse'
            }}>
            <ActionButton
              icon='map'
              onPress={() => this.props.navigation.navigate('Location')} />
          </View>
          <View
            style={{
              position: 'absolute',
              bottom: 0,
              alignSelf: 'center',
              flexDirection: 'row',
              padding: 50
            }}>
            <ActionButton
              icon='notifications'
              onPress={() => this.props.navigation.navigate('Push')} />
          </View>
          <View
            style={{
              position: 'absolute',
              bottom: 0,
              alignSelf: 'flex-end',
              flexDirection: 'row'
            }}>
            <ActionButton
              icon='photo-camera'
              onPress={() => this.props.navigation.navigate('Camera')} />
          </View>
        </View>
        </View>
      </View>
    );
  }
}