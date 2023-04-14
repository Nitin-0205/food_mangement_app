import React from 'react';
import { Text, View, Image } from 'react-native';
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';

const GOOGLE_PLACES_API_KEY = 'AIzaSyBPsF9meOyA8d6GtpMR6TTvF4hPaetULUs';

const GooglePlacesInput = () => {
  return (
    <GooglePlacesAutocomplete
      query={{
        key: GOOGLE_PLACES_API_KEY,
        language: 'en', // language of the results
      }}
      onPress={(data, details) => console.log(data, details)}
      textInputProps={{
        leftIcon: { type: 'font-awesome', name: 'chevron-left' },
        errorStyle: { color: 'red' },
      }}
      styles={{
        container: { flex: 0, position: "absolute", left: 3, right: 3, top: 3, zIndex: 1, margin: 5 }}
    }
    />
  );
};

export default GooglePlacesInput;