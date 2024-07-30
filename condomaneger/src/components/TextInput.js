import React, { memo } from 'react';
import { View, StyleSheet, Text } from 'react-native';
import { TextInput as Input } from 'react-native-paper';
import { themeLogin } from '../theme/themeLogin';



const TextInput = ({ errorText, ...props }) => (
  
  <View style={styles.container}>
    <Input
      style={styles.input}
      selectionColor={themeLogin.colors.primary}
      underlineColor="transparent"
      mode="outlined"
      {...props}
     
    />
    {errorText ? <Text style={styles.error}>{errorText}</Text> : null}
  </View>
);

const styles = StyleSheet.create({
  container: {
    width: '100%',
    marginVertical: 12,
  },
  input: {
    backgroundColor: themeLogin.colors.surface,
    color:'#000'
  },
  error: {
    fontSize: 14,
    color: themeLogin.colors.error,
    paddingHorizontal: 4,
    paddingTop: 4,
  },
});

export default memo(TextInput);