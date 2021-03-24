import React, { Component } from 'react';
import { FlatList, StyleSheet, Text, View } from 'react-native';

export default class HomeScreen extends Component {
    constructor() {
        super()
        this.state = {
            allRequests: []
        }
        this.requestRef = null
    }

    getAllRequests = () => {
        this.requestRef = db.collection("exchange_requests")
            .onSnapshot((snapshot) => {
                var allRequests = snapshot.docs.map(document => document.data());
                this.setState({
                    allRequests: allRequests
                });
            })
    }

    componentDidMount() {
        this.getAllRequests()
    }

    componentWillUnmount() {
        this.requestRef();
    }

    keyExtractor = (item, index) => index.toString()

    renderItem = ({ item, i }) => {
        return (
            <ListItem
                key={i}
                title={item.item_name}
                subtitle={item.description}
                titleStyle={{ color: 'black', fontWeight: 'bold' }}
                rightElement={
                    <TouchableOpacity style={styles.button}>
                        <Text style={{ color: '#ffff' }}>Exchange</Text>
                    </TouchableOpacity>
                }
                bottomDivider
            />
        )
    }


    render() {
        return (
            <FlatList
                keyExtractor={this.keyExtractor}
                data={this.state.allRequests}
                renderItem={this.renderItem}
            />
        )
    }
}