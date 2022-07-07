import 'react-native-gesture-handler';
import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import LandingPage from './src/components/LandingPage';
import Results from './src/components/Results';
const Stack = createStackNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{headerShown: false}}>
        <Stack.Screen name="Results" component={Results} />
        <Stack.Screen name="LandingPage" component={LandingPage} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
