import React from "react";
import { ActivityIndicator, Image, RefreshControl, TouchableOpacity, View } from "react-native";
import { List, Searchbar, Button } from "react-native-paper";

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
        }
    }
);
const Item = ({instance}) => {

    return <List.Item  title={instance.subject}
        description={instance.created_date?moment(instance.created_date).fromNow():""} left={() => <Image style={MyStyles.avatar} source={{uri: instance.image}} />} right={()=><Button style={MyStyles.acceptBtn} mode="text"  onPress={()=>console.log('Pressed')}>Chấp nhận</Button>} />
}


const AcceptAccountScreen = ({navigation}) => {
    const [categories, setCategories] = React.useState(null);
    const [courses, setCourses] = React.useState([]);
    const [loading, setLoading] = React.useState(false);
    const [q, setQ] = React.useState("");
    const [cateId, setCateId] = React.useState("");
    const [page, setPage] = React.useState(1);

    const loadCates = async () => {
        try {
            let res = await APIs.get(endpoints['categories']);
            setCategories(res.data);
        } catch (ex) {
            console.error(ex);
        }
    }

    const loadCourses = async () => {
        if (page > 0) {
            setLoading(true);
            try {
                let url = `${endpoints['courses']}?q=${q}&category_id=${cateId}&page=${page}`;
                
                let res = await APIs.get(url);
    
                if (res.data.next === null)
                    setPage(0);
    
                if (page === 1)
                    setCourses(res.data.results);
                else
                    setCourses(current => {
                        return [...current, ...res.data.results];
                    });
            } catch (ex) {
                console.error(ex);
            } finally {
                setLoading(false);
            }
        }
    }

    React.useEffect(() => {
        loadCates();
    }, []);

    React.useEffect(() => {
        loadCourses();
    }, [q, cateId, page]);

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

    const goLesson = (courseId) => {
        navigation.navigate('Lesson', {'courseId': courseId})
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
                <RefreshControl onRefresh={() => loadCourses()} />
                {loading && <ActivityIndicator />}
                {courses.map(c => <TouchableOpacity key={c.id} onPress={() => goLesson(c.id)}>
                    <Item instance={c} />
                </TouchableOpacity>)}
                {loading && page > 1 && <ActivityIndicator />}
            </ScrollView>
        </View>
    );
}

export default AcceptAccountScreen;