import React, { Component } from 'react'
import { View } from 'react-native'
import firebase from 'firebase'
import db from '../config'
import { ListItem } from 'react-native-elements'
import MyHeader from '../component/MyHeader'

export default class MyReceivedItemScreen extends Component {
    constructor() {
        super()
        this.state = {
            userId: firebase.auth().currentUser.email,
            receivedItemList: []
        }
        this.requestRef = null
    }
    getReceivedItemList = () => {
        this.requestRef = db.collection('requested_requests').where('user_id', '==', this.state.userId)
            .where('item_status', '==', 'received')
            .onSnapshot((snapshot) => {
                var receivedItemList = snapshot.docs.map((doc) => {
                    doc.data()
                })
                this.setState({
                    receivedItemList: receivedItemList
                })
            })
    }
    keyExtractor = (item, index) => index.toString()
    renderItem = ({ item, i }) => {
        return (
            <ListItem
                key={i}
                title={item.book_name}
                subtitle={item.bookStatus}
                titleStyle={{ color: 'black', fontWeight: 'bold' }}
                bottomDivider
            />
        )
    }
    componentDidMount() {
        this.getReceivedItemList()
    }
    componentWillUnmount() {
        this.requestRef()
    }
    render() {
        return (
            <View>
                <MyHeader title="Received Items" navigation={this.props.navigation} />
                {this.state.receivedItemList.length === 0 ? (
                    <View style={styles.subContainer}>
                        <Text style={{ fontSize: 20 }}>List Of All Received Items</Text>
                    </View>) : (
                    <FlatList keyExtractor={this.keyExtractor}
                        data={this.state.receivedItemList} renderItem={this.renderItem} />)}
            </View>
        )
    }

}
const styles = StyleSheet.create({
    subContainer: {
        flex: 1,
        fontSize: 20,
        justifyContent: 'center',
        alignItems: 'center'
    },
    button: {
        width: 100, height: 30,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: "#ff5722",
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 8
        }
    }
})