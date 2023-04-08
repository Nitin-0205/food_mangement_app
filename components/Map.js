import {faBuildingNgo,faClock,faDirections,faFlag,faHotel,faMapMarkerAlt,} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import React, { useEffect, useState, useRef } from "react";
import { Dimensions, StyleSheet, Text, View } from "react-native";
import { GooglePlacesAutocomplete } from "react-native-google-places-autocomplete";
import MapView, { Callout, Circle, Marker } from "react-native-maps";
import MapViewDirections from "react-native-maps-directions";
import AsyncStorage from "@react-native-async-storage/async-storage";
import * as Location from "expo-location";

const Map = ({ route }) => {
	const [location, setLocation] = useState(null);
	const [mapDistTime, setMapDisTime] = useState({
		distance: "0.0",
		duration: "0.0",
		pickAddress: "Loading...",
		dropAddress: "Loading...",
	});
	const GOOGLE_API_KEY = "AIzaSyBPsF9meOyA8d6GtpMR6TTvF4hPaetULUs";
	const mapRef = useRef();
	const [dropLocation, setdropLocation] = useState({
		latitude: 19.443,
		longitude: 72.936,
	});
	const [pickUpLocation, setpickUpLocation] = useState({
		latitude: 19.110882808284902,
		longitude: 72.810673,
		latitudeDelta: 0.0922,
		longitudeDelta: 0.0421,
	});

	const geoCodeLocation = async (locate) => {
		let geoCodeAdd = await Location.geocodeAsync(
			`${locate.address}` + " " + `${locate.city}`
		);
		setdropLocation(geoCodeAdd[0]);
		console.log("myAdd", geoCodeAdd);
	};

	const getPicklocate = () => {
		const mapCordinates = route?.params?.params;
		console.log(mapCordinates);
		setpickUpLocation(mapCordinates.coords);
	};
	const getData = async () => {
		try {
			await AsyncStorage.getItem("UserLoginCredentials").then((value) => {
				if (value != null) {
					var datavalue = JSON.parse(value);
					// console.log("Credential",value)
					geoCodeLocation(datavalue);
				}
			});
		} catch (err) {
			console.log(err);
		}
	};

	const getLocationPermission = async () => {
		let status = await Location.requestForegroundPermissionsAsync();
		// if(status !== 'granted'){
		//   // alert("Permission to access location was denied");
		//   return;
		// }
		let location = await Location.getCurrentPositionAsync({});
		setLocation(location);
		console.log(location);

		console.log("Longitude", location?.coords?.longitude);
		console.log("Latitude", location?.coords?.latitude);
	};

	//   const ReversegeoCodeToLocation = async ()=>{
	//     let longLatPara = {longitude:location.coords.longitude,latitude:location.coords.latitude}
	//     let geoCodeAdd = await Location.reverseGeocodeAsync(longLatPara);
	//     console.log(geoCodeAdd);
	//   }

	useEffect(() => {
		getLocationPermission();
		getPicklocate();
		getData();
		// getLocationPermission();
		// geoCodeLocation();
		// ReversegeoCodeToLocation();
	}, []);

	return (
		<View style={{ marginTop: 50, flex: 1 }}>
			<GooglePlacesAutocomplete
				placeholder="Search"
				// minLength={2}
				// currentLocation={true}
				fetchDetails={true}
				GooglePlacesSearchQuery={{
					rankby: "distance",
				}}
				onPress={(data, details = null) => {
					// 'details' is provided when fetchDetails = true
					console.log(data, details);
					setpickUpLocation({
						latitude: details.geometry.location.lat,
						longitude: details.geometry.location.lng,
						latitudeDelta: 0.0922,
						longitudeDelta: 0.0421,
					});
				}}
				query={{
					key: GOOGLE_API_KEY,
					language: "en",
					components: "country:in",
					types: "establishment",
					radius: 30000,
					location: `${pickUpLocation.latitude}, ${pickUpLocation.longitude}`,
				}}
				styles={{
					container: {
						position: "absolute",
						left: 3,
						right: 3,
						top: 3,
						zIndex: 1,
						margin: 5,
					},
					listView: { backgroundColor: "white" },
				}}
			/>

			<MapView
				style={styles.map}
				ref={mapRef}
				initialRegion={{
					latitude: dropLocation.latitude,
					longitude: dropLocation.longitude,
					latitudeDelta: 0.0922,
					longitudeDelta: 0.0421,
				}}
				provider="google"
			>
				<MapViewDirections
					origin={{
						latitude: dropLocation.latitude,
						longitude: dropLocation.longitude,
					}}
					destination={{
						latitude: pickUpLocation.latitude,
						longitude: pickUpLocation.longitude,
					}}
					apikey={GOOGLE_API_KEY}
					strokeWidth={3}
					strokeColor="red"
					optimizeWaypoints={true}
					onReady={(result) => {
						setMapDisTime({
							...mapDistTime,
							distance: result.distance.toString(),
							duration: result.duration.toString(),
							pickAddress: result.legs[0].end_address,
							dropAddress: result.legs[0].start_address,
						});

						console.log(result.legs[0].end_address);
						mapRef.current.fitToCoordinates(result.coordinates, {
							edgePadding: {
								right: 30,
								left: 30,
								top: 100,
								bottom: 300,
							},
						});
					}}
				/>
				<Marker
					dropLocationColor={"slategreen"}
					title={"Donar"}
					coordinate={{
						latitude: pickUpLocation.latitude,
						longitude: pickUpLocation.longitude,
					}}
				>
					<FontAwesomeIcon
						size={28}
						color={"#00cc66"}
						icon={faHotel}
					></FontAwesomeIcon>
				</Marker>
				<Marker
					coordinate={dropLocation}
					dropLocationColor="#0a6fc2"
					title={"NGO"}

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
					<FontAwesomeIcon
						size={30}
						color={"#0a6fc2"}
						icon={faBuildingNgo}
					></FontAwesomeIcon>
				</Marker>
				{/* <Circle center={dropLocation} radius={1000} /> */}
			</MapView>
			<View
				style={{
					position: "absolute",
					backgroundColor: "white",
					bottom: 0,
					left: 0,
					right: 0,
					padding: 10,
					borderTopLeftRadius: 30,
					borderTopRightRadius: 30,
					borderColor: "lightgray",
					borderWidth: 2,
				}}
			>
				<View style={styles.addCont}>
					<Text style={{ width: 35 }}>
						<FontAwesomeIcon
							size={20}
							color="lightblue"
							icon={faMapMarkerAlt}
						></FontAwesomeIcon>
					</Text>
					<Text style={styles.address}>
						{mapDistTime?.pickAddress?.substring(0, 80) + "..."}
					</Text>
				</View>
				<View style={styles.addCont}>
					<Text style={{ width: 35 }}>
						<FontAwesomeIcon
							size={20}
							color="lightblue"
							icon={faFlag}
						></FontAwesomeIcon>
					</Text>
					<Text style={styles.address}>
						{mapDistTime?.dropAddress?.substring(0, 80) + "..."}
					</Text>
				</View>
				<View
					style={[
						styles.addCont,
						{ alignItems: "center", justifyContent: "center" },
					]}
				>
					<View
						style={{
							width: 120,
							height: 80,
							margin: 3,
							borderColor: "lightgreen",
							borderWidth: 1,
							borderRadius: 8,
							justifyContent: "center",
							alignItems: "center",
						}}
					>
						<Text
							style={{
								flexDirection: "row",
								alignItems: "stretch",
								textAlignVertical: "top",
								color: "gray",
								fontSize: 15,
							}}
						>
							<FontAwesomeIcon
								size={15}
								color="lightblue"
								icon={faDirections}
							></FontAwesomeIcon>{" "}
							DISTANCE
						</Text>
						<Text style={styles.param}>{mapDistTime?.distance.substring(0,5)+"km"}</Text>
					</View>
					<View
						style={{
							width: 120,
							height: 80,
							margin: 3,
							borderColor: "lightgreen",
							borderWidth: 1,
							borderRadius: 8,
							justifyContent: "center",
							alignItems: "center",
						}}
					>
						<Text
							style={{
								flexDirection: "row",
								alignItems: "stretch",
								textAlignVertical: "top",
								color: "gray",
								fontSize: 15,
							}}
						>
							<FontAwesomeIcon
								size={12}
								color="lightblue"
								icon={faClock}
							></FontAwesomeIcon>{" "}
							DURATION
						</Text>
						<Text style={styles.param}>{mapDistTime?.duration?.substring(0,5) + " min"}</Text>
					</View>
				</View>
			</View>
		</View>
	);
};

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: "#fff",
		alignItems: "center",
		justifyContent: "center",
	},
	map: {
		width: Dimensions.get("window").width,
		height: Dimensions.get("window").height,
	},
	addCont: {
		paddingHorizontal: 20,
		flexDirection: "row",
		alignItems: "center",
		overflow: "hidden",
	},
	address: {
		fontSize: 17,
		color: "gray",
		marginVertical: 10,
	},
	param: {
		fontSize: 17,
		color: "royalblue",
		marginVertical: 5,
		fontWeight: "500",
	},
});

export default Map;
