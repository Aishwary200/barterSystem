import React from 'react'
import { createBottomTabNavigator } from 'react-navigation-tabs'
import HomeScreen from '../screens/HomeScreen'
import ExchangeScreen from '../screens/ExchangeScreen'

export const TabNavigator = createBottomTabNavigator({
    Home: {
        screen: HomeScreen,
    },
    Exchange: {
        screen: ExchangeScreen,
    }
})