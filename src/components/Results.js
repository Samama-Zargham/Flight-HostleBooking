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

    const { AmadeusDataa, access_token } = route.params;
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
                // console.log("hdbsjhb", JSON.stringify(res?.data))
                console.log("-----------------------   ", hotelId)
                let Address = await getAddress(lat, lng)

                console.log("first ==== >>> ", JSON.stringify(Address))
                if (res) {
                    navigation.navigate('Details', { aircraftDaata: aircraftDaata, hotelData: Hotel, hotelAddress: Address, Beds: AmadeusDataa[0]?.Persons })

                }
            })
        } catch (error) {
            alert("Hotels not available book yourself")
            navigation.navigate('Details', { aircraftDaata: aircraftDaata, hotelData: null })

        }

    }

    const renderItem = ({ item, index }) => {
        var code = index == 0 ? item.countryCode : null
        var code1 = index == 1 ? item.countryCode : null
        if ((index == 0) || (item.countryCode != code && index == 1) || (index == 2 && item.countryCode != code1)) {
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

                {/* <TouchableOpacity
                    styles={{
                        alignItems: 'center',
                        justifyContent: 'center'
                    }}
                    onPress={() => navigation.navigate('Login')}
                >
                    <FontAwesomeIcon style={{ color: COLOURS.orange }} name="user" size={25} />
                </TouchableOpacity> */}
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