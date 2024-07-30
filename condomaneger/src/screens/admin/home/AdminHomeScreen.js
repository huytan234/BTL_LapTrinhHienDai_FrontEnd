import React, { useContext } from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native';
import { AntDesign,FontAwesome6} from '@expo/vector-icons';
import theme from '../../../theme/theme';
import Octicons from '@expo/vector-icons/Octicons';

import { Avatar } from 'react-native-paper';
import ButtonOption from '../../../components/ButtonOption';
import { UserContext } from '../../../contexts/UserContext';
const AdminHomeScreen = ({navigation}) => {
  const user = useContext(UserContext);
  return (
    
  <View style={styles.container}>
          <View style={styles.wrapHeader}>
            <View style={styles.header}>
                  <TouchableOpacity onPress={() => navigation.navigate('DetailAccountAdminScreen')}>
                      <Avatar.Image size={80} style={styles.avatar} source={user.avatar} />
                  </TouchableOpacity>
                  <View style={styles.contentWrapper}>
                    <Text style={styles.greeting}>Xin chào</Text>
                    <Text style={styles.resident}>Quản lý {user.last_name}</Text>
                  </View>
            </View>
            <View style={styles.iconsHeader}>
                    <View>
                        <TouchableOpacity onPress={()=>navigation.navigate('ChatAdminScreen')}>
                            <View style={styles.iconsWrap}>
                                <AntDesign name="message1" size={24} color="black" />
                            </View>
                        </TouchableOpacity>
                    </View>
            </View>
          </View>

      <View style={styles.buttonsContainer}>
                    <ButtonOption
                        navigation={navigation}
                        icon={<FontAwesome6 name="servicestack" size={24} color="black" />}
                        tittle="Quản lý tài khoản"
                        destination="AccountManageScreen"
                    />
                    <ButtonOption
                        navigation={navigation}
                        icon={<FontAwesome6 name="file-invoice" size={24} color="black" />}
                        tittle="Tủ đồ"
                        destination="CabinetAdminScreen"
                    />
                    <ButtonOption
                        navigation={navigation}
                        icon={<Octicons name="report" size={24} color="black" />}
                        tittle="Phản ánh"
                        destination="FeedbackAdminScreen"
                    />
                    <ButtonOption
                    navigation={navigation}
                        icon={<AntDesign name="appstore-o" size={22} color="black" />}
                        tittle="Khảo sát"
                        
                        destination="SurveyAdminScreen"
                    />
      </View>

    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
contentWrapper: {
  marginHorizontal: 30,
  marginVertical: 20,
},
greeting: {
  fontSize: 12,
  color: '#fff',
  marginBottom: 8,
},
resident: {
  color: '#fff',
  fontSize: 16,
  fontWeight: '500',
},
header:{
  flexDirection:'row',

},
wrapHeader:{

    marginTop: 50,
    paddingTop: 30,
    paddingLeft:0,
    marginHorizontal: 5,
    backgroundColor: theme.colors.primary,
    height: 130,
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    position: 'relative',
    borderRadius: 4,
},
greeting: {
  fontSize: 18,
},
image: {
  width: 60,
  height: 60,
  borderRadius: 30,
  resizeMode: 'contain',
  backgroundColor: '#fff',
  margin: 8,
  borderWidth: 1,
  borderColor: '#fff',
},
  username: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  buttonsContainer: {
    paddingTop: 16,
    paddingBottom: 12,
    backgroundColor: '#fff',
    borderRadius: 6,
    marginHorizontal: 12,
    marginVertical: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  button: {
    backgroundColor: '#fff',
    borderRadius: 15,
    width: 70,
    height: 70,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.8,
    shadowRadius: 2,
    elevation: 5,
  },
  buttonText: {
    textAlign: 'center',
  },
  navbar: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '100%',
    position: 'absolute',
    bottom: 0,
    backgroundColor: '#000',
    paddingVertical: 10,
  },
  navbarItem: {
    color: '#fff',
    fontSize: 16,
  },
  iconsHeader: {
    flexDirection: 'row',
    margin: 4,
},
iconsWrap: {
  width: 40,
  height: 40,
  borderRadius: 20,
  backgroundColor: '#FFF',
  justifyContent: 'center',
  alignItems: 'center',
  margin: 4,
  marginVertical: 20,
},
avatar:{
  marginLeft:'10',
  paddingLeft:'10',
}
});


export default AdminHomeScreen;