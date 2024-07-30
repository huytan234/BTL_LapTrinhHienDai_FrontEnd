// NotificationDetailScreen.js
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const NotificationDetailScreen = ({ route }) => {
    const { notification } = route.params;

    return (
        <View style={styles.container}>
            <Text style={styles.title}>{notification.title}</Text>
            <Text>{notification.message}</Text>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 16,
        backgroundColor: '#EEEDEC',
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 16,
    },
});

export default NotificationDetailScreen;
