import React, { useContext, useState } from 'react';
import { View, StyleSheet, ScrollView, KeyboardAvoidingView, SafeAreaView, Alert, Image, Platform } from 'react-native';
import { TextInput, Button } from 'react-native-paper';
import * as ImagePicker from 'expo-image-picker';
import AsyncStorage from '@react-native-async-storage/async-storage';
import APIs, { authAPI, endpoints } from '../../configs/APIs';
import { UserContext, UserDispatchContext } from '../../contexts/UserContext';
import { useNavigation } from '@react-navigation/native';
import { Icon, MD3Colors } from 'react-native-paper';

const UpdateProfileScreen = ({navigation}) => {
    const user = useContext(UserContext);
  
    const [loading, setLoading] = useState(false);
    
    const [firstName, setFirstName]=useState({ value: '', error: '' });
    const [lastName, setLastName]=useState({ value: '', error: '' });
    const [email, setEmail]=useState({ value: '', error: '' });
    const dispatch=useContext(UserDispatchContext);
    // const [password, setPassword] = useState({ value: '', error: '' });
    const [showInvalidUploadMessage, setShowInvalidUploadMessage] = useState(false);
   
    const [image, setImage] = useState(null);
    const handleCloseInvalidUploadMessage = () => {
        setShowInvalidUploadMessage(false);
    };

  
    
  const handleUploadImage= async (callback) => {
        const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
        if (status !== 'granted') {
            console.log('Permissions denied!');
        } else {
            const result = await ImagePicker.launchImageLibraryAsync({
                allowsEditing: true,
                quality: 1,
            });
            if (!result.canceled) {
                callback(result.assets[0]);
            }
        }
    }

    const handleSubmit = async () => {
        if (!firstName || !lastName || !email) {
            Alert.alert('Error', 'Please fill all fields.');
            return;
        }


        // if (image == null) {
        //     setShowInvalidUploadMessage(true);
        //     return;
        // }
        // try {
        //     setLoading(true);
        //     const formData = new FormData();
        //     // The image may not have a name, the server requires the image to have enough information to be decoded
        //     formData.append('avatar', {
        //         uri: image.uri,
        //         name: image.filename ?? `avatar.${image.mimeType.split('/')[1]}`,
        //         type: image.mimeType,
        //     });
        //     formData.append('email',email.value);
        //     formData.append('first_name',firstName.value);
        //     formData.append('last_name',lastName.value);
        //     formData.append('password', password.value);
        //     formData.append('is_first_login', 'false'); 
        //     const accessToken = await AsyncStorage.getItem('token');
            
        //     const response = await (
        //         await authAPI(accessToken)
        //     ).patch(endpoints['update-user'], formData, {
        //         headers: {
        //             'Content-Type': 'multipart/form-data',
        //         },
        //     });
        //     if (response.status === 200) {
                
        //         navigation.reset({
        //             index: 0,
        //             routes: [{ name: 'MainScreen' }],
        //         });
        //     }
        // } catch (error) {
        //     console.error('Error:', error);
        // } finally {
        //     setLoading(false);
        // }
        let form = new FormData();
        form.append('first_name', firstName);
        form.append('last_name', lastName);
        form.append('email', email);
        form.append('avatar', {
            uri: image.uri,
            name: image.filename ?? `avatar.${image.mimeType.split('/')[1]}`,
            type: image.mimeType,
         });
     
        form.append('is_first_login', 'false');
        
        const accessToken = await AsyncStorage.getItem('token');
        console.log('Token:', accessToken);

        setLoading(true);
        try {
            let res = await authAPI(accessToken).patch(endpoints['update-user'], form, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                    Authorization: `Bearer ${accessToken}`
                }
            });
            console.log(form)
            if (res.status === 200) {
                dispatch({
                    type: 'update',
                    payload: { ...user, first_name: firstName, last_name: lastName, email: email, avatar: avatar }
                  });
                nav.navigate("MainScreen");
                
            } else {
                Alert.alert('Error', 'Update failed.');
            }
        } catch (error) {
            console.error(error);
            Alert.alert('Error', 'Update failed.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <KeyboardAvoidingView style={{ flex: 1 }} behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
            <ScrollView style={styles.container}>
                <SafeAreaView>
                    <TextInput
                        label="First Name"
                        
                        onChangeText={setFirstName}
                        style={styles.input}
                    />
                    <TextInput
                        label="Last Name"
                        
                        onChangeText={setLastName}
                        style={styles.input}
                    />
                    <TextInput
                        label="Email"
                        
                        onChangeText={setEmail}
                        style={styles.input}
                    />

                    <View style={{ flexDirection: 'row', justifyContent: 'start', alignItems: 'center', marginTop: 16 }}>
                        <Button mode="contained" onPress={()=>{handleUploadImage(setImage)}} style={styles.button}>
                            Pick an image from camera roll
                        </Button>
                        {image ? (
                        <View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
                            <Image
                                source={{ uri: image.uri }}
                                style={{ width: 40, height: 40, borderColor: 'black', borderWidth: 1, marginRight: 16 }}
                            />
                            <Icon name="closecircleo" type="material" size={22} color="black" onPress={() => setImage()} />
                        </View>
                    ) : (
                        ''
                    )}
                </View>
                    
                    <Button mode="contained" loading={loading} onPress={handleSubmit} style={styles.button}>
                        Submit
                    </Button>
                </SafeAreaView>
            </ScrollView>
        </KeyboardAvoidingView>
    );
};

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#EEEDEC',
        flex: 1,
        padding: 12,
    },
    input: {
        marginVertical: 10,
        backgroundColor: 'white',
    },
    button: {
        marginVertical: 10,
    },
    avatar: {
        width: 100,
        height: 100,
        borderRadius: 50,
        alignSelf: 'center',
        marginVertical: 10,
    },
});

export default UpdateProfileScreen;
