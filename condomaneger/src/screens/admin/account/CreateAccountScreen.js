import React, { useState } from 'react';
import { View, StyleSheet, Alert, ScrollView } from 'react-native';
import { TextInput, Button, RadioButton, Text } from 'react-native-paper';
import randomstring from 'randomstring';
import { authAPI, endpoints } from '../../../configs/APIs';
import AsyncStorage from '@react-native-async-storage/async-storage';

const CreateAccountScreen = () => {
    const [loading, setLoading]=useState(false);
    const [username, setUsername] =useState('')
    const [password, setPassword] = useState('');

    const generatePassword = () => {
        const newPassword = randomstring.generate({
            length: 8,
            charset: 'numeric'
        });
        setPassword(newPassword);
    };

    const handleRegister = async () => {
        if (!username || !password ) {
            Alert.alert('Error', 'Please fill all fields.');
            return;
        }

        try{
            setLoading(true)
            let form = new FormData()
            form.append('username', username)
            form.append('password',password)
            
            const accessToken = await AsyncStorage.getItem('token');
            console.log('Token:', accessToken); 
            console.log(form)
            const res = await authAPI(accessToken).post(endpoints['add-user'],form,{
                headers:{
                    'Content-Type': "multipart/form-data",
                     Authorization: `Bearer ${accessToken}`
             }
            })
            if(res.status===201)
                Alert.alert('Notification', 'Create success');
        }catch(ex){
            console.error(ex)
        }finally{
            setLoading(false)
        }
        // Gửi dữ liệu đến server hoặc xử lý đăng ký tại đây
        console.log({
            username,
            password
        });
        
        
    };

    return (
        <ScrollView contentContainerStyle={styles.container}>
            <TextInput
                label="Username"
                value={username}
                onChangeText={setUsername}
                style={styles.input}
            />
            <Button mode="contained" onPress={generatePassword} style={styles.button}>
                Generate Password
            </Button>

            {password ? (
                <Text style={styles.password}>Generated Password: {password}</Text>
            ) : null}

            <Button mode="contained" onPress={handleRegister} style={styles.button}>
                Register Resident
            </Button>
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    container: {
        flexGrow: 1,
        padding: 16,
        backgroundColor: '#fff',
    },
    input: {
        marginBottom: 16,
    },
    label: {
        marginBottom: 8,
        fontSize: 16,
        fontWeight: 'bold',
    },
    radioButton: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 8,
    },
    button: {
        marginVertical: 8,
    },
    password: {
        marginVertical: 8,
        fontSize: 16,
        fontWeight: 'bold',
        textAlign: 'center',
    },
});

export default CreateAccountScreen;
