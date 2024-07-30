import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { TextInput } from 'react-native-paper';

const SurveyQuestion = ({ questionNumber, questionText, setQuestionText }) => {
    return (
        <View style={styles.container}>
            <Text style={styles.questionNumber}>Câu hỏi {questionNumber}:</Text>
            <TextInput
                mode="outlined"
                value={questionText}
                onChangeText={(text) => setQuestionText(questionNumber - 1, text)}
                placeholder={`Nhập câu hỏi ${questionNumber}`}
                style={styles.input}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        marginBottom: 20,
    },
    questionNumber: {
        fontSize: 16,
        marginBottom: 8,
    },
    input: {
        backgroundColor: 'white',
    },
});
const CreateSurveyScreen = () => {
    const [questions, setQuestions] = useState(['']);
    
    const addQuestion = () => {
        setQuestions([...questions, '']);
    };

    const setQuestionText = (index, text) => {
        const newQuestions = [...questions];
        newQuestions[index] = text;
        setQuestions(newQuestions);
    };

    const handleSubmit = () => {
        // Giả sử bạn có endpoint là /api/survey để gửi câu hỏi lên server
        fetch('https://api.example.com/api/survey', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ questions }),
        })
        .then(response => response.json())
        .then(data => {
            if (data.success) {
                Alert.alert('Thành công', 'Đã gửi câu hỏi thành công!', [
                    { text: 'Thoát', onPress: () => console.log('Thoát') },
                    { text: 'Ở lại', onPress: () => console.log('Ở lại') }
                ]);
            } else {
                Alert.alert('Lỗi', 'Có lỗi xảy ra, vui lòng thử lại.');
            }
        })
        .catch(error => {
            console.error('Error:', error);
            Alert.alert('Lỗi', 'Có lỗi xảy ra, vui lòng thử lại.');
        });
    };

    return (
        <ScrollView contentContainerStyle={MyStyles.container}>
            {questions.map((questionText, index) => (
                <SurveyQuestion
                    key={index}
                    questionNumber={index + 1}
                    questionText={questionText}
                    setQuestionText={setQuestionText}
                />
            ))}
            <Button mode="contained" onPress={addQuestion} style={MyStyles.addButton}>
                Thêm câu hỏi
            </Button>
            <Button mode="contained" onPress={handleSubmit} style={MyStyles.submitButton}>
                Xác nhận
            </Button>
        </ScrollView>
    );
};

const MyStyles = StyleSheet.create({
    container: {
        padding: 20,
    },
    addButton: {
        marginTop: 20,
    },
    submitButton: {
        marginTop: 20,
        backgroundColor: 'green',
    },
});

export default CreateSurveyScreen;