import { Button, Text, StyleSheet, View} from 'react-native'
import { useState } from 'react'
import { TextInput } from '@react-native-material/core'
import AppView from '../components/AppView';
import PasswordFeild from '../components/PasswordFeild';
import * as SecureStore from 'expo-secure-store';


const  styles = StyleSheet.create({
   hadder1 : {
    margin:20, 
    fontSize: 18
}
})

export function SignIn({ navigation }) {

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const letsLogIn = async () => {
        let data = await fetch("http://0.0.0.0:4000/auth/login",
            { method: 'POST',
            headers: {
              Accept: 'application/json',
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                "email": email,
                "password": password
            })
        }
        ).then((res) => res.json())
       
        try {
            await SecureStore.setItem("token", data.token)
        } catch (error) {
            await localStorage.setItem("token", data.token)
        }
        navigation.navigate('My Interation')
    };
    return (
        <AppView>
            <View>
                <Text style={styles.hadder1}>Let's login with email id</Text>
                <TextInput placeholder='email@example.com' onChangeText={(e) => {setEmail(e)}} label="Email" />
                <PasswordFeild setPassword={setPassword} password={password} />
                <Button title='Sign In' onPress={letsLogIn} />
            </View>
        </AppView>
    )

}

export default SignIn