import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { useEffect, useState } from 'react';
import {
    SafeAreaView,
    StyleSheet,
    View,
    Image,
    TouchableOpacity,
    Text,
    Dimensions
} from 'react-native';
import AntDesign from 'react-native-vector-icons/AntDesign';
import COLOURS from '../consts/colours';
const { width, height } = Dimensions.get("window")

const BookingDetail = ({ navigation, route }) => {
    const {
        FlightData,
        HotelData,
        UserData
    } = route.params

    console.log(HotelData)
    var total = JSON.parse(FlightData?.TotalGrandPrice)
    console.log(typeof (total))

    return (
        <SafeAreaView style={style.container}>
            <View style={style.container}>
                <View style={style.header}>
                    <AntDesign onPress={() => navigation.goBack()} name='back' color={COLOURS.blue} size={24} style={{ elevation: 10, backgroundColor: COLOURS.white, alignSelf: "center", borderRadius: 20, marginLeft: 20, padding: 5 }} />
                </View>

                <Text style={{ alignSelf: 'center', color: COLOURS.blue, fontWeight: "bold", fontSize: 19 }}>Booking Detail</Text>

                <Text style={{ fontSize: 17, color: COLOURS.dark, width: "90%", alignSelf: "center", marginTop: 10 }}>
                    <Text style={{ color: COLOURS.blue, fontWeight: "800" }}>{"User Details" + "\n"}</Text>
                    {
                        "FirstName:  " + UserData.FirstName + "\n" +
                        "LastName:  " + UserData.LastName + "\n" +
                        "Phone number:  " + UserData.Phone + "\n" +
                        "Email:  " + UserData.Email + "\n" + "\n"
                    }
                    <Text style={{ color: COLOURS.blue, fontWeight: "800" }}>{"Flight Details" + "\n"}</Text>
                    {
                        "Departing Date:  " + FlightData.DepartingDate + "\n" +
                        "Departing Time:  " + FlightData.DepartingTime + "\n" +
                        "Flight:  " + FlightData.Flight + "\n" +
                        "Carrier:  " + FlightData.Carrier + "\n" +
                        "SeatNumbers:  " + FlightData.SeatNumbers + "\n" +
                        "Returning Time:  " + FlightData.ReturningTime + "\n" +
                        "Returning Date:  " + FlightData.ReturningDate + "\n" + "\n"
                    }
                    {
                        HotelData != null && <Text style={{ color: COLOURS.blue, fontWeight: "800" }}>{"Hotel Details" + "\n"}</Text>

                    }
                    {HotelData != null &&
                        <Text>
                            {
                                "Hotel:  " + HotelData.Hotel + "\n" +
                                "PostelCode:  " + HotelData.PostelCode + "\n" +
                                "Street:   " + HotelData.Street + "\n" +
                                "Subregion:   " + HotelData.Subregion + "\n" +
                                "No of Beds:  " + HotelData.NoofBeds + "\n" +
                                "Region:  " + HotelData.Region + "\n" +
                                "Country Name:  " + HotelData.CountryName + "\n" +
                                "City:  " + HotelData.City + "\n" +
                                "Price for 1 person:  " + HotelData.Pricefor1person + "\n" +
                                "Room type:  " + HotelData.Roomtype + "\n"

                            }
                        </Text>

                    }
                    <Text style={{ color: COLOURS.blue, fontWeight: "800", }}>{"Total Grand Price:  " + total.toFixed(2)}</Text>

                </Text>


            </View>
        </SafeAreaView>
    );
};

export default BookingDetail;

const style = StyleSheet.create({
    headline: {
        flexWrap: 'wrap',
        textAlign: 'center',
        fontSize: 20,
        color: "#b0aeae",
        fontWeight: '500',
        marginTop: height * 0.33,
        width: "80%",
        alignSelf: "center"
    },
    container: {
        flex: 1,
        backgroundColor: COLOURS.white
    },
    header: {
        paddingVertical: 20,
        marginTop: height * 0.03,
        flexDirection: 'row',
        justifyContent: 'space-between',
        backgroundColor: COLOURS.white,
    },
    logo: {
        maxWidth: 350,
        height: '100%',
        paddingTop: 50,
        marginLeft: -25
    },
    touchableOpacityStyle: {
        position: 'absolute',
        width: 60,
        height: 60,
        alignItems: 'center',
        justifyContent: 'center',
        right: 30,
        bottom: 30,
        backgroundColor: COLOURS.blue,
        borderRadius: 100
    },


});
