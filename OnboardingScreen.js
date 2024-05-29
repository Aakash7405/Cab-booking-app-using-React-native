import React from 'react';
import {
  View,
  Image,
  Text,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
} from 'react-native';
import Onboarding from 'react-native-onboarding-swiper';
import {setItem} from './asyncStorage/Async';

const {height, width} = Dimensions.get('window');
const styles = StyleSheet.create({
  main: {
    flex: 1,
    backgroundColor: 'white',
  },
  done: {
    marginRight: 20,
    backgroundColor: '#ec7c0c',
    padding: 8,
    paddingHorizontal: 18,
    borderRadius: 20,
  },
  doneText: {
    fontWeight: 'bold',
    fontSize: 15,
    color: 'white',
  },
  title: {
    fontSize: 22,
    fontWeight: '600',
    fontFamily: 'VarelaRound-Regular',
  },
  subTitle: {
    fontSize: 13,
    fontFamily: 'VarelaRound-Regular',
  },
  nextButton: {
    fontSize: 10,
    fontWeight: 'bold',
  },
});

export default function OnboardingScreen({navigation}) {
  function DoneButton() {
    return (
      <TouchableOpacity style={styles.done} onPress={HandleDone}>
        <Text style={styles.doneText}>Done</Text>
      </TouchableOpacity>
    );
  }
  function HandleDone() {
    navigation.navigate('Phone');
    setItem('onboarding', '1');
  }
  return (
    <View style={styles.main}>
      <Onboarding
        onSkip={HandleDone}
        bottomBarHighlight={true}
        containerStyles={{paddingHorizontal: 20}}
        DoneButtonComponent={DoneButton}
        titleStyles={styles.title}
        subTitleStyles={styles.subTitle}
        pages={[
          {
            backgroundColor: '#fff',
            image: (
              <Image
                source={require('./DriveEaseImage/image11.jpg')}
                resizeMode="contain"
                style={{width: width, height: height * 0.3}}
              />
            ),
            title: 'Easy Booking',
            subtitle:
              'This app provides you to the feature to which you can easily book you cab',
          },
          {
            backgroundColor: '#fff',
            image: (
              <Image
                source={require('./DriveEaseImage/image5.jpg')}
                resizeMode="contain"
                style={{width: width, height: 250}}
              />
            ),
            title: 'Pooling Feature',
            subtitle:
              'You can simply share your ride with others and save cost',
          },
          {
            backgroundColor: '#fff',
            image: (
              <Image
                source={require('./DriveEaseImage/image7.jpg')}
                resizeMode="contain"
                style={{width: width, height: 250}}
              />
            ),
            title: 'Rental Services',
            subtitle: 'you can simply rent your cars and earn money',
          },
        ]}
      />
    </View>
  );
}
