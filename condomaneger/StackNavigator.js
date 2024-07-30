import { createMaterialBottomTabNavigator } from "@react-navigation/material-bottom-tabs";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import AccountScreen from "./src/screens/profile/AccountScreen";
import NotificationScreen from "./src/screens/notificaton/NotificationScreen";
import BillScreen from "./src/screens/bill/BillScreen";
import ServiceScreen from "./src/screens/services/ServiceScreen";
import AccessCardScreen from "./src/screens/Access/AccessCardScreen";
import RegisterAccessCardScreen from "./src/screens/Access/RegisterAccessCard";
import CabinetScreen from "./src/screens/Cabinet/CabinetScreen";
import HomeScreen from "./src/screens/home/HomeScreen";


import React, { useContext } from 'react';
import axios from 'axios';
import { AntDesign, Feather } from '@expo/vector-icons';
import theme from "./src/theme/theme";
import ChatScreen from "./src/screens/chat/ChatScreen";
import FeedbackScreen from "./src/screens/feedback/FeedbackScreen";
import NotificationDetailScreen from "./src/screens/notificaton/NotificationDetailScreen";
import SurveyScreen from "./src/screens/Survey/SurveyScreen";
import LoginScreen from "./src/screens/login/LoginScreen";
import AdminHomeScreen from "./src/screens/admin/home/AdminHomeScreen";
import DetailAccountAdminScreen from "./src/screens/admin/account/DetailAccountAdminScreen";
import NotificationAdminScreen from "./src/screens/admin/notify-manage/NotificationAdminScreen";
import AccountManageScreen from "./src/screens/admin/account/AccountManageScreen";
import CreateAccountScreen from "./src/screens/admin/account/CreateAccountScreen";
import AcceptAccountScreen from "./src/screens/admin/account/AcceptAccountScreen";
import DeleteAccountScreen from "./src/screens/admin/account/DeleteAccountScreen";
import CabinetAdminScreen from "./src/screens/admin/cabinet-manage/CabinetManageScreen";
import SurveyAdminScreen from "./src/screens/admin/survey-manage/SurveyAdminScreen";
import FeedbackAdminScreen from "./src/screens/admin/feedback-admin/FeedbackAdminScreen";
import CreateSurveyScreen from "./src/screens/admin/survey-manage/CreateSurveyScreen";
import SearchSurveyScreen from "./src/screens/admin/survey-manage/SearchSurveyScreen";
import { UserContext } from "./src/contexts/UserContext";
import UpdateProfileScreen from "./src/screens/login/UpdateProfileScreen";






const Stack = createNativeStackNavigator()
const Tab = createMaterialBottomTabNavigator();

const StackNavigator = ( )=> {
    const user = useContext(UserContext);
  return(
          <Stack.Navigator>
            
            
            
            {user===null?(
                <>
                <Stack.Screen name="LoginScreen" component={LoginScreen} options={{ headerShown: false }}/>
                </>
            ): user.role === 'admin'?(
                <>
                
                <Stack.Screen name="AdminHomeScreen" component={BottomTabAdminNav} options={{ headerShown: false }} />
                </>
            ):(
                <>
                {/* <Stack.Screen name="UpdateProfileScreen" component={UpdateProfileScreen} /> */}
                <Stack.Screen name="MainScreen" component={BottomTabNav} options={{ headerShown: false }} />
                </>
            )
            }
            
            <Stack.Screen
                name="ServiceScreen"
                component={ServiceScreen}
                options={{
                    title: 'Dịch vụ',
                    
                }}
            />
            <Stack.Screen
                name="BillScreen"
                component={BillScreen}
                options={{
                    title: 'Hoá đơn',
                    
                }}
            />
            <Stack.Screen
                name="NotificationScreen"
                component={NotificationScreen}
                options={{
                    title: 'Thông báo',
                }}
            />
            <Stack.Screen
                name="ProfileScreen"
                component={AccountScreen}
                options={{
                    title: 'Tài khoản',
                }}
            />

          <Stack.Screen
              name="AccessCardScreen"
              component={AccessCardScreen}
              options={{
                  title: 'Thẻ ra vào',
              }}
          />
          <Stack.Screen
              name="RegisterAccessCardScreen"
              component={RegisterAccessCardScreen}
              options={{
                  title: 'Đăng ký thẻ ra vào',
              }}
          />
          <Stack.Screen
                name="ServicesScreen"
                component={ServiceScreen}
                options={{
                    title: 'Dịch vụ',
                    headerShown: true,
                }}
            />
           <Stack.Screen
                name="SurveyScreen"
                component={SurveyScreen}
                options={{
                    tabBarLabel: 'Khảo sát',
            }}
            />
            <Stack.Screen
                name="CabinetScreen"
                component={CabinetScreen}
                options={{
                    title: 'Tủ đồ',
                }}
            />
            <Stack.Screen
                name="ChatScreen"
                component={ChatScreen}
                options={{
                    title: 'Nhắn tin'
                }}
            />
            <Stack.Screen
                name="FeedbackScreen"
                component={FeedbackScreen}
                options={{
                    title: 'Phản ánh'
                }}
            />
            <Stack.Screen
                name="NotificationDetailScreen"
                component={NotificationDetailScreen}
                options={{
                    tabBarLabel: 'Chi tiết thông báo',
            }}/>
            <Stack.Screen
                name="AccountManageScreen"
                component={AccountManageScreen}
                options={{
                    tabBarLabel: 'Quản lý tài khoản',
            }}/>
            <Stack.Screen
                name="CreateAccountScreen"
                component={CreateAccountScreen}
                options={{
                    tabBarLabel: 'Cấp tài khoản',
            }}/>
            <Stack.Screen
                name="DeleteAccountScreen"
                component={DeleteAccountScreen}
                options={{
                    tabBarLabel: 'Xóa tài khoản',
            }}/>
            <Stack.Screen
                name="AcceptAccountScreen"
                component={AcceptAccountScreen}
                options={{
                    tabBarLabel: 'Xác nhận tài khoản',
            }}/>
            <Stack.Screen
                name="CabinetAdminScreen"
                component={CabinetAdminScreen}
                options={{
                    tabBarLabel: 'Quản lý tủ đồ',
            }}/>
            <Stack.Screen
                name="SurveyAdminScreen"
                component={SurveyAdminScreen}
                options={{
                    tabBarLabel: 'Xem khảo sát',
            }}/>
            <Stack.Screen
                name="FeedbackAdminScreen"
                component={FeedbackAdminScreen}
                options={{
                    tabBarLabel: 'Phản ánh',
            }}/>
           <Stack.Screen
                name="CreateSurveyScreen"
                component={CreateSurveyScreen}
                options={{
                    tabBarLabel: 'Tạo khảo sát',
            }}/>
            <Stack.Screen
                name="SearchSurveyScreen"
                component={SearchSurveyScreen}
                options={{
                    tabBarLabel: 'Xem khảo sát',
            }}/>
            

          </Stack.Navigator>
  );
}
const BottomTabAdminNav = () => {
    const [unreadCount, setUnreadCount] = React.useState(0);

    React.useEffect(() => {
        fetchUnreadCount();
    }, []);

    const fetchUnreadCount = () => {
        axios.get('https://api.example.com/notifications/unreadCount')
            .then(response => setUnreadCount(response.data.count))
            .catch(error => console.error(error));
    };

  return (
    <Tab.Navigator
    initialRouteName="HomeTab"
    activeColor="#fff"
    inactiveColor="#fff"
    activeIndicatorStyle={{ backgroundColor: theme.colors.outline }}
    barStyle={{ backgroundColor: theme.colors.primary }}
    screenOptions={{ tabBarHideOnKeyboard: true }}
>
    <Tab.Screen
        name="Home"
        component={AdminHomeScreen}
        options={{
            tabBarLabel: 'Trang chủ',
            tabBarIcon: ({ color }) => <AntDesign name="home" size={24} color={color} />,
        }}
    />
    <Tab.Screen
        name="Notification"
        component={NotificationScreen}
        options={{
            tabBarLabel: 'Thông báo',
            tabBarIcon: ({ color }) => <Feather name="bell" size={24} color={color} />,
            tabBarBadge: unreadCount > 0 ? unreadCount : null,
            headerShown: true,
        }}
    />
    <Tab.Screen
        name="Account"
        component={DetailAccountAdminScreen}
        options={{
            tabBarStyle: { display: 'none' },
            tabBarLabel: 'Tài khoản',
            tabBarIcon: ({ color }) => <AntDesign name="user" color={color} size={24} />,
            headerShown: true,
        }}
    />
    
</Tab.Navigator>
  )
}

const BottomTabNav = () => {
    const [unreadCount, setUnreadCount] = React.useState(0);

    React.useEffect(() => {
        fetchUnreadCount();
    }, []);

    const fetchUnreadCount = () => {
        axios.get('https://api.example.com/notifications/unreadCount')
            .then(response => setUnreadCount(response.data.count))
            .catch(error => console.error(error));
    };

  return (
    <Tab.Navigator
    initialRouteName="HomeTab"
    activeColor="#fff"
    inactiveColor="#fff"
    activeIndicatorStyle={{ backgroundColor: theme.colors.outline }}
    barStyle={{ backgroundColor: theme.colors.primary }}
    screenOptions={{ tabBarHideOnKeyboard: true }}
>
    <Tab.Screen
        name="Home"
        component={HomeScreen}
        options={{
            tabBarLabel: 'Trang chủ',
            tabBarIcon: ({ color }) => <AntDesign name="home" size={24} color={color} />,
        }}
    />
    <Tab.Screen
        name="Notification"
        component={NotificationAdminScreen}
        options={{
            tabBarLabel: 'Thông báo',
            tabBarIcon: ({ color }) => <Feather name="bell" size={24} color={color} />,
            tabBarBadge: unreadCount > 0 ? unreadCount : null,
            headerShown: true,
        }}
    />
    <Tab.Screen
        name="Account"
        component={AccountScreen}
        options={{
            tabBarStyle: { display: 'none' },
            tabBarLabel: 'Tài khoản',
            tabBarIcon: ({ color }) => <AntDesign name="user" color={color} size={24} />,
            headerShown: true,
        }}
    />
    
</Tab.Navigator>
  )
}

export default StackNavigator