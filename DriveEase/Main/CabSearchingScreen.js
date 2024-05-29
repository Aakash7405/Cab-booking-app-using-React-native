import BottomSheet, {BottomSheetView} from '@gorhom/bottom-sheet';
import React, {useMemo} from 'react';
import {
  Image,
  View,
  StyleSheet,
  Dimensions,
  Text,
  TouchableOpacity,
} from 'react-native';

const {width} = Dimensions.get('window');
export default function CabSearchingScreen({route, navigation}) {
  const snapPoint = useMemo(() => ['50%'], []);
  
  return (
    <>
      <BottomSheet snapPoints={snapPoint}>
        <BottomSheetView style={styles.cancelRideContainer}>
          <View style={styles.imageContainer}>
            <Image
              source={require('../DriveEaseImage/searchTaxi.jpg')}
              style={styles.image}
            />
          </View>
          <View style={styles.textContainer}>
            <Text style={styles.text}>
              Hold on! We are searching for nearby driver for you
            </Text>
          </View>
          <View style={styles.statusBarContainer}></View>
          <TouchableOpacity
            style={styles.cancelRideButton}
            underlayColor="white">
            <Text style={styles.cancelRideText}>Cancel Ride</Text>
          </TouchableOpacity>
        </BottomSheetView>
      </BottomSheet>
    </>
  );
}

const styles = StyleSheet.create({
  mainContainer: {
    flex: 0.6,
    padding: 24,
    alignItems: 'center',
  },
  imageContainer: {
    height: '50%',
    width: width * 0.9,
  },
  cancelRideContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  image: {
    height: '100%',
    width: '100%',
    resizeMode: 'contain',
  },
  textContainer: {
    height: 50,
    width: width * 0.7,
  },
  text: {
    fontSize: 14,
    fontWeight: 'bold',
    color: 'black',
    fontFamily: 'VarelaRound-Regular',
    textAlign: 'center',
  },
  statusBarContainer: {
    height: 20,
    width: width * 0.9,
    borderWidth: 1,
    marginBottom: 10,
  },
  cancelRideButton: {
    height: 50,
    width: width * 0.95,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
    backgroundColor: '#ec7c0c',
    marginHorizontal: 10,
    marginBottom: 10,
  },
  cancelRideText: {
    fontSize: 15,
    color: 'white',
    fontWeight: 'bold',
    fontFamily: 'VarelaRound-Regular',
  },
  mapContainer: {
    ...StyleSheet.absoluteFillObject,
  },
  map: {
    ...StyleSheet.absoluteFillObject,
  },
});
