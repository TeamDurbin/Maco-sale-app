import { View, Text } from 'react-native'
import { useState } from 'react'
import { TextInput,  } from '@react-native-material/core';
import { Checkbox } from 'react-native-paper';





const PasswordFeild = ({setPassword, password}) => {
    const [securePassword, setSecurePassword] = useState("unchecked");
    return (
        <>
        <TextInput label="Password" onChangeText={(pass) => {setPassword(pass)}} secureTextEntry={true} />
        {securePassword === "checked" ? <Text style={{backgroundColor:"#f1e3f6", width:"50%", minWidth: "200px", overflow: "hidden"}}> {password} </Text> : <></>}
        <Checkbox.Item label="show password" status={securePassword} onPress={()=> {securePassword==="checked" ? setSecurePassword("unchecked") : setSecurePassword("checked")}} />
        </>
    )
}

export default PasswordFeild;
