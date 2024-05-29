# Cab Booking App

Welcome to the Cab Booking Application! This project is developed using React Native technology, MongoDB, Twilio API, Google Maps API, and Socket.io. It aims to provide users with a seamless experience for booking rides quickly and efficiently.
# Features
* **User Authentication**: Users authenticate using their phone numbers via the Twilio API.
* **Real-Time Location Tracking**: Both drivers and riders can track their locations in real-time.
* **Ride Booking**: Users can book rides easily with a user-friendly interface.
* **Driver-Rider Communication**: Real-time communication between drivers and riders using Socket.io.
* **Route and Navigation**: Drivers receive passenger locations, trace routes, and navigate to destinations.
* **Notifications**: Riders receive notifications when a driver accepts a ride, along with the driver's background location updates.
* **Google Maps Integration**:

   * Display maps for finding places.
   * Show direction lines between pickup and drop locations.
   * Convert addresses into location coordinates and vice versa.
   * Calculate distance and time for the journey.
# Technologies Used
* **React Native**: For building the mobile application.
* **MongoDB**: To store data about riders and drivers.
* **Twilio API**: For authenticating users via phone numbers.
* **Google Maps API**: For map integration, place finding, route display, geocoding, and distance calculation.
* **Socket.io**: For enabling real-time communication between drivers and riders.

# Installation
**Clone the repository:**
```bash
git clone https://github.com/yourusername/cab-booking-app.git
cd cab-booking-app
```
## Install dependencies:
```bash
npm install
```
## Set up environment variables:
**Create a .env file in the root directory and add the following variables:**
```bash
MONGODB_URI=your_mongodb_uri
TWILIO_ACCOUNT_SID=your_twilio_account_sid
TWILIO_AUTH_TOKEN=your_twilio_auth_token
GOOGLE_MAPS_API_KEY=your_google_maps_api_key
```
## Run the application:
```bash
npm start
```
# Usage
* **Sign Up / Log In**: Users sign up or log in using their phone numbers. A verification code is sent via SMS using Twilio API.
* **Book a Ride**: After logging in, users can enter their pickup and drop locations. The app uses Google Maps to find these locations and calculate the route.
* **Real-Time Tracking**: Once a ride is booked, users can track the driver's location in real-time.
* **Driver Interaction**: Drivers can accept rides, receive route information, and navigate to the rider's location.
# Contributing
We welcome contributions! Please fork the repository and submit pull requests.


https://github.com/Aakash7405/Cab-booking-app-using-React-native/assets/171121371/cd861068-d07d-4f62-b594-4c5224391e82


https://github.com/Aakash7405/Cab-booking-app-using-React-native/assets/171121371/c836a26a-a6d0-4b4a-b7ac-d68c7bf51205


