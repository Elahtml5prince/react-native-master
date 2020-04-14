import * as React from 'react';
import { View, Text, Button, TouchableOpacity, TextInput, StyleSheet, Alert } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Signinpage from '../comp/Signinpage';


export default class DetailsScreen extends React.Component {
    constructor(props) {
        super(props);
        console.log('details page constructor');
        this.state = {
            username: Signinpage.username,
        };

        //Alert.alert(this.state.username);
    }

    

    render() {
        return (
            <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
                <Text>Details Screen Ela Details</Text>
                <Text>{this.state.username}</Text>
                <Button
                    title="Go to Home"
                    onPress={() => this.props.navigation.navigate('Home')}
                />
            </View >
        );
    }
}

