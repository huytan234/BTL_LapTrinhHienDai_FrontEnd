import React, { useContext, useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { TouchableOpacity } from 'react-native-ui-lib';
import { UserContext, UserDispatchContext } from '../../../contexts/UserContext';
import { Button} from 'react-native-paper';
import Dialog from 'react-native-dialog';
import { Image } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const MyStyles= StyleSheet.create({
    container: {
        flex: 1,
       
    }, subject: {
        fontSize: 25,
        fontWeight: "bold",
        color: "blue"
    }, row: {
        flexDirection: "row"
    }, wrap: {
        flexWrap: "wrap"
    }, margin: {
        margin: 50
    }, avatar: {
        width: 80,
        height: 80,
        borderRadius: 20
    }
});
const DetailAccountAdminScreen = () => {
    const user = useContext(UserContext);
    const dispatch = useContext(UserDispatchContext);
    const [dialogVisible, setDialogVisible] = useState(false);
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
    return (
        <View style={[styles.container, styles.margin]}>
            <Text style={styles.subject}>Chào {user.username}!</Text>
            <Image source={{uri: user.image}} style={styles.avatar} />
            <Button mode="contained" style={styles.logoutButton} icon="logout" onPress={handleLogout}>Đăng xuất</Button>
            <Dialog.Container visible={dialogVisible}>
                <Dialog.Title>Đăng xuất</Dialog.Title>
                <Dialog.Description>
                    Bạn có chắc chắn thoát tài khoản không?
                </Dialog.Description>
                <Dialog.Button label="Không" onPress={handleCancelLogout} />
                <Dialog.Button label="Có" onPress={handleConfirmLogout} />
            </Dialog.Container>
        </View>
    );
};

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

export default DetailAccountAdminScreen;
