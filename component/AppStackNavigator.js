import React from 'react'
import { createStackNavigator } from 'react-navigation-stack'
import HomeScreen from '../screens/HomeScreen'
import UserDetailsScreen from '../screens/UserDetailsScreen'
import NotificationScreen from '../screens/NotificationsScreen'

export const AppStackNavigator = createStackNavigator({
    BarterList: {
        screen: HomeScreen,
        navigationOptions: {
            headerShown: false
        }
    },

    ReceiverDetails: {
        screen: UserDetailsScreen,
        navigationOptions: {
            headerShown: false
        }
    },
    Notification: {
        screen: NotificationScreen,
        navigationOptions: {
            headerShown: false
        }
    }
},


    {
        initialRouteName: 'BarterList'
    }
);