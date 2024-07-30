import React, { useContext, useEffect, useState } from 'react';
import { View, StyleSheet, Alert, ScrollView } from 'react-native';
import { Text, Card, Button, TextInput } from 'react-native-paper';
import Dialog from 'react-native-dialog';
import { useNavigation } from '@react-navigation/native';
import { UserContext, UserDispatchContext } from '../../contexts/UserContext';
import APIs, { authAPI, endpoints } from '../../configs/APIs';
import AsyncStorage from '@react-native-async-storage/async-storage';

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#EEEDEC',
        padding: 16,
        color:"#000",
    },
    card: {
        marginBottom: 20,
        padding: 16,
    },
    input: {
        marginVertical: 10,
        backgroundColor: '#fff',
    },
    logoutButton: {
        backgroundColor: '#573E26',
        marginVertical: 20,
    },
});

export default function AccountScreen() {
    const [dialogVisible, setDialogVisible] = useState(false);
    const [loading,setLoading] =useState(false);
    // const user = useContext(UserContext);
    const [user, setUser]=useState('');
    const dispatch = useContext(UserDispatchContext);
    const navigation = useNavigation();
    
    const handleLogout = () => {
        setDialogVisible(true);
    };
 
    const handleConfirmLogout = () => {
        setDialogVisible(false);
        dispatch({type: "logout"})
        navigation.navigate('LoginScreen');
    };
  

    const handleCancelLogout = () => {
        setDialogVisible(false);
    };
    const handleGetUser = async ()=>{
        setLoading(true);
        try{
            const accessToken = await AsyncStorage.getItem('token');
            let res= await APIs.get(endpoints['current-user'],{
                headers: {
                    Authorization: `Bearer ${accessToken}`
                }
            });
            setUser(res.data);
            console.log(res.data);
        }catch(ex){
            console.log(ex)
        }finally{
            setLoading(false);
        }
    }
    useEffect(()=>{
        handleGetUser()
    },[])
    useEffect(() => {
        console.log('User context:', user); // Add this line to check user object
    }, [user]);
    return (
        <View style={styles.container}>
        <ScrollView>
            <Card style={styles.card}>
                <Card.Title title="Thông tin cư dân" />
                <Card.Content>
                    <TextInput style={styles.input} label="Họ và tên" value={`${user.last_name || ''} ${user.first_name || ''}`} disabled />
                    <TextInput style={styles.input} label="Email" value={user.email || ''} disabled />
                    <TextInput style={styles.input} label="Username" value={user.username || ''} disabled />
                </Card.Content>
            </Card>
            <Button mode="contained" loading={loading} style={styles.logoutButton} onPress={handleLogout}>
                Đăng xuất
            </Button>
            <Dialog.Container visible={dialogVisible}>
                <Dialog.Title>Đăng xuất</Dialog.Title>
                <Dialog.Description>
                    Bạn có chắc chắn thoát tài khoản không?
                </Dialog.Description>
                <Dialog.Button label="Không" onPress={handleCancelLogout} />
                <Dialog.Button label="Có" onPress={handleConfirmLogout} />
            </Dialog.Container>
            </ScrollView>
        </View>
    );
}
