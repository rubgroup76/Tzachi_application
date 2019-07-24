import React from 'react';
import { Text,Button,Platform, ScrollView, View,StyleSheet, TouchableOpacity, TextInput, Image,Picker } from 'react-native';
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
            event=this.props.navigation.state.params.event;
            DataARR = [];
            this.state.Scenario.map((s,i)=>{
              if(s.EventName==event)
              {
                DataARR.push(s);
                this.state.count=this.state.count+1;
              }
            });
          }

      render(){
        if (Platform.OS==='ios') {
          event=this.props.navigation.state.params.event;
          if(this.state.Scenario==0){
            return(<View>
                <Text>אין אירועים קיימים במערכת</Text>
            </View>)
        }
        else{
            this.ShowTheEvents();
            let eventsItems = DataARR.map( (s, i) => {
                return <View style={styles.instructions} key={i}><Text style={styles.textStyleIphone}>{s.ActionNumber}.  {s.ActionDesc}</Text></View>
           }
           );
          return(
            <ScrollView keyboardShouldPersistTaps="handled" showsVerticalScrollIndicator={true}>
              <View style={styles.container}>
              <View style={styles.Header}>
                    <Text style={styles.textBigLogInChatIphone}>רשימת האירועים:</Text>
                </View>
                <View>
                    <Text style={styles.HeaderIphone}>בחרת לראות אירועים מסוג : {event}</Text>
                </View>
             {eventsItems}
            </View>
            </ScrollView>
          );
      }
    }
  else{
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
          return(
            <ScrollView keyboardShouldPersistTaps="handled" showsVerticalScrollIndicator={true}>
              <View style={styles.container}>
              <View style={styles.Header}>
                    <Text style={styles.textBigLogInChat}>רשימת האירועים:</Text>
                </View>
                <View>
                    <Text style={styles.Header}>בחרת לראות אירועים מסוג : {event}</Text>
                </View>
             {eventsItems}
            </View>
            </ScrollView>
          );
      }
  }}
}

const styles = StyleSheet.create({
    container: {
      justifyContent: 'center',
      textAlign:'center',
      backgroundColor: '#FFFFFF',
    },
    instructions: {
      color: '#333333',
      fontWeight: 'bold',
      marginTop: 18,
      borderRadius: 2,
      textAlign:'right',
    },
    textStyleIphone:{
        textAlign:'right',
        marginRight:10,
        fontSize:16,

    },
    textStyle:{
      marginLeft:10,
      fontSize:16,

  },
    HeaderIphone:{
       fontWeight: 'bold',
       textAlign:'right',
       fontSize:16,
       marginRight:10,
       marginTop:10,
    },
    Header:{
      fontWeight: 'bold',
      fontSize: 16,
      marginLeft:10,
      marginTop:10,
   },
    textBigLogInChatIphone: {
        top:0,
        alignItems: 'center',
        textAlign:'right',
        fontSize: 40,
        color: 'black',
        fontWeight: 'bold',
    },
    textBigLogInChat: {
      top:0,
      textAlign: 'center',
      alignItems: 'center',
      fontSize: 40,
      color: 'black',
      fontWeight: 'bold',
  },
  });
  