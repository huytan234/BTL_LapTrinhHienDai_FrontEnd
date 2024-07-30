import React, { useContext, useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import axios from 'axios';
import APIs, { authAPI, endpoints } from '../../configs/APIs';

import { UserContext } from '../../contexts/UserContext';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { text } from '@fortawesome/fontawesome-svg-core';


const FeedbackScreen = () => {
    const [loading, setLoading]=useState(false);
    const [userFeedback, setUserFeedback] = useState({})
    const [subject,setSubject]=useState('');
    const [message,setMessegae]=useState('')
  
    const user =useContext(UserContext)
    
    const handleSubmitFeedback =  async() => {
        setLoading(true);
    const changeSubject =(value)=>{
        setSubject(value)
    }
    const changeMessage =(value)=>{
        setMessegae(value)
    }
       
        
        try{
            let form= new FormData()
                form.append('subject',subject);
                form.append('message',message);
            
            const accessToken = await AsyncStorage.getItem('token');
            console.log('Token:', accessToken); 
            console.log(form)
            
            const res = await authAPI(accessToken).post(endpoints['add-feedback'], form,{
                headers:{
                       'Content-Type': "multipart/form-data",
                        Authorization: `Bearer ${accessToken}`
                }
            })
            if(res.status===201)
                Alert.alert('Notification', 'Create success');
            
        } catch(ex){
            console.error(ex)
        }finally{
            setLoading(false)
        }
    };

    return (
        <View style={styles.container}>
            <Text style={styles.label}>Tiêu đề</Text>
            <TextInput
                style={styles.input}
                placeholder="Nhập tiêu đề"
                
                onChangeText={setSubject}
            />
            <Text style={styles.label}>Nội dung</Text>
            <TextInput
                style={[styles.input, styles.textArea]}
                placeholder="Nhập nội dung"
                
                onChangeText={setMessegae}
                multiline={true}
                numberOfLines={4}
            />
            <TouchableOpacity style={styles.button} loading={loading} onPress={handleSubmitFeedback}>
                <Text style={styles.buttonText}>Gửi phản hồi</Text>
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 16,
        backgroundColor: '#EEEDEC',
    },
    label: {
        fontSize: 16,
        fontWeight: 'bold',
        marginBottom: 8,
    },
    input: {
        height: 40,
        borderColor: 'gray',
        borderWidth: 1,
        marginBottom: 16,
        paddingHorizontal: 8,
        backgroundColor: '#fff',
    },
    textArea: {
        height: 100,
        textAlignVertical: 'top',
    },
    button: {
        backgroundColor: '#007BFF',
        padding: 16,
        alignItems: 'center',
        borderRadius: 4,
    },
    buttonText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: 'bold',
    },
});

export default FeedbackScreen;