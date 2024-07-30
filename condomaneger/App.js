import React, { useReducer } from 'react';
import { Provider } from 'react-native-paper';
import { NavigationContainer } from '@react-navigation/native';


import { theme } from './src/theme/themeLogin';
import StackNavigator from './StackNavigator';
import { UserContext, UserDispatchContext } from './src/contexts/UserContext';
import {UserReducer} from './src/reducer/UserReducer';


const MyStack=()=>{
  const [user, dispatch]=useReducer(UserReducer, null);
  
  return(
      <UserContext.Provider value={user} theme={theme} >
        <UserDispatchContext.Provider independent={true} value={dispatch}>
          <StackNavigator />
        </UserDispatchContext.Provider>
      </UserContext.Provider>
  );
}
const App = () => {
  return (
    <NavigationContainer>
      <MyStack/>
    </NavigationContainer>
  );
};

export default App;
