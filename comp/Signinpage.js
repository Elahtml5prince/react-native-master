import * as React from 'react';
import {
    View, Text, Button, TouchableOpacity, TextInput, StyleSheet,
    Dimensions,
    TouchableHighlight, Platform, Image,
    Alert, ScrollView
} from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

const deviceWidth = Dimensions.get("window").width;
const deviceHeight = Dimensions.get("window").height;

export default class SignInScreen extends React.Component {

    constructor(props) {
        //constructor to set default state  
        console.log('sign in constructor!');
        super(props);
        this.state = {
            username: '',
            password: '',
            totalUserList: [],
            baseUrl: this.props.route.params.baseUrl
        };
    }

    _fetchUserList = ()=> {
        fetch(this.state.baseUrl+'/profileList/')
        .then(response=>response.json())
        .then((responseJson)=>{
            console.log(responseJson);
            this.setState({
                totalUserList: responseJson
            });
            let idExists = false;
            let obj = null;
            for(let i=0;i<this.state.totalUserList.length;i++){
                if(this.state.totalUserList[i].email == this.state.username){
                    idExists = true;
                    obj = this.state.totalUserList[i];
                    break;
                }
            }

            if(!idExists){
                Alert.alert('Failed', 'Email id not exists!'), [
                    { text: 'Okayy' },
                ];
            } else {
                if(obj.email == this.state.username && obj.password == this.state.password) {
                    var stringA = obj.firstname[0].toUpperCase() + obj.firstname.slice(1);
                    var stringB = obj.lastname[0].toUpperCase() + obj.lastname.slice(1);
                    this.props.route.params.setProf( stringA + " "+ stringB );
                    this.props.navigation.navigate("Home",{getProf:this.props.route.params.getProf, baseUrl:this.state.baseUrl}); 
                } else {
                    Alert.alert('Failed', 'Incorrect Username and Password!'), [
                        { text: 'Okayy' },
                    ];
                }
            }
        }).catch((error)=>{
            console.log(error);
        })
    }
    

    _submit() {
        if (this.state.username == '') {
            Alert.alert('Failed', 'Username is required'), [
                { text: 'Okayy' },
            ];
            return;
        }
        if (this.state.password == '') {
            Alert.alert('Failed', 'Password is required'), [
                { text: 'Okay' },
            ];
            return;
        }
        
        this._fetchUserList();
    }
    render() {
        const showmyAlert = () => {
            Alert.alert(this.state.username + " " + this.state.password);
            //Alert.alert('Success!');
        }

        return (
            <ScrollView>

                <View style={{ width: deviceWidth, height: (deviceHeight - 60), alignItems: 'center', justifyContent: 'center' }}>
                    <View style={styles.imageContainer}>
                        <Image resizeMode="contain"
                            source={require('./../assets/images/download.png')}
                            style={styles.image}
                        />
                    </View>
                    <TextInput style={styles.input}
                        value={this.state.username}
                        onChangeText={username => this.setState({ username })}
                        underlineColorAndroid="transparent"
                        placeholder="Email"
                        placeholderTextColor="#9a73ef"
                        autoCapitalize="none"
                        returnKeyType={'next'}
                        onSubmitEditing={(event) => {
                            this.refs.passwordTextInputRef.focus();
                        }}
                    />

                    <TextInput style={styles.input}
                        ref="passwordTextInputRef"
                        secureTextEntry={true}
                        returnKeyType="go"
                        value={this.state.password}
                        onChangeText={password => this.setState({ password })}
                        underlineColorAndroid="transparent"
                        placeholder="Password"
                        placeholderTextColor="#9a73ef"
                        autoCapitalize="none"
                        onSubmitEditing={(event) => {
                            this._submit();
                        }}
                    />

                    <TouchableOpacity
                        style={styles.submitButton}
                        onPress={
                            () => this._submit()}>
                        <Text style={styles.submitButtonText}> Login </Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={styles.submitButton}
                        onPress={
                            showmyAlert
                        }>
                        <Text style={styles.submitButtonText}> Get Value </Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.buttonSignup}
                        underlayColor={'transparent'}
                        onPress={() => {
                            Alert.alert('Info', 'Forgot password clicked'), [
                                { text: 'Okay' },
                            ];
                        }}
                    >
                        <Text style={[styles.buttonTextSignup, { color: '#6D6E70' }]}>Forgot Password?</Text>
                    </TouchableOpacity>

                    <TouchableOpacity style={styles.buttonSignup}
                        underlayColor={'transparent'}
                        onPress={ ()=>{
                            this.props.navigation.navigate("SignUp")
                        } }
                    >
                        <Text style={[styles.buttonTextSignup, { color: '#6D6E70' }]}>Don't have account? Click here</Text>
                    </TouchableOpacity>

                    <View style={styles.viewTextRights}>
                        <Text style={styles.textRights}>© 2020 All Rights Reserved | RE Organization</Text>
                    </View>
                </View>
            </ScrollView>
        );
    }

}

const styles = StyleSheet.create({
    container: {
        paddingTop: 23
    },
    input: {
        width: '90%',
        margin: 15,
        height: 40,
        padding: 10,
        borderColor: '#7a42f4',
        borderWidth: 1
    },
    submitButton: {
        backgroundColor: '#7a42f4',
        padding: 10,
        margin: 15,
        height: 40,
        width: 120,
        justifyContent: "center",
        alignItems: "center"
    },
    submitButtonText: {
        color: 'white'
    },
    imageContainer: {
        alignItems: 'center',
    },
    image: {
        width: 80,
        height: 80,
        marginBottom: 20,
    },
    buttonSignup: {
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 30,
      },
      buttonTextSignup: {
        fontSize: 12,
      },
      viewTextRights: {
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 75,
      },
      textRights: {
        fontSize: 10,
        color: '#A3BF3A',
      },
})

