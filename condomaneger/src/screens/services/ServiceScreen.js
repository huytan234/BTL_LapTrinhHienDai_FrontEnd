import { View, Text, StyleSheet } from 'react-native';
import { FontAwesome6, MaterialCommunityIcons, MaterialIcons } from '@expo/vector-icons';
import ServiceButton from '../../components/ServiceButton';
import BackButton from '../../components/BackButton'

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

export default function ServiceScreen({ navigation}) {
    return (
        <View style={styles.container}>
            <Text style={styles.text}>Danh sách dịch vụ</Text>
            <View style={styles.wrapper}>
                <View style={styles.cardContainer}>
                    <ServiceButton
                        navigation={navigation}
                        icon={<MaterialCommunityIcons name="card-plus" size={24} color="black" />}
                        title="Thẻ ra vào"
                        destination="AccessCardScreen"
                    />
                    <ServiceButton
                        navigation={navigation}
                        icon={<MaterialCommunityIcons name="file-cabinet" size={24} color="black" />}
                        title="Tủ đồ"
                        destination="CabinetScreen"
                    />
                </View>


            </View>
        </View>
       

    );
}
