import React from 'react';
import { Text, View,StyleSheet, TouchableOpacity, TextInput, Image,Picker} from 'react-native';
import { Dialog, DialogDefaultActions } from 'react-native-material-ui';
import styles1 from './pageStyleTest';
import { Button } from 'react-native-elements';

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
            PickerEventValue:'',
            ShowEvents: '',
        }
    } 

    componentDidMount(){
      //   fetch('http://proj.ruppin.ac.il/bgroup76/prod/api/actionInEvent')
      // .then(response => response.json())
      //  .then(response=>this.setState({Scenario:response}))
      // .catch(error => console.warn('Error:', error.message));
   
      fetch('http://proj.ruppin.ac.il/bgroup76/prod/api/emergevents')
      .then(response => response.json())
       .then(response=>this.setState({events:response}))
      .catch(error => console.warn('Error:', error.message));

      } 

      clickme=()=>{
        var data = this.state.PickerEventValue;
        if(data==""){
          alert("לא נבחר סוג אירוע להצגה");
        }
        else{
          //this.ShowTheEvents();
          this.props.navigation.navigate('ShowEmegancy',{event: this.state.PickerEventValue});
        }
    
        }

        ShowTheEvents() {
          // var DataARR = this.state.Scenario.map((s,i)=>{
          //   if(s.EventName==this.state.PickerEventValue)
          //   {
          //     return s;
          //   }
          // });
          var DataARR = [];
          this.state.Scenario.map((s,i)=>{
            if(s.EventName==this.state.PickerEventValue)
            {
              DataARR.push(s);
            }
          });
          // DataARR.map((s,i)=>{
          //    alert(s.EventName + " " + s.ActionNumber);
          //   //return <View><Text>s.EventName</Text></View>
          // });
        }

      render(){
        if(this.state.events==null){
            return(<View>
                <Text>loading..</Text>
            </View>)
        }
        else{
       let eventsItems = this.state.events.map( (s, i) => {
           return <Picker.Item key={i} value={s.EventName} label={s.EventName} color='#8FD1DF' />
      }
      );

      return(
        <View style={styles.container}>
 <Text style={styles.textBigLogInChat}>
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
 {/* <Button style={{color:'#BED68C'}} title="הצג" onPress={this.clickme}/> */}
 <Button
              title="הצג"
              titleStyle={{ fontWeight: 'bold', fontSize: 18 }}
              linearGradientProps={{
                colors: ['#98B0E3', '#8FD1DF'],
                start: [1, 0],
                end: [0.2, 0],
              }}
              buttonStyle={{
                borderWidth: 0,
                borderColor: 'transparent',
                borderRadius: 20,
                //testdjfdjfdjh
              }}
              containerStyle={{ marginVertical: 10, height: 40, width: 200 }}
              icon={{
                name: 'fire',
                type: 'font-awesome',
                size: 15,
                color: 'white',
              }}
              iconRight
              iconContainerStyle={{ marginLeft: 10, marginRight: -10 }}
              onPress={this.clickme}
            />
 {/* <Button title="הצג" onPress ={()=>this.props.navigation.navigate('ShowEmegancy',{event: this.state.PickerEventValue})}/> */}
        </View>

      );


      }
      // if(this.ShowEvents==null ){
      //   return(<View>
      //     <Text>No Events To Show</Text>
      // </View>)
      // }
      // else{
      //   let ShowThem = this.state.ShowEvents.map( (s, i) => {
      //      return<View><Text>s.EventName</Text></View>
      // }
      // );
      // }
    }

}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
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
textBigLogInChat: {
  // position: 'absolute',
  // top:30,
  // left:-200,
  //marginTop: 10,
  top:0,
  alignItems: 'center',
  fontSize: 40,
  color: '#BED68C',
  fontWeight: 'bold',
  //fontFamily: "serif",
},
});
