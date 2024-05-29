import BottomSheet from '@gorhom/bottom-sheet';
import React, {useCallback, useEffect, useMemo, useRef, useState} from 'react';
import {
  Dimensions,
  StyleSheet,
  View,
  Image,
  Text,
  TouchableOpacity,
  FlatList,
  Pressable,
  ActivityIndicator,
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import MapView, {Marker} from 'react-native-maps';
import FontAwesome from 'react-native-vector-icons/Ionicons';
import MapViewDirections from 'react-native-maps-directions';
import {io} from 'socket.io-client';
// import {opacity} from 'react-native-reanimated/lib/typescript/reanimated2/Colors';
// import Icon from 'react-native-vector-icons/Ionicons';
const {width, height} = Dimensions.get('window');

const ridedata = [
  {
    id: 0,
    image: require('../DriveEaseImage/standard.jpg'),
    carType: 'Standard',
    ridePrice: 40,
  },
  {
    id: 1,
    image: require('../DriveEaseImage/deluxe.jpg'),
    carType: 'Deluxe',
    ridePrice: 60,
  },
  {
    id: 2,
    image: require('../DriveEaseImage/premium.jpg'),
    carType: 'Premium',
    dropoffTime: '9:34 AM ',
    ridePrice: 100,
  },
  {
    id: 3,
    image: require('../DriveEaseImage/motor.png'),
    carType: 'Motor',
    dropoffTime: '10:40 AM ',
    ridePrice: 5,
  },
  {
    id: 4,
    image: require('../DriveEaseImage/autoRickshaw.png'),
    carType: 'Auto',
    dropoffTime: '8:24 AM ',
    ridePrice: 15,
  },
];
const Google_Api = 'AIzaSyDa1Gcp9Mu54Rq_DG8Lqk6nmEznPjgz4js';
const BaseFare = 30;
const costPerMinute = 3;
const costPerKm = 3;
const surgePricing = 1.2;
// Base Fare + ((Cost per minute x time of the ride) + (cost per mile x ride distance) x surge boost multiplier) + booking fee
function BookingScreen({navigation, origin, destination, itemFunction,loading}) {
  const [selectedItem, setSelectedItem] = useState(ridedata[0]);
  const [travelTime, setTravelTime] = useState(null);
  const [travelDistance, setTravelDistance] = useState(null);
  const [time, setTime] = useState(null);
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
          setTravelDistance(data.rows[0].elements[0].distance.value);
          setTravelTime(data.rows[0].elements[0].duration.text);
          setTime(data.rows[0].elements[0].duration.value);
        })
        .catch(err => console.log(err));
    };
    fetchCabDetails();
  }, [origin, destination]);
  const price = useMemo(
    () =>
      Math.floor(
        BaseFare +
          ((costPerMinute * time) / 60 +
            ((costPerKm * travelDistance) / 1000) * surgePricing),
      ),
    [time, travelDistance],
  );
  return (
    <View style={{flex: 1, alignItems: 'center',opacity:loading?0.1:1}}>
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
            <TouchableOpacity
              underlayColor="white"
              onPress={() => {
                navigation.goBack();
              }}>
              <Text style={styles.changeButton}>Change</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
      <View style={styles.SuggestedTextContainer}>
        <Text style={styles.suggestedText}>Suggested Rides</Text>
      </View>
      <View style={styles.suggestedRidesContainer}>
        <FlatList
          data={ridedata}
          keyExtractor={item => item.id}
          extraData={selectedItem}
          renderItem={({item}) => (
            <View style={styles.standardRideContainer}>
              <Pressable
                style={[
                  styles.standardRideSubContainer,
                  {borderWidth: item.id === selectedItem.id ? 2 : 0},
                ]}
                onPress={() => {
                  setSelectedItem(item);
                  itemFunction({
                    ...item,
                    travelTime,
                    ridePrice: price + item.ridePrice,
                  });
                }}>
                <View style={styles.carimageContainer}>
                  <Image source={item.image} style={styles.carimage} />
                </View>
                <View style={styles.carTextContainer}>
                  <Text style={styles.carType}>{item.carType}</Text>
                  <Text style={styles.dropOffTime}>{travelTime}</Text>
                </View>
                <View style={styles.ridePriceContainer}>
                  <Icon name="inr" size={17} color="black" />
                  <Text style={styles.ridePrice}>{price + item.ridePrice}</Text>
                </View>
              </Pressable>
            </View>
          )}
        />
      </View>
    </View>
  );
}
export default function CabSelection({navigation, route}) {
  const snapPoint = useMemo(() => ['50%', '70%', '100%'], []);
  const [item, setItem] = useState(null);
  const [origin, setOrigin] = useState(route?.params?.origin);
  const [destination, setDestination] = useState(route?.params?.destination);
  const [loading, setLoading] = useState(false);
  const mapref = useRef(null);
  const socket = useRef(null);
  useEffect(() => {
    socket.current = io('http://192.168.110.25:3000');
    socket.current.on('connect', () => {
      console.log('connection successfully');
    });
    socket.current.on('disconnect', () => {
      console.log('disconnect');
    });
  }, []);
  useEffect(() => {
    setTimeout(() => {
      return mapref?.current?.fitToSuppliedMarkers(['origin', 'destination'], {
        edgePadding: {top: 100, bottom: 50, right: 100, left: 50},
      });
    }, 2000);
  }, []);

  const itemFunction = useCallback(selectedItem => {
    setItem(selectedItem);
    console.log(selectedItem);
  }, []);

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
                destination={destination.description}
                apikey={Google_Api}
                strokeWidth={3}
                strokeColor="black"
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
                  latitude: destination.location.lat,
                  longitude: destination.location.lng,
                }}
                title={'Drop Location'}
                description={destination.description}
                identifier="destination">
                <FontAwesome name="pin-sharp" size={35} color="red" />
              </Marker>
            )}
          </MapView>
        </View>
      </View>
      <BottomSheet
        index={0}
        snapPoints={snapPoint}
        enablePanDownToClose={false}>
          {loading && <ActivityIndicator size="large" style={styles.indicator}  color="#ec7c0c"/>}
        <BookingScreen
          origin={origin}
          navigation={navigation}
          destination={destination}
          itemFunction={itemFunction}
          loading={loading}
        />
        <View style={styles.buttonContainer}>
          <TouchableOpacity
            style={styles.bookRideButton}
            underlayColor="white"
            onPress={() => {
              socket.current.emit('bookRide', {
                socketId: socket.current.id,
                origin: origin.description,
                  destination: destination.description,
                ...item,
              });
              setLoading(true);
              socket.current.on('connectRider', data => {
                console.log(data);
                setLoading(false);
                navigation.navigate('driveDetailsScreen', {
                  driverDetails: data,
                  origin: origin,
                  destination: destination,
                });
              });
            }}>
            <Text style={styles.bookRideText}>Book Ride</Text>
          </TouchableOpacity>
          <Pressable style={styles.paymentContainer}>
            <View style={styles.cashContainer}>
              <Icon name="money" size={20} color="green" />
              <Text style={styles.cashText}>Cash</Text>
            </View>
            <Icon name="caret-right" size={20} color="black" />
          </Pressable>
        </View>
      </BottomSheet>
    </>
  );
}

const styles = StyleSheet.create({
  mainContainer: {
    flex: 0.5,
    alignItems: 'center',
  },
  indicator: {
    position: 'absolute',
    height: height,
    width: width,
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
  SuggestedTextContainer: {
    width: width * 0.9,
    alignItems: 'flex-start',
  },
  suggestedText: {
    fontSize: 17,
    color: 'black',
    fontWeight: 'bold',
    fontFamily: 'VarelaRound-Regular',
    marginLeft: 5,
    marginVertical: 5,
  },
  suggestedRidesContainer: {
    flex: 1,
    alignItems: 'center',
    width: width * 0.9,
  },
  standardRideContainer: {
    width: width * 0.9,
    height: 100,
    borderBottomWidth: 1,
    borderColor: '#DDDDDD',
    justifyContent: 'center',
  },
  standardRideSubContainer: {
    width: '100%',
    height: '70%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderRadius: 10,
    // borderWidth: 2,
  },
  carimageContainer: {
    width: '24%',
    height: '100%',
    borderRadius: 10,
    marginLeft: 2,
  },

  carimage: {
    height: '100%',
    width: '100%',
    resizeMode: 'contain',
  },
  carTextContainer: {
    width: '45%',
  },
  carType: {
    fontSize: 15,
    color: 'black',
    fontWeight: 'bold',
    fontFamily: 'VarelaRound-Regular',
    marginBottom: 3,
  },
  dropOffTime: {
    fontSize: 12,
    color: 'black',
    fontFamily: 'VarelaRound-Regular',
  },
  ridePriceContainer: {
    width: '15%',
    height: '50%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-evenly',
    marginRight: 10,
  },
  ridePrice: {
    fontSize: 15,
    color: 'black',
    fontFamily: 'VarelaRound-Regular',
  },
  buttonContainer: {
    height: 50,
    width: width * 0.9,
    flexDirection: 'row',
    justifyContent: 'space-between',
    position: 'absolute',
    bottom: 0,
    backgroundColor: 'white',
    marginBottom: 1,
  },
  bookRideButton: {
    height: '100%',
    width: '70%',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
    backgroundColor: '#ec7c0c',
    marginHorizontal: 10,
  },
  bookRideText: {
    fontSize: 15,
    color: 'white',
    fontWeight: 'bold',
    fontFamily: 'VarelaRound-Regular',
  },
  paymentContainer: {
    flexDirection: 'row',
    width: '25%',
    alignItems: 'center',
    justifyContent: 'space-evenly',
    backgroundColor: 'white',
    marginHorizontal: 10,
  },
  cashContainer: {
    alignItems: 'center',
  },
  cashText: {
    fontSize: 15,
    color: 'black',
    fontWeight: 'bold',
    fontFamily: 'VarelaRound-Regular',
  },
  mapContainer: {
    flex: 1,
    width: width,
  },
  map: {
    ...StyleSheet.absoluteFillObject,
  },
});
