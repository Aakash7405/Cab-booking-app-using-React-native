import {BottomSheetView} from '@gorhom/bottom-sheet';

// import DropShadow from 'react-native-drop-shadow';
import React, {useEffect, useMemo, useRef, useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  Image,
  TouchableOpacity,
} from 'react-native';
import BottomSheet from '@gorhom/bottom-sheet';
import 'react-native-reanimated';
import Icon from 'react-native-vector-icons/Ionicons';
import {TouchableHighlight} from 'react-native';
import {setItem} from '../asyncStorage/Async';
import MapView, {Marker} from 'react-native-maps';

const {width} = Dimensions.get('window');
export default function Main({navigation, route}) {
  const snapPoint = useMemo(() => ['40%', '70%', '100%'], []);
  const [userLocation, setUserLocation] = useState('');
  useEffect(() => {
    function getAddressFromCoordinates() {
      const url = `https://maps.googleapis.com/maps/api/geocode/json?latlng=${route?.params.latitude},${route?.params.longitude}&key=AIzaSyDa1Gcp9Mu54Rq_DG8Lqk6nmEznPjgz4js`;
      fetch(url)
        .then(res => res.json())
        .then(data => {
          const address = data.results[0].formatted_address;
          setUserLocation(address);
        })
        .catch(e => {
          console.log(e);
        });
    }
    getAddressFromCoordinates();
  });
  

  return (
    <>
      <View style={styles.mainContainer}>
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
                <Icon name="pin-sharp" size={35} color="red" />
              </Marker>
            )}
          </MapView>

          <View style={styles.topContainer}>
            <TouchableHighlight
              style={styles.profileButtonContainer}
              underlayColor="#DDDDDD"
              onPress={() => {
               navigation.openDrawer()
              }}>
              <Icon name="menu" size={22} color="black" />
            </TouchableHighlight>
            <TouchableOpacity
              style={styles.pickupContainer}
              onPress={() => {
                return navigation.navigate('PickupAndDrop', {text: 'Pickup'});
              }}>
              <Icon
                name="location"
                size={20}
                color="#ec7c0c"
                style={styles.locationIcon}
              />
              <Text numberOfLines={1} style={styles.pickuplocationText}>
                {userLocation}
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
      <BottomSheet index={0} snapPoints={snapPoint}>
        <BottomSheetView style={styles.contentContainer}>
          <Text style={styles.topText}>Where are you going?</Text>

          <TouchableHighlight
            style={{borderRadius: 30, marginTop: 10}}
            underlayColor={'#DDDDDD'}
            onPress={() => {
              return navigation.navigate('PickupAndDrop', {text: 'Drop'});
            }}>
            <View style={styles.searchContainer}>
              <Icon name="search" size={18} color="black" />
              <Text style={styles.searchText}> Search location</Text>
            </View>
          </TouchableHighlight>
          <View style={styles.recentContainer}>
            <View style={styles.recentPlacesContainer}>
              <Icon
                name="time"
                size={22}
                color="#ec7c0c"
                style={styles.timeIcon}
              />
              <View style={styles.placeContainer}>
                <Text style={styles.placeName} numberOfLines={1}>
                  Divyansh Fabio
                </Text>
                <Text style={styles.placeAddress} numberOfLines={1}>
                  Dundahera,Ghaziabad ,Uttar Pradesh
                </Text>
              </View>
            </View>
            <View style={styles.recentPlacesContainer}>
              <Icon
                name="time"
                size={22}
                color="#ec7c0c"
                style={styles.timeIcon}
              />
              <View style={styles.placeContainer}>
                <Text style={styles.placeName} numberOfLines={1}>
                  JSS Academy of Technical Education
                </Text>
                <Text style={styles.placeAddress} numberOfLines={1}>
                  C-20/1,C Block,Phase 2,Industrial Area,Sector-62,Noida
                </Text>
              </View>
            </View>
          </View>
          <View style={styles.exploreContainer}>
            <Text style={styles.exploreText}>Explore</Text>
          </View>
          <View style={styles.serviceContainer}>
            <View style={styles.sharingService}>
              <TouchableHighlight
                style={styles.serviceImageContainer}
                underlayColor="#DDDDDD"
                onPress={() => {}}>
                <Image
                  source={require('../DriveEaseImage/sharing.png')}
                  style={styles.iconImage}
                />
              </TouchableHighlight>
              <Text style={styles.iconText}>Car Pooling</Text>
            </View>
            <View style={styles.sharingService}>
              <TouchableHighlight
                style={styles.serviceImageContainer}
                underlayColor="#DDDDDD"
                onPress={() => {
                  setItem('onboarding', '0');
                }}>
                <Image
                  source={require('../DriveEaseImage/car-rental.png')}
                  style={styles.iconImage}
                />
              </TouchableHighlight>
              <Text style={styles.iconText}>Rentals</Text>
            </View>
            <View style={styles.sharingService}>
              <TouchableHighlight
                style={styles.serviceImageContainer}
                underlayColor="#DDDDDD"
                onPress={() => {}}>
                <Image
                  source={require('../DriveEaseImage/yoursforhours.png')}
                  style={styles.iconImage}
                />
              </TouchableHighlight>
              <Text style={styles.iconText}>Yours for hours</Text>
            </View>
            <View style={styles.sharingService}>
              <TouchableHighlight
                style={styles.serviceImageContainer}
                underlayColor="#DDDDDD"
                onPress={() => {}}>
                <Image
                  source={require('../DriveEaseImage/parcel.png')}
                  style={styles.iconImage}
                />
              </TouchableHighlight>
              <Text style={styles.iconText}>Parcel</Text>
            </View>
          </View>
        </BottomSheetView>
      </BottomSheet>
    </>
  );
}
const styles = StyleSheet.create({
  mainContainer: {
    flex: 0.58,
    padding: 24,
    alignItems: 'center',
  },
  contentContainer: {
    flex: 1,
    alignItems: 'center',
  },
  topText: {
    fontSize: 14,
    fontWeight: 'bold',
    color: 'black',
    fontFamily: 'VarelaRound-Regular',
  },
  searchContainer: {
    backgroundColor: 'white',
    width: width * 0.85,
    height: 40,
    flexDirection: 'row',
    alignItems: 'center',
    paddingLeft: 15,
    borderRadius: 30,
    shadowColor: 'black',
    elevation: 5,
  },
  searchText: {
    fontFamily: 'VarelaRound-Regular',
    color: 'grey',
  },
  recentContainer: {
    width: width,
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  recentPlacesContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderColor: '#DDDDDD',
    marginTop: 5,
    width: width * 0.8,
    height: 80,
  },
  timeIcon: {
    width: '10%',
  },
  placeContainer: {
    width: '90%',
  },
  placeName: {
    fontSize: 16,
    fontWeight: '600',
    color: 'black',
    fontFamily: 'VarelaRound-Regular',
  },
  placeAddress: {
    fontFamily: 'VarelaRound-Regular',
    fontSize: 14,
    color: 'grey',
  },
  topContainer: {
    position: 'absolute',
    left: 20,
    top: 50,
    height: 20,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: width * 0.9,
  },
  mapContainer: {
    ...StyleSheet.absoluteFillObject,
  },
  map: {
    ...StyleSheet.absoluteFillObject,
  },
  profileButtonContainer: {
    width: 45,
    height: 45,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'white',
    borderRadius: 25,
    shadowColor: 'black',
    elevation: 5,
  },
  pickupContainer: {
    width: '82%',
    height: 45,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'white',
    borderRadius: 25,
    paddingHorizontal: 8,
    shadowColor: 'black',
    elevation: 5,
  },
  locationIcon: {
    marginHorizontal: 5,
  },
  pickuplocationText: {
    fontSize: 12,
    fontWeight: 'bold',
    color: 'black',
    fontFamily: 'VarelaRound-Regular',
  },
  exploreContainer: {
    width: width * 0.9,
    alignItems: 'flex-start',
    marginVertical: 10,
  },
  exploreText: {
    fontSize: 17,
    color: 'grey',
    fontWeight: '700',
    fontFamily: 'VarelaRound-Regular',
  },
  serviceContainer: {
    flex: 1,
    flexWrap: 'wrap',
    flexDirection: 'row',
    rowGap: 25,
    justifyContent: 'space-between',
    width: width * 0.9,
  },
  sharingService: {
    height: 100,
    width: 100,
    alignItems: 'center',
  },
  serviceImageContainer: {
    height: '75%',
    width: '100%',
    borderWidth: 1,
    alignItems: 'center',
    justifyContent: 'center',
    borderColor: '#DDDDDD',
    borderRadius: 10,
  },
  iconImage: {
    height: '60%',
    width: '60%',
    resizeMode: 'contain',
  },
  iconText: {
    fontSize: 13,
    fontWeight: 'bold',
    color: 'black',
    fontFamily: 'VarelaRound-Regular',
    marginTop: 5,
    textAlign: 'center',
  },
});
