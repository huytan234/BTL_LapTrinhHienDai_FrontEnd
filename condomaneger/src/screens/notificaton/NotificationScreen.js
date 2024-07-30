// NotificationScreen.js
import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet } from 'react-native';
import axios from 'axios';

const NotificationScreen = ({ navigation }) => {
    const [notifications, setNotifications] = useState([]);

    useEffect(() => {
        fetchNotifications();
    }, []);

    const fetchNotifications = () => {
        // Thay thế URL bằng endpoint API của bạn
        axios.get('https://api.example.com/notifications')
            .then(response => setNotifications(response.data))
            .catch(error => console.error(error));
    };

    const markAsRead = (id) => {
        axios.post(`https://api.example.com/notifications/${id}/read`)
            .then(() => {
                fetchNotifications();  // Reload notifications after marking as read
            })
            .catch(error => console.error(error));
    };

    const renderItem = ({ item }) => (
        <TouchableOpacity 
            style={styles.notificationItem} 
            onPress={() => {
                navigation.navigate('NotificationDetailScreen', { notification: item });
                markAsRead(item.id);
            }}
        >
            <Text style={item.read ? styles.read : styles.unread}>{item.title}</Text>
            <Text>{item.message}</Text>
        </TouchableOpacity>
    );

    return (
        <View style={styles.container}>
            <FlatList
                data={notifications}
                keyExtractor={item => item.id.toString()}
                renderItem={renderItem}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 16,
        backgroundColor: '#EEEDEC',
    },
    notificationItem: {
        padding: 16,
        backgroundColor: '#fff',
        borderBottomWidth: 1,
        borderBottomColor: '#ccc',
        marginBottom: 8,
    },
    read: {
        fontWeight: 'normal',
    },
    unread: {
        fontWeight: 'bold',
    },
});

export default NotificationScreen;
