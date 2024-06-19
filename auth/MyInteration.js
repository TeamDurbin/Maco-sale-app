import {Text, SafeAreaView, StyleSheet, FlatList, Button, View } from 'react-native'
import React from 'react'
import AppView from '../components/AppView'
import * as SecureStore from 'expo-secure-store';
import data from '../data.json';

const MyInteration =  ({navigation}) => {
    let password
    try {
         password =  SecureStore.getItem('password');
    } catch (error) {
        password = localStorage.getItem('password');
    }
  
    const renderItem = ({ item }) => (
        <View style={styles.item}>
          <Text style={styles.title}>Visit ID: {item.VisitID}</Text>
          <Text>Date: {item.Date}</Text>
          <Text>Salesperson: {item.Salesperson}</Text>
          <Text>Customer Name: {item.CustomerName}</Text>
          <Text>Location: {item.Location}</Text>
          <Text>Interaction Type: {item.InteractionType}</Text>
          <Text>Shared With: {item.SharedWith}</Text>
          <Text>Interaction ID: {item.InteractionID}</Text>
          <Text>Department: {item.Department}</Text>
          <Text>Person 1 Name: {item.Person1Name}</Text>
          <Text>Person 2 Name: {item.Person2Name || 'N/A'}</Text>
          <Text>Product: {item.Product}</Text>
          <Text>Objective: {item.Objective}</Text>
          <Text>Discussion: {item.Discussion}</Text>
        </View>
      );
    
//   console.log(password);
  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        data={data}
        renderItem={renderItem}
        keyExtractor={item => item.InteractionID}
      />
        <Button
        title="New Interation"
        onPress={() => navigation.navigate('New Interation')}
      />
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#f8f8f8',
    },
    item: {
      backgroundColor: '#ffffff',
      padding: 20,
      marginVertical: 8,
      marginHorizontal: 16,
      borderRadius: 8,
      shadowColor: '#000',
      shadowOpacity: 0.1,
      shadowRadius: 5,
      shadowOffset: { width: 0, height: 2 },
    },
    title: {
      fontSize: 18,
      fontWeight: 'bold',
    },
  });

export default MyInteration