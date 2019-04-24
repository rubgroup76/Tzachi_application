import  { StyleSheet } from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
  listenOrientationChange as lor,
  removeOrientationListener as rol
} from 'react-native-responsive-screen';

export default StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#f1f1f1',
      },
      containerChat: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#f1f1f1',
      },
      containerE: {
        //position: 'absolute',
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#f1f1f1',
        //top: 20,
      },
      Header: {
        flex: 2
    },
    
    lblText:{
        fontSize:12,
        color: '#00008b'
    },
    textBigLogIn: {
        // position: 'absolute',
        // top:30,
        // left:-200,
        marginTop: 20,
        alignItems: 'center',
        fontSize: 50,
        color: '#00008b',
        margin: 10,
        fontWeight: 'bold',
        fontFamily: "serif",
    },

    textBigLogInChat: {
      // position: 'absolute',
      // top:30,
      // left:-200,
      marginTop: 20,
      alignItems: 'center',
      fontSize: 50,
      color: '#00008b',
      //margin: 10,
      fontWeight: 'bold',
      fontFamily: "serif",
  },

  picstyle:{
    alignItems: 'center',
    margin: 10,
  },
    textBigEmergency: {
        position: 'absolute',
        top:10,
        left:-190,
        fontSize: 30,
        color: '#00008b',
        margin: 10,
        fontWeight: 'bold'
    },
      inputContainer: {
          borderBottomColor: '#F5FCFF',
          backgroundColor: '#FFFFFF',
          borderRadius:30,
          borderBottomWidth: 1,
          width:300,
          height:45,
          marginBottom:20,
          flexDirection: 'row',
          alignItems:'center'
      },
      inputContainerE: {
        borderBottomColor: '#F5FCFF',
          backgroundColor: '#FFFFFF',
          borderRadius:30,
          borderBottomWidth: 1,
          width:300,
          height:45,
          marginBottom:20,
          flexDirection: 'row',
          alignItems:'center'
    },
      inputs:{
        left:-20,
          height:45,
          marginLeft:16,
          borderBottomColor: '#FFFFFF',
          flex:1,
      },
      inputIcon:{
        width:30,
        height:30,
        marginLeft:15,
        justifyContent: 'center'
      },
      buttonContainer: {
        height:45,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom:20,
        width:250,
        borderRadius:30,
      },
      loginButton: {
        backgroundColor: "#483d8b",
      },
      loginText: {
        color: 'white',
      }
});