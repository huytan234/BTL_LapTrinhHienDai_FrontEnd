import React from "react";
import { ActivityIndicator, Image, RefreshControl, TouchableOpacity, View, Text } from "react-native";
import { List, Searchbar, Button } from "react-native-paper";
// import MyStyles from "../../styles/MyStyles";
import 'moment';
import APIs, { endpoints } from "../../configs/APIs";


// import Item from "./Item";
// import { isCloseToBottom } from "../../configs/Utils";
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
        }
    }
);
// const Item = ({instance}) => {

//     return <List.Item  title={instance.name}
//         description={instance.created_date?moment(instance.created_date).fromNow():""} left={() => <Image style={MyStyles.avatar} />} right={()=><Button style={MyStyles.acceptBtn} mode="text"  onPress={()=>console.log('Pressed')} >Xác nhận</Button>} />
// }


const CabinetScreen = ({navigation}) => {
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

export default CabinetScreen;