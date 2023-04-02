import { faBuildingNgo, faLocationCrosshairs, faUserAlt } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import React, { useEffect, useState } from 'react';
import { Dimensions, StyleSheet, Text, View } from "react-native"
// import { GooglePlacesAutocomplete } from "react-native-google-places-autocomplete"
import MapView, { Callout, Circle, Marker } from "react-native-maps"
import MapViewDirections from 'react-native-maps-directions';

const Map = ({route}) => {
    const [location, setLocation] = useState(null)
    const GOOGLE_API_KEY = "AIzaSyBPsF9meOyA8d6GtpMR6TTvF4hPaetULUs";
	const [ pin, setPin ] = React.useState({
		latitude: 19.0843,
		longitude: 72.8360
	})
	const [ region, setRegion ] = React.useState({
		latitude:19.110882808284902,
		longitude: 72.8410673,
		latitudeDelta: 0.0922,
		longitudeDelta: 0.0421
	})

    const getlocate = ()=>{
        const mapCordinates = route?.params?.params;
        console.log(mapCordinates);
        setRegion(mapCordinates.coords)

    }

    const getLocationPermission = async () => {
        let status = await Location.requestForegroundPermissionsAsync();
        // if(status !== 'granted'){
        //   // alert("Permission to access location was denied");
        //   return;
        // }
        let location = await Location.getCurrentPositionAsync({});
        setLocation(location);
        console.log(location)

        console.log("Longitude", location?.coords?.longitude)
        console.log("Latitude", location?.coords?.latitude)
      }
//     const geoCodeLocation = async ()=>{
//     let geoCodeAdd = await Location.geocodeAsync("Mumbai");
//     console.log("myAdd",geoCodeAdd);
//   }
  const ReversegeoCodeToLocation = async ()=>{
    let longLatPara = {longitude:location.coords.longitude,latitude:location.coords.latitude}
    let geoCodeAdd = await Location.reverseGeocodeAsync(longLatPara);
    console.log(geoCodeAdd);

  }
    useEffect(()=>{
        getlocate();
        // geoCodeLocation();
        getLocationPermission();
        ReversegeoCodeToLocation();

    },[])

  return (
    <View style={{ marginTop: 50, flex: 1 }}>
			{/* <GooglePlacesAutocomplete
				placeholder="Search"
				fetchDetails={true}
				GooglePlacesSearchQuery={{
					rankby: "distance"
				}}
				onPress={(data, details = null) => {
					// 'details' is provided when fetchDetails = true
					console.log(data, details)
					setRegion({
						latitude: details.geometry.location.lat,
						longitude: details.geometry.location.lng,
						latitudeDelta: 0.0922,
						longitudeDelta: 0.0421
					})
				}}
				query={{
					key: "AIzaSyBnqfjeATq2pzUDyc1lvw1a4WshlW6sRvs",
					language: "en",
					components: "country:us",
					types: "establishment",
					radius: 30000,
					location: `${region.latitude}, ${region.longitude}`
				}}
				styles={{
					container: { flex: 0, position: "absolute", width: "100%", zIndex: 1 },
					listView: { backgroundColor: "white" }
				}}
			/> */}

			<MapView
				style={styles.map}
				initialRegion={{
					latitude: 19.0843,
		            longitude: 72.8360,
					latitudeDelta: 0.0922,
					longitudeDelta: 0.0421
				}}
				provider="google"
			>
				<MapViewDirections
          origin={{latitude:pin.latitude,longitude: pin.longitude} }
          destination={{latitude:region.latitude,longitude: region.longitude} }
          apikey={GOOGLE_API_KEY} // insert your API Key here
          strokeWidth={4}
          strokeColor="#111111"
        />
				<Marker pinColor={'#474744'} coordinate={{latitude:region.latitude,longitude: region.longitude} }>
                    <FontAwesomeIcon size ={30} color ={"red"} icon ={faLocationCrosshairs}></FontAwesomeIcon>
					<Callout>
						<Text>Ameer 
						</Text>
					</Callout>
				</Marker>
				<Marker
					coordinate={pin}
					pinColor="#0a6fc2"
					// draggable={true}
					// onDragStart={(e) => {
					// 	console.log("Drag start", e.nativeEvent.coordinate)
					// }}
					// onDragEnd={(e) => {
					// 	setPin({
					// 		latitude: e.nativeEvent.coordinate.latitude,
					// 		longitude: e.nativeEvent.coordinate.longitude
			
					// 	})
					// }}
				>
                    <FontAwesomeIcon size ={30} color ={"#0a6fc2"} icon ={faBuildingNgo}></FontAwesomeIcon>

					<Callout>
						<Text>Nitin</Text>
					</Callout>
				</Marker>
				{/* <Circle center={pin} radius={1000} /> */}
			</MapView>
		</View>
  )
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: "#fff",
		alignItems: "center",
		justifyContent: "center"
	},
	map: {
		width: Dimensions.get("window").width,
		height: Dimensions.get("window").height
	}
})

export default Map