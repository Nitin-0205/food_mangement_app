 import React, { Component, useState } from 'react';
  import { View,
    Text,
    ScrollView,
    TextInput
  } from 'react-native';  import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';

  const SetCampScreen = ()=> {
    const [Location ,setLocation] = useState("");
    
    const sendData = (data) => {
      console.log('From send Data: ',data);
      setLocation(data);
    }
    return (
        <ScrollView contentContainerStyle={{width:500,flexGrow : 1, justifyContent : 'center',backgroundColor:"red"}}>
            <View style={styles.container}>

              <GooglePlacesAutocomplete
              placeholder="Where are you?"
              minLength={2} // minimum length of text to search
              autoFocus={false}
              returnKeyType={'search'} // Can be left out for default return key https://facebook.github.io/react-native/docs/textinput.html#returnkeytype
              listViewDisplayed="auto" // true/false/undefined
              fetchDetails={true}
              enablePoweredByContainer={false}
              renderDescription={row => row.description}
              styles={{
              textInputContainer: {
                height: 50,
              },
              textInput: {
                borderRadius: 0,
                marginLeft: 0,
                marginRight: 0,
                marginTop: 0,
                height: 50,
                borderWidth: 1,
                borderColor: '#000',
              },
              predefinedPlacesDescription: {
                color: '#1faadb',
              },
              }} // custom description render
              onPress={(data, details = null) => {
              // 'details' is provided when fetchDetails = true
              sendData(data);

              }}
              getDefaultValue={() => {
              return ''; // text input default value
              }}
              query={{
              // available options: https://developers.google.com/places/web-service/autocomplete
              key: 'API_KEY',
              language: 'en', // language of the results
              }}

              currentLocation={false} // Will add a 'Current location' button at the top of the predefined places list
              currentLocationLabel="Current location"
              nearbyPlacesAPI="GooglePlacesSearch" // Which API to use: GoogleReverseGeocoding or GooglePlacesSearch
              GoogleReverseGeocodingQuery={{

              }}
              debounce={200}
              />
            </View>
        </ScrollView>
      );
    }
  
  const styles = {
    container: {
        flex: 1,
        backgroundColor: '#fff',
        // justifyContent: 'center'
    },
    textInputStyle: {
      fontSize: 16,
      paddingLeft: 8,
      paddingBottom: 3,
      paddingRight: 8,
      height: 60,
    },
  };
  const mapStateToProps = state => {
    return {
         description: state.location.locationResponse
       };
  }
  export default SetCampScreen;