import React, {useState, useRef, useEffect} from 'react';
import {
  StyleSheet,
  View,
  TouchableHighlight,
  Dimensions,
  Text,
  Image,
  Pressable,
  Keyboard,
  TouchableOpacity,
} from 'react-native';
import {GooglePlacesAutocomplete} from 'react-native-google-places-autocomplete';

import Icon from 'react-native-vector-icons/Ionicons';

const {height, width} = Dimensions.get('window');
export default function PickupAndDrop({navigation, route}) {
  const [text, setText] = useState(route?.params?.text);
  const [origin, setOrigin] = useState(null);
  const [destination, setDestination] = useState(null);
  const [pickup, setPickup] = useState('');
  const [drop, setDrop] = useState('');
  useEffect(() => {
    text === 'Drop' ? dropfocus.current.focus() : pickupfocus.current.focus();
  }, [text]);
  const pickupfocus = useRef(null);
  const dropfocus = useRef(null);
  const handleBackPress = () => {
    return navigation.goBack();
  };
  const passLocation = () => {
    return navigation.navigate('cabSelection', {
      origin: origin,
      destination: destination,
    });
  };

  return (
    <Pressable style={styles.mainContainer} onPress={() => Keyboard.dismiss()}>
      <View style={styles.goBackIconContainer}>
        <TouchableHighlight
          underlayColor="white"
          style={{backgroundColor: 'white', marginLeft: 18}}
          onPress={handleBackPress}>
          <Icon name="arrow-back-outline" size={27} color="black" />
        </TouchableHighlight>
        <Text style={styles.PickupAndDropText}>{text}</Text>
      </View>
      <View style={styles.PickupAndDropContainer}>
        <View style={styles.PickupAndDropInputContainer}>
          <View style={styles.pickupContainer}>
            <GooglePlacesAutocomplete
              ref={pickupfocus}
              // currentLocation={true}
              // currentLocationLabel="current location"
              placeholder="pickup location"
              onPress={(data, details = null) => {
                setOrigin({
                  location: details.geometry.location,
                  description: data.description,
                });
                console.log(details.geometry.location)
              }}
              debounce={400}
              fetchDetails={true}
              query={{
                key: 'AIzaSyDa1Gcp9Mu54Rq_DG8Lqk6nmEznPjgz4js',
                language: 'en',
                components: 'country:in',
              }}
              styles={{
                listView: {
                  position: 'absolute',
                  left: 0,
                  top: 195,
                  width: width * 0.9,
                },
                row: {
                  padding: 0,
                  paddingTop: 10,
                  height: 40,
                },
                description: {
                  color: 'black',
                  fontWeight: 'bold',
                  fontFamily: 'VarelaRound-Regular',
                },
                textInput: {
                  borderWidth: 1,
                  height: 35,
                },
                textInputContainer: {
                  width: width * 0.73,
                },
              }}
            />
            {/* android:value="AIzaSyBp10t_QUXoiFxwoyWGr8ROX40u-M28yXc" */}
            {pickup !== '' ? (
              <TouchableHighlight
                underlayColor="#DDDDDD"
                onPress={() => setPickup('')}
                style={styles.crossIconContainer}>
                <Icon name="close-circle-outline" size={20} color="black" />
              </TouchableHighlight>
            ) : null}
          </View>

          <View style={styles.dropContainer}>
            <GooglePlacesAutocomplete
              ref={dropfocus}
              placeholder="drop location"
              onPress={(data, details = null) => {
                // 'details' is provided when fetchDetails = true
                setDestination({
                  location: details.geometry.location,
                  description: data.description,
                });
              }}
              fetchDetails={true}
              returnKeyType={'Search'}
              query={{
                key: 'AIzaSyDa1Gcp9Mu54Rq_DG8Lqk6nmEznPjgz4js',
                language: 'en',
                components: 'country:in',
              }}
              debounce={400}
              styles={{
                listView: {
                  position: 'absolute',
                  left: 0,
                  top: 160,
                  width: width * 0.9,
                },
                row: {
                  padding: 0,
                  paddingTop: 10,
                  height: 40,
                },
                description: {
                  color: 'black',
                  fontWeight: 'bold',
                  fontFamily: 'VarelaRound-Regular',
                },
                textInput: {
                  borderWidth: 1,
                  height: 35,
                },
                textInputContainer: {
                  width: width * 0.73,
                },
              }}
            />
            {drop !== '' ? (
              <TouchableHighlight
                underlayColor="#DDDDDD"
                onPress={() => setDrop('')}
                style={styles.crossIconContainer}>
                <Icon name="close-circle-outline" size={20} color="black" />
              </TouchableHighlight>
            ) : null}
          </View>
        </View>
        <View style={styles.imageContainer}>
          <Image
            source={require('../DriveEaseImage/frame1.jpg')}
            style={styles.image}
          />
        </View>
      </View>
      <View style={styles.addlocationContainer}>
        <View
          style={{
            flexDirection: 'column',
            width: width * 0.4,
            height: 85,
            justifyContent: 'space-around',
          }}>
          <View style={styles.addIconContainer}>
            <TouchableHighlight
              style={styles.IconContainer}
              underlayColor="white"
              onPress={() => {}}>
              <Icon name="home" size={15} style={styles.icon} color="white" />
            </TouchableHighlight>
            <Text style={styles.text}>Add Home</Text>
          </View>
          <View style={styles.addIconContainer}>
            <TouchableHighlight
              style={styles.IconContainer}
              underlayColor="white"
              onPress={() => {}}>
              <Icon
                name="briefcase"
                size={15}
                style={styles.icon}
                color="white"
              />
            </TouchableHighlight>
            <Text style={styles.text}>Add Work</Text>
          </View>
        </View>
        <TouchableOpacity
          style={styles.getRideButton}
          underlayColor="white"
          onPress={passLocation}>
          <Text style={styles.getRideText}>Get Ride</Text>
        </TouchableOpacity>
      </View>

      {/* <View style={styles.recentContainer}>
        <View style={styles.recentPlacesContainer}>
          <Icon name="time" size={22} color="#ec7c0c" style={styles.timeIcon} />
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
          <Icon name="time" size={22} color="#ec7c0c" style={styles.timeIcon} />
          <View style={styles.placeContainer}>
            <Text style={styles.placeName} numberOfLines={1}>
              JSS Academy of Technical Education
            </Text>
            <Text style={styles.placeAddress} numberOfLines={1}>
              C-20/1,C Block,Phase 2,Industrial Area,Sector-62,Noida
            </Text>
          </View>
        </View> 
          </View>*/}
    </Pressable>
  );
}

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: 'white',
  },
  goBackIconContainer: {
    height: 40,
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    width: width,
    marginTop: 20,
  },
  PickupAndDropText: {
    fontSize: 18,
    color: 'black',
    fontWeight: 'bold',
    fontFamily: 'VarelaRound-Regular',
    marginLeft: 10,
  },
  PickupAndDropContainer: {
    width: width * 0.9,
    height: 100,
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 20,
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
    marginLeft: 9,
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
    width: width * 0.65,
    fontSize: 15,
    color: 'black',
    fontWeight: '600',
    fontFamily: 'VarelaRound-Regular',
  },
  drop: {
    // borderWidth: 1,
    width: width * 0.65,
    fontSize: 15,
    fontWeight: '600',
    color: 'black',
    fontFamily: 'VarelaRound-Regular',
  },
  crossIconContainer: {
    borderRadius: 20,
  },
  addlocationContainer: {
    height: 80,
    width: width * 0.9,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  addIconContainer: {
    flex: 0.4,
    flexDirection: 'row',
    alignItems: 'center',
    marginLeft: 5,
  },
  IconContainer: {
    height: 25,
    width: 25,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 20,
    backgroundColor: '#ec7c0c',
  },
  text: {
    fontSize: 15,
    fontWeight: '600',
    color: 'black',
    fontFamily: 'VarelaRound-Regular',
    marginLeft: 15,
  },
  recentTextContainer: {
    width: width * 0.9,
    alignItems: 'flex-start',
    marginTop: 7,
  },
  recentText: {
    fontSize: 17,
    color: 'grey',
    fontWeight: '700',
    fontFamily: 'VarelaRound-Regular',
    marginLeft: 5,
  },
  recentContainer: {
    width: width,
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  recentPlacesContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#DDDDDD',
    marginTop: 5,
    width: width * 0.8,
    height: 50,
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
  getRideButton: {
    height: 50,
    width: width * 0.4,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 50,
    backgroundColor: '#ec7c0c',
    marginHorizontal: 10,
  },
  getRideText: {
    fontSize: 15,
    color: 'white',
    fontWeight: 'bold',
    fontFamily: 'VarelaRound-Regular',
  },
});
