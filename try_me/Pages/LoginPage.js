import React from 'react';
import { Text, View, TouchableOpacity, TextInput, Image } from 'react-native';
import styles from './pageStyle';
import { Button, Dialog, DialogDefaultActions } from 'react-native-material-ui';
import registerForPushNotificationsAsync from '../Components/registerForPushNotificationsAsync';
import { Notifications } from 'expo';

export default class LoginPage extends React.Component {
    static navigationOptions = {
        title: 'כניסה',
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
            txtID:'033897125',
            txtPass: '123456',
            userId:"",
            userName:"",
            token:"",
            userCode:0
        }
    }   
        componentDidMount() {
            
            registerForPushNotificationsAsync()
                .then(tok => {
                    this.setState({ token: tok });
                    alert(tok);
                });
                // alert(this.state.token);
            this._notificationSubscription = Notifications.addListener(this._handleNotification);
                
        this.updateToken(this.state.token);
        }

            
        updateToken(token)
        {   
         console.warn("the token"+ token);
          fetch('http://proj.ruppin.ac.il/bgroup76/test1/tar3/api/InsertToken?Token='+token+"&User="+this.state.userCode, {
     
            method: 'POST',
            headers: { "Content-type": "application/json; charset=UTF-8" },
            body: JSON.stringify({}),
          })
            .then(res => res.json())
            .then(response => {
              if (response.userCode != 0) {
                this.setState({ userCode: response.UserCode, isTrainer: response.isTrainer });
                   
                //alert("Success! User Code= " + this.state.userCode);            
              }
              else
                alert("Incorrect password");
            })
    
            .catch(error => console.warn('Error:', error.message));
        }

    //check if the username and password exist in the DB and navigate to home page
    btnPOST_Person = () => {
        // POST adds a random id to the object sent
        fetch('http://proj.ruppin.ac.il/bgroup76/test1/tar3/api/volunteers/?Id='+this.state.txtID+'&Password='+this.state.txtPass, {
            method: 'GET',
            // body: JSON.stringify({}),
            headers: {
                "Content-type": "application/json; charset=UTF-8"
            }
        })
            .then(response => response.json())
            .then(response => {
                if (response.Id) {
                    this.setState({ userId: response.Id, userName:response.Name});
                    this.props.navigation.navigate('Home',{userName: this.state.userName});
                  }
                else
                  alert("Incorrect username or password");
              })
              .then(alert(this.state.userId))
              .catch(error => console.warn('Error:', error.message));
            // .then(json => {
               // if (json != null) {
                    // alert(`
                    // returned from server\n
                    // json= ${json}\n
                    // Name=${json.Name}\n
                    // Pass=${json.Password}\n
                    // Age=${json.Age}`);
                    // this.props.navigation.navigate('Home');
                //}
                // } else {
                //     this.setState({ lblErr: true });
                // }
            // })
            // .then(this.checkUser());
    }

    // handleErrors = (response) => {
    //     if (!response.ok) {
    //         throw Error(response.statusText);
    //     }
    //     return response;
    // }

    // btnPOST_Person = () => {
        // if(window.location.hostname==="localhost"){
        //     let url = 'http://localhost:54109/api/persons';

        //     fetch(url)
        //     .then(this.handleErrors)
        //     .then(response => response.json())
        //     .then(data  => this.setState({data}))
        //     .catch(error => this.setState({error:"There was an error in getting the persons"}));
        // }
        // //else{
        //     fetch('http://proj.ruppin.ac.il/bgroup76/prod/api/Volunteer')
        //     .then(this.handleErrors)
        //     .then(response=>response.json())
        //     .then(data  => this.setState({data}))
        //     .then(this.checkUser())
        //     .catch(error => this.setState({error:"There was an error in getting the persons"}));
        // }
    //}

    render() {
        return (
            <View style={styles.container}>
                <View style={styles.Header}>
                    <Text style={styles.textBigLogIn}>דף כניסה</Text>
                    <Image
                    style={{position: 'absolute',top:130,right:-80, width:150, height:150}}
                        source={require('../assets/TzahiIcon.png')} />
                </View>
                <View style={styles.ContentLogIn}>
                    <Text style={styles.lblText}>ID:</Text>
                    <TextInput
                        style={styles.TxtInp}
                        onChangeText={(text) => this.setState({ txtID: text })}
                        value={this.state.txtID}
                    />
                    <Text style={styles.lblText}>Password:</Text>
                    <TextInput
                        style={styles.TxtInp}
                        onChangeText={(text) => this.setState({ txtPass: text })}
                        value={this.state.txtPass}
                    />
                    <TouchableOpacity
                        style={styles.Button}
                        onPress={this.btnPOST_Person}>
                        <Text style={styles.textMedium}>Login</Text>
                    </TouchableOpacity>

                    {/* <View style={{ margin: 20 }}>
                        <Button
                            primary text="LOGIN with WebAPI"
                            icon="directions-car"
                            style={{ margin: 20, color: '#00008b' }}
                            onPress={this.btnPOST_Person}
                        />
                        {this.state.lblErr &&
                            <View style={{ position: 'absolute',bottom: 150, alignSelf: 'center' }}>
                                <Dialog>
                                    <Dialog.Title><Text>ERR Name or Pass!</Text></Dialog.Title>
                                    <Dialog.Content>
                                        <Text>stam dialog example!</Text>
                                    </Dialog.Content>
                                    <Dialog.Actions>
                                        <DialogDefaultActions
                                            actions={['cancel', 'we\'re good']}
                                            onActionPress={(data) => {
                                                alert(data);
                                                this.setState({ lblErr: false });
                                            }}
                                        />
                                    </Dialog.Actions>
                                </Dialog>
                            </View>
                        } 
                    </View> */}
                </View>
            </View >
        );
    }
}