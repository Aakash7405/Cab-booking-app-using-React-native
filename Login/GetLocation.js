import React, {useEffect, useState} from 'react';
import {
  PermissionsAndroid,
  StyleSheet,
  Text,
  Image,
  View,
  Dimensions,
} from 'react-native';
import {TouchableOpacity} from 'react-native';
import Geolocation from 'react-native-geolocation-service';
import Icon from 'react-native-vector-icons/Ionicons';
const {width} = Dimensions.get('window');
Geolocation.setRNConfiguration();
const requestLocationPermission = async () => {
  try {
    const granted = await PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
      {
        title: 'Location Permission',
        message: 'Drive Ease App needs access to your Location ',
        buttonNeutral: 'Ask Me Later',
        buttonNegative: 'Cancel',
        buttonPositive: 'OK',
      },
    );
    if (granted === PermissionsAndroid.RESULTS.GRANTED) {
      console.log('You can use the App');
    } else {
      console.log('Location permission denied');
    }
  } catch (error) {
    console.warn(error);
  }
};

export default function GetLocation({navigation}) {
  const pickupanddrop = () => {
    navigation.navigate('HomeScreen', {
      screen: 'Home',
      params: {latitude: lat, longitude: long},
    });
  };
  const handleBackButton = () => {
    return navigation.goBack();
  };
  const location = async () => {
    if (requestLocationPermission) {
      try {
        await Geolocation.getCurrentPosition(
          position => {
            const latitude = position.coords.latitude;
            const longitude = position.coords.longitude;
            setLat(latitude);
            setLong(longitude);
            console.log(latitude, longitude);
          },
          error => {
            console.log(error.code, ',', error.message);
          },
          {enableHighAccuracy: true, timeout: 15000, maximumAge: 100},
        );
      } catch (error) {
        console.log(error);
      }
    }
  };
  const [lat, setLat] = useState(null);
  const [long, setLong] = useState(null);
  useEffect(() => {
    requestLocationPermission();
    setTimeout(() => {
      location();
    }, 2000);
  }, []);

  return (
    <View style={styles.mainContainer}>
      <View style={styles.iconContainer}>
        <TouchableOpacity
          onPress={handleBackButton}
          underlayColor="white"
          style={{backgroundColor: 'white', marginLeft: 18}}>
          <Icon name="arrow-back-outline" size={27} color={'black'} />
        </TouchableOpacity>
      </View>
      <View style={styles.imageContainer}>
        <Image
          source={require('../DriveEaseImage/image1.jpg')}
          style={styles.image}
        />
      </View>
      <View style={styles.textContainer}>
        <Text style={styles.boldText}>Allow access to your location</Text>
        <Text style={styles.regularText}>
          By Allowing Access Taxi App finds your location and provides you with
          the best rides
        </Text>
      </View>
      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.allowButton} onPress={pickupanddrop}>
          <Text style={styles.buttonText}>Allow</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.cancelButton}
          onPress={() => {}}>
          <Text style={styles.cancelButtonText}>Cancel</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
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
  imageContainer: {
    flex: 0.4,
    width: width * 0.88,
  },
  image: {
    height: '100%',
    width: '100%',
    resizeMode: 'contain',
  },
  textContainer: {
    width: width * 0.95,
    flex: 0.15,
    alignItems: 'center',
    justifyContent: 'flex-end',
  },
  boldText: {
    fontSize: 19,
    fontWeight: 'bold',
    color: 'black',
    fontFamily: 'VarelaRound-Regular',
  },
  regularText: {
    fontSize: 13,
    fontWeight: '500',
    color: 'black',
    marginTop: 7,
    fontFamily: 'VarelaRound-Regular',
    textAlign: 'center',
  },
  buttonContainer: {
    flex: 0.38,
    width: width,
    alignItems: 'center',
    justifyContent: 'flex-end',
  },
  allowButton: {
    width: width * 0.88,
    height: 50,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 3,
    backgroundColor: '#ec7c0c',
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
    fontFamily: 'VarelaRound-Regular',
    fontSize: 15,
  },
  cancelButtonText: {
    color: 'black',
    fontWeight: 'bold',
    fontFamily: 'VarelaRound-Regular',
    fontSize: 15,
  },
  cancelButton: {
    width: width * 0.88,
    height: 50,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 3,
    marginBottom: 20,
  },
});
