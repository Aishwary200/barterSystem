import React, { Component } from 'react';
import { Alert, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import firebase from 'firebase'
import db from '../config'

export default class SettingScreen extends Component {
    constructor() {
        super()
        this.state = {
            firstName: '',
            lastName: '',
            address: '',
            contact: '',
            emailId: '',
            docId: ''
        }
    }
    getUserDetails = () => {
        var email = firebase.auth().currentUser.email;
        db.collection('users').where('email_id', '==', email).get()
            .then(snapshot => {
                snapshot.forEach(doc => {
                    var data = doc.data()
                    this.setState({
                        emailId: data.email_id,
                        firstName: data.first_name,
                        lastName: data.last_name,
                        address: data.address,
                        contact: data.mobile_number,
                        docId: doc.id
                    })
                });
            })
    }
    updateUserDetails = () => {
        db.collection('users').doc(this.state.docId)
            .update({
                "first_name": this.state.firstName,
                "last_name": this.state.lastName,
                "address": this.state.address,
                "mobile_number": this.state.contact,
            })

        Alert.alert("Profile Updated Successfully")

    }
    componentDidMount() {
        this.getUserDetails()
    }
    render() {
        return (
            <View style={{ flex: 1 }}>
                <Text>Settings</Text>
                <TextInput style={styles.formTextInput} placeholder='First name' onChangeText={
                    (text) => {
                        this.setState({
                            firstName: text
                        })
                    }
                } />
                <TextInput style={styles.formTextInput} placeholder='Last name' onChangeText={
                    (text) => {
                        this.setState({
                            lastName: text
                        })
                    }
                } />
                <TextInput style={styles.formTextInput} placeholder='Address' onChangeText={
                    (text) => {
                        this.setState({
                            address: text
                        })
                    }
                } />
                <TextInput style={styles.formTextInput} placeholder='Contact number' onChangeText={
                    (text) => {
                        this.setState({
                            contact: text
                        })
                    }
                } />
                <TouchableOpacity style={styles.button} onPress={() => {
                    this.updateUserDetails()
                }}>
                    <Text style={styles}>Save</Text>
                </TouchableOpacity>
            </View>
        )
    }
}
const styles = StyleSheet.create({
    formTextInput: {
        width: "75%",
        height: 35,
        alignSelf: 'center',
        borderColor: '#ffab91',
        borderRadius: 10,
        borderWidth: 1,
        marginTop: 20,
        padding: 10,
    },
    button: {
        width: "75%",
        height: 50,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 10,
        backgroundColor: "#ff5722",
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 8,
        },
    },
    buttonText: {
        fontSize: 25,
        fontWeight: "bold",
        color: "#fff"
    }

})
