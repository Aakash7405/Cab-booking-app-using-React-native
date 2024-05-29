import React, {useState} from 'react';
import {
  Dimensions,
  Image,
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableHighlight,
  View,
} from 'react-native';
import {createDrawerNavigator} from '@react-navigation/drawer';
import {DrawerItemList} from '@react-navigation/drawer';
import Main from './Main/Main';
import Icon from 'react-native-vector-icons/Ionicons';
const Drawer = createDrawerNavigator();
const {width} = Dimensions.get('window');

function AboutScreen() {
  return (
    <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
      <Text>About Screen</Text>
    </View>
  );
}
function ContactScreen() {
  return (
    <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
      <Text>Contact Screen</Text>
    </View>
  );
}
export default function HomeScreen({navigation}) {
  const [imageUri, setImageUri] = useState("https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQhZGO1DqSS-GQZBbiZbzMFwdP_JhUWIk-r9guq7Z29ZctStIRwuU8mqNeGwW2yGWMk7Os&usqp=CAU");
  return (
    <Drawer.Navigator
      screenOptions={{
        drawerType: 'front',
        drawerPosition: 'left',
        overlayColor: 'transparent',
      }}
      drawerContent={props => {
        return (
          <SafeAreaView>
            <View style={styles.headerContainer}>
              <View style={styles.imageContainer}>
                <Image
                  source={{uri: imageUri}}
                  style={{
                    height: '100%',
                    width: '100%',
                    resizeMode: 'cover',
                    borderRadius: 40,
                  }}
                />
              </View>
              <View style={styles.textContainer}>
                <Text
                  style={{
                    fontSize: 17,
                    color: 'black',
                    fontWeight: 'bold',
                    fontFamily: 'VarelaRound-Regular',
                  }}>
                  John Wick
                </Text>
                <Text
                  style={{
                    textAlign: 'center',
                    fontSize: 12,
                    color: 'black',
                    fontFamily: 'VarelaRound-Regular',
                  }}>
                  View Profile
                </Text>
              </View>
              <TouchableHighlight
                style={styles.iconContainer}
                underlayColor="#DDDDDD"
                onPress={() =>
                  navigation.navigate('Profile', {
                    onGoBack: data => setImageUri(data),
                    
                  })
                }>
                <Icon name="arrow-forward" size={22} color="black" />
              </TouchableHighlight>
            </View>
            <DrawerItemList {...props} />
          </SafeAreaView>
        );
      }}>
      <Drawer.Screen
        name="Home"
        component={Main}
        options={{
          headerShown: false,
          drawerIcon: () => {
            return <Icon name="home" size={20} color="#ec7c0c" />;
          },
          drawerLabel: 'Home',
          drawerLabelStyle: {
            fontSize: 15,
            fontWeight: '600',
            color: 'black',
            fontFamily: 'VarelaRound-Regular',
          },
          drawerActiveBackgroundColor: '#FFEDE6',
        }}
      />
      <Drawer.Screen
        name="My Trips"
        component={AboutScreen}
        options={{
          drawerIcon: () => {
            return <Icon name="time" size={20} color="#ec7c0c" />;
          },
          drawerLabel: 'My Trips',
          drawerLabelStyle: {
            fontSize: 15,
            fontWeight: '600',
            color: 'black',
            fontFamily: 'VarelaRound-Regular',
          },
          drawerActiveBackgroundColor: '#FFEDE6',
        }}
      />
      <Drawer.Screen
        name="Payments"
        component={AboutScreen}
        options={{
          drawerIcon: () => {
            return <Icon name="card" size={20} color="#ec7c0c" />;
          },
          drawerLabel: 'Payments',
          drawerLabelStyle: {
            fontSize: 15,
            fontWeight: '600',
            color: 'black',
            fontFamily: 'VarelaRound-Regular',
          },
          drawerActiveBackgroundColor: '#FFEDE6',
        }}
      />
      <Drawer.Screen
        name="Refer and Earn"
        component={AboutScreen}
        options={{
          drawerIcon: () => {
            return <Icon name="cash" size={20} color="#ec7c0c" />;
          },
          drawerLabel: 'Refer and Earn',
          drawerLabelStyle: {
            fontSize: 15,
            fontWeight: '600',
            color: 'black',
            fontFamily: 'VarelaRound-Regular',
          },
          drawerActiveBackgroundColor: '#FFEDE6',
        }}
      />
      <Drawer.Screen
        name="Coupons"
        component={AboutScreen}
        options={{
          drawerIcon: () => {
            return <Icon name="pricetags" size={20} color="#ec7c0c" />;
          },
          drawerLabel: 'Coupons',
          drawerLabelStyle: {
            fontSize: 15,
            fontWeight: '600',
            color: 'black',
            fontFamily: 'VarelaRound-Regular',
          },
          drawerActiveBackgroundColor: '#FFEDE6',
        }}
      />
      <Drawer.Screen
        name="Setting"
        component={AboutScreen}
        options={{
          drawerIcon: () => {
            return <Icon name="settings" size={20} color="#ec7c0c" />;
          },
          drawerLabel: 'Setting',
          drawerLabelStyle: {
            fontSize: 15,
            fontWeight: '600',
            color: 'black',
            fontFamily: 'VarelaRound-Regular',
          },
          drawerActiveBackgroundColor: '#FFEDE6',
        }}
      />
      <Drawer.Screen
        name="Help"
        component={AboutScreen}
        options={{
          drawerIcon: () => {
            return (
              <Icon name="help-circle-outline" size={20} color="#ec7c0c" />
            );
          },
          drawerLabel: 'Help',
          drawerLabelStyle: {
            fontSize: 15,
            fontWeight: '600',
            color: 'black',
            fontFamily: 'VarelaRound-Regular',
          },
          drawerActiveBackgroundColor: '#FFEDE6',
        }}
      />
      <Drawer.Screen
        name="Log out"
        component={AboutScreen}
        options={{
          drawerIcon: () => {
            return <Icon name="log-out" size={20} color="#ec7c0c" />;
          },
          drawerLabel: 'Log out',
          drawerLabelStyle: {
            fontSize: 15,
            fontWeight: '600',
            color: 'black',
            fontFamily: 'VarelaRound-Regular',
          },
          drawerActiveBackgroundColor: '#FFEDE6',
        }}
      />
    </Drawer.Navigator>
  );
}

const styles = StyleSheet.create({
  headerContainer: {
    height: 100,
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',

    paddingHorizontal: 10,
    backgroundColor: 'white',
    marginTop: 10,
  },
  imageContainer: {
    height: 70,
    width: 70,
    // borderWidth: 1,
    borderRadius: 40,
  },
  textContainer: {
    height: 70,
    justifyContent: 'center',
  },
  iconContainer: {
    borderRadius: 10,
    justifyContent: 'center',
  },
});
