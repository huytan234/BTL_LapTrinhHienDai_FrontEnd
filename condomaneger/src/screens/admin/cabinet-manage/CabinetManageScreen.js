import React from "react";
import { ActivityIndicator, Image, RefreshControl, Text, TouchableOpacity, View } from "react-native";
import { List, Searchbar, Button, TextInput } from "react-native-paper";

import 'moment';
import APIs, { endpoints } from "../../../configs/APIs";



import { StyleSheet } from "react-native";
import { ScrollView } from "react-native";
import moment from "moment";


const MyStyles= StyleSheet.create(
    {
        container:{
            flex: 1

        }, subject:{
            fontSize:30,
            fontWeight:"bold",
            color:"blue"
        },
        row:{
            flexDirection:"row",
            flexWrap:"wrap"
        },
        margin:{
            margin: 5
        },
        avatar:{
            width:80,
            height:80,
            borderRadius: 20
        },
        acceptBtn:{
            marginTop:20,
        },
        rightContainer: {
            flexDirection: 'row',
            alignItems: 'center',
        },
        input: {
            width: 80,
            marginRight: 8,
        },
        button: {
            height: 40,
            justifyContent: 'center',
        },
    }
);
const Item = ({instance}) => {

    const [inputNumber, setInputNumber] = React.useState('');

    const handleConfirm = () => {
        // Xử lý số nhập vào
        console.log(`Confirmed number for ${instance.subject}: ${inputNumber}`);
        // Bạn có thể thêm logic gửi số này lên server hoặc xử lý thêm tại đây
    };
    return <List.Item  title={instance.subject}
        description={instance.created_date?moment(instance.created_date).fromNow():""} left={() => <Image style={MyStyles.avatar} source={{uri: instance.image}} />} right={() => (
                <View style={MyStyles.rightContainer}>
                    <TextInput
                        mode="outlined"
                        style={MyStyles.input}
                        keyboardType="numeric"
                        value={inputNumber}
                        onChangeText={setInputNumber}
                        placeholder="Enter number"
                    />
                    <Button mode="contained" onPress={handleConfirm} style={MyStyles.button}>
                        Confirm
                    </Button>
                </View>
            )} />
}

const CabinetAdminScreen = ({navigation})=> {
    const [cabinet, setCabinet] = React.useState([]);
    const [loading, setLoading] = React.useState(false);
    const [q, setQ] = React.useState("");
    const [page, setPage] = React.useState(1);

    const loadCabinet = async () => {
            try {
                setLoading(true)
                
                const res = await APIs.get(endpoints['tudo']);

                setCabinet(res.data.results)
                console.log(res.data)
            } catch (ex) {
                console.error(ex);
            } finally {
                setLoading(false)
            }
        
    }



    React.useEffect(() => {
        loadCabinet();
    }, []);


    const isCloseToBottom = ({layoutMeasurement, contentOffset, contentSize}) => {
        const paddingToBottom = 20;
        return layoutMeasurement.height + contentOffset.y >=
          contentSize.height - paddingToBottom;
    };

    const loadMore = ({nativeEvent}) => {
        if (!loading && page > 0 && isCloseToBottom(nativeEvent)) {
                setPage(page + 1);
        }
    }

    const search = (value, callback) => {
        setPage(1);
        callback(value)
    }

    return (
        <View style={[MyStyles.container, MyStyles.margin]}>
            <View>
                <Searchbar placeholder="Nhập từ khóa..." onChangeText={(t) => search(t, setQ)} value={q} />
            </View>
            <ScrollView onScroll={loadMore}>
                <RefreshControl onRefresh={() => loadCabinet()} />
                {loading && <ActivityIndicator />}
                {cabinet.map(c => (
                <TouchableOpacity key={c.ActivityIndicator}>
                    <Text>{c.name}</Text>
                </TouchableOpacity>
            ))}
                {loading && page > 1 && <ActivityIndicator />}
            </ScrollView>
        </View>
    );
}
export default CabinetAdminScreen;