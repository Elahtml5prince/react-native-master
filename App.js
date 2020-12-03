import * as React from 'react';
import { View, Text, Button, TouchableOpacity, TextInput, StyleSheet, Alert } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import  DetailsScreen from  './comp/Details';
import  HomeScreen  from './comp/Home';
import SignInScreen from './comp/Signinpage';
import SignUpScreen from './comp/Signuppage';

const Stack = createStackNavigator();

export default class App extends React.Component {
  constructor(props){
    super(props);
    console.log('App js constructor');
    console.log('adding some line..!');
    console.log('i have changed something..!');
    console.log('This is my 1st');
    console.log("This is my 2nd");
    console.log("This is my 3rd one");
    this.state = {
      profileName: "",
      baseUrl: "http://192.168.1.100:3000"
    }
  }

  setProfileName = (name) => {
    this.setState({
      profileName: name
    });
    console.log(name, this.state.profileName);
  }

  getProfileName = ()=>{
    console.log("Getting value =>",this.state.profileName);
    return this.state.profileName
  }

  render(){
    return (
      <NavigationContainer>
        <Stack.Navigator initialRouteName="Home">
          <Stack.Screen name="Home" component={HomeScreen} options={{ title: 'Home Page Section' }} initialParams={{getProf:this.getProfileName, baseUrl:this.state.baseUrl}} />
          <Stack.Screen name="Details" component={DetailsScreen} />
          <Stack.Screen name="SignIn" component={SignInScreen} initialParams={{getProf:this.getProfileName, setProf:this.setProfileName, baseUrl:this.state.baseUrl}}  />
          <Stack.Screen name="SignUp" component={SignUpScreen} initialParams={{getProf:this.getProfileName, baseUrl:this.state.baseUrl}} />
        </Stack.Navigator>
      </NavigationContainer>
    );
  }
 
}

const styles = StyleSheet.create({
  container: {
     paddingTop: 23
  },
  input: {
     margin: 15,
     height: 40,
     borderColor: '#7a42f4',
     borderWidth: 1
  },
  submitButton: {
     backgroundColor: '#7a42f4',
     padding: 10,
     margin: 15,
     height: 40,
  },
  submitButtonText:{
     color: 'white'
  }
})
