import React, { useContext, useEffect, useState } from "react";
import { ActivityIndicator, Image, RefreshControl, Text, TouchableOpacity, View } from "react-native";
import { List, Searchbar, Button, TextInput, Icon } from "react-native-paper";

import 'moment';
import APIs, { authAPI, endpoints } from "../../../configs/APIs";



import { StyleSheet } from "react-native";
import { ScrollView } from "react-native";
import moment from "moment";
import { UserContext } from "../../../contexts/UserContext";
import { faCamera } from "@fortawesome/free-solid-svg-icons";


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
        text:{
            marginTop: 10
        },
    },
);
const Item = ({instance}) => {
    
    const [user, setUser]=useState([]);
    const handleGetUser = async (userId) => {
        try {
            let res = await APIs.get(`${endpoints['users']}${userId}/`); // Fetch user by ID
            setUser(res.data);
            console.log(res.data);
        } catch (ex) {
            console.log(ex);
        } finally {
            console.log('Finished getting API data');
        }
    };
    useEffect(()=>{
        handleGetUser(instance.user);
    },[instance.id]);
    return (
        <View>
            {/* <Text></Text>
            <Text>Subject:{instance.subject}</Text>
            <Text>Messge:{instance.message}</Text> */}
    <List.Section >
        <List.Accordion
        title={`${user.first_name} ${user.last_name}`}
        left={() => <List.Icon icon="equal" />}>
            <Text style={MyStyles.text}>Subject:{instance.subject}</Text>
            <Text style={MyStyles.text}>Messge:{instance.message}</Text>
        </List.Accordion>
    </List.Section>
        </View>
    );
}


const FeedbackAdminScreen = ({navigation})=> {
    const [feedback, setFeedback]=useState([]);
    const [loading, setLoading] = React.useState(false);
    const [q, setQ]= useState("");
    const [feedbackId, setfeedbackId]=useState("");
    const [page, setPage] = useState(1);
    
    

 
 

    const loadFeedback = async ()=>{
        if(page > 0) {
            setLoading(true)
            let url = `${endpoints['get-feedback']}?q=${q}&feedback_id=${feedbackId}&page=${page}`;
            console.log(url)
            try {
                let res = await APIs.get(url);

                if (res.data.next === null)
                    setPage(0);

                if (page === 1)
                    setFeedback(res.data.results);
                 else
                    setFeedback(current => {
                        return [...current, ...res.data.results]
                    })
                if (res.data.next === null)    
                    setPage(0)
            } catch (error) {
                console.error(error)
            } finally {
                setLoading(false)
            }
        }   
    }
   

    useEffect(() => {
        loadFeedback();
    }, [q,page,feedbackId]);

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

    const goFeedbackDetail = (feedbackId) => {
        navigation.navigate('Detail',{'feedbackId': feedbackId})
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
            <RefreshControl onRefresh={() => loadFeedback()} />
            {loading && <ActivityIndicator />}
            {feedback.map(c => <TouchableOpacity key={c.id} onPress={() => console.log(c.subject,c.message)}>
                <Item instance={c} />
            </TouchableOpacity>)}
            {loading && page > 1 && <ActivityIndicator />}
        </ScrollView>
    </View>
    );
}
export default FeedbackAdminScreen;