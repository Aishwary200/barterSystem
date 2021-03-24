import { createDrawerNavigator } from 'react-navigation-drawer';
import { TabNavigator } from './AppTabNavigator'
import CustomSideBarMenu from './customSideBarMenu';
import MyBartersScreen from '../screens/MyBartersScreen';
import SettingScreen from '../screens/SettingScreen';
import NotificationScreen from '../screens/NotificationScreen';

export const AppDrawerNavigator = createDrawerNavigator({
    Home: {
        screen: TabNavigator
    },
    MyBarters: {
        screen: MyBartersScreen,
    },
    Notifications: {
        screen: NotificationScreen
    },
    Setting: {
        screen: SettingScreen
    }
},
    {
        contentComponent: CustomSideBarMenu
    },
    {
        initialRouteName: 'Home'
    })