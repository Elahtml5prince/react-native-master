import * as React from 'react';
import {
    View, Text, Button, TouchableOpacity, TextInput, StyleSheet,
    Dimensions,
    TouchableHighlight, Platform, Image,
    Alert, ScrollView
} from 'react-native';

const deviceWidth = Dimensions.get("window").width;
const deviceHeight = Dimensions.get("window").height;

export default class SignUpScreen extends React.Component {

    constructor(props) {
        //constructor to set default state  
        super(props);
        console.log('sign up page constructor!');
        this.state = {
            firstname: '',
            lastname: '',
            email: '',
            password: '',
            confirmPassword: '',
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
            let idExists = false
            for(let i=0;i<this.state.totalUserList.length;i++){
                if(this.state.totalUserList[i].email == this.state.email){
                    Alert.alert('Error', 'User email id already exists!'), [
                        { text: 'Okay' },
                    ];
                    idExists = true;
                    break;
                }
            }

            if(!idExists){
                this.createNewRecord();
            }
        }).catch((error)=>{
            console.log(error);
        })
    }

    createNewRecord = ()=>{
        fetch(this.state.baseUrl+'/profileList/', {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                firstname: this.state.firstname,
                lastname: this.state.lastname,
                email: this.state.email,
                password: this.state.password
            }),
        }).then(response => response.json())
            .then((responseJson) => {
                console.log(responseJson);
                this.setState({
                    firstname: '',
                    lastname: '',
                    email: '',
                    password: '',
                    confirmPassword: ''
                });
                Alert.alert('Success', 'Logged in successfully'), [
                    { text: 'Okay' },
                ];
            }).catch((err) => {
                console.log(err);
            })
    }

    _submit() {
        if (this.state.firstname == '') {
            Alert.alert('Failed', 'First Name is required'), [
                { text: 'Okay' },
            ];
            return;
        }
        if (this.state.lastname == '') {
            Alert.alert('Failed', 'Last Name is required'), [
                { text: 'Okay' },
            ];
            return;
        }
        if (this.state.email == '') {
            Alert.alert('Failed', 'Email is required'), [
                { text: 'Okay' },
            ];
            return;
        }
        if (this.state.password == '') {
            Alert.alert('Failed', 'Password is required'), [
                { text: 'Okay' },
            ];
            return;
        }
        if (this.state.confirmPassword == '') {
            Alert.alert('Failed', 'Confirm Password is required'), [
                { text: 'Okay' },
            ];
            return;
        }
        if (this.state.confirmPassword !== this.state.password) {
            Alert.alert('Failed', 'Password and Confirm Password didn\'t match!'), [
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

                <View style={{ width: deviceWidth, height: (deviceHeight + 60), alignItems: 'center', justifyContent: 'center' }}>
                    <View style={styles.imageContainer}>
                        <Image resizeMode="contain"
                            source={require('./../assets/images/download.png')}
                            style={styles.image}
                        />
                    </View>
                    <TextInput style={styles.input}
                        value={this.state.firstname}
                        onChangeText={firstname => this.setState({ firstname })}
                        underlineColorAndroid="transparent"
                        placeholder="First Name"
                        placeholderTextColor="#9a73ef"
                        autoCapitalize="none"
                        returnKeyType={'next'}
                        onSubmitEditing={(event) => {
                            this.refs.lastnameTextReference.focus();
                        }}
                    />
                    <TextInput style={styles.input}
                        ref="lastnameTextReference"
                        value={this.state.lastname}
                        onChangeText={lastname => this.setState({ lastname })}
                        underlineColorAndroid="transparent"
                        placeholder="Last Name"
                        placeholderTextColor="#9a73ef"
                        autoCapitalize="none"
                        returnKeyType={'next'}
                        onSubmitEditing={(event) => {
                            this.refs.emailTextReference.focus();
                        }}
                    />
                    <TextInput style={styles.input}
                        ref="emailTextReference"
                        value={this.state.email}
                        onChangeText={email => this.setState({ email })}
                        underlineColorAndroid="transparent"
                        placeholder="Email"
                        placeholderTextColor="#9a73ef"
                        autoCapitalize="none"
                        returnKeyType={'next'}
                        onSubmitEditing={(event) => {
                            this.refs.passwordTextReference.focus();
                        }}
                    />

                    <TextInput style={styles.input}
                        ref="passwordTextReference"
                        secureTextEntry={true}
                        returnKeyType={"next"}
                        value={this.state.password}
                        onChangeText={password => this.setState({ password })}
                        underlineColorAndroid="transparent"
                        placeholder="Password"
                        placeholderTextColor="#9a73ef"
                        autoCapitalize="none"
                        onSubmitEditing={(event) => {
                            this.refs.confirmPasswordTextInputRef.focus();
                        }}
                    />

                    <TextInput style={styles.input}
                        ref="confirmPasswordTextInputRef"
                        secureTextEntry={true}
                        returnKeyType="go"
                        value={this.state.confirmPassword}
                        onChangeText={confirmPassword => this.setState({ confirmPassword })}
                        underlineColorAndroid="transparent"
                        placeholder="Confirm Password"
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

                    <TouchableOpacity style={styles.buttonSignup}
                        underlayColor={'transparent'}
                        onPress={ ()=>{
                            this.props.navigation.navigate("SignIn");
                        } }
                    >
                        <Text style={[styles.buttonTextSignup, { color: '#6D6E70' }]}>Sign in? Click here</Text>
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

