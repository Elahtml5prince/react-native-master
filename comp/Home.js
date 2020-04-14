import * as React from 'react';
import { View, Text, Button, TouchableOpacity, TextInput, StyleSheet } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

export default class HomeScreen extends React.Component {

    constructor(props) {
        //constructor to set default state  
        super(props);
        console.log(props);
        //console.log(props.route.params.getProf())
        this.state = {
            username: '',
        };
    }
    render() {
        
        return (
            <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
                <Text>Profile Name {this.props.route.params.getProf()}</Text>
                <Text>Facebook Page</Text>
                <Text>Eyebook</Text>
                <Text>Handbook</Text>
                <Button
                    title="Go to Details"
                    onPress={() => this.props.navigation.navigate('Details')}
                />
                <Button
                    title="Sign In"
                    onPress={() => this.props.navigation.navigate('SignIn')}
                />
                <Button
                    title="Sign Up"
                    onPress={() => this.props.navigation.navigate('SignUp')}
                />
            </View>
        );
    }

}

