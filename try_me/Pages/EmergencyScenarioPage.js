import React from 'react';
import { Text,Button, View,StyleSheet, TouchableOpacity, TextInput, Image,Picker } from 'react-native';
import { Dialog, DialogDefaultActions } from 'react-native-material-ui';
import styles1 from './pageStyleTest';

export default class EmergencyScenarioPage extends React.Component {
    static navigationOptions = {
        title: 'תרחישי חירום',
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
            Scenario:[],
            events: [],
            ActionNu:'',
            EventNa: '',
            ActionDe:'',
            PickerValue:'',
        }
    } 

    componentDidMount(){
        fetch('http://proj.ruppin.ac.il/bgroup76/prod/api/actionInEvent')
      .then(response => response.json())
       .then(response=>this.setState({Scenario:response}))
      .catch(error => console.warn('Error:', error.message));
   
      fetch('http://proj.ruppin.ac.il/bgroup76/prod/api/emergevents')
      .then(response => response.json())
       .then(response=>this.setState({events:response}))
      .catch(error => console.warn('Error:', error.message));

      } 

      clickme=()=>{
        var data = this.state.PickerValue;
        if(data==""){
          alert("Please Select an Option");
        }
        else{
          this.PostActualEvent();
        }
    
        }

      render(){
        if(this.state.Scenario==null){
            return(<View>
                <Text>loading..</Text>
            </View>)
        }
        else{
       let eventsItems = this.state.events.map( (s, i) => {
           return <Picker.Item key={i} value={s.EventName} label={s.EventName} />
      }
      );

      return(
        <View style={styles.container}>
 <Text style={styles.welcome}>
         סוג אירוע
        </Text>
        <Picker
style={{width:'80%'}}
selectedValue={this.state.PickerEventValue}
onValueChange={(itemValue,itemIndex) => this.setState({PickerEventValue:itemValue})}
>
<Picker.Item label="בחר את סוג האירוע להצגה" value=""/>
    {eventsItems}

</Picker>
 <Button title="הצג" onPress={this.clickme}/>
        </View>



      );


      }
    }

}

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
  },
  instructions: {
    textAlign: 'right',
    color: '#333333',
    marginBottom: 5,
  },
  TxtInp: {
    height: 30,
    width: 55,
    borderColor: '#00008b',
    borderWidth: 1,
    margin: 10,
    fontSize:20,
    padding:6,
    borderRadius:5,
    textAlign:'center',
},
});
