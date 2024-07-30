import React, { memo, useEffect } from 'react';
import { View, StyleSheet, TouchableOpacity, Text } from 'react-native';

const styles = StyleSheet.create({
    utilityWrap: {
        alignItems: 'center',
        paddingHorizontal: 15,
        marginBottom: 8,
        marginRight:5
    },
    utilityIcon: {
        width: 50,
        height: 50,
        borderRadius: 25,
        backgroundColor: '#EEEDEC',
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 4,
        borderWidth: 1,
        borderColor: '#000',
    },
    utilityText: {
        fontSize: 13,
    },
});

useEffect

function ButtonOption({ navigation, icon, tittle, destination }) {
    
    return (
        <View style={styles.utilityWrap}>
            <TouchableOpacity onPress={() => navigation.navigate(destination)}>
                <View style={styles.utilityIcon}>{icon}</View>
            </TouchableOpacity>
            <Text style={styles.utilityText}>{tittle}</Text>
        </View>
    );
}
export default memo(ButtonOption);