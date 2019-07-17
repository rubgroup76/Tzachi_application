import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { createStackNavigator, createAppContainer } from 'react-navigation';
import LoginPage from './Pages/LoginPage';
import HomePage from './Pages/HomePage';
import LocationPage from './Pages/LocationPage';
import CameraPage from './Pages/CameraPage';
import PushNotPage from './Pages/PushNotPage';
import ElementsPage from './Pages/ElementsPage';
//import EmergencyEvent from './Pages/EmergencyEvent';
import LoginPageTest from './Pages/LoginPageTest';
import Chat from './Components/Chat';
import CreateAccount from './Components/CreateAccount';
import LoginToChat from './Components/LoginToChat';
import { ThemeProvider } from 'react-native-material-ui';
import HakpatzaPage from './Pages/HakpatzaPage';
//import HakpatzaTest from './Pages/HakptzaPageTest';
import HakpatzaVolPage from './Pages/HakpatzaVolPage';
import EmergencyScenarioPage from './Pages/EmergencyScenarioPage';
import ShowEmergancyPage from './Pages/ShowEmergancyPage';
import ActualHakpatza from './Pages/ActualHakpatzaPage';
import ManageEvent from './Pages/ManageEventPage';

class App extends React.Component {

  render() {
    return (
      <ThemeProvider>
        <AppNavigator />
      </ThemeProvider>
    );
  }
}



const AppNavigator = createStackNavigator(
  {
    Login: LoginPage,
    Home: HomePage,
    Location:LocationPage,
    Camera:CameraPage,
    Push:PushNotPage,
    Elements:ElementsPage,
    //Emergency: EmergencyEvent,
    LoginTest: LoginPageTest,
    Hakpatza:HakpatzaPage,
    //HakpatzaTest: HakpatzaTest,
    HakpatzaVol:HakpatzaVolPage,
    Chat: Chat,
    LoginToChat:LoginToChat,
    CreateAccount: CreateAccount,
    EmergencyScenario: EmergencyScenarioPage,
    ShowEmegancy: ShowEmergancyPage,
    ActualHakpatza : ActualHakpatza,
    ManageEvent: ManageEvent
  },
  {
    initialRouteName: 'Home',
  }
);

export default createAppContainer(AppNavigator);
