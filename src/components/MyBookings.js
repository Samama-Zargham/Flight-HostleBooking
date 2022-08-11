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
import { FlatList } from 'react-native-gesture-handler';
import AntDesign from 'react-native-vector-icons/AntDesign';
import COLOURS from '../consts/colours';
const { width, height } = Dimensions.get("window")

const MyBookings = ({ navigation }) => {
    const [MyBookings, setMyBookings] = useState([])
    const [isLoad, setisLoad] = useState(false)

    const clickHandler = () => {
        navigation.replace("LandingPage", { isLogged: true })
    };
    async function fetchData() {
        try {
            const jsonValue = await AsyncStorage.getItem('@AsyncObject')
            setMyBookings(jsonValue != null ? JSON.parse(jsonValue) : null)
            // console.log("--------... >>>", JSON.stringify(MyBookings))
            setisLoad(false)
        } catch (e) {
            setisLoad(false)
            // error reading value
        }
    }

    useEffect(() => {
        setisLoad(true)
        fetchData();


    }, [MyBookings])


    const renderItem = ({ item, index }) => {
        var FlightData = item?.FlightData
        var HotelData = item?.HotelData
        var UserData = item?.UserData
        var total = JSON.parse(FlightData?.TotalGrandPrice)
        return (
            <TouchableOpacity
                onPress={() => navigation.navigate("BookingDetail", {
                    FlightData: FlightData,
                    HotelData: HotelData,
                    UserData: UserData,
                })}
                activeOpacity={0.7} key={index} style={style.ServiceStyle}>
                <Text style={style.ttx}>{`Booked By: ${UserData.FirstName} ${UserData.LastName}`} </Text>
                <Text>{`Departing Date: ${FlightData.DepartingDate}`} </Text>
                <Text>{`Returning Date: ${FlightData.ReturningDate}`} </Text>
                <View style={{ marginTop: 5, flexDirection: "row", alignItems: "center", justifyContent: "space-between" }}>
                    <Text>{`Flight: ${FlightData.Flight}`} </Text>
                    <Text style={{ marginRight: 20, color: COLOURS.blue, fontWeight: "800" }}>{`GrandTotal:  ${total.toFixed(2)}`}</Text>
                </View>

            </TouchableOpacity>
        )
    }
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
                            <FlatList
                                style={{ marginBottom: 30, }}
                                ListHeaderComponent={() => {
                                    return (<Text style={{ alignSelf: 'center', color: COLOURS.blue, fontWeight: "bold", fontSize: 19, marginBottom: 20 }}>My Bookings</Text>
                                    )
                                }}
                                keyExtractor={(item, indx) => indx}
                                data={MyBookings}
                                renderItem={renderItem}
                            />

                        </>
                        :
                        <Text style={style.headline}>
                            Press below button for your adventure bookings
                        </Text>
                }

                {
                    // MyBookings == null ?
                    <TouchableOpacity
                        activeOpacity={0.7}
                        onPress={clickHandler}
                        style={style.touchableOpacityStyle}>
                        <AntDesign name="plus" color={COLOURS.white} size={24} />
                    </TouchableOpacity>
                    //  :

                    // <TouchableOpacity style={{
                    //     position: 'absolute',
                    //     right: 30,
                    //     bottom: 30,
                    //     backgroundColor: COLOURS.blue,
                    //     width: "40%",
                    //     borderRadius: 9,
                    //     padding: 10
                    // }} onPress={async () => {

                    //     try {
                    //         await AsyncStorage.removeItem('@AsyncObject').then(async () => {
                    //             const jsonValue = await AsyncStorage.getItem('@AsyncObject')
                    //             setMyBookings(jsonValue != null ? JSON.parse(jsonValue) : null)
                    //             setisLoad(false)
                    //         }

                    //         )

                    //     } catch (e) {
                    //         setisLoad(false)
                    //         // error reading value
                    //     }
                    // }}>
                    //     <Text style={{ fontSize: 17, color: COLOURS.white, }}>Clear Booking</Text>
                    // </TouchableOpacity>
                }
            </View>
        </SafeAreaView>
    );
};

export default MyBookings;

const style = StyleSheet.create({
    ttx: {
        fontSize: 15,
        fontWeight: "bold"
    },
    ServiceStyle: {
        backgroundColor: "white",
        elevation: 10, marginBottom: 15,
        alignSelf: "center",
        width: "90%", padding: 10, borderRadius: 7
    },
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
        borderRadius: 100,
        elevation: 10
    },


});
