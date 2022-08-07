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

const MyBookings = ({ navigation }) => {
    const [MyBookings, setMyBookings] = useState([])
    const [isLoad, setisLoad] = useState(false)

    const clickHandler = () => {
        navigation.navigate("LandingPage")
    };
    async function fetchData() {
        try {
            const jsonValue = await AsyncStorage.getItem('@AsyncObject')
            setMyBookings(jsonValue != null ? JSON.parse(jsonValue) : null)
            setisLoad(false)
        } catch (e) {
            setisLoad(false)
            // error reading value
        }
    }

    useEffect(() => {
        setisLoad(true)
        fetchData();


    }, [])


    return (
        <SafeAreaView style={style.container}>
            <View style={style.container}>
                <View style={style.header}>
                    <Image style={style.logo} resizeMode="contain" source={require('../images/shoestring_logo.png')} />
                </View>
                {
                    MyBookings != null
                        ?
                        <>
                            <Text style={{ alignSelf: 'center', color: COLOURS.blue, fontWeight: "bold" }}>My Last Bookings</Text>


                            <Text style={{ fontSize: 16 }}>
                                {

                                    "Country Name:  " + MyBookings.CountryName + "\n" +
                                    "Carrier:  " + MyBookings.Carrier + "\n" +
                                    "Departing Date:  " + MyBookings.DepartingDate + "\n" +
                                    "Departing Time:  " + MyBookings.DepartingTime + "\n" +
                                    "Flight:  " + MyBookings.Flight + "\n" +
                                    "Hotel:  " + MyBookings.Hotel + "\n" +
                                    "No of Beds:  " + MyBookings.NoofBeds + "\n" +
                                    "PostelCode:  " + MyBookings.PostelCode + "\n" +
                                    "Price for 1 person:  " + MyBookings.Pricefor1person + "\n" +
                                    "Region:  " + MyBookings.Region + "\n" +
                                    "Returning Date:  " + MyBookings.ReturningDate + "\n" +
                                    "City:  " + MyBookings.City + "\n" +
                                    "Returning Time:  " + MyBookings.ReturningTime + "\n" +
                                    "Room type:  " + MyBookings.Roomtype + "\n" +
                                    "SeatNumbers:  " + MyBookings.SeatNumbers + "\n" +
                                    "Street:   " + MyBookings.Street + "\n" +
                                    "Subregion:   " + MyBookings.Subregion + "\n" +
                                    "Total Grand Price:  " + MyBookings.TotalGrandPrice + "\n"
                                }
                            </Text>

                        </>
                        :
                        <Text style={style.headline}>No Bookings</Text>
                }

                {
                    MyBookings == null ?
                        <TouchableOpacity
                            activeOpacity={0.7}
                            onPress={clickHandler}
                            style={style.touchableOpacityStyle}>
                            <AntDesign name="plus" color={COLOURS.white} size={24} />
                        </TouchableOpacity> :

                        <TouchableOpacity style={{
                            position: 'absolute',
                            // width: 60,
                            // height: 60,
                            // alignItems: 'center',
                            // justifyContent: 'center',
                            right: 30,
                            bottom: 30,
                            backgroundColor: COLOURS.blue,
                            width: "40%",
                            borderRadius: 9,
                            padding: 10
                            // backgroundColor: COLOURS.blue,
                            // borderRadius: 100
                        }} onPress={() => { }}>
                            <Text style={{ fontSize: 17, color: COLOURS.white, }}>Clear Booking</Text>
                        </TouchableOpacity>
                }
            </View>
        </SafeAreaView>
    );
};

export default MyBookings;

const style = StyleSheet.create({
    headline: {
        flexWrap: 'wrap',
        textAlign: 'center',
        fontSize: 20,
        color: "#b0aeae",
        fontWeight: '500',
        marginTop: height * 0.33
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
