import React, { useState } from 'react'
import {
    SafeAreaView,
    ScrollView,
    StatusBar,
    StyleSheet,
    View,
    Text,
    TextInput,
    ImageBackground,
    FlatList,
    Dimensions,
    TouchableOpacity,
    Image,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Icon from 'react-native-vector-icons/MaterialIcons';
import IconA from 'react-native-vector-icons/Ionicons';
import FontAwesomeIcon from 'react-native-vector-icons/FontAwesome';
import WavyBackground from 'react-native-wavy-background';
import COLOURS from '../consts/colours';
import { CountryLIST } from '../CountryData';
const listTab = [
    {
        status: 'Hotel'
    },
    {
        status: 'Flight'
    },

]

const data = [
    {
        name: "Tokyo 5-Stars",
        address: "123 address, Tokyo, Japan",
        status: 'Hotel',
    },
    {
        name: "ANA 3000",
        status: 'Flight',
    },
]

const Details = ({ navigation, route }) => {
    const isLogged = route?.params?.isLogged ? true : false
    console.log("first--------", isLogged)

    const { aircraftDaata, hotelData, hotelAddress, Beds, ArrivalCity, LeaveCity } = route.params
    var departTime = aircraftDaata.departTime
    var returnTime = aircraftDaata.returnTime
    const [countryName, setcountryName] = useState("")
    const Seatnumber = aircraftDaata.Seatnumber
    const Seatnumber1 = Seatnumber.substring(0, 3)
    const hotelGrandPrice = 170 * Beds
    const roomType = Beds == "1" ? "Single bed Luxury room, with Wireless Internet" : Beds == "2" ?
        "Double bed Deluxe room, with Wireless Internet " : Beds == "1" && "One Single two twin bed Super Deluxe room, with Wireless Internet "
    console.log("aircraftDaata ==> ", JSON.stringify(aircraftDaata) + "hotel data ====>   " + JSON.stringify(hotelAddress))
    const [status, setStatus] = useState('Hotel')
    const [datalist, setDatalist] = useState(data)
    const setStatusFilter = status => {
        setDatalist([...data.filter(e => e.status === status)])

        setStatus(status)
    }
    const renderItem = ({ item, index }) => {
        return (
            <View key={index}>
                {
                    status == "Flight" && index == 0 &&
                    <View>
                        <Text style={{ fontSize: 17, fontWeight: "500", color: COLOURS.blue }}>{"Grand Price  $" + aircraftDaata.grandPrice}</Text>
                        <Text style={{ fontSize: 17, fontWeight: "500", color: COLOURS.blue }}>{"Departing  "}</Text>
                        <Text style={{ fontSize: 17, fontWeight: "500" }}>{"Flight " + aircraftDaata.aircraftcode}</Text>
                        <Text style={{ fontSize: 17, fontWeight: "500" }}>{"Carrier " + aircraftDaata.carrierCode}</Text>
                        <Text style={{ fontSize: 17, fontWeight: "500" }}>{"Departing Date " + aircraftDaata.departDate}</Text>
                        <Text style={{ fontSize: 17, fontWeight: "500" }}>{"Departing Time " + departTime.substring(11, 16)}</Text>
                        <Text style={{ fontSize: 17, fontWeight: "500" }}>{"Duration " + aircraftDaata.flightDuration}</Text>
                        {Beds == "1" &&
                            <Text style={{ fontSize: 17, fontWeight: "500" }}>{"Seat Number " + Seatnumber1}</Text>
                        }
                        {Beds == "2" &&
                            <Text style={{ fontSize: 17, fontWeight: "500" }}>{"Seat Numbers   " + Seatnumber1 + ",  " + (parseInt(Seatnumber1) + 1)}</Text>
                        }
                        {Beds == "3" &&
                            <Text style={{ fontSize: 17, fontWeight: "500" }}>{"Seat Numbers   " + Seatnumber1 + ",  " + (parseInt(Seatnumber1) + 1) + ",  " + (parseInt(Seatnumber1) + 2)}</Text>
                        }
                        <Text style={{ fontSize: 17, fontWeight: "500", color: COLOURS.blue }}>{"Returning "}</Text>
                        <Text style={{ fontSize: 17, fontWeight: "500" }}>{"Flight " + aircraftDaata.aircraftcode}</Text>
                        <Text style={{ fontSize: 17, fontWeight: "500" }}>{"Carrier " + aircraftDaata.carrierCode}</Text>
                        <Text style={{ fontSize: 17, fontWeight: "500" }}>{"Returning Date " + aircraftDaata.returDate}</Text>
                        <Text style={{ fontSize: 17, fontWeight: "500" }}>{"Returning Time " + returnTime.substring(11, 16)}</Text>
                        <Text style={{ fontSize: 17, fontWeight: "500" }}>{"Duration " + aircraftDaata.flightDuration}</Text>
                        {Beds == "1" &&
                            <Text style={{ fontSize: 17, fontWeight: "500" }}>{"Seat Number " + Seatnumber1}</Text>
                        }
                        {Beds == "2" &&
                            <Text style={{ fontSize: 17, fontWeight: "500" }}>{"Seat Numbers   " + Seatnumber1 + ",  " + (parseInt(Seatnumber1) + 1)}</Text>
                        }
                        {Beds == "3" &&
                            <Text style={{ fontSize: 17, fontWeight: "500" }}>{"Seat Numbers   " + Seatnumber1 + ",  " + (parseInt(Seatnumber1) + 1) + ",  " + (parseInt(Seatnumber1) + 2)}</Text>
                        }
                    </View>
                }

                {
                    status == "Hotel" && index == 0 &&
                        hotelData != undefined ?
                        <View>
                            {CountryLIST.map((item1, index) => {
                                if (item1.countryCode == hotelData?.address?.countryCode) {
                                    setcountryName(item1.countryName)
                                    // console.log(countryName)
                                    return (
                                        <Text style={{ color: COLOURS.blue, fontWeight: 'bold', fontSize: 18 }}>{item1.countryName}</Text>
                                    )
                                }
                            })}
                            <Text style={{ color: COLOURS.blue }}>{"Hotel:  " + hotelData?.name}</Text>
                            <Text>{"City:  " + hotelAddress[0]?.city}</Text>
                            <Text>{"CheckIn Date " + aircraftDaata.departDate}</Text>
                            <Text>{"CheckOut Date " + aircraftDaata.returDate}</Text>
                            <Text>{"Street:  " + hotelAddress[0]?.street}</Text>
                            <Text>{"PostelCode:  " + hotelAddress[0]?.postalCode}</Text>
                            <Text>{"Region:  " + hotelAddress[0]?.region}</Text>
                            <Text>{"Subregion:  " + hotelAddress[0]?.subregion}</Text>
                            <Text>{"No of Beds:  " + Beds}</Text>
                            <Text>{"Room type  " + roomType}</Text>
                            <Text>{"Price for 1 person:  " + "$170"}</Text>
                            <Text>{"Your Grand Price:  $" + hotelGrandPrice}</Text>


                        </View> :
                        status == "Hotel" && index == 0 && hotelData == null &&
                        <Text>No Hotel available</Text>
                }

            </View>
        )
    }

    function renderHeader() {
        return (
            <View style={{
                flexDirection: 'row',
                paddingHorizontal: 20,
                paddingVertical: 20,
                alignItems: 'center',
                marginTop: 10
            }}>
                <TouchableOpacity
                    styles={{
                        width: 45,
                        height: 45,
                        alignItems: 'center',
                        justifyContent: 'center'
                    }}
                    onPress={() => navigation.navigate('Results')}
                >
                    <Icon style={{ color: COLOURS.orange }} name="arrow-back-ios" size={28} />

                </TouchableOpacity>

                <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
                    <Text style={{ color: COLOURS.black, fontWeight: 'bold' }}>
                        OFFER FOR YOU
                    </Text>
                </View>

                {isLogged
                    ?
                    <TouchableOpacity
                        styles={{
                            alignItems: 'center',
                            justifyContent: 'center'
                        }}
                        onPress={() => navigation.replace('Login')}
                    >
                        <IconA style={{ color: COLOURS.orange }} name="log-out" size={25} />
                    </TouchableOpacity>
                    :
                    <TouchableOpacity
                        styles={{
                            alignItems: 'center',
                            justifyContent: 'center'
                        }}
                        onPress={() => navigation.replace('Login')}
                    >
                        <FontAwesomeIcon style={{ color: COLOURS.orange }} name="user" size={25} />
                    </TouchableOpacity>
                }
            </View>
        )
    }

    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: COLOURS.white, }}>
            {renderHeader()}
            <View style={style.listTab}>
                {
                    listTab.map(e => (
                        <TouchableOpacity style={[style.btnTab, status === e.status && style.btnTabActive]} onPress={() => setStatusFilter(e.status)}>
                            <Text style={[style.textTab, status === e.status && style.textTabActive]}>{e.status}</Text>
                        </TouchableOpacity>
                    ))
                }
            </View>
            <View style={style.content}>
                <FlatList
                    data={data}
                    keyExtractor={(item, index) => index}
                    renderItem={renderItem}
                />
            </View>
            {
                status == "Hotel" && hotelData == null ? null :
                    <TouchableOpacity
                        style={style.btnContainer}
                        activeOpacity={0.8}
                        onPress={async () => {
                            let FlightData = {
                                "ArrivalCity": ArrivalCity,
                                "LeaveCity": LeaveCity,
                                "TotalGrandPrice": hotelData == null ? aircraftDaata?.grandPrice : JSON.parse(aircraftDaata?.grandPrice) + hotelGrandPrice,
                                "DepartingTime": departTime?.substring(11, 16),
                                "ReturningTime": returnTime?.substring(11, 16),
                                "DepartingDate": aircraftDaata?.departDate,
                                "ReturningDate": aircraftDaata?.returDate,
                                "Flight": aircraftDaata?.aircraftcode,
                                "Carrier": aircraftDaata?.carrierCode,
                                "SeatNumbers": Beds == "1" ? Seatnumber1 : Beds == "2" ? Seatnumber1 + ",  " + (parseInt(Seatnumber1) + 1) : Beds == "3" && Seatnumber1 + ",  " + (parseInt(Seatnumber1) + 1) + ",  " + (parseInt(Seatnumber1) + 2),
                            }

                            if (hotelData != null) {
                                var HotelData = {
                                    "CountryName": countryName,
                                    "Hotel": hotelData?.name,
                                    "City": hotelAddress[0]?.city == null ? hotelData?.iataCode : hotelAddress[0]?.city,
                                    "Street": hotelAddress[0]?.street,
                                    "PostelCode": hotelAddress[0]?.postalCode,
                                    "Region": hotelAddress[0]?.region,
                                    "Subregion": hotelAddress[0]?.subregion,
                                    "NoofBeds": Beds,
                                    "Roomtype": roomType,
                                    "Pricefor1person": "$170",
                                }
                            }
                            isLogged == true ?
                                navigation.navigate("BookingDetails", {
                                    FlightData: FlightData,
                                    HotelData: hotelData == null ? null : HotelData
                                })
                                :
                                [
                                    alert("Sorry, Please Register First For booking"),
                                    navigation.replace("Register")
                                ]

                        }}
                    >
                        <View style={style.btn}>
                            <Text
                                style={{
                                    fontWeight: "bold",
                                    color: COLOURS.white,
                                    fontSize: 16,
                                }}
                            >
                                BOOK!
                            </Text>
                        </View>
                    </TouchableOpacity>
            }
        </SafeAreaView >
    )
};

const style = StyleSheet.create({
    listTab: {
        backgroundColor: COLOURS.white,
        marginLeft: 20,
        flexDirection: 'row'
    },

    btnTab: {
        width: Dimensions.get('window').width / 3.5,
        flexDirection: 'row',
        borderWidth: 0.5,
        borderColor: COLOURS.orange,
        padding: 10,
        justifyContent: 'center',
        borderTopLeftRadius: 10,
        borderTopRightRadius: 10,
    },

    textTab: {
        fontSize: 16,
    },

    btnTabActive: {
        backgroundColor: COLOURS.orange,
    },

    textTabActive: {
        color: COLOURS.white,
    },

    content: {
        padding: 20,
        marginHorizontal: 20,
        borderWidth: 1,
        borderColor: COLOURS.orange,
        height: 500,
        borderTopRightRadius: 10,
        borderBottomLeftRadius: 10,
        borderBottomRightRadius: 10,
    },

    btnContainer: {
        marginHorizontal: 20,
        marginTop: 20,
    },

    btn: {
        height: 50,
        backgroundColor: COLOURS.orange,
        borderRadius: 10,
        justifyContent: "center",
        alignItems: "center",
    },

});

export default Details