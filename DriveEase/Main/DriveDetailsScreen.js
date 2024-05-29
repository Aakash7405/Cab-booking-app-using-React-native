import React, {useEffect, useMemo, useRef, useState} from 'react';
import {
  View,
  StyleSheet,
  Text,
  TouchableHighlight,
  Image,
  Dimensions,
  TouchableOpacity,
} from 'react-native';
import BottomSheet, {BottomSheetView} from '@gorhom/bottom-sheet';
import Icon from 'react-native-vector-icons/FontAwesome';
import MapView, {Marker} from 'react-native-maps';
import MapViewDirections from 'react-native-maps-directions';
import FontAwesome from 'react-native-vector-icons/Ionicons';
const Google_Api = 'AIzaSyDa1Gcp9Mu54Rq_DG8Lqk6nmEznPjgz4js';
const {width} = Dimensions.get('window');

export default function DriveDetailsScreen({navigation, route}) {
  const snapPoint = useMemo(() => ['50%', '73%'], []);
  const [driverDetails, setDriverDetails] = useState(
    route?.params.driverDetails,
  );
  const [origin, setOrigin] = useState(route?.params?.origin);
  const [destination, setDestination] = useState(route?.params?.destination);
  const [OTP, setOtp] = useState(driverDetails.OTP);
  const [time, setTime] = useState('');
  const mapref = useRef(null);
  useEffect(() => {
    setTimeout(() => {
      return mapref?.current?.fitToSuppliedMarkers(['origin', 'destination'], {
        edgePadding: {top: 100, bottom: 50, right: 100, left: 50},
      });
    }, 2000);
  }, []);
  useEffect(() => {
    if (!origin || !destination) {
      return;
    }

    const fetchCabDetails = async () => {
      const url = `https://maps.googleapis.com/maps/api/distancematrix/json?origins=${origin.description}&destinations=${destination.description}&key=${Google_Api}`;
      fetch(url)
        .then(res => res.json())
        .then(data => {
          console.log(data.rows[0].elements[0]);

          setTime(data.rows[0].elements[0].duration.text);
        })
        .catch(err => console.log(err));
    };
    fetchCabDetails();
  }, [origin, destination]);
  return (
    <>
    <View style={styles.mainContainer}>
      <View style={styles.mapContainer}>
        <MapView
          style={styles.map}
          ref={mapref}
          initialRegion={{
            latitude: origin?.location?.lat || 37.041218,
            longitude: origin?.location?.lng || -95.63932,
            latitudeDelta: 0.0922,
            longitudeDelta: 0.0421,
          }}>
          {origin && destination && (
            <MapViewDirections
              origin={origin.description}
              destination={driverDetails.description}
              apikey={Google_Api}
              strokeWidth={3}
              strokeColor="#ec7c0c"
            />
          )}
          {origin?.location && (
            <Marker
              coordinate={{
                latitude: origin.location.lat,
                longitude: origin.location.lng,
              }}
              title={'Pickup Location'}
              description={origin.description}
              identifier="origin">
              <FontAwesome name="pin-sharp" size={35} color="red" />
            </Marker>
          )}
          {destination?.location && (
            <Marker
              coordinate={{
                latitude: driverDetails.driverLocation.latitude,
                longitude: driverDetails.driverLocation.longitude,
              }}
              title={'Drop Location'}
              description={driverDetails.description}
              identifier="destination">
              {/* <FontAwesome name="pin-sharp" size={35} color="red" /> */}
              <Image source={require('../DriveEaseImage/carMarker.png')} style={styles.carMarker}/>
            </Marker>
          )}
        </MapView>
      </View>
      </View>
      <BottomSheet
        index={0}
        snapPoints={snapPoint}
        enablePanDownToClose={false}>
        <BottomSheetView style={styles.container}>
          <Text style={styles.arrivingText}>
            Your Ride is arriving in {time}          </Text>
          <View style={styles.driverInfoContainer}>
            <TouchableHighlight
              style={styles.IconContainer}
              underlayColor="#DDDDDD"
              onPress={() => {}}>
              <Icon name="commenting" size={25} color="white" />
            </TouchableHighlight>
            <View style={styles.driverImageContainer}>
              <Image
                source={require('../DriveEaseImage/driver.png')}
                style={styles.driverimage}
              />
            </View>
            <TouchableHighlight
              style={styles.IconContainer}
              underlayColor="#DDDDDD"
              onPress={() => {}}>
              <Icon name="phone" size={25} color="white" />
            </TouchableHighlight>
          </View>
          <View style={styles.ratingContainer}>
            <Text style={styles.ratingText}>{driverDetails.ratings}</Text>
            <Icon name="star" size={20} color="#FFD816" />
          </View>
          <View style={styles.carInfoContainer}>
            <Text style={styles.text}>{driverDetails?.name}</Text>
            <View style={styles.otp}>
              <Text style={styles.text}>OTP :</Text>
              {OTP.map((item, index) => {
                return (
                  <View key={index} style={styles.otpNumberContainer}>
                    <Text style={styles.otpNumber}>{item}</Text>
                  </View>
                );
              })}
            </View>
            <View style={styles.carInfo}>
              <Text style={styles.carName}>{driverDetails?.car}</Text>
              <Text style={styles.text}>{driverDetails?.carNo}</Text>
            </View>
          </View>
          <View style={styles.routeTextContainer}>
            <Text style={styles.routeText}>Trip Route</Text>
          </View>
          <View style={styles.PickupAndDropContainer}>
            <View style={styles.imageContainer}>
              <Image
                source={require('../DriveEaseImage/frame1.jpg')}
                style={styles.image}
              />
            </View>

            <View style={styles.PickupAndDropInputContainer}>
              <View style={styles.pickupContainer}>
                <Text style={styles.pickup} numberOfLines={1}>
                  {origin.description}
                </Text>
              </View>
              <View style={styles.horizontalRular}></View>
              <View style={styles.dropContainer}>
                <Text style={styles.drop} numberOfLines={1}>
                  {destination.description}
                </Text>
                <TouchableOpacity underlayColor="white" onPress={() => {}}>
                  <Text style={styles.changeButton}>Change</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </BottomSheetView>
      </BottomSheet>
      <TouchableOpacity
        style={styles.cancelRideButton}
        underlayColor="white"
        onPress={() => navigation.navigate('onTrip')}>
        <Text style={styles.cancelRideText}>Cancel Ride</Text>
      </TouchableOpacity>
    </>
  );
}
const styles = StyleSheet.create({
  mainContainer: {
    flex: 0.5,
    alignItems: 'center',
    backgroundColor: 'white',
    marginTop:10,
  },
  mapContainer: {
    flex: 1,
    width: width,
  },
  map: {
    ...StyleSheet.absoluteFillObject,
  },
  container: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: 'white',
  },
  arrivingText: {
    height: 40,
    fontSize: 15,
    color: 'black',
    fontWeight: '600',
    fontFamily: 'VarelaRound-Regular',
  },
  IconContainer: {
    height: 50,
    width: 50,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 27,
    backgroundColor: '#ec7c0c',
    shadowColor: 'black',
    elevation: 5,
  },
  driverInfoContainer: {
    // borderWidth: 1,
    width: width * 0.9,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-evenly',
  },
  driverImageContainer: {
    height: 90,
    width: 90,
    shadowColor: 'black',
    elevation: 8,
    borderRadius: 50,
  },
  driverimage: {
    height: '100%',
    width: '100%',
    resizeMode: 'cover',
    borderRadius: 50,
  },
  carInfoContainer: {
    width: width * 0.9,
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: 30,
  },
  text: {
    fontSize: 17,
    color: 'black',
    fontWeight: 'bold',
    fontFamily: 'VarelaRound-Regular',
  },
  otp: {
    width: width * 0.6,
    height: 40,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  otpNumberContainer: {
    height: 23,
    width: 23,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#ec7c0c',
    margin: 5,
  },
  otpNumber: {
    color: 'white',
    fontWeight: 'bold',
  },
  carInfo: {
    width: width * 0.8,
    flexDirection: 'row',
    justifyContent: 'space-evenly',
  },
  carName: {
    fontSize: 16,
    color: 'black',
    fontWeight: 'bold',
    fontFamily: 'VarelaRound-Regular',
  },
  cancelRideButton: {
    height: 50,
    width: width * 0.9,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
    backgroundColor: '#ec7c0c',
    marginTop: 10,
    position: 'absolute',
    left: 18,
    bottom: 1,
  },
  cancelRideText: {
    fontSize: 15,
    color: 'white',
    fontWeight: 'bold',
    fontFamily: 'VarelaRound-Regular',
  },
  ratingContainer: {
    height: 30,
    width: 55,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-evenly',
    backgroundColor: 'white',
    borderRadius: 20,
    position: 'absolute',
    top: 120,
    shadowColor: 'black',
    elevation: 3,
  },
  ratingText: {
    fontSize: 14,
    color: 'black',
    fontWeight: 'bold',
    fontFamily: 'VarelaRound-Regular',
  },
  PickupAndDropContainer: {
    width: width * 0.9,
    height: 90,
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 5,
    borderWidth: 1,
    borderRadius: 10,
    borderColor: 'grey',
  },
  imageContainer: {
    height: '100%',
    width: 50,
  },
  image: {
    borderRadius: 10,
    height: '100%',
    width: '100%',
    resizeMode: 'cover',
  },
  PickupAndDropInputContainer: {
    flex: 1,
    height: '90%',
    marginRight: 10,
    justifyContent: 'space-evenly',
  },
  horizontalRular: {
    height: 1,
    width: width * 0.55,
    backgroundColor: '#DDDDDD',
  },
  pickupContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderColor: 'grey',
  },
  dropContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  pickup: {
    // borderWidth: 1,
    width: width * 0.5,
    fontSize: 15,
    color: 'black',
    fontWeight: '600',
    fontFamily: 'VarelaRound-Regular',
  },
  drop: {
    // borderWidth: 1,
    width: width * 0.5,
    fontSize: 15,
    fontWeight: '600',
    color: 'black',
    fontFamily: 'VarelaRound-Regular',
  },
  changeButton: {
    fontSize: 12,
    fontWeight: '600',
    color: '#25BDFF',
    fontFamily: 'VarelaRound-Regular',
  },
  routeTextContainer: {
    width: width * 0.9,
    alignItems: 'flex-start',
    marginVertical: 20,
  },
  routeText: {
    fontSize: 17,
    color: 'black',
    fontWeight: 'bold',
    fontFamily: 'VarelaRound-Regular',
    marginLeft: 5,
    marginVertical: 5,
  },
  carMarker:{
    height:80,
    width:80,
  }
});
