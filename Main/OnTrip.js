import React, {useMemo} from 'react';
import {
  View,
  StyleSheet,
  Text,
  TouchableHighlight,
  Image,
  Dimensions,
  TouchableOpacity,
  Pressable,
} from 'react-native';
import BottomSheet, {BottomSheetView} from '@gorhom/bottom-sheet';
import Icon from 'react-native-vector-icons/FontAwesome';
const {width} = Dimensions.get('window');
export default function OnTrip({navigation}) {
  const snapPoint = useMemo(() => ['4%', '50%'], []);
  return (
    <View style={styles.mainContainer}>
      <BottomSheet
        index={1}
        snapPoints={snapPoint}
        enablePanDownToClose={false}>
        <BottomSheetView style={styles.container}>
          <View style={styles.headerContainer}>
            <Text style={styles.arrivingText}>On Trip</Text>
            <Pressable style={styles.emegencyContainer}>
              <View style={styles.emegencyIconContainer}>
                <Icon
                  name="exclamation"
                  size={12}
                  color="red"
                  style={styles.emegencyIcon}
                />
              </View>
              <Text style={[styles.carName, {color: 'red', fontSize: 14}]}>
                Emergency
              </Text>
            </Pressable>
          </View>

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
            <Text style={styles.ratingText}>4.9</Text>
            <Icon name="star" size={20} color="#FFD816" />
          </View>
          <View style={styles.carInfoContainer}>
            <Text style={styles.text}>Akshay Kumar</Text>
            <View style={styles.carInfo}>
              <Text style={styles.carName}>Swift Dzire</Text>
              <Text style={styles.text}>UP14 EC 9715</Text>
            </View>
          </View>
          <TouchableOpacity
            style={styles.cancelRideButton}
            underlayColor="white" onPress={()=>navigation.navigate('ratingScreen')}>
            <Text style={styles.cancelRideText}>End Ride</Text>
          </TouchableOpacity>
        </BottomSheetView>
      </BottomSheet>
    </View>
  );
}
const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: 'white',
  },
  container: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: 'white',
  },
  headerContainer: {
    width: width * 0.9,
    height: 40,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
    borderBottomWidth: 1,
    borderColor: '#DDDDDD',
  },
  emegencyContainer: {
    flex: 1,
    width: '50%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-end',
  },
  arrivingText: {
    width: '50%',
    fontSize: 15,
    color: 'black',
    fontWeight: 'bold',
    fontFamily: 'VarelaRound-Regular',
  },
  emegencyIconContainer: {
    height: 20,
    width: 20,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'white',
    borderRadius: 10,
    borderColor: 'red',
    borderWidth: 1,
    marginRight: 10,
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
    width: width * 0.9,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-evenly',
    marginVertical: 20,
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
    marginTop: 10,
  },
  text: {
    fontSize: 17,
    color: 'black',
    fontWeight: 'bold',
    fontFamily: 'VarelaRound-Regular',
  },
  carInfo: {
    width: width * 0.8,
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    marginTop: 10,
  },
  carName: {
    fontSize: 16,
    color: 'black',
    fontWeight: '600',
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
    top: 140,
    shadowColor: 'black',
    elevation: 3,
  },
  ratingText: {
    fontSize: 14,
    color: 'black',
    fontWeight: 'bold',
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
});
