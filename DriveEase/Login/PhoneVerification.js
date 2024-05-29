import React, {useState} from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
  TextInput,
  Dimensions,
  Alert,
  Keyboard,
} from 'react-native';
import {TouchableOpacity ,ActivityIndicator} from 'react-native';
const {height, width} = Dimensions.get('window');
export default function PhoneVerification({navigation}) {

  const [charLen, setCharLen] = useState(0);
  const [phoneNumber, setPhoneNumber] = useState('');
  const [loading, setLoading]=useState(false);
  const handlePress = () => {
    Keyboard.dismiss();
     sendOTP();
     setLoading(true);
  };

  const sendOTP = () => {
    fetch('http://192.168.110.25:3000/home/signup', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({phoneNumber}),
    })
      .then(res => res.json())
      .then(data => {
        if (data.success) {
          setLoading(false);
          navigation.navigate('OTP', {
            phoneNumber: phoneNumber,
            otp: data.otp,
          });
        } else {
          Alert.alert(data.message);
        }
      })
      .catch(error => {
        console.log('Request Error');
      });
  };

  return (<>
    {loading && <ActivityIndicator style={styles.indicator} size='large'/>}
    <View style={[styles.mainContainer,{opacity:loading?0.1:1}]}>

     
      <View style={styles.imageContainer}>
        <Image
          source={require('../DriveEaseImage/image3.jpg')}
          style={styles.image}
        />
      </View>
      <View style={styles.textContainer}>
        <Text style={styles.boldText}>Enter your phone number</Text>
        <Text style={styles.regularText}>
          We will send verification code to your phone
        </Text>
      </View>

      <View style={styles.thirdContainer}>
        <View style={styles.inputContainer}>
          <Image
            source={require('../DriveEaseImage/flag.png')}
            style={styles.flagImage}
          />
          <Text style={styles.numberText}>+91</Text>
          <TextInput
            style={styles.input}
            placeholder="123 456 7890"
            keyboardType="numeric"
            value={phoneNumber}
            onChangeText={text => {
              setPhoneNumber(text);
              setCharLen(text.length);
              console.log(charLen);
            }}
            maxLength={10}
          />
        </View>
      </View>
      <View style={styles.buttonContainer}>
        <TouchableOpacity
          style={[styles.sendContainer,{backgroundColor: charLen!==10 ? 'grey' : '#ec7c0c'}]}
          onPress={handlePress}
          disabled={charLen === 10 ? false : true}>
          <Text style={styles.sendButton}>Send OTP</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.bottomContainer}>
        <Text style={styles.bottomText}>or continue with</Text>
        <View style={styles.iconContainer}>
          <TouchableOpacity style={styles.googleIcon}>
            <Image
              source={require('../DriveEaseImage/google.jpg')}
              style={styles.Image}
            />
            <Text style={styles.iconText}>Google</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.facebookIcon} onPress={()=>setLoading(false)}>
            <Image
              source={require('../DriveEaseImage/facebook.jpg')}
              style={styles.Image}
            />
            <Text style={styles.iconText}>facebook</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View></>
  );
}

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: 'white',

  },

  indicator:{
   position:'absolute',
   height:height,
   width:width,
  },
  imageContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 10,
    height: height * 0.3,
    width: width,
  },
  image: {
    height: '100%',
    width: '100%',
    resizeMode: 'contain',
  },
  textContainer: {
    flex: 0.35,
    alignItems: 'center',
    height: height * 0.3,
    justifyContent: 'center',
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
  thirdContainer: {
    flex: 0.35,
    justifyContent: 'center',
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: 'black',
    borderRadius: 10,
    marginTop: 10,
  },
  input: {
    height: height * 0.07,
    width: width * 0.7,
    color: 'black',
  },
  flagImage: {
    height: 20,
    width: 20,
    margin: 5,
    backgroundColor: 'white',
  },
  numberText: {
    color: 'black',
    fontWeight: 'bold',
    marginRight: 5,
  },
  buttonContainer: {
    flex: 0.5,
    justifyContent: 'center',
  },
  sendContainer: {
    height: 50,
    alignItems: 'center',
    justifyContent: 'center',
    width: width * 0.88,
    backgroundColor: '#ec7c0c',
    borderRadius: 3,
  },
  sendButton: {
    color: 'white',
    fontWeight: 'bold',
    fontFamily: 'VarelaRound-Regular',
    fontSize: 15,
  },
  bottomContainer: {
    flex: 0.5,
    alignItems: 'center',
    justifyContent: 'space-around',
  },
  bottomText: {
    fontFamily: 'VarelaRound-Regular',
    fontWeight: '500',
    color: 'black',
  },
  iconContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: width * 0.7,
  },

  googleIcon: {
    height: height * 0.05,
    width: width * 0.3,
    backgroundColor: '#C6F7F9',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 20,
  },
  Image: {
    height: 20,
    width: 20,
    backgroundColor: '#C6F7F9',
    borderRadius: 15,
  },
  facebookIcon: {
    height: height * 0.05,
    width: width * 0.3,
    backgroundColor: '#C6F7F9',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 20,
  },
  iconText: {
    marginLeft: 4,
    fontSize: 12,
    fontWeight: 'bold',
  },
});
