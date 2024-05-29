import React, {useMemo, useState} from 'react';
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
const rating = ['star', 'star', 'star', 'star', 'star'];
export default function RatingScreen() {
  const snapPoint = useMemo(() => [ '100%'], []);
  const [selected, setSelected] = useState(null);
  return (
    <View style={styles.mainContainer}>
      <BottomSheet
        index={0}
        snapPoints={snapPoint}
        enablePanDownToClose={false}>
        <BottomSheetView style={styles.container}>
          <View style={styles.headerContainer}>
            <Text style={styles.text}>You Reached Destination</Text>
          </View>

          <View style={styles.driverInfoContainer}>
            <View style={styles.driverImageContainer}>
              <Image
                source={require('../DriveEaseImage/driver.png')}
                style={styles.driverimage}
              />
            </View>
          </View>
          <View style={styles.ratingContainer}>
            <Text style={styles.ratingText}>4.9</Text>
            <Icon name="star" size={20} color="#FFD816" />
          </View>
          <View style={styles.carInfoContainer}>
            <Text style={styles.text}>Akshay Kumar</Text>
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
                  JSS Academy of Technical Education
                </Text>
                <View>
                  <Text style={styles.changeButton}>11:20 AM</Text>
                </View>
              </View>
              <View style={styles.horizontalRular}></View>
              <View style={styles.dropContainer}>
                <Text style={styles.drop} numberOfLines={1}>
                  C-20/1,C Block,Phase 2,Industrial Area,Sector-62,Noida
                </Text>
                <View>
                  <Text style={styles.changeButton}>11:45 AM</Text>
                </View>
              </View>
            </View>
          </View>
          <View style={styles.textContainer}>
            <Text style={styles.boldText}>How was your trip with Aakash?</Text>
            <Text style={styles.regularText}>
              Your feedback will help us to improve driving experience better
            </Text>
          </View>

          <View style={styles.starRatingContainer}>
            {rating.map((item, index) => {
              return (
                <TouchableHighlight
                  key={index}
                  underlayColor="#fff"
                  onPress={() => setSelected(index)}>
                  <Icon
                    name={item}
                    size={40}
                    color={index <= selected ? '#FFD816' : '#DDDDDD'}
                    style={styles.selectedStar}
                  />
                </TouchableHighlight>
              );
            })}
          </View>
          <View style={styles.doneButtonContainer}>
            <TouchableHighlight
              style={styles.doneButton}
              underlayColor="white"
              onPress={() => {}}>
              <Text style={[styles.text,{color:'white'}]}>Done</Text>
            </TouchableHighlight>
          </View>
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
    height: 60,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
    borderBottomWidth: 1,
    borderColor: '#DDDDDD',
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

  ratingContainer: {
    height: 30,
    width: 55,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-evenly',
    backgroundColor: 'white',
    borderRadius: 20,
    position: 'absolute',
    top: 160,
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
    width: width * 0.73,
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
    color: '#ec7c0c',
    fontFamily: 'VarelaRound-Regular',
  },
  routeTextContainer: {
    width: width * 0.9,
    alignItems: 'flex-start',
    marginVertical: 16,
  },
  routeText: {
    fontSize: 17,
    color: 'black',
    fontWeight: 'bold',
    fontFamily: 'VarelaRound-Regular',
    marginLeft: 5,
  },
  textContainer: {
    flex: 0.4,
    width: width * 0.9,
    marginVertical: 20,
    alignItems: 'center',
    justifyContent: 'space-around',
  },
  boldText: {
    fontSize: 16,
    color: 'black',
    fontWeight: 'bold',
    fontFamily: 'VarelaRound-Regular',
  },
  regularText: {
    fontSize: 12,
    color: 'grey',
    fontWeight: '500',
    fontFamily: 'VarelaRound-Regular',
    textAlign: 'center',
    width: width * 0.7,
  },
  starRatingContainer: {
    flex: 0.2,
    flexDirection: 'row',
    width: width * 0.9,
    alignItems: 'flex-start',
    justifyContent: 'center',
    columnGap: 10,
  },
  doneButtonContainer: {
    flex: 0.5,
    width: width * 0.8,
    justifyContent:'center',
  },
  doneButton: {
    height: 50,
    width: '100%',
    backgroundColor: '#ec7c0c',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius:10,
  },
});
