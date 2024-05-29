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
import MapView, {Marker} from 'react-native-maps';
import Icon from 'react-native-vector-icons/Ionicons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import MapViewDirections from 'react-native-maps-directions';

const {width} = Dimensions.get('window');
const Google_Api = 'AIzaSyDKDL99yjBqpsexUeDEggOmIK4uqJ9D1aM';

export default function HomeScreen({navigation, route}) {
  const [origin,setOrigin]=useState(route?.params.origin);
  const [driverLocation,setDestination]=useState(route?.params.driverLocation);
  const mapRef=useRef(null);

  useEffect(()=>{
    setTimeout(()=>{
     return mapRef?.current?.fitToSuppliedMarkers(['origin','destination'],{
      edgePadding:{top: 100, bottom: 50, right: 100, left: 50},
     })
    },2000);
  },[]);
  return (
    <>
      <View style={styles.mainContainer}>
        <View style={styles.mapContainer}>
          <MapView
           ref={mapRef}
            style={styles.map}
            //specify our coordinates.

            initialRegion={{
              latitude: route?.params.origin.latitude || 37.041218,
              longitude: route?.params.origin.longitude || -95.63932,
              latitudeDelta: 0.0922,
              longitudeDelta: 0.0421,
            }}>
            {origin && driverLocation && (
            <MapViewDirections
              origin={origin.description}
              destination={driverLocation.description}
              apikey={Google_Api}
              strokeWidth={3}
              strokeColor="black"
            />
          )}
          {origin && (
            <Marker
              coordinate={{
                latitude: origin.latitude,
                longitude: origin.longitude,
              }}
              title={'Pickup Location'}
              description={origin.description}
              identifier="origin">
              <Icon name="pin-sharp" size={35} color="red" />
            </Marker>
          )}
          {driverLocation && (
            <Marker
              coordinate={{
                latitude:driverLocation.latitude,
                longitude:driverLocation.longitude,
              }}
              title={'Drop Location'}
              description={driverLocation.description}
              identifier="destination">
              {/* <FontAwesome name="pin-sharp" size={35} color="red" /> */}
              <Image source={require('../DriveEaseImage/carMarker.png')} style={styles.carMarker}/>
            </Marker>
          )}
          </MapView>
         <TouchableHighlight style={styles.topContainer} onPress={()=>{}} underlayColor='grey'>
            <Text style={{color:'white',fontSize:15,fontWeight:'bold',fontFamily:'VarelaRound-Regular'}}>Navigate To User</Text>
          </TouchableHighlight>
        </View>
      </View>
    </>
  );
}
const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    padding: 24,
    alignItems: 'center',
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
  topContainer: {
    position: 'absolute',
    left: 20,
    bottom: 40,
    height: 50,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
    width: width * 0.9,
    borderRadius: 50,
    shadowColor: 'black',
    backgroundColor: '#ec7c0c',
    elevation: 3,
  },
  carMarker:{
    height:80,
    width:80,
    transform:[{rotate:'0deg'}]
  }
});
