import React, {useEffect, useMemo, useRef, useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableHighlight,
  Dimensions,
  TouchableOpacity,
  Image,
} from 'react-native';
import {io} from 'socket.io-client';
import MapView, {Marker} from 'react-native-maps';
import Icon from 'react-native-vector-icons/Ionicons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import {BottomSheetModalProvider, BottomSheetModal} from '@gorhom/bottom-sheet';
const {width} = Dimensions.get('window');
export default function HomeScreen({navigation, route}) {
  const [active, setActive] = useState('offline');
  const [price, setPrice] = useState(0);
  const [origin, setOrigin] = useState('');
  const [destination, setDestination] = useState('');
  const [time, setTime] = useState('');
  const bottomsheetref = useRef(null);
  const snapPoint = useMemo(() => ['50%'], []);
  const socket = useRef(null);
  const handleOpen = () => {
    return bottomsheetref.current.present();
  };
  const handleClose = () => {
    return bottomsheetref.current.dismiss();
  };
  const handleConnect = () => {
    socket.current = io('http://192.168.110.25:3000');
    socket.current.on('connect', () => {
      console.log('connection successfully');
    });

    socket.current.on('connectDriver', data => {
      setPrice(data.price);
      setOrigin(data.origin);
      setDestination(data.destination);
      setTime(data.time);
      setTimeout(() => {
        handleOpen();
      }, 2000);
    });
  };
  const handleDisconnect = () => {
    socket.current.disconnect();
    handleClose();
  };
  return (
    <>
      <BottomSheetModalProvider style={styles.mainContainer}>
        <View style={styles.mapContainer}>
          <MapView
            style={styles.map}
            //specify our coordinates.

            initialRegion={{
              latitude: route?.params.latitude || 37.041218,
              longitude: route?.params.longitude || -95.63932,
              latitudeDelta: 0.0922,
              longitudeDelta: 0.0421,
            }}>
            {route?.params && (
              <Marker coordinate={route?.params} description={'origin'}>
                <Image
                  source={require('../DriveEaseImage/carMarker.png')}
                  style={styles.carMarker}
                />
              </Marker>
            )}
          </MapView>

          <View style={styles.topContainer}>
            <TouchableHighlight
              style={styles.personIconContainer}
              onPress={() => {}}
              underlayColor="white">
              <Icon name="person" size={27} color="#ec7c0c" />
            </TouchableHighlight>
            <Text style={styles.text}>{active}</Text>
            {active === 'offline' ? (
              <TouchableHighlight
                style={styles.onOffButton}
                underlayColor="white"
                onPress={() => {
                  setActive('online');
                  handleConnect();
                }}>
                <FontAwesome name="toggle-off" size={27} color="#ec7c0c" />
              </TouchableHighlight>
            ) : (
              <TouchableHighlight
                style={styles.onOffButton}
                underlayColor="white"
                onPress={() => {
                  setActive('offline');
                  handleDisconnect();
                }}>
                <FontAwesome name="toggle-on" size={27} color="#ec7c0c" />
              </TouchableHighlight>
            )}
          </View>
        </View>
        <BottomSheetModal
          style={styles.modal}
          enablePanDownToClose={true}
          ref={bottomsheetref}
          index={0}
          snapPoints={snapPoint}>
          <View style={styles.modalContainer}>
            <View style={styles.rideRequestContainer}>
              <Text style={[styles.text, {fontSize: 18}]}>Ride Request</Text>
              <Text style={[styles.text, {fontSize: 18}]}>Rs. {price}</Text>
            </View>

            <View style={styles.PickupAndDropInputContainer}>
              <View style={styles.imageContainer}>
                <Image
                  source={require('../DriveEaseImage/frame1.jpg')}
                  style={styles.image}
                />
              </View>
              <View style={styles.locationContainer}>
                <View style={styles.pickupContainer}>
                  <Text style={styles.pickup} numberOfLines={1}>
                    {origin}
                  </Text>
                </View>
                <View style={styles.horizontalRular}></View>
                <View style={styles.dropContainer}>
                  <Text style={styles.drop} numberOfLines={1}>
                    {destination}
                  </Text>
                </View>
              </View>
              <TouchableOpacity style={styles.timeContainer}>
                <Text style={styles.changeButton}>{time}</Text>
              </TouchableOpacity>
            </View>
            <View style={styles.buttonContainer}>
              <TouchableHighlight
                style={styles.declineButton}
                underlayColor="white"
                onPress={() => {
                  handleClose();
                }}>
                <Text style={[styles.text, {color: '#ec7c0c'}]}>Decline</Text>
              </TouchableHighlight>
              <TouchableHighlight
                style={styles.acceptButton}
                underlayColor="white"
                onPress={() => {
                  socket.current.emit('rideAccepted', {ratings:4.7,carNo:'UP14 EC 9715',driverLocation:{latitude:route?.params.latitude,longitude:route?.params.longitude}});
                  navigation.navigate('navigateToUser', {
                    origin: {
                      latitude: 28.634412,
                      longitude: 77.445953,
                      description:
                        'ABES Engineering College, NH 24, Chipiyana Buzurg, Ghaziabad, Uttar Pradesh,India',
                    },
                    driverLocation: {
                      latitude: route?.params.latitude,
                      longitude: route?.params.longitude,
                      description: 'sector 62, Noida, Uttar Pradesh, India',
                    },
                  });
                }}>
                <Text style={[styles.text, {color: 'white'}]}>Accept</Text>
              </TouchableHighlight>
            </View>
          </View>
        </BottomSheetModal>
      </BottomSheetModalProvider>
    </>
  );
}
const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    padding: 24,
    alignItems: 'center',
  },
  topContainer: {
    position: 'absolute',
    left: 20,
    top: 40,
    height: 50,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
    width: width * 0.9,
    borderRadius: 50,
    shadowColor: 'black',
    backgroundColor: 'white',
    elevation: 3,
  },
  mapContainer: {
    ...StyleSheet.absoluteFillObject,
  },
  map: {
    ...StyleSheet.absoluteFillObject,
  },
  text: {
    fontSize: 15,
    fontFamily: 'VarelaRound-Regular',
    fontWeight: 'bold',
    color: 'black',
  },
  modalContainer: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: 'white',
  },
  rideRequestContainer: {
    width: width * 0.9,
    borderBottomWidth: 1,
    borderColor: '#DDDDDD',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    height: 50,
  },
  PickupAndDropInputContainer: {
    flex: 0.45,
    width: width * 0.9,
    paddingHorizontal: 5,
    marginVertical: 50,

    flexDirection: 'row',
    alignItems: 'center',

    borderWidth: 1,
    borderColor: '#DDDDDD',
    borderRadius: 20,
  },
  locationContainer: {
    height: '100%',
    width: '60%',

    borderRadius: 10,
    justifyContent: 'center',
  },
  horizontalRular: {
    height: 1,
    marginVertical: 8,
    width: width * 0.52,
    backgroundColor: '#DDDDDD',
  },
  pickupContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
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
    fontSize: 13,
    fontWeight: 'bold',
    color: '#25BDFF',
    fontFamily: 'VarelaRound-Regular',
  },
  imageContainer: {
    height: '90%',
    width: 50,
  },
  image: {
    borderRadius: 10,
    height: '100%',
    width: '100%',
    resizeMode: 'cover',
  },
  timeContainer: {
    height: '100%',
    width: width * 0.22,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 20,
  },
  buttonContainer: {
    width: width * 0.9,
    flex: 0.5,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  declineButton: {
    width: width * 0.4,
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 30,
    backgroundColor: '#EEEEEE',
  },
  acceptButton: {
    width: width * 0.4,
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 30,
    backgroundColor: '#ec7c0c',
  },
  carMarker: {
    height: 80,
    width: 80,
  },
});
