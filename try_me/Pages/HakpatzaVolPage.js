import React, { Component } from 'react';
import styles2 from './pageStyle';
import {
  Platform,
  StyleSheet,
  Text,
  View,Button,Picker,TextInput,FormLabel, FormInput
} from 'react-native';



export default class HakpatzaVol extends Component {
	constructor(){
		super();
		this.state={
            PickerValue:''	,
            events:	''	
        };
        this.state = {
            txtAmountPeople:"reut",
            // txtPass: '123456',
            // userId:"",
            // userName:"",
            // token:"",
            // userCode:0
        }
      
		
	};
	clickme=()=>{
    
		var data = this.state.PickerValue;
		if(data==""){
			alert("Please Select an Option");
    }
    else{
      this.PostActualEvent();
			//alert(data);
    }

    }
    // componentDidMount(){
    //     fetch('http://proj.ruppin.ac.il/bgroup76/prod/api/emergevents')
    //   .then(response => response.json())
    //    .then(response=>this.setState({events:response}))
    //   .catch(error => console.warn('Error:', error.message));
   
    //   } 
      
  // getVolToEvent() {
  //   fetch('http://proj.ruppin.ac.il/bgroup76/prod/api/volunteers/?EventName=' + this.state.PickerEventValue)
  //     // method: 'GET',
  //     // headers: { "Content-type": "application/json; charset=UTF-8" },
  //     // body: JSON.stringify({}),    
  //     .then(res => res.json())
  //     .then(response => {
  //       alert("good");
  //     })
  //     .catch(error => console.warn('Error:'));
  // }

  PostActualEvent() {
    let newEvent = {
      EventName: this.state.PickerEventValue,
      Severity: this.state.PickerSeverityValue,
      VolsAmount: this.state.txtAmountPeople,      

    };

    fetch('http://proj.ruppin.ac.il/bgroup76/prod/api/actualevent', {
      method: 'POST',
      body: JSON.stringify(newEvent),
      headers: {
        "Content-type": "application/json; charset=UTF-8"
      }
    })

      //.then(res => res.json())
      .then(response => {
        alert("good");
      })
      .catch(error => console.warn('Error:'+error));
  }

  render() {
    //   if(this.state.events==null){
    //       return(<View>
    //           <Text>loading..</Text>
    //       </View>)
    //   }
    //   else{
    // let eventsItems = this.state.events.map( (s, i) => {
    //     return <Picker.Item key={i} value={s.EventName} label={s.EventName} />
    // });
    return (
      <View style={styles.container}>
		<Button title="הקפץ"/>
        
      </View>
    );
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