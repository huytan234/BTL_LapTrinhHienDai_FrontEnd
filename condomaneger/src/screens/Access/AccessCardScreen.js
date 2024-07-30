import { View, StyleSheet } from 'react-native';
import FormButton from '../../components/FormButton';


const styles = StyleSheet.create({
    container: {
        backgroundColor: '#EEEDEC',
        flex: 1,
    },
});

export default function AccessCardScreen({ navigation }) {
    return (
        <View style={styles.container}>
            <FormButton navigation={navigation} type="Access" />
        </View>
    );
}