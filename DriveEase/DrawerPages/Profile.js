import {BottomSheetModalProvider, BottomSheetModal} from '@gorhom/bottom-sheet';
import React, {useMemo, useCallback, useRef, useState, useEffect} from 'react';
import {
  StyleSheet,
  View,
  TouchableHighlight,
  Dimensions,
  Text,
  Image,
  TextInput,
  TouchableOpacity,
  Pressable,
  Alert,
} from 'react-native';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import {launchImageLibrary, launchCamera} from 'react-native-image-picker';
import Icon from 'react-native-vector-icons/Ionicons';
import {setItem, getItem} from '../asyncStorage/Async';
const {width, height} = Dimensions.get('window');
export default function Profile({navigation, route}) {
  const [imageUri, setImageUri] = useState(null);
  const [isSelected, setSelected] = useState('Male');
  const [isOpen, setOpen] = useState(false);
  const bottomsheetref = useRef(null);
  const snapPoint = useMemo(() => ['35%'], []);
  const snapPoint2 = useMemo(() => ['20%'], []);
  const [phone, setPhone] = useState(null);
  const [name, setName] = useState(null);

  const bottomsheetref2 = useRef(null);

  const handleModal = useCallback(() => {
    return bottomsheetref?.current.present();
  }, []);
  useEffect(() => {
    const fun = async () => {
      const userName = await getItem('name');
      const number = await getItem('phone');
      // setPhone(number.toString());
      if (userName && number) {
        console.log(number);
        setName(userName);
        setPhone(number);
      }
    };
    fun();
  }, []);
  const handleImagePickerICon = () => {
    bottomsheetref2?.current.present();
    setOpen(true);
  };
  const handleBackPress = () => {
    const img =
      imageUri != null
        ? imageUri
        : 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQhZGO1DqSS-GQZBbiZbzMFwdP_JhUWIk-r9guq7Z29ZctStIRwuU8mqNeGwW2yGWMk7Os&usqp=CAU';
    route.params.onGoBack(img);
    navigation.goBack();
  };
  const handleRadioPress = gender => {
    return setSelected(gender);
  };
  const handlePress = () => {
    bottomsheetref2?.current.dismiss();
    setOpen(false);
  };

  const openImagePicker = () => {
    const options = {
      mediaType: 'photo',
      includeBase64: false,
    };
    launchImageLibrary(options, handleResponse);
  };

  const handleResponse = response => {
    if (response.didCancel) {
      console.log('user cancelled imagePicker');
    } else if (response.error) {
      console.log('error', response.error);
    } else {
      let uri = response.uri || response.assets?.[0]?.uri;
      console.log(uri);
      setImageUri(uri);
    }
  };
  const handleCameraLaunch = () => {
    const options = {
      mediaType: 'photo',
      includeBase64: false,
    };

    launchCamera(options, handleResponse);
  };
  const handleSaveProfile = async () => {
    await setItem('name', name);
    await setItem('phone', phone);
    Alert.alert('Save Changes Successfully')
  };
  return (
    <KeyboardAwareScrollView style={styles.mainContainer}>
      <BottomSheetModalProvider>
        <View style={styles.goBackIconContainer}>
          <TouchableHighlight
            underlayColor="white"
            style={{backgroundColor: 'white', marginLeft: 18}}
            onPress={handleBackPress}>
            <Icon name="arrow-back-outline" size={27} color="black" />
          </TouchableHighlight>
        </View>
        <View style={styles.profileTextContainer}>
          <Text style={styles.profileText}> Your Profile</Text>
        </View>
        <View style={{width: width, flex: 0.5, alignItems: 'center'}}>
          <View style={styles.imageContainer}>
            <Image
              source={{
                uri:
                  imageUri ||
                  'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQhZGO1DqSS-GQZBbiZbzMFwdP_JhUWIk-r9guq7Z29ZctStIRwuU8mqNeGwW2yGWMk7Os&usqp=CAU',
              }}
              style={styles.image}
            />
          </View>
        </View>
        <BottomSheetModal
          ref={bottomsheetref2}
          index={0}
          snapPoints={snapPoint2}
          style={styles.modalStyle}
          enablePanDownToClose={true}>
          <View style={styles.imagePickerModalContainer}>
            <View style={styles.imagePickerIconContainer}>
              <TouchableHighlight
                style={styles.imagePickerIcon}
                underlayColor="white"
                onPress={openImagePicker}>
                <Icon name="images" size={30} color="white" />
              </TouchableHighlight>
              <Text style={styles.text}>Photos</Text>
            </View>
            <View style={styles.imagePickerIconContainer}>
              <TouchableHighlight
                style={styles.imagePickerIcon}
                underlayColor="white"
                onPress={handleCameraLaunch}>
                <Icon name="camera" size={30} color="white" />
              </TouchableHighlight>
              <Text style={styles.text}>Camera</Text>
            </View>
          </View>
        </BottomSheetModal>
        <TouchableHighlight
          style={styles.iconContainer}
          underlayColor="white"
          onPress={handleImagePickerICon}>
          <Icon name="create" size={20} color="white" />
        </TouchableHighlight>
        <View style={styles.profileInputContainer}>
          <View style={styles.textContainer}>
            <Text style={styles.text}>Name</Text>
            <View style={styles.inputContainer}>
              <TextInput
                placeholder="Your Name"
                value={name}
                onChangeText={text => setName(text)}
              />
            </View>
          </View>
          <View style={styles.textContainer}>
            <Text style={styles.text}>Phone Number</Text>

            <View style={styles.phoneinputContainer}>
              <Image
                source={require('../DriveEaseImage/flag.png')}
                style={styles.flagImage}
              />
              <Text style={styles.numberText}>+91</Text>
              <TextInput
                style={styles.input}
                value={phone}
                placeholder="123 456 7890"
                keyboardType="numeric"
                onChangeText={t => setPhone(t)}
              />
            </View>
          </View>
          <View style={styles.textContainer}>
            <Text style={styles.text}>Gender</Text>
            <TouchableOpacity
              underlayColor="white"
              style={[
                styles.inputContainer,
                {
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  paddingHorizontal: 15,
                  paddingVertical: 14,
                },
              ]}
              onPress={handleModal}>
              <Text style={styles.text}>{isSelected}</Text>
              <Icon name="play" size={20} color="black" />
            </TouchableOpacity>
            <BottomSheetModal
              ref={bottomsheetref}
              index={0}
              snapPoints={snapPoint}>
              <View style={styles.modalContainer}>
                <View style={styles.genderTextContainer}>
                  <Text style={[styles.text, {fontSize: 18}]}>Gender</Text>
                </View>
                <View style={styles.genderContainer}>
                  <Text style={styles.text}>Male</Text>
                  <TouchableHighlight
                    style={styles.radioButtonContainer}
                    underlayColor="#DDDDDD"
                    onPress={() => handleRadioPress('Male')}>
                    {isSelected === 'Male' ? (
                      <Icon name="radio-button-on" size={22} color="#ec7c0c" />
                    ) : (
                      <Icon name="radio-button-off" size={22} color="grey" />
                    )}
                  </TouchableHighlight>
                </View>
                <View style={[styles.genderContainer, {borderBottomWidth: 0}]}>
                  <Text style={styles.text}>Female</Text>
                  <TouchableHighlight
                    style={styles.radioButtonContainer}
                    underlayColor="#DDDDDD"
                    onPress={() => handleRadioPress('Female')}>
                    {isSelected === 'Female' ? (
                      <Icon name="radio-button-on" size={22} color="#ec7c0c" />
                    ) : (
                      <Icon name="radio-button-off" size={22} color="grey" />
                    )}
                  </TouchableHighlight>
                </View>
                <TouchableOpacity
                  style={styles.ProfileButton}
                  underlayColor="white"
                  onPress={() => {
                    bottomsheetref?.current.dismiss();
                  }}>
                  <Text style={styles.ProfileText}>Save Changes</Text>
                </TouchableOpacity>
              </View>
            </BottomSheetModal>
          </View>

          <TouchableOpacity
            style={styles.ProfileButton}
            underlayColor="white"
            onPress={handleSaveProfile}>
            <Text style={styles.ProfileText}>Complete</Text>
          </TouchableOpacity>
        </View>
        {isOpen === true ? (
          <Pressable
            style={styles.backgroundBottomSheet}
            onPress={handlePress}></Pressable>
        ) : null}
      </BottomSheetModalProvider>
    </KeyboardAwareScrollView>
  );
}

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
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
  profileTextContainer: {
    flex: 0.1,
    width: width,
    alignItems: 'center',
    justifyContent: 'center',
  },
  profileText: {
    fontSize: 22,
    color: 'black',
    fontWeight: 'bold',
    fontFamily: 'VarelaRound-Regular',
  },
  imageContainer: {
    height: 110,
    width: 110,
    marginVertical: 20,
    borderRadius: 55,
  },
  image: {
    height: '100%',
    width: '100%',
    resizeMode: 'cover',
    borderRadius: 55,
  },
  iconContainer: {
    height: 30,
    width: 30,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#ec7c0c',
    borderRadius: 15,
    position: 'absolute',
    top: 200,
    left: 200,
  },
  profileInputContainer: {
    height: height * 0.6,
    width: width,
    alignItems: 'center',
    justifyContent: 'space-evenly',
  },
  textContainer: {
    width: width * 0.9,
  },
  text: {
    fontSize: 15,
    color: 'black',
    fontWeight: 'bold',
    fontFamily: 'VarelaRound-Regular',
  },
  inputContainer: {
    width: '100%',
    borderWidth: 1,
    borderRadius: 10,
    borderColor: 'grey',
    paddingHorizontal: 10,
    marginVertical: 10,
  },
  phoneinputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: 'grey',
    borderRadius: 10,
    marginVertical: 10,
  },
  input: {
    height: height * 0.07,
    width: width * 0.7,
    color: 'black',
  },
  flagImage: {
    height: 20,
    width: 20,
    margin: 5,
    backgroundColor: 'white',
  },
  numberText: {
    color: 'black',
    fontWeight: 'bold',
    marginRight: 5,
  },
  ProfileButton: {
    height: 50,
    width: width * 0.9,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
    backgroundColor: '#ec7c0c',
    marginTop: 10,
  },
  ProfileText: {
    fontSize: 15,
    color: 'white',
    fontWeight: 'bold',
    fontFamily: 'VarelaRound-Regular',
  },
  modalContainer: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: 'white',
  },
  genderTextContainer: {
    width: width * 0.9,
    paddingHorizontal: 10,
  },
  genderContainer: {
    flex: 0.5,
    borderBottomWidth: 1,
    borderColor: 'grey',
    width: width * 0.9,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 10,
  },
  radioButtonContainer: {
    borderRadius: 15,
  },
  imagePickerModalContainer: {
    flex: 1,
    width: width,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  imagePickerIcon: {
    height: 50,
    width: 50,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#ec7c0c',
    borderRadius: 30,
    shadowColor: 'black',
    elevation: 5,
    zIndex: 100,

    marginHorizontal: 20,
    marginVertical: 5,
  },
  backgroundBottomSheet: {
    height: height,
    width: width,
    backgroundColor: 'rgba(0,0,0,0.4)',
    position: 'absolute',
  },
  imagePickerIconContainer: {
    alignItems: 'center',
  },
});
