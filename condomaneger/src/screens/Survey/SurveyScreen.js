
import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import { AirbnbRating } from 'react-native-ratings';
import axios from 'axios';

const SurveyScreen = ({ navigation }) => {
    const [cleanlinessRating, setCleanlinessRating] = useState(0);
    const [facilityRating, setFacilityRating] = useState(0);
    const [serviceRating, setServiceRating] = useState(0);

    const submitSurvey = () => {
        const surveyData = {
            cleanliness: cleanlinessRating,
            facility: facilityRating,
            service: serviceRating,
        };

        // Thay thế URL bằng endpoint API của bạn
        axios.post('https://api.example.com/survey', surveyData)
            .then(response => {
                Alert.alert(
                    'Thành công',
                    'Khảo sát của bạn đã được gửi.',
                    [
                        { text: 'Thoát', onPress: () => navigation.goBack() },
                        { text: 'Khảo sát lại', onPress: () => {} },
                    ]
                );
            })
            .catch(error => {
                console.error(error);
                Alert.alert('Lỗi', 'Đã xảy ra lỗi khi gửi khảo sát.');
            });
    };

    return (
        <View style={styles.container}>
            <Text style={styles.label}>Vệ sinh</Text>
            <AirbnbRating
                count={5}
                reviews={["Tệ", "Tạm được", "Khá", "Tốt", "Tuyệt vời"]}
                defaultRating={cleanlinessRating}
                size={20}
                onFinishRating={(rating) => setCleanlinessRating(rating)}
            />

            <Text style={styles.label}>Cơ sở vật chất</Text>
            <AirbnbRating
                count={5}
                reviews={["Tệ", "Tạm được", "Khá", "Tốt", "Tuyệt vời"]}
                defaultRating={facilityRating}
                size={20}
                onFinishRating={(rating) => setFacilityRating(rating)}
            />

            <Text style={styles.label}>Dịch vụ</Text>
            <AirbnbRating
                count={5}
                reviews={["Tệ", "Tạm được", "Khá", "Tốt", "Tuyệt vời"]}
                defaultRating={serviceRating}
                size={20}
                onFinishRating={(rating) => setServiceRating(rating)}
            />

            <TouchableOpacity style={styles.button} onPress={submitSurvey}>
                <Text style={styles.buttonText}>Submit</Text>
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
        fontSize: 18,
        fontWeight: 'bold',
        marginVertical: 10,
    },
    button: {
        backgroundColor: '#007BFF',
        padding: 16,
        alignItems: 'center',
        borderRadius: 4,
        marginTop: 20,
    },
    buttonText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: 'bold',
    },
});

export default SurveyScreen;
