import React, {useState, useEffect} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

import {GestureHandlerRootView} from 'react-native-gesture-handler';
import HomeScreen from './DriverScreens/HomeScreen';
import GetLocation from './DriverScreens/GetLocation';
import Navigatetouser from './DriverScreens/Navigatetouser';


const Stack = createNativeStackNavigator();
export default function App() {
  
    return (
      <GestureHandlerRootView>
        <NavigationContainer>
          <Stack.Navigator initialRouteName="getLocation">
            
            <Stack.Screen
              name="HomeScreen"
              options={{headerShown: false}}
              component={HomeScreen}
            />
            <Stack.Screen
              name="getLocation"
              options={{headerShown: false}}
              component={GetLocation}
            />
            <Stack.Screen name='navigateToUser'  options={{headerShown:false}} component={Navigatetouser}/>
          </Stack.Navigator>
        </NavigationContainer>
      </GestureHandlerRootView>
    );
  }

