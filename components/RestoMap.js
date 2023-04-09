import { faBuildingNgo, faHotel, faLocationCrosshairs, faLocationDot, faLocationPin, faUserAlt } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import React, { useEffect, useState, useRef } from 'react';
import { Dimensions, StyleSheet, Text, View } from "react-native"
import { GooglePlacesAutocomplete } from "react-native-google-places-autocomplete"
import MapView, { Callout, Circle, Marker } from "react-native-maps"
import MapViewDirections from 'react-native-maps-directions';
import AsyncStorage from '@react-native-async-storage/async-storage';
import GooglePlacesInput from './GooglePlacesInput'
import * as Location from 'expo-location';
import axios from 'axios';
import { ScrollView } from 'react-native-gesture-handler';
import Swiper from 'react-native-swiper'

const RestoMap = ({ route }) => {
	const [currentlocation, setcurrentLocation] = useState({
		latitude: 19.443,
		longitude: 72.8360
	})
	const [ngoListData, setngoListData] = useState([])
	const GOOGLE_API_KEY = "AIzaSyBPsF9meOyA8d6GtpMR6TTvF4hPaetULUs";
	const mapRef = useRef()


	// const geoCodeLocation = async (locate) => {
	// 	let geoCodeAdd = await Location.geocodeAsync(`${locate.address}`+" "+`${locate.city}`);
	// 	// setdropLocation(geoCodeAdd[0])
	// 	console.log("myAdd",locate.address, geoCodeAdd);
	// 	return geoCodeAdd[0]
	// }

	const getPicklocate = () => {
		const mapCordinates = route?.params?.params;
		console.log(mapCordinates);
		// setpickUpLocation(mapCordinates.coords)
	}
	const getData = async () => {
		try {
			await AsyncStorage.getItem("UserLoginCredentials")
				.then(value => {
					if (value != null) {
						var datavalue = JSON.parse(value);
						// console.log("Credential",value)
						// geoCodeLocation(datavalue)
					}
				})
		} catch (err) {
			console.log(err);
		}
	}

	const getNGOData = async () => {
		const Url = "http://192.168.31.203:8000/ngos";
		try {
			return await axios.get(Url)
				.then((res) => {
					if (res.status == 200) {
						setngoListData(res.data)						
					} else {
						alert(res.error);
					}
				})
		} catch (error) {
			console.log("Something Went Wrong ", error)
		}
	}

	const getLocationPermission = async () => {
		let status = await Location.requestForegroundPermissionsAsync();
		// if(status !== 'granted'){
		//   // alert("Permission to access location was denied");
		//   return;
		// }
		let location = await Location.getCurrentPositionAsync({});
		setcurrentLocation(location.coords);
		// console.log(location)

		// console.log("Longitude", currentlocation?.longitude)
		// console.log("Latitude", currentlocation?.latitude)
		// setdropLocation(location?.coords)

	}



	//   const ReversegeoCodeToLocation = async ()=>{
	//     let longLatPara = {longitude:location.coords.longitude,latitude:location.coords.latitude}
	//     let geoCodeAdd = await Location.reverseGeocodeAsync(longLatPara);
	//     console.log(geoCodeAdd);
	//   }

	useEffect(() => {
		getPicklocate();
		getNGOData();
		getLocationPermission();
		// geoCodeLocation();
		// ReversegeoCodeToLocation();

	}, [])

	return (
		<View style={{ marginTop: 30, flex: 1 }}>
			<MapView
				style={styles.map}
				ref={mapRef}
				initialRegion={{
					latitude: currentlocation?.latitude,
					longitude: currentlocation?.longitude,
					latitudeDelta: 0.0922,
					longitudeDelta: 0.0421
				}}
				// onMapLoaded={}
			>
				{/* <MapViewDirections
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
				/> */}
				{
					ngoListData.length>0 && ngoListData.map((data) => {
						return (
						<Marker
						    title={data.name}
							coordinate={{latitude:data.address.geometry.location.lat,longitude:data.address.geometry.location.lng}}
							dropLocationColor="green">
							<FontAwesomeIcon size={30} color={"green"} icon={faBuildingNgo}></FontAwesomeIcon>

						</Marker>
						)
					})
				}
				<Marker
					coordinate={currentlocation}
					title="You Are Here"
					dropLocationColor="#0a6fc2">
                    <Text>Nitin</Text>

					<FontAwesomeIcon size={30} color={"#0a6fc2"} icon={faLocationDot}></FontAwesomeIcon>

				</Marker>
				
			</MapView>
			  <View style = {{position:"absolute",height:200,left:20,right:20,bottom:50,zIndex:100,backgroundColor:"red"}}>
			  <Swiper style={{}} showsButtons={true}>
        
					{
					ngoListData.length>0 && ngoListData.map((data,indx) => {
						return (
							<View style={styles.slide1}>
							<Text style={styles.text}>{data.name}</Text>
						  </View>
						  
						)
					})
				}
      </Swiper>					
				</View>

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
	},
	slide1: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center',
		backgroundColor: '#9DD6EB'
	  },
	  text: {
		color: '#fff',
		fontSize: 30,
		fontWeight: 'bold'
	  }
})

export default RestoMap