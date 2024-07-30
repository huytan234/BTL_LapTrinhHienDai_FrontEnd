// InvoiceScreen.js
import React, { useState } from 'react';
import { View, Text, TextInput, Button, FlatList, TouchableOpacity, StyleSheet } from 'react-native';
import axios from 'axios';
import BackButton from '../../components/BackButton';
import { endpoints } from '../../configs/APIs';


const BillScreen = ({navigation}) => {
    const [month, setMonth] = useState('');
    const [year, setYear] = useState('');
    const [selectedTab, setSelectedTab] = useState('unpaid');
    const [invoices, setInvoices] = useState([]);
    const [loading,setLoading]= useState(false);
    const [q, setQ] =useState("");

    const searchInvoices = () => {
        // Thay thế URL bằng endpoint API của bạn
        axios.get(`https://api.example.com/invoices?month=${month}&year=${year}`)
            .then(response => setInvoices(response.data))
            .catch(error => console.error(error));
    };
    const handleLoadInovoices0=()=>{
        try{
           
        }catch{
            
        }
    }

    return (
        <View style={styles.container}>
            <BackButton goBack={navigation.goBack} />
            <View style={styles.searchContainer}>
                <TextInput
                    style={styles.input}
                    placeholder="Nhập tháng"
                    value={month}
                    onChangeText={setMonth}
                    keyboardType="pad-phone"
                />
                <TextInput
                    style={styles.input}
                    placeholder="Nhập năm"
                    value={year}
                    onChangeText={setYear}
                    keyboardType="pad-phone"

                />
                <Button title="Tìm kiếm hóa đơn" onPress={searchInvoices} />
            </View>
            <View style={styles.tabContainer}>
                <Button
                    title="Hóa đơn chưa thanh toán"
                    onPress={() => setSelectedTab('unpaid')}
                    color={selectedTab === 'unpaid' ? 'blue' : 'gray'}
                />
                <Button
                    title="Hóa đơn đã thanh toán"
                    onPress={() => setSelectedTab('paid')}
                    color={selectedTab === 'paid' ? 'blue' : 'gray'}
                />
            </View>
            <FlatList
                data={invoices.filter(invoice => selectedTab === 'unpaid' ? !invoice.paid : invoice.paid)}
                keyExtractor={item => item.id.toString()}
                renderItem={({ item }) => (
                    <View style={styles.invoiceItem}>
                        <Text>Hóa đơn ID: {item.id}</Text>
                        <Text>Số tiền: {item.amount}</Text>
                        <Text>Ngày: {item.date}</Text>
                        {!item.paid && (
                            <Button title="Thanh toán" onPress={() => handlePayment(item.id)} />
                        )}
                    </View>
                )}
            />
        </View>
    );
};

const handlePayment = (id) => {
    // Thêm logic thanh toán ở đây
    alert(`Thanh toán hóa đơn ID: ${id}`);
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 16,
        backgroundColor: '#EEEDEC',
    },
    searchContainer: {
        flexDirection: 'row',
        marginBottom: 16,
    },
    input: {
        height: 40,
        borderColor: 'gray',
        borderWidth: 1,
        marginRight: 8,
        flex: 1,
        paddingHorizontal: 8,
    },
    tabContainer: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        marginBottom: 16,
    },
    invoiceItem: {
        padding: 16,
        backgroundColor: '#fff',
        borderBottomWidth: 1,
        borderBottomColor: '#ccc',
        marginBottom: 8,
    },
});

export default BillScreen;
