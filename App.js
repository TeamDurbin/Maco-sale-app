// import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import SignIn from './auth/signin';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import MyInteration from './auth/MyInteration';
import NewInteration from './auth/NewInteration';

const Stack = createNativeStackNavigator();

export default function App() {
  return (
      <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="Sign In"
          component={SignIn}
        />
        <Stack.Screen name="Profile" component={ProfileScreen} />
        <Stack.Screen name="My Interation" component={MyInteration} />
        <Stack.Screen name="New Interation" component={NewInteration} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}



const ProfileScreen = ({navigation, route}) => {
  return <Text>This is {route.params?.name}'s profile</Text>;
};