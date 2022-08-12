import React, { useState, useEffect } from "react";
import {
    SafeAreaView,
    ScrollView,
    StyleSheet,
    View,
    Text,
    TextInput,
    ImageBackground,
    TouchableOpacity,
    Image,
    ActivityIndicator,
    Platform
} from "react-native";
import Icon from 'react-native-vector-icons/MaterialIcons';
import COLOURS from "../consts/colours";
import DateTimePicker from '@react-native-community/datetimepicker';
import AsyncStorage from "@react-native-async-storage/async-storage";
const BookingDetails = ({ navigation, route }) => {
    const { FlightData, HotelData } = route.params
    console.log(FlightData)
    const [CardNumber, setCardNumber] = useState(false);
    const [Email, setEmail] = useState("");
    const [CVC, setCVC] = useState()
    const [loading, setloading] = useState(false);
    const [FirstName, setFirstName] = useState("");
    const [LastName, setLastName] = useState("");
    const [Phone, setPhone] = useState("");
    const [ExpiryDate, setExpiryDate] = useState("Select Expiry date")
    const [MyBookings, setMyBookings] = useState([])
    const getResponse = async () => {
        try {
            const jsonValue = await AsyncStorage.getItem('@AsyncObject')
            setMyBookings(jsonValue != null ? JSON.parse(jsonValue) : null)
            console.log("--------... >>>", JSON.stringify(MyBookings), "   ii  ", JSON.parse(jsonValue))

        } catch (e) {
            // error reading value
            alert(e)
        }
    }
    useEffect(() => {
        getResponse();

    }, [])


    async function fetchData(AsyncObject, AsyncArray) {
        console.log("5555555555555555555   ", AsyncObject)
        try {
            if (MyBookings == null) {
                setMyBookings(AsyncObject)
                console.log("66666666666666666666666666", MyBookings)
                try {
                    await AsyncStorage.setItem('@AsyncObject', JSON.stringify(AsyncArray)).then(() => {
                        navigation.replace("MyBookings")
                    })
                } catch (e) {
                    // saving error
                    alert(e)
                }
            }
            else {
                console.log("444444444444444444      ", JSON.stringify(MyBookings))

                MyBookings.push(AsyncObject)
                console.log("7777777777777777777777777777", JSON.stringify(MyBookings))

                setTimeout(async () => {
                    try {
                        await AsyncStorage.setItem('@AsyncObject', JSON.stringify(MyBookings)).then(() => {
                            navigation.replace("MyBookings")
                        })
                    } catch (e) {
                        // saving error
                        alert(e)
                    }
                }, 1000)
            }



        } catch (e) {
            // error reading value
            alert(e)
        }
    }
    const Signup = async () => {
        if (
            !Email &&
            !FirstName &&
            !LastName &&
            !Phone &&
            !CardNumber &&
            !ExpiryDate
        ) {
            alert("Sorry, Please Fill all Fields")

        } else {
            let UserData = {
                "Email": Email,
                "FirstName": FirstName,
                "LastName": LastName,
                "Phone": Phone,
                "CardNumber": CardNumber,
                "ExpiryDate": ExpiryDate
            }
            let AsyncArray = [
                {
                    "UserData": UserData,
                    "HotelData": HotelData,
                    "FlightData": FlightData
                }
            ]
            let AsyncObject = {
                "UserData": UserData,
                "HotelData": HotelData,
                "FlightData": FlightData
            }
            fetchData(AsyncObject, AsyncArray)
        }
    };


    const [modeA, setModeForReturning] = useState('date')
    const [showReturning, setShowReturning] = useState(false)

    const showModeA = (currentMode) => {
        setShowReturning(true);
        setModeForReturning(currentMode);
    }
    const [dateForReturning, setDateForReturning] = useState(new Date())

    const onChangeReturn = (event, selectDate) => {
        const currentDate = selectDate || date;
        setShowReturning(Platform.OS === 'ios');
        setDateForReturning(currentDate);
        let tempDate = new Date(currentDate);
        let fDate = tempDate.getFullYear() + '-' + ((tempDate.getMonth() + 1) > 9 ? tempDate.getMonth() + 1 : '0' + (tempDate.getMonth() + 1)) + "-" + ((tempDate.getDate()) > 9 ? tempDate.getDate() : '0' + (tempDate.getDate()))
        setExpiryDate(fDate)
    }
    return (
        <>
            {loading === true ? (
                <View
                    style={{
                        height: "100%",
                        width: "100%",
                        backgroundColor: "#ffff",
                        zIndex: 1,
                        position: "absolute",
                        alignItems: "center",
                        justifyContent: "center",
                    }}
                >
                    <ActivityIndicator size="large" color={"red"} />
                </View>
            ) : (
                <ScrollView contentContainerStyle={{ flex: 1, backgroundColor: COLOURS.white }}>
                    <ImageBackground
                        source={require("../images/login-bg.jpg")}
                        resizeMode="cover"
                        style={style.image}
                    >
                        <View style={style.container}>
                            <Image
                                style={style.logo}
                                source={require("../images/shoestring_logo.png")}
                            />
                            <Text style={{ color: COLOURS.green, fontWeight: "bold", fontSize: 17, width: "80%", alignSelf: "center" }}>Contact Details</Text>
                            <View style={style.inputContainer}>
                                <TextInput
                                    style={{ paddingLeft: 10, color: COLOURS.grey, flex: 1 }}
                                    placeholder="first name"
                                    onChangeText={(text) => {
                                        setFirstName(text);
                                    }}
                                />
                            </View>
                            <View style={style.inputContainer}>
                                <TextInput
                                    style={{ paddingLeft: 10, color: COLOURS.grey, flex: 1 }}
                                    placeholder="last name"
                                    onChangeText={(text) => {
                                        setLastName(text);
                                    }}
                                />
                            </View>
                            <View style={style.inputContainer}>
                                <TextInput
                                    style={{ paddingLeft: 10, color: COLOURS.grey, flex: 1 }}
                                    placeholder="email address"
                                    keyboardType="email-address"
                                    onChangeText={(text) => {
                                        setEmail(text);
                                    }}
                                />
                            </View>
                            <View style={[style.inputContainer, { marginBottom: 10 }]}>
                                <TextInput
                                    style={{ paddingLeft: 10, color: COLOURS.grey, flex: 1 }}
                                    placeholder="Phone Number"
                                    keyboardType="numeric"
                                    maxLength={11}
                                    onChangeText={(text) => {
                                        setPhone(text);
                                    }}
                                />
                            </View>
                            <Text style={{ color: COLOURS.green, fontWeight: "bold", fontSize: 17, width: "80%", alignSelf: "center" }}>Payment Details</Text>
                            <View style={[style.inputContainer, { marginTop: 10 }]}>
                                <TextInput
                                    style={{ paddingLeft: 10, color: COLOURS.grey, flex: 1 }}
                                    placeholder="Card Number"
                                    keyboardType="numeric"
                                    maxLength={16}
                                    onChangeText={(text) => {
                                        setCardNumber(text);
                                    }}
                                />
                            </View>
                            <View style={[style.inputContainer, { marginTop: 10 }]}>
                                <TextInput
                                    style={{ paddingLeft: 10, color: COLOURS.grey, flex: 1 }}
                                    placeholder="Enter CVC"
                                    keyboardType="numeric"
                                    maxLength={3}
                                    onChangeText={(text) => {
                                        setCVC(text);
                                    }}
                                />
                            </View>
                            <View style={[style.inputContainer, { paddingLeft: 0, }]}>
                                <TouchableOpacity onPress={() => showModeA('date')}>
                                    <Icon style={{ color: COLOURS.green, paddingLeft: 10 }} name="calendar-today" size={28} />
                                </TouchableOpacity>
                                <Text style={{ paddingLeft: 10, color: COLOURS.grey }} >{ExpiryDate}</Text>
                            </View>
                            <TouchableOpacity
                                style={style.btnContainer}
                                activeOpacity={0.8}
                                onPress={() => { Signup() }}
                            >
                                <View style={style.btn}>
                                    <Text
                                        style={{
                                            fontWeight: "bold",
                                            color: COLOURS.white,
                                            fontSize: 16,
                                        }}
                                    >
                                        Submit
                                    </Text>
                                </View>
                            </TouchableOpacity>
                            {showReturning && (
                                <DateTimePicker
                                    testID='dateTimePicker'
                                    value={dateForReturning}
                                    mode={modeA}
                                    is24Hour={true}
                                    display={Platform.OS === 'ios' ? 'spinner' : 'default'}
                                    onChange={onChangeReturn}
                                />
                            )}
                        </View>
                    </ImageBackground>
                </ScrollView>
            )}
        </>
    );
};

const style = StyleSheet.create({
    container: {
        margin: 25,
        backgroundColor: "rgba(255,255,255,0.9)",
        flex: 1,
        // alignItems: "center",
    },

    image: {
        flex: 1,
        width: null,
        height: null,
    },

    logo: {
        width: 140,
        alignSelf: "center",
        height: 45,
        margin: 10,
    },

    inputContainer: {
        height: 50,
        width: "80%",
        borderRadius: 10,
        borderColor: COLOURS.green,
        borderWidth: 2,
        marginTop: 20,
        flexDirection: "row",
        paddingHorizontal: 20,
        alignItems: "center",
        alignSelf: "center"
    },

    btnContainer: {
        marginTop: 20,
        width: "80%",
        alignSelf: "center"
    },

    btn: {
        height: 50,
        backgroundColor: COLOURS.green,
        borderRadius: 10,
        justifyContent: "center",
        alignItems: "center",
    },

    loginContainer: {
        flexDirection: "row",
        marginTop: 10,
    },

    loginText: {
        color: COLOURS.dark,
    },

    loginHere: {
        color: COLOURS.blue,
    },
});

export default BookingDetails;