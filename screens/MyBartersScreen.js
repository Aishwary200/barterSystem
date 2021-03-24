import React, { Component } from 'react'
import { View, Text, TouchableOpacity, ScrollView, FlatList, StyleSheet } from 'react-native';
import { Icon, ListItem } from 'react-native-elements'
import firebase from 'firebase';
import db from '../config.js'
import MyHeader from '../component/MyHeader'

export default class MyBartersScreen extends Component {
    static navigationOptions = { header: null };

    constructor() {
        super()
        this.state = {
            userId: firebase.auth().currentUser.email,
            allBarters: []
        }
        this.requestRef = null
    }


    getAllBarters = () => {
        this.requestRef = db.collection("all_Barters").where("donor_id", '==', this.state.userId)
            .onSnapshot((snapshot) => {
                var allBarters = snapshot.docs.map(document => document.data());
                this.setState({
                    allBarters: allBarters,
                });
            })
    }
    sendNotification = (itemDetails, requestStatus) => {
        var requestId = itemDetails.request_id
        var donorId = itemDetails.donor_id
        db.collection('all_notifications').where('request_id', '==', requestId).where('donor_id', '==', donorId).get()
            .then((snapshot) => {
                snapshot.forEach((doc) => {
                    var message = ''
                    if (requestStatus === 'Item Sent') {
                        message = this.state.donorName + ' sent you book'
                    }
                    else {
                        message = this.state.donorName + ' has shown interest in donating the book'
                    }
                    db.collection('all_notifications').doc(doc.id).update({
                        'message': message,
                        'notification_status': 'unread',
                        'date': firebase.firestore.FieldValue.serverTimestamp()
                    })
                })
            })
    }
    keyExtractor = (item, index) => index.toString()

    renderItem = ({ item, i }) => (
        <ListItem
            key={i}
            title={item.item_name}
            subtitle={"Requested By : " + item.requested_by + "\nStatus : " + item.request_status}
            leftElement={<Icon name="book" type="font-awesome" color='#696969' />}
            titleStyle={{ color: 'black', fontWeight: 'bold' }}
            rightElement={
                <TouchableOpacity style={styles.button}>
                    <Text style={{ color: '#ffff' }}>Exchange</Text>
                </TouchableOpacity>
            }
            bottomDivider
        />
    )


    componentDidMount() {
        this.getAllBarters()
    }

    componentWillUnmount() {
        this.requestRef();
    }

    render() {
        return (
            <View style={{ flex: 0.1 }}>
                <MyHeader navigation={this.props.navigation} title="My Barters" />
                <View style={{ flex: 0.9 }}>
                    {
                        this.state.allBarters.length === 0
                            ? (
                                <View style={styles.subtitle}>
                                    <Text style={{ fontSize: 20 }}>You have no notifications</Text>
                                </View>
                            )
                            : (
                                <FlatList
                                    keyExtractor={this.keyExtractor}
                                    data={this.state.allNotifications}
                                    renderItem={this.renderItem}
                                />
                            )
                    }
                </View>
            </View>
        )
    }
}


const styles = StyleSheet.create({
    button: {
        width: 100,
        height: 30,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: "#ff5722",
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 8
        },
        elevation: 16
    },
    subtitle: {
        flex: 1,
        fontSize: 20,
        justifyContent: 'center',
        alignItems: 'center'
    }
})