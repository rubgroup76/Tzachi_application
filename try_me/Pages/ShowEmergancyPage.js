import React from 'react';
import { Text,Button, View,StyleSheet, TouchableOpacity, TextInput, Image,Picker } from 'react-native';
import { Dialog, DialogDefaultActions } from 'react-native-material-ui';

export default class ShowEmergancyPage extends React.Component {
    static navigationOptions = {
        title: 'הצגת תרחישי חירום',
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
            count: 0,
        }
    } 

      componentDidMount(){
        fetch('http://proj.ruppin.ac.il/bgroup76/prod/api/actionInEvent')
      .then(response => response.json())
       .then(response=>this.setState({Scenario:response}))
      .catch(error => console.warn('Error:', error.message));
      }

        ShowTheEvents() {
            // var DataARR = this.state.Scenario.map((s,i)=>{
            //   if(s.EventName==this.state.PickerEventValue)
            //   {
            //     return s;
            //   }
            // });
            event=this.props.navigation.state.params.event;
            //alert(event+" " + this.state.Scenario[1]);
            DataARR = [];
            this.state.Scenario.map((s,i)=>{
              if(s.EventName==event)
              {
                DataARR.push(s);
                this.state.count=this.state.count+1;
              }
            });
            // DataARR.map((s,i)=>{
            //    alert(s.EventName + " " + s.ActionNumber);
            //   //return <View><Text>s.EventName</Text></View>
            // });
          }

      render(){
          event=this.props.navigation.state.params.event;
          if(this.state.Scenario==0){
            return(<View>
                <Text>אין אירועים קיימים במערכת</Text>
            </View>)
        }
        else{
            this.ShowTheEvents();
            let eventsItems = DataARR.map( (s, i) => {
                return <View style={styles.instructions} key={i}><Text style={styles.textStyle}>{s.ActionNumber}.  {s.ActionDesc}</Text></View>
           }
           );
         // alert(event);
          return(
              <View style={styles.container}>
              <View style={styles.Header}>
                    <Text style={styles.textBigLogInChat}>רשימת האירועים:</Text>
                </View>
                <View>
                    <Text style={styles.header2}>בחרת לראות אירועים מסוג : {event}</Text>
                </View>
             {eventsItems}
            </View>
          );
      }
    }
}

const styles = StyleSheet.create({
    container: {
      //flex: 1,
      //position: 'absolute',
      //margin: 20,
      justifyContent: 'center',
      //alignItems: 'center',
      textAlign:'center',
      backgroundColor: '#FFFFFF',
     //width: '90%',
      //height: '90%',
      borderColor: '#000000',
      borderStyle: 'solid',
      borderWidth: 4,
    },
    instructions: {
      //textAlign: 'right',
      color: '#333333',
      fontWeight: 'bold',
      marginTop: 16,
      borderRadius: 2,
    },
    textStyle:{
        //textAlign: 'left',
        textShadowColor: '#8FD1DF',
        textShadowOffset: { width: 2, height: 2 },
        textShadowRadius : 5,
        // borderColor: '#000000',
        // borderStyle: 'solid',
        // borderWidth: 2,

    },
    Header: {
        //flex: 2
    },
    Header2:{
       fontSize:30,
       fontWeight: 'bold',
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
        fontFamily: "serif",
    },
  });
  