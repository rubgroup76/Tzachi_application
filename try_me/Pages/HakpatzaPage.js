import React, { Component } from 'react';
import styles2 from './pageStyle';
import {
  Platform,
  StyleSheet,
  Text,
  View,Button,Picker,TextInput,FormLabel, FormInput
} from 'react-native';



export default class Hakpatza extends Component {
	constructor(){
		super();
		this.state={
            PickerValue:''	,
            events:	''	
        };
        this.state = {
            txtAmountPeople:1,
            txtX: 34.98571,
            txtY: 32.37821,
        }
      
		
	};
	clickMe=()=>{ 
		var data = this.state.PickerValue;
		if(data==""){
			alert("Please Select an Option");
    }
    else{
      this.postActualEvent();
    }

    }
    componentDidMount(){
        fetch('http://proj.ruppin.ac.il/bgroup76/prod/api/emergevents')
      .then(response => response.json())
       .then(response=>this.setState({events:response}))
      .catch(error => console.warn('Error:', error.message));
   
      } 
      

  postActualEvent() {
    let ActualEvent = {
      EventName: this.state.PickerEventValue,
      Severity: this.state.PickerSeverityValue,
      VolsAmount: this.state.txtAmountPeople,      
      ELocation_X:this.state.txtX,
      ELocation_Y:this.state.txtY,
    };
    alert(this.state.PickerEventValue+" "+ ActualEvent.Severity+" "+ ActualEvent.VolsAmount)
    
    fetch('http://proj.ruppin.ac.il/bgroup76/prod/api/actualevent', {
      method: 'POST',
      body: JSON.stringify(ActualEvent),
      headers: {
        "Content-type": "application/json; charset=UTF-8"
      }
    })

      //.then(res => res.json())
      .then(response => {
        //alert("good");
      })
      .catch(error => console.warn('Error:'+error));
  }

  render() {
      if(this.state.events==null){
          return(<View>
              <Text>loading..</Text>
          </View>)
      }
      else{
    let eventsItems = this.state.events.map( (s, i) => {
        return <Picker.Item key={i} value={s.EventName} label={s.EventName} />
    });

    return (
      <View style={styles.container}>
        <Text style={styles.welcome}>
         סוג אירוע
        </Text>
		<Picker
		style={{width:'80%'}}
	  selectedValue={this.state.PickerEventValue}
		onValueChange={(itemValue,itemIndex) => this.setState({PickerEventValue:itemValue})}
		>
    <Picker.Item label="בחר את סוג האירוע" value=""/>
        {eventsItems}

		</Picker>

        <Text style={styles.welcome}>
         חומרה
        </Text>
        <Picker
		style={{width:'80%'}}
		selectedValue={this.state.PickerSeverityValue}
		onValueChange={(itemValue,itemIndex) => this.setState({PickerSeverityValue:itemValue})}
		>
		<Picker.Item label="בחר את חומרת האירוע" value=""/>
		<Picker.Item label="קלה" value="קלה" />
		<Picker.Item label="בינונית" value="בינונית"/>
    <Picker.Item label="גבוהה" value="גבוהה"/>
		</Picker>
      
       <Text style={styles.welcome}> בחר כמות אנשים להקפצה:</Text>
       <TextInput
                        style={styles.TxtInp}
                        onChangeText={(text) => this.setState({ txtAmountPeople: text })}
                        keyboardType="numeric"
                       // value={this.state.txtAmountPeople}
                    /> 
                           <Text style={styles.welcome}> X:</Text>
       <TextInput
                        style={styles.TxtInp}
                        onChangeText={(text) => this.setState({ txtX: text })}
                        keyboardType="numeric"
                       // value={this.state.txtAmountPeople}
                    /> 
                           <Text style={styles.welcome}> Y:</Text>
       <TextInput
                        style={styles.TxtInp}
                        onChangeText={(text) => this.setState({ txtY: text })}
                        keyboardType="numeric"
                       // value={this.state.txtAmountPeople}
                    /> 
		<Button title="הקפץ" onPress={this.clickMe}/>
        
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