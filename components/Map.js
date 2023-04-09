import { faBuildingNgo, faHotel, faLocationCrosshairs, faUserAlt } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import React, { useEffect, useState, useRef } from 'react';
import { Dimensions, StyleSheet, Text, View } from "react-native"
import { GooglePlacesAutocomplete } from "react-native-google-places-autocomplete"
import MapView, { Callout, Circle, Marker } from "react-native-maps"
import MapViewDirections from 'react-native-maps-directions';
import AsyncStorage from '@react-native-async-storage/async-storage';
import GooglePlacesInput from './GooglePlacesInput'
import * as Location from 'expo-location';

const Map = ({ route }) => {
	const [location, setLocation] = useState(null)
	const GOOGLE_API_KEY = "AIzaSyBPsF9meOyA8d6GtpMR6TTvF4hPaetULUs";
	const mapRef = useRef()
	const [dropLocation, setdropLocation] = useState({
		latitude: 19.443,
		longitude: 72.8360
	})
	const [pickUpLocation, setpickUpLocation] = useState({
		latitude: 19.110882808284902,
		longitude: 72.8410673,
		latitudeDelta: 0.0922,
		longitudeDelta: 0.0421
	})

	const geoCodeLocation = async (locate) => {
		// let geoCodeAdd = await Location.geocodeAsync(`${locate.address}`);
		setdropLocation({latitude:locate.address.geometry.location.lat,longitude:locate.address.geometry.location.lng})
		// console.log(locate.address.geometry.location)
	}

	const getPicklocate = () => {
		const mapCordinates = route?.params?.params;
		console.log(mapCordinates);
		setpickUpLocation(mapCordinates.coords)
	}
	const getData = async () => {
		try {
			await AsyncStorage.getItem("UserLoginCredentials")
				.then(value => {
					if (value != null) {
						var datavalue = JSON.parse(value);
						console.log("Credential",value)
						geoCodeLocation(datavalue)
					}
				})
		} catch (err) {
			console.log(err);
		}
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
		setdropLocation(location?.coords)

	}



	//   const ReversegeoCodeToLocation = async ()=>{
	//     let longLatPara = {longitude:location.coords.longitude,latitude:location.coords.latitude}
	//     let geoCodeAdd = await Location.reverseGeocodeAsync(longLatPara);
	//     console.log(geoCodeAdd);
	//   }

	useEffect(() => {
		getPicklocate();
		getData();
		// getLocationPermission();
		// geoCodeLocation();
		// ReversegeoCodeToLocation();

	}, [])

	return (
		<View style={{ marginTop: 30, flex: 1 }}>
			
			<GooglePlacesAutocomplete
			          enablePoweredByContainer ={false}

			placeholder="Search"
			// currentLocation={true}
			fetchDetails={true}
				query={{
					key: GOOGLE_API_KEY,
					language: 'en', 
					components: "country:in",

				}}
				onPress={(data, details = null) => {
					console.log(data, details)
					setpickUpLocation({
						latitude: details.geometry.location.lat,
						longitude: details.geometry.location.lng,
						latitudeDelta: 0.0922,
						longitudeDelta: 0.0421
					})
				}}
				textInputProps={{
					leftIcon: { type: 'font-awesome', name: 'chevron-left' },
					errorStyle: { color: 'red' },
				}}
				styles={{
					container: { flex: 0, position: "absolute", left: 3, right: 3, top: 3, zIndex: 1, margin: 5 }
				}
				}
			/>


			<MapView
				style={styles.map}
				ref={mapRef}
				initialRegion={{
					latitude: dropLocation.latitude,
					longitude: dropLocation.longitude,
					latitudeDelta: 0.0922,
					longitudeDelta: 0.0421
				}}
			>
				<MapViewDirections
					origin={{ latitude: dropLocation.latitude, longitude: dropLocation.longitude }}
					destination={{ latitude: pickUpLocation.latitude, longitude: pickUpLocation.longitude }}
					apikey={GOOGLE_API_KEY}
					strokeWidth={3}
					strokeColor="red"
					optimizeWaypoints={true}
					onReady={result => {
						mapRef.current.fitToCoordinates(result.coordinates, {
							edgePadding: {
								right: 30,
								left: 30,
								top: 100,
								bottom: 100,
							}
						})
					}}
				/>
				<Marker dropLocationColor={'#474744'} coordinate={{ latitude: pickUpLocation.latitude, longitude: pickUpLocation.longitude }}>
					<FontAwesomeIcon size={28} color={"#00cc66"} icon={faHotel}></FontAwesomeIcon>
					<Callout>
						<Text>
							Rahul
						</Text>
					</Callout>
				</Marker>
				<Marker
					coordinate={dropLocation}
					dropLocationColor="#0a6fc2"
				// draggable={true}
				// onDragStart={(e) => {
				// 	console.log("Drag start", e.nativeEvent.coordinate)
				// }}
				// onDragEnd={(e) => {
				// 	setdropLocation({
				// 		latitude: e.nativeEvent.coordinate.latitude,
				// 		longitude: e.nativeEvent.coordinate.longitude

				// 	})
				// }}
				>
					<FontAwesomeIcon size={30} color={"#0a6fc2"} icon={faBuildingNgo}></FontAwesomeIcon>

					<Callout>
						<Text>Nitin</Text>
					</Callout>
				</Marker>
				{/* <Circle center={dropLocation} radius={1000} /> */}
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