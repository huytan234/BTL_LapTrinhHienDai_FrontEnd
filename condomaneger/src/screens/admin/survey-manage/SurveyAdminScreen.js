import React from "react";

import ServiceButton from "../../../components/ServiceButton";
import { View, Text, StyleSheet } from 'react-native';
import { FontAwesome6, MaterialCommunityIcons, MaterialIcons } from '@expo/vector-icons';



const styles = StyleSheet.create({
    container: {
        backgroundColor: '#fff',
        flex: 1,
        marginTop:0,
    },
    wrapper: {
        marginHorizontal: 5,
        
    },
    text: {
        marginHorizontal: 15,
        marginVertical: 1,
        fontSize: 14,
        fontWeight: '500',
        marginTop:10,
    },
    cardContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems:'center'
    },
    wrapCard: {
        flex: 1,
        borderRadius: 4,
        backgroundColor: '#fff',
        justifyContent: 'center',
        margin: 10,
        alignItems: 'center',
        padding: 16,
        borderWidth: 1,
        borderColor: '#000',
    },
    nameService: {
        marginTop: 4,
    },
    residentCard: {
        backgroundColor: '#fff',
        justifyContent: 'center',
        alignItems: 'center',
        padding: 16,
        margin: 10,
        borderRadius: 4,
        borderWidth: 1,
        borderColor: '#000',
    },
    center: {
        justifyContent: 'center',
        alignItems: 'center',
    },
});


const SurveyAdminScreen = ({navigation})=> {
    return (
        <View style={styles.container}>
            
            <View style={styles.wrapper}>
                <View style={styles.cardContainer}>
                    <ServiceButton
                        navigation={navigation}
                        icon={<MaterialCommunityIcons name="card-plus" size={24} color="black" />}
                        title="Tạo khảo sát"
                        destination="CreateSurveyScreen"
                    />
                    <ServiceButton
                        navigation={navigation}
                        icon={<MaterialCommunityIcons name="file-cabinet" size={24} color="black" />}
                        title="Xem khảo sát"
                        destination="SearchSurveyScreen"
                    />
                </View>


            </View>
        </View>
       

    );
}
export default SurveyAdminScreen;