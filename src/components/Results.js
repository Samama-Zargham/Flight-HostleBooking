import React, { useState, useRef, useEffect } from 'react';
import {
    View,
    Text,
    Image,
    SafeAreaView,
    TouchableOpacity,
    Animated,
    ScrollView,
    Platform,
    FlatList,
    StyleSheet,
} from 'react-native';
import { getPixelSizeForLayoutSize } from 'react-native/Libraries/Utilities/PixelRatio';
import COLOURS from '../consts/colours';
import Icon from 'react-native-vector-icons/MaterialIcons';
import FontAwesomeIcon from 'react-native-vector-icons/FontAwesome';
import { CountryLIST } from '../CountryData';
import axios from "axios";
import URL from '../AmadeusRouts/URL';
import * as Location from 'expo-location'


const Results = ({ route, navigation }) => {
    const isLogged = route?.params?.isLogged ? true : false
    console.log("first--------", isLogged)

    const { AmadeusDataa, access_token, LeaveCity } = route.params;
    const [first, setfirst] = useState()
    const [Second, setSecond] = useState()
    // console.log("---->>>>>>>>>>>>>>>>>>>>>>> ", JSON.stringify(AmadeusDataa))
    // console.log("-----------" + JSON.stringify(CountryLIST))

    const getAddress = async (lat, lng) => {
        console.log(" fgfg  ", lat, "dfdfdf", lng)
        let { status } = await Location.requestForegroundPermissionsAsync(); // Get the location permission from the user and extract the 'status' key from it.
        if (status !== 'granted') {

            alert('permission denied!');

        }
        return await Location.reverseGeocodeAsync({
            latitude: lat,
            longitude: lng
        });

    }
    const GetPointOfInterest = async (lat, lng) => {
        console.log("firs t   ", lat, "  ", lng)
        try {
            await axios.get(
                `https://test.api.amadeus.com/v1/reference-data/locations/pois?latitude=${lat}&longitude=${lng}`,

                {
                    headers: {
                        'Authorization': `Bearer ${access_token}`
                    }
                }
            ).then(async (res) => {
                console.log("first    ", JSON.stringify(res))
                let points = [
                    { pointName: res?.data?.data[0]?.name, Category: res?.data?.data[0]?.category },
                    { pointName: res?.data?.data[1]?.name, Category: res?.data?.data[1]?.category }
                ]


                return points

            }
            )
        } catch (error) {
            alert("Sorry, we couldnt find any point of interest for the selected City")
        }
    }
    const onSelectCountry = async (cityCode, aircraftDaata) => {
        try {
            await axios.get(
                URL.Get_hotels_from_city + `?cityCode=${cityCode}&radius=1`,

                {
                    headers: {
                        'Authorization': `Bearer ${access_token}`
                    }
                }
            ).then(async (res) => {
                let Hotel = res?.data?.data[0]
                let lat = res?.data?.data[0]?.geoCode?.latitude
                let lng = res?.data?.data[0]?.geoCode?.longitude
                let hotelId = res?.data?.data[0]?.hotelId
                console.log("hdbsjhb", JSON.stringify(res?.data))
                console.log("-----------------------   ", hotelId)
                let Address = await getAddress(lat, lng)
                // let PointofInterest = await GetPointOfInterest(lat, lng)
                // console.log("PointofInterest", JSON.stringify(PointofInterest))

                console.log("first ==== >>> ", JSON.stringify(Address))
                if (res) {
                    navigation.navigate('Details', { aircraftDaata: aircraftDaata, hotelData: Hotel, hotelAddress: Address, Beds: AmadeusDataa[0]?.Persons, LeaveCity: LeaveCity, ArrivalCity: cityCode, isLogged: isLogged })

                }
            })
        } catch (error) {
            alert("Sorry, we couldnt find any hotel for the selected country please book yourself")
            navigation.navigate('Details', { aircraftDaata: aircraftDaata, isLogged: isLogged, hotelData: null, Beds: AmadeusDataa[0]?.Persons, LeaveCity: LeaveCity, ArrivalCity: cityCode })

        }

    }

    const renderItem = ({ item, index }) => {
        if ((index == 0) || (item.countryCode != first && index == 1) || (index == 2 && item.countryCode != first && item.countryCode != Second)) {
            index == 0 && setfirst(item.countryCode)
            index == 1 && setSecond(item.countryCode)
            return (
                <TouchableOpacity key={index} activeOpacity={0.9} onPress={() => onSelectCountry(item.cityCode, item?.aircraftDaata)}>
                    <View style={style.resultItem}>
                        {/* <View>
                        <Image style={style.image} source={item.image}></Image>
                    </View> */}
                        <View style={style.itemName}>
                            {CountryLIST.map((item1, index) => {
                                if (item1.countryCode == item.countryCode) {
                                    return (
                                        <Text style={{ color: COLOURS.blue, fontWeight: 'bold', fontSize: 22 }}>{item1.countryName}</Text>
                                    )
                                }
                            })}
                        </View>
                        <View style={style.itemPrice}>
                            <Text style={{ color: COLOURS.white, fontWeight: '800', fontSize: 18 }}>{item?.aircraftDaata?.grandPrice}</Text>
                        </View>
                    </View>
                </TouchableOpacity>
            );
        }
    };

    function renderHeader() {
        return (
            <View style={{
                flexDirection: 'row',
                paddingHorizontal: 20,
                paddingVertical: 20,
                alignItems: 'center'
            }}>
                <TouchableOpacity
                    styles={{
                        width: 45,
                        height: 45,
                        alignItems: 'center',
                        justifyContent: 'center'
                    }}
                    onPress={() => navigation.navigate('LandingPage')}
                >
                    <Icon style={{ color: COLOURS.orange }} name="arrow-back-ios" size={28} />

                </TouchableOpacity>

                <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
                    <Text style={{ color: COLOURS.black, fontWeight: 'bold' }}>
                        CITIES FOR ADVENTURE
                    </Text>
                </View>

                {isLogged
                    && <TouchableOpacity
                        styles={{
                            alignItems: 'center',
                            justifyContent: 'center'
                        }}
                        onPress={() => navigation.replace('Login')}
                    >
                        <FontAwesomeIcon style={{ color: COLOURS.orange }} name="user" size={25} />
                    </TouchableOpacity>}
            </View>
        )
    }

    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: COLOURS.white, marginTop: 10 }}>
            {renderHeader()}
            <View style={{ height: 700 }}>
                <View>
                    <FlatList
                        data={AmadeusDataa}
                        keyExtractor={(item, index) => index.toString()}
                        renderItem={renderItem}
                        ListEmptyComponent={<Text>There's no options at the moment</Text>}
                    />
                </View>
            </View>
        </SafeAreaView>
    )
};

const style = StyleSheet.create({
    resultItem: {
        flexDirection: 'row',
        marginHorizontal: 20,
        marginTop: 20,
        height: 100,
        backgroundColor: COLOURS.white,
        borderRadius: 10,
        borderColor: COLOURS.orange,
        borderWidth: 1,
        alignItems: 'center',
        justifyContent: 'space-between',
    },

    image: {
        flex: 1,
        height: null,
        width: 100,
        borderTopLeftRadius: 10,
        borderBottomLeftRadius: 10,
        resizeMode: 'cover',
    },

    itemName: {
        padding: 20,
    },

    itemPrice: {
        height: 100,
        width: 100,
        borderTopRightRadius: 10,
        borderBottomRightRadius: 10,
        backgroundColor: COLOURS.orange,
        alignItems: 'center',
        justifyContent: 'center',
    },
});

export default Results