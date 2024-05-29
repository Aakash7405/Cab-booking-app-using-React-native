import React, {useEffect, useRef, useState} from 'react';
import {
  Text,
  View,
  StyleSheet,
  Dimensions,
  TextInput,
  Pressable,
  Keyboard,
  Alert,
} from 'react-native';
import {TouchableOpacity, TouchableHighlight} from 'react-native';
import { setItem } from '../asyncStorage/Async';
import Icon from 'react-native-vector-icons/Ionicons';
import OTPInput from './OTPInput';
const {height, width} = Dimensions.get('window');
export default function OTPVerification({navigation, route}) {
  const [otpCode, setOTPCode] = useState('');
  const [isPinReady, setIsPinReady] = useState(false);
  const maxCodeLength = 4;
  const handleBackPress = () => {
    return navigation.goBack();
  };
  useEffect(() => {
    setIsPinReady(otpCode.length === maxCodeLength);

    return () => {
      setIsPinReady(false);
    };
  }, [otpCode]);

  const handleVerify = async(phoneNumber) => {
    await setItem('phone',phoneNumber);
    await setItem('onboarding', '1');
    navigation.navigate('getLocation');
  };

  const verify = () => {
    console.log(route.params.phoneNumber);
    const phoneNumber=route.params.phoneNumber;
    if (route.params.otp === otpCode) {
      fetch('http://192.168.110.25:3000/home/verify', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({phoneNumber}),
      })
        .then(res => res.json())
        .then(data => {
          if (data.success) {
            Alert.alert('Verification Successful');
            handleVerify(phoneNumber);
          } else {
            console.log(data.message);
            Alert.alert('OTP verification failed');
          }
        })
        .catch(error => {
          console.log(error);
        });
    }
    else{
      Alert.alert('Invalid OTP ,Try again');
    }
  };
  return (
    <Pressable style={styles.pressableContainer} onPress={Keyboard.dismiss}>
      <View style={styles.mainContainer}>
        <View style={styles.iconContainer}>
          <TouchableHighlight
            underlayColor="white"
            style={{backgroundColor: 'white', marginLeft: 18}}
            onPress={handleBackPress}>
            <Icon name="arrow-back-outline" size={27} color="black" />
          </TouchableHighlight>
        </View>
        <View style={styles.textContainer}>
          <Text style={styles.boldText}>Enter Verification Code</Text>
          <Text style={styles.regularText}>
            A 4 digit code has been sent to your phone number
          </Text>
        </View>
        <View style={styles.inputContainer}>
          <OTPInput
            code={otpCode}
            setCode={setOTPCode}
            maxLen={maxCodeLength}
            setIsPinReady={setIsPinReady}
          />
        </View>
        <View style={styles.resendContainer}>
          <Text style={styles.resendContainerText}>Didn't receive a code?</Text>
          <TouchableOpacity>
            <Text style={styles.resendText}>Resend</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.verifyButtonContainer}>
          <TouchableOpacity
            style={[
              styles.button,
              {backgroundColor: !isPinReady ? 'grey' : '#ec7c0c'},
            ]}
            disabled={!isPinReady}
            onPress={verify}>
            <Text style={styles.buttonText}>Verify</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  pressableContainer: {
    flex: 1,
  },
  mainContainer: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: 'white',
  },
  iconContainer: {
    flex: 0.07,
    alignItems: 'flex-start',
    width: width,
    marginTop: 20,
  },
  textContainer: {
    flex: 0.15,
    alignItems: 'center',
    justifyContent: 'flex-end',
  },
  boldText: {
    fontSize: 19,
    fontWeight: 'bold',
    color: 'black',
    fontFamily: 'VarelaRound-Regular',
    paddingHorizontal: 20,
  },
  regularText: {
    fontSize: 13,
    fontWeight: '500',
    color: 'black',
    marginTop: 7,
    fontFamily: 'VarelaRound-Regular',
    paddingHorizontal: 20,
    textAlign: 'center',
  },
  inputContainer: {
    flex: 0.2,
    width: width * 0.9,
    marginTop: 15,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
  },
  inputText: {
    textAlign: 'center',
  },
  resendContainer: {
    flex: 0.1,
    flexDirection: 'row',
    justifyContent: 'center',
    width: width * 0.9,
  },
  resendContainerText: {
    fontSize: 13,
    fontWeight: '500',
    fontFamily: 'VarelaRound-Regular',
    color: 'black',
  },
  resendText: {
    fontSize: 13,
    fontWeight: '500',
    fontFamily: 'VarelaRound-Regular',
    color: '#71FF9C',
  },
  verifyButtonContainer: {
    flex: 0.5,
    width: width * 0.9,
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
  button: {
    width: width * 0.88,
    height: 50,
    marginTop: 30,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 3,
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
    fontFamily: 'VarelaRound-Regular',
    fontSize: 15,
  },
});
