import React, {useState, useEffect} from 'react';

import OnboardingScreen from './OnboardingScreen';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import PhoneVerification from './Login/PhoneVerification';
import OTPVerification from './Login/OTPVerification';
import GetLocation from './Login/GetLocation';
import {GestureHandlerRootView} from 'react-native-gesture-handler';
import PickupAndDrop from './Main/PickupAndDrop';
import HomeScreen from './HomeScreen';

import CabSelection from './Main/CabSelection';
import CabSearchingScreen from './Main/CabSearchingScreen';
import DriveDetailsScreen from './Main/DriveDetailsScreen';
import OnTrip from './Main/OnTrip';
import RatingScreen from './Main/RatingScreen';
import Profile from './DrawerPages/Profile';
import {getItem} from './asyncStorage/Async';
import Main from './Main/Main';
const Stack = createNativeStackNavigator();
export default function App() {
  const [onboarding, setOnboarding] = useState(null);

  useEffect(() => {
    isDone();
  }, []);
  const isDone = async () => {
    let value = await getItem('onboarding');
    if (value === '1') {
      setOnboarding(true);
    } else {
      setOnboarding(false);
    }
  };

  if (onboarding == null) {
    return null;
  }
  if (onboarding) {
    return (
      <GestureHandlerRootView>
        <NavigationContainer>
          <Stack.Navigator initialRouteName="Onboarding">
            <Stack.Screen
              name="Onboarding"
              options={{headerShown: false}}
              component={OnboardingScreen}
            />
            <Stack.Screen
              name="Phone"
              options={{headerShown: false}}
              component={PhoneVerification}
            />
            <Stack.Screen
              name="OTP"
              options={{headerShown: false}}
              component={OTPVerification}
            />
            <Stack.Screen
              name="getLocation"
              options={{headerShown: false}}
              component={GetLocation}
            />
            <Stack.Screen
              name="HomeScreen"
              options={{headerShown: false}}
              component={HomeScreen}
            />
            {/* <Stack.Screen
              name="MainScreen"
              options={{headerShown: false}}
              component={Main}
            /> */}
            <Stack.Screen
              name="PickupAndDrop"
              options={{headerShown: false}}
              component={PickupAndDrop}
            />
            <Stack.Screen
              name="cabSelection"
              component={CabSelection}
              options={{headerShown: false}}
            />
            <Stack.Screen
              name="CabSearchingScreen"
              component={CabSearchingScreen}
              options={{headerShown: false}}
            />
            <Stack.Screen
              name="driveDetailsScreen"
              component={DriveDetailsScreen}
              options={{headerShown: false}}
            />
            <Stack.Screen
              name="onTrip"
              component={OnTrip}
              options={{headerShown: false}}
            />
            <Stack.Screen
              name="ratingScreen"
              component={RatingScreen}
              options={{headerShown: false}}
            />
            <Stack.Screen
              name="Profile"
              options={{headerShown: false}}
              component={Profile}
            />
          </Stack.Navigator>
        </NavigationContainer>
      </GestureHandlerRootView>
    );
  } else {
    return (
      <GestureHandlerRootView>
        <NavigationContainer>
          <Stack.Navigator initialRouteName="getLocation">
            <Stack.Screen
              name="Onboarding"
              options={{headerShown: false}}
              component={OnboardingScreen}
            />
            <Stack.Screen
              name="Phone"
              options={{headerShown: false}}
              component={PhoneVerification}
            />
            <Stack.Screen
              name="OTP"
              options={{headerShown: false}}
              component={OTPVerification}
            />
            <Stack.Screen
              name="getLocation"
              options={{headerShown: false}}
              component={GetLocation}
            />
            <Stack.Screen
              name="HomeScreen"
              options={{headerShown: false}}
              component={HomeScreen}
            />
            {/* <Stack.Screen
              name="MainScreen"
              options={{headerShown: false}}
              component={Main}
            /> */}
            <Stack.Screen
              name="PickupAndDrop"
              options={{headerShown: false}}
              component={PickupAndDrop}
            />
            <Stack.Screen
              name="cabSelection"
              component={CabSelection}
              options={{headerShown: false}}
            />
            <Stack.Screen
              name="CabSearchingScreen"
              component={CabSearchingScreen}
              options={{headerShown: false}}
            />
            <Stack.Screen
              name="driveDetailsScreen"
              component={DriveDetailsScreen}
              options={{headerShown: false}}
            />
            <Stack.Screen
              name="onTrip"
              component={OnTrip}
              options={{headerShown: false}}
            />
            <Stack.Screen
              name="ratingScreen"
              component={RatingScreen}
              options={{headerShown: false}}
            />
            <Stack.Screen
              name="Profile"
              options={{headerShown: false}}
              component={Profile}
            />
          </Stack.Navigator>
        </NavigationContainer>
      </GestureHandlerRootView>
    );
  }
}
