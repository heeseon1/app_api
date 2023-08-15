import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import Icon from 'react-native-vector-icons/MaterialIcons';

import Camera from './Camera';
import Setting from './Setting';
import Main from './Main';
import MyRecord_bar from './screensMypage/MyRecord_bar';

const Tab = createBottomTabNavigator();

function Home() {
    return (
        <>
        
            <Tab.Navigator
                initialRouteName="Home"
                screenOptions={{
                    tabBarShowLabel: false,
                    tabBarActiveTintColor: '#8CB972',
                    tabBarStyle: {height: 80},
                }}>
                    <Tab.Screen
                    name="GreenDan"
                    component={Main}
                    options={{
                    tabBarLabel: '메인화면',
                    tabBarIcon: ({color}) => (
                        <Icon name="home" color={color} size={40} />
                    ),
                    }}
                />
                <Tab.Screen
                    name="Record"
                    component={MyRecord_bar}
                    options={{
                    tabBarLabel: '나의 기록',
                    tabBarIcon: ({color}) => (
                        <Icon name="feed" color={color} size={40} />
                    ),
                    }}
                />
                <Tab.Screen
                    name="Camera"
                    component={Camera}
                    options={{
                    tabBarLabel: '카메라',
                    tabBarIcon: ({color}) => (
                        <Icon name="add-a-photo" color={color} size={40} />
                    ),
                    }}
                />
                <Tab.Screen
                    name="Setting"
                    component={Setting}
                    options={{
                    tabBarLabel: '설정',
                    tabBarIcon: ({color}) => (
                        <Icon name="dehaze" color={color} size={40} />
                    ),
                    }}
                />
                
            </Tab.Navigator>
        </>
    );
}

export default Home;