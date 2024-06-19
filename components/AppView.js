import { View, Text } from 'react-native'
import React from 'react'

const AppView = (props) => {
  return (
    <View  style={{ 
      display: 'flex',
      flex: 1,
      backgroundColor: '#fff',
      alignItems: 'center',
      width: '100%',
      justifyContent: 'center'
      }} >
      {props.children}
    </View>
  )
}

export default AppView


