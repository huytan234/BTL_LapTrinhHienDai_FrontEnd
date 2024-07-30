import React, { memo, useContext, useState } from 'react';
import { TouchableOpacity, StyleSheet, Text, View, KeyboardAvoidingView, Platform, ScrollView } from 'react-native';
import Background from '../../components/Background';
import APIs, { authAPI, endpoints } from "../../configs/APIs";
import Header from '../../components/Header';
import Button from '../../components/Button';
import TextInput from '../../components/TextInput';
import { themeLogin } from '../../theme/themeLogin';
import { usernameValidator, passwordValidator } from '../../utils/utils';

import { useNavigation } from '@react-navigation/native';

import {UserDispatchContext} from '../../contexts/UserContext'
import AsyncStorage from '@react-native-async-storage/async-storage';




const LoginScreen = ({navigation }) => {
  
  const [username, setUsername] = useState({ value: '', error: '' });
  const [password, setPassword] = useState({ value: '', error: '' });

    const [loading, setLoading] = useState(false);
    
    const dispatch = useContext(UserDispatchContext);

  

    const onLoginPressed = async () => {
        setLoading(true);
        // const usernameError = usernameValidator(username.value, 'Username');
        // const passwordError = passwordValidator(password.value);
    
        // if (usernameError || passwordError) {
        //   setUsername({ ...username, error: usernameError });
        //   setPassword({ ...password, error: passwordError });
        //   setLoading(false);
        //   return;
        // }
        try {
            let res = await APIs.post(endpoints['login'], {
                'username': username,
                'password': password,
                'client_id': 'AUE0ZC65Q4iJ3e2IQ3foq6h2KXr0BV9eOnV58Zya',
                'client_secret': 'LwvK7q4ieEZtL1M36vPoThMRNyPOXkEtwhVzN0Qo7FzeZcCE3AQxnS3RInuPTR2RbYm99DCUj70ogluzHNUbotfUnd3mrC3Rxcd47zcXFxtnviOZ9Jir9uqOoApNR7Pb',
                'grant_type': 'password'
            }, {
              headers: {
                  'Content-Type': 'multipart/form-data'
              }});
            console.info(res.data)

            await AsyncStorage.setItem("token", res.data.access_token);            
            setTimeout(async () => {
                let user = await authAPI(res.data.access_token).get(endpoints['current-user']);
                console.info(user.data);

                dispatch({
                    'type': "login",
                    'payload': user.data
                })
                // if (user.is_first_login) 
                //     navigation.navigate('UpdateProfileScreen');
                  
                
            }, 100);
        } catch (ex) {
            console.error("Lỗi tại màn hình đăng nhập:",ex);
        } finally {
            setLoading(false);
        }   
    }

    return (

        <Background style={styles.container}>
        <Header>Building Care App</Header>
        <TextInput
          label="User name"
          onChangeText={t => setUsername(t)}
          error={!!username.error}
          errorText={username.error}
          
          
          
          
        />
        <TextInput
          label="Password"
          
          onChangeText={t => setPassword(t)}
          error={!!password.error}
          errorText={password.error}
          secureTextEntry
        />
        <Button loading={loading} mode="contained" icon="login" onPress={onLoginPressed}>
          Login
        </Button>
      </Background>
    
    );

};

const styles = StyleSheet.create({
  container: {
    flex: 1
}, subject: {
    fontSize: 25,
    fontWeight: "bold",
    color: "blue"
}, row: {
    flexDirection: "row"
}, wrap: {
    flexWrap: "wrap"
}, margin: {
    margin: 5
}, avatar: {
    width: 80,
    height: 80,
    borderRadius: 20
}
});

export default LoginScreen;