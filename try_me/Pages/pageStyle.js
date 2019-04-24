import  { StyleSheet } from 'react-native'

export default StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f1f1f1',
        alignItems: 'center',
        justifyContent: 'center',
        fontSize: 40
    },
    Header: {
        flex: 2
    },
    Content: {
        flex: 5,
        alignItems: 'center',
        //justifyContent: 'center',
        //marginBottom: 50
    },
    ContentLogIn: {
        flex: 5,
        alignItems: 'center',
        //justifyContent: 'center',
        marginTop: 100
    },
    ContentLocation: {
        flex: 5,
        alignItems: 'center',
        //justifyContent: 'center',
        marginBottom: 50
    },
    ContentEmergency: {
        flex: 5,
        alignItems: 'center',
        //justifyContent: 'center',
        marginTop: -140
    },
    textBig: {
        position: 'absolute',
        top:30,
        left:-100,
        fontSize: 80,
        color: '#00008b',
        margin: 10,
        fontWeight: 'bold'
    },
    textBigLogIn: {
        position: 'absolute',
        top:30,
        left:-150,
        fontSize: 60,
        color: '#00008b',
        margin: 10,
        fontWeight: 'bold'
    },
    textBigLocation: {
        position: 'absolute',
        top:50,
        left:-180,
        fontSize: 50,
        color: '#00008b',
        margin: 10,
        fontWeight: 'bold'
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
    textMedium: {
        fontSize: 30,
        color:'#f1f1f1',
        fontWeight: 'bold'
    },
    Button: {
        backgroundColor: '#00008b',
        padding: 15,
        borderRadius: 15
    },
    TxtInp: {
        height: 40,
        width: 300,
        borderColor: '#00008b',
        borderWidth: 2,
        margin: 15,
        fontSize:20,
        padding:5,
        borderRadius:6
    },
    EmergencyTxtInp: {
        height: 50,
        width: 400,
        borderColor: '#00008b',
        borderWidth: 2,
        margin: 15,
        fontSize:30,
        padding:5,
        borderRadius:5
    },
    EmergencylblText:{
        fontSize:20,
        color: '#00008b'
    },
    Err:{
        color:'red',
        margin:15,
        
    },
    lblText:{
        fontSize:30,
        color: '#00008b'
    },
    buttonMain:{
        position: 'absolute',
        //bottom: 0,
        //alignSelf: 'center',
        flexDirection: 'row',
        //padding: 10,
        marginBottom: 60
    },
    buttonMainDown:{
        position: 'absolute',
        //bottom: 0,
        //alignSelf: 'center',
        flexDirection: 'row',
        //padding: 10
        marginTop: 160
    },
});