import React, { useContext, useEffect, useState } from 'react';
import { View, StyleSheet, ScrollView, KeyboardAvoidingView, SafeAreaView, Alert } from 'react-native';
import { RadioButton, Button, Text, Card, Title, TextInput} from 'react-native-paper';
import { FontAwesome } from '@expo/vector-icons';

import APIs, { authAPI, endpoints } from '../../configs/APIs';
import { UserContext } from '../../contexts/UserContext';
import AsyncStorage from '@react-native-async-storage/async-storage';

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#EEEDEC',
        flex: 1,
        padding: 12,
    },
    input: {
        marginVertical: 10,
        backgroundColor: 'white',
    },
    row: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginVertical: 10,
    },
    dateInput: {
        flex: 1,
        marginHorizontal: 5,
        backgroundColor: 'white',
    },
    radioGroup: {
        flexDirection: 'row',
        alignItems: 'center',
        marginVertical: 10,
    },
    radioButton: {
        flexDirection: 'row',
        alignItems: 'center',
        marginHorizontal: 10,
    },
    submitButton: {
        marginTop: 20,
        padding: 10,
        backgroundColor: '#573E26',
    },
    title: {
        fontSize: 16,
        fontWeight: 'bold',
        marginVertical: 10,
    },
    note: {
        marginVertical: 12,
        padding: 12,
        backgroundColor: '#573E26',
        borderRadius: 8,
    },
    noteText: {
        color: 'white',
        textAlign: 'center',
    },
});

export default function RegisterAccessCardScreen() {
   
    const user = useContext(UserContext);
    const [userAccess, setUserAccess]=useState({});
    const [loading, setLoading] = useState(false);
    const [err, setErr] = useState(false);
    
    const fields = [
        {
          label: "Họ và tên",
          icon: "text",
          field: "name",
        },
        {
          label: "CCCD",
          icon: "text",
          field: "cccd",
        },
        {
          label: "Số điện thoại",
          icon: "text",
          field: "sdt",
        }
      ];
    const change = (field, value) => {
        setUserAccess((current) => {
          return { ...current, [field]: value };
        });
      };
    const handleSubmit = async () => {
        setErr(false);
        console.log(user.id);
        let form = new FormData();
        for(let f in userAccess)
        {
            form.append(f,userAccess[f]);
            
        }
        
        const accessToken = await AsyncStorage.getItem('token');
        console.log('Token:', accessToken); 
        setLoading(true);
        try{
        let res= await authAPI(accessToken).post(endpoints['access-card'](user.id),form,{
            headers: {
                'Content-Type': "multipart/form-data",
                Authorization: `Bearer ${accessToken}`
            }
        })
        console.log(res.data)
        if (res.status === 201) {
            Alert.alert('Notification', 'Create success');
        }
        }catch(error){
            console.log(error);
        }
        finally{
            setLoading(false);
        }
    };

    return (
        <KeyboardAvoidingView style={{ flex: 1 }} behavior="padding">
            <ScrollView style={styles.container}>
                <SafeAreaView>
                    <Card style={styles.note}>
                        <Text style={styles.noteText}>Thông tin người được đăng ký</Text>
                    </Card>
                    <Title style={styles.title}>Đăng ký cấp phát tài khoản cho người thân</Title>

                    {fields.map((f) => (
                    <TextInput
                    style={styles.input}
                    
                    onChangeText={(t) => change(f.field, t)}
                    key={f.field}
                    label={f.label}
                    ></TextInput>
                ))}
                    {/* <TextInput
                        style={styles.input}
                        label="Họ và tên"
                        value={name}
                        onChangeText={(text) => setName(text)}
                    />
                    <TextInput
                        style={styles.input}
                        label="Số CCCD"
                        keyboardType="numeric"
                        maxLength={12}
                        value={cccd}
                        onChangeText={(text) => setCCCD(text)}
                    />
                    
                    <TextInput
                        style={styles.input}
                        label="Số điện thoại"
                        keyboardType="numeric"
                        maxLength={11}
                        value={sdt}
                        onChangeText={(text) => setSDT(text)}
                    /> */}
                    <Button
                        mode="contained"
                        loading={loading}
                        onPress={handleSubmit}
                        style={styles.submitButton}
                    >
                        Đăng ký
                    </Button>
                </SafeAreaView>
            </ScrollView>
        </KeyboardAvoidingView>
    );
}
