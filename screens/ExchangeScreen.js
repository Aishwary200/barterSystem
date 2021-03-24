import React, { Component } from 'react';
import { Alert, StyleSheet, Text, TextInput, Touchable, TouchableOpacity, View } from 'react-native';
import db from '../config'
import HomeScreen from './HomeScreen'
import firebase from 'firebase'

export default class ExchangeScreen extends Component {
    constructor() {
        super()
        this.state = {
            userId: firebase.auth().currentUser.email,
            username: '',
            itemName: '',
            description: '',
            exchangeId: ''
        }
    }
    createUniqueId() {
        return Math.random().toString(36).substring(7);
    }
    addItems = () => {
        var userId = this.state.userId
        var randomRequestId = this.createUniqueId()
        db.collection('requested_books').add({
            "user_id": userId,
            "book_name": bookName,
            "reason_to_request": reasonToRequest,
            "request_id": randomRequestId,
        })

        this.setState({
            bookName: '',
            reasonToRequest: ''
        })

        return Alert.alert("Book Requested Successfully")
    }
    addItem = (itemName, description) => {
        var username = this.state.username
        db.collection('exchange_requests').add({
            'username': username,
            'item_name': itemName,
            'description': description
        })
        this.setState({
            itemName: '',
            description: ''
        })
        return Alert.alert('Item ready to echange', '', [
            {
                text: 'OK', onPress: () => {
                    this.props.navigation.navigate('HomeScreen')
                }
            }
        ])
    }
    render() {
        return (
            <View>
                <TextInput placeholder="item name"
                    onChangeText={(text) => {
                        this.setState({
                            itemName: text
                        })
                    }}
                />
                <TextInput placeholder="description"
                    onChangeText={(text) => {
                        this.setState({
                            description: text
                        })
                    }}
                />
                <TouchableOpacity onPress={() => {
                    this.addItem(this.state.itemName, this.state.description)
                }}>
                    <Text style={{ color: '#ffff', fontSize: 18, fontWeight: 'bold' }}>Add Item</Text>
                </TouchableOpacity>
            </View>
        )
    }
}