import React, { useState, useEffect } from "react";
import {
    SafeAreaView,
    ScrollView,
    StatusBar,
    StyleSheet,
    View,
    Text,
    TextInput,
    Linking,
    FlatList,
    Dimensions,
    TouchableOpacity,
    Image,
    ActivityIndicator,
    Alert
} from 'react-native';
import URL from "../AmadeusRouts/URL";
import axios from "axios";
import Icon from 'react-native-vector-icons/MaterialIcons';
import IconA from 'react-native-vector-icons/Ionicons';
import FontAwesomeIcon from 'react-native-vector-icons/FontAwesome';
import WavyBackground from 'react-native-wavy-background';
import COLOURS from '../consts/colours';
import DateTimePicker from '@react-native-community/datetimepicker';
import Constants from 'expo-constants';
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';
import { setStatusBarNetworkActivityIndicatorVisible } from "expo-status-bar";
import AsyncStorage from '@react-native-async-storage/async-storage';

const { width, height } = Dimensions.get("window")
const LandingPage = ({ navigation, route }) => {
    // const isLogged = route?.params?.isLogged ? true : false
    console.log("first", isLogged)
    const [isLogged, setisLogged] = useState(false)
    const getResponse = async () => {
        try {
            const jsonValue = await AsyncStorage.getItem('@IsLogin')
            setisLogged(jsonValue != null ? true : false)

        } catch (e) {
            // error reading value
            alert(e)
        }
    }
    useEffect(() => {
        getResponse();

    }, [isLogged])
    const [bugget, setBugget] = useState()
    const [isResponse, setisResponse] = useState(false)
    // Calender For Departing
    const [dateForDeparting, setDateForDeparting] = useState(new Date())
    const [modeForDeparting, setModeForDeparting] = useState('date')
    const [showDeparting, setShowDeparting] = useState(false)
    const [departing, setDeparting] = useState('departing')
    const [CityAirport, setCityAirport] = useState("")
    const [MyAmadeusDataa, setMyAmadeusDataa] = useState([])

    const onChange = (event, selectDate) => {
        const currentDate = selectDate || date;
        setShowDeparting(Platform.OS === 'ios');
        setDateForDeparting(currentDate);
        let tempDate = new Date(currentDate);
        var cdate = tempDate.getDate()
        var month = tempDate.getMonth()
        var year = tempDate.getFullYear()
        setDate(cdate)
        setMonth(month)
        setYear(year)
        let fDate = tempDate.getFullYear() + '-' + ((tempDate.getMonth() + 1) > 9 ? tempDate.getMonth() + 1 : '0' + (tempDate.getMonth() + 1)) + "-" + ((tempDate.getDate()) > 9 ? tempDate.getDate() : '0' + (tempDate.getDate()))
        setDeparting(fDate)
        // setReturning(fDate)
    }
    const showModeForDeparting = (currentMode) => {
        setShowDeparting(true);
        setModeForDeparting(currentMode);
    }
    // Calender For Returning
    const [dateForReturning, setDateForReturning] = useState(new Date())
    const [modeA, setModeForReturning] = useState('date')
    const [showReturning, setShowReturning] = useState(false)
    const [returning, setReturning] = useState('returning')
    const [Persons, setPersons] = useState()
    const [cDate, setDate] = useState()
    const [year, setYear] = useState()
    const [Month, setMonth] = useState()

    const onChangeReturn = (event, selectDate) => {
        const currentDate = selectDate || date;
        setShowReturning(Platform.OS === 'ios');
        setDateForReturning(currentDate);
        let tempDate = new Date(currentDate);
        let fDate = tempDate.getFullYear() + '-' + ((tempDate.getMonth() + 1) > 9 ? tempDate.getMonth() + 1 : '0' + (tempDate.getMonth() + 1)) + "-" + ((tempDate.getDate()) > 9 ? tempDate.getDate() : '0' + (tempDate.getDate()))
        setReturning(fDate)
    }

    const showModeA = (currentMode) => {
        setShowReturning(true);
        setModeForReturning(currentMode);
    }
    const details = {
        "grant_type": 'client_credentials',
        "client_id": "Y2vZesGSskZexpIAny84ByfN3yY11dnk",
        "client_secret": "AnMnpLyAYF4EkOQz"
    }
    const isDateBeforeToday = (date) => {
        console.log(" date ", date)
        // console.log(new Date(date.toDateString()))
        console.log(new Date(new Date().toDateString()))

        return new Date(date.toDateString()) < new Date(new Date().toDateString())
    }

    const getAmadeusData = async () => {
        console.log(` departing date:  ${departing}, || returning date: ${returning}, ||  CityAirport : ${CityAirport}, ||  bugget: ${bugget} ||   Persons:   ${Persons}` + dateForReturning)
        if (!departing || !returning || !CityAirport || !bugget || !Persons) {
            alert("Sorry, Please fill all Fields or check internet connection")
        }
        else if (departing == returning) {
            alert("Sorry, please make 1 day differnce")
        }
        else if (bugget < 700) {
            alert("Sorry, bugget must be greater than 700")
        }
        else if (Persons > 3) {
            alert("Sorry, Max 3 seats allow")
        }
        else if (departing) {

            if (isDateBeforeToday(new Date(year, Month, cDate))) {
                alert("Sorry, Please Enter a Valid departure/return date")
            }
            else {
                setisResponse(true)
                setMyAmadeusDataa([])
                var formBody = [];
                for (var property in details) {
                    var encodedKey = encodeURIComponent(property);
                    var encodedValue = encodeURIComponent(details[property]);
                    formBody.push(encodedKey + "=" + encodedValue);
                }
                formBody = formBody.join("&");
                console.log(" Body ===>>> " + formBody)

                await fetch(URL.Authorize_url, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8'
                    },
                    body: formBody
                }).then((response) => {
                    return response.json();
                }).then(async (res) => {
                    console.log("----Response >> ", JSON.stringify(res))
                    var access_token = res.access_token
                    await axios.get(
                        // URL.Flight_Offers + "?originLocationCode=MAD&destinationLocationCode=PAR&departureDate=2022-08-01&adults=2",
                        `https://test.api.amadeus.com/v1/reference-data/locations?subType=AIRPORT,CITY&keyword=${CityAirport}`,
                        {
                            headers: {
                                'Authorization': `Bearer ${access_token}`
                            }
                        }
                    )
                        .then(async (res) => {

                            // setFlightOffersData(res.data)
                            console.log("----Response >> ", JSON.stringify(res.data))
                            var iataCode = res?.data?.data[0]?.iataCode
                            var cityCode = res?.data?.data[0]?.address?.cityCode
                            var countryCode = res?.data?.data[0]?.address?.countryCode

                            console.log("----Response iataCode >> ", iataCode, "  countryCode  ", countryCode, "  cityCode  ", cityCode)

                            if (iataCode == undefined) {
                                alert("Sorry, No any Amadeus Airport exist in this city choose another nearest city")
                                setisResponse(false)

                            } else {
                                // alert("Ok bruh ")
                                // console.log(URL.Flight_Offers + `?originLocationCode=${iataCode}&destinationLocationCode=PAR&departureDate=${departing}&adults=${Persons}&returnDate=${returning}`)
                                await axios.get(
                                    URL.Flight_Offers + `?originLocationCode=${iataCode}&destinationLocationCode=PAR&departureDate=${departing}&adults=${Persons}&returnDate=${returning}&maxPrice=${bugget}`,
                                    {
                                        headers: {
                                            'Authorization': `Bearer ${access_token}`
                                        }
                                    }
                                )
                                    .then(async (res) => {
                                        setisResponse(false)
                                        var resDaata = res?.data?.data
                                        // console.log("-----------------")

                                        if (res?.data?.data != [] && resDaata.length) {
                                            var CountryData = res?.data?.dictionaries?.locations
                                            var AllData = res?.data?.data
                                            var AlDataLenght = AllData?.length

                                            // console.log("first====>>> ", AllData?.length)

                                            for (let i = 0; i < 100; i++) {
                                                var grandPrice = res?.data?.data[i]?.price?.grandTotal
                                                var DepartTime = res?.data?.data[i]?.itineraries[0]?.segments[0]?.departure?.at
                                                // var DepartTime1 = DepartTime.substring(11, 16);
                                                var ReturnTime = res?.data?.data[i]?.itineraries[0]?.segments[0]?.arrival?.at
                                                // var ReturnTime1 = ReturnTime.substring(11, 16);
                                                var flightDuration = res?.data?.data[i]?.itineraries[0]?.duration
                                                var flightDuration1 = flightDuration?.substring(2)
                                                var Seatnumber = res?.data?.data[i]?.itineraries[0]?.segments[0]?.number
                                                // var Seatnumber1 = Seatnumber.substring(0, 3)
                                                var aircraftDaata = {
                                                    "carrierCode": res?.data?.data[i]?.itineraries[0]?.segments[0]?.carrierCode,
                                                    "Seatnumber": Seatnumber,
                                                    "aircraftcode": res?.data?.data[i]?.itineraries[0]?.segments[0]?.aircraft?.code,
                                                    "grandPrice": grandPrice,
                                                    "flightDuration": flightDuration1,
                                                    "departTime": DepartTime,
                                                    "returnTime": ReturnTime,
                                                    "departDate": departing,
                                                    "returDate": returning
                                                }
                                                var arrivalCode = res?.data?.data[i]?.itineraries[0]?.segments[0]?.arrival?.iataCode

                                                // console.log("aircraftDaata  ", JSON.stringify(aircraftDaata))

                                                for (let i in CountryData) {
                                                    let t = CountryData[i]
                                                    if ((t.cityCode != cityCode && countryCode != t.countryCode) && t.cityCode == arrivalCode) {
                                                        // console.log("first" + t.countryCode)
                                                        if (MyAmadeusDataa.length > 0) {
                                                            var len = MyAmadeusDataa.length > 1 ? MyAmadeusDataa.length : 1
                                                            MyAmadeusDataa.map(async (item, index) => {
                                                                item.countryCode == t.countryCode
                                                                    ?
                                                                    null
                                                                    :
                                                                    (index == len - 1 && MyAmadeusDataa.length < 3) &&
                                                                    MyAmadeusDataa.push({ "countryCode": t.countryCode, "cityCode": t.cityCode, "aircraftDaata": aircraftDaata, "Persons": Persons })
                                                            })
                                                        } else {
                                                            MyAmadeusDataa.push({ "countryCode": t.countryCode, "cityCode": t.cityCode, "aircraftDaata": aircraftDaata, "Persons": Persons })
                                                            break;
                                                        }
                                                        break;

                                                    }
                                                }

                                            }


                                            console.log("MyAmadeusDataa===>>>   ", JSON.stringify(MyAmadeusDataa))

                                            if (MyAmadeusDataa.length > 0) {
                                                navigation.replace("Results", { AmadeusDataa: MyAmadeusDataa, access_token: access_token, LeaveCity: CityAirport, isLogged: isLogged })

                                            }
                                            else {
                                                alert("Sorry we don't have flights at this time.")

                                            }
                                            console.log("-----------------")
                                        } else {
                                            alert("Sorry, Amadeus don't have this City or wait for a while Server is down")
                                        }
                                    }).catch((error) => {
                                        setisResponse(false)
                                        alert("Sorry", error)
                                    })


                            }
                        }).catch((error) => {
                            setisResponse(false)
                            alert("Sorry", error)
                        })




                }
                ).catch((error) => {
                    setisResponse(false)
                    if (error) {
                        alert("Sorry " + error)
                    }
                })
            }
        }


    }


    return (
        <SafeAreaView
            style={{ flex: 1, backgroundColor: COLOURS.white }}>
            <View style={style.header}>
                {isLogged && <TouchableOpacity
                    style={{
                        alignItems: 'center',
                        justifyContent: 'center',
                        position: "absolute",
                        marginLeft: 20
                    }}
                    onPress={() => {navigation.navigate("MyBookings") }
                    }
                >
                    <Icon style={{ color: COLOURS.orange }} name="history-edu" size={25} />
                </TouchableOpacity>
                }
                <Image style={style.logo} resizeMode="contain" source={require('../images/shoestring_logo.png')} />
                {isLogged
                    ?
                    <TouchableOpacity
                        style={{
                            alignItems: 'center',
                            justifyContent: 'center',
                            marginLeft: width * 0.25,
                        }}
                        onPress={() =>
                            Alert.alert(
                                "Log Out", "Are you sure to log out?",
                                [
                                    {
                                        text: 'Yes', onPress: async () => {
                                            try {
                                                await AsyncStorage.removeItem('@IsLogin').then(() => {
                                                    navigation.replace('Login')

                                                }

                                                )

                                            } catch (e) {
                                                // error reading value
                                            }

                                        }
                                    },
                                    {
                                        text: 'No', onPress: () => { }
                                    },
                                ]
                            )
                        }
                    >
                        <IconA style={{ color: COLOURS.orange }} name="log-out" size={25} />
                    </TouchableOpacity>
                    :
                    <TouchableOpacity
                        style={{
                            alignItems: 'center',
                            justifyContent: 'center',
                            marginLeft: width * 0.25,

                        }}
                        onPress={() => navigation.replace('Login')}
                    >
                        <FontAwesomeIcon style={{ color: COLOURS.orange }} name="user" size={25} />
                    </TouchableOpacity>
                }
            </View>
            <View style={{ padding: 20 }}>
                <Text style={style.headline}>LOOK FOR YOUR NEW ADVENTURE ON A SHOESTRING</Text>
            </View>
            <View style={{ flex: 1, paddingHorizontal: 20 }}>
                <View style={style.container}>
                    <GooglePlacesAutocomplete
                        styles={{
                            poweredContainer: { display: 'none' },
                            textInput: {
                                color: "gray",
                                backgroundColor: COLOURS.white,
                                borderColor: COLOURS.orange,
                                borderWidth: 2,
                                height: height * 0.071,
                                borderRadius: 10,
                                paddingLeft: width * 0.17
                            }
                        }}
                        renderLeftButton={() =>
                            <Icon style={{ color: COLOURS.orange, position: "absolute", zIndex: 12, margin: 10, marginLeft: width * 0.06 }} name="location-pin" size={28} />
                        }
                        placeholder="Enter your departing City ?"
                        query={{
                            key: 'AIzaSyAGm9Qv2yhO03ggoPIogG3ny3dXsGZFIG0',
                            language: 'en', // language of the results
                        }}
                        onPress={(data) => {
                            console.log(data)

                            console.log(data.structured_formatting.main_text)
                            setCityAirport(data.structured_formatting.main_text)

                        }
                        }
                        onFail={(error) => console.error(error)}
                        requestUrl={{
                            url:
                                'https://cors-anywhere.herokuapp.com/https://maps.googleapis.com/maps/api',
                            useOnPlatform: 'web',
                        }} // this in only required for use on the web. See https://git.io/JflFv more for details.
                    />
                </View>
                {/* </View> */}
                <View style={[style.inputContainer, { marginTop: height * 0.091 }]}>
                    <TouchableOpacity onPress={() => showModeForDeparting('date')}>
                        <Icon style={{ color: COLOURS.orange }} name="calendar-today" size={28} />
                    </TouchableOpacity>
                    <Text style={{ paddingLeft: 10, color: COLOURS.grey }} >{departing}</Text>
                    {/* <TextInput style={{ paddingLeft: 10, color: COLOURS.grey }} placeholder="departing" /> */}
                    <Icon style={{ color: COLOURS.orange, paddingLeft: 10, }} name="arrow-forward" size={28} />
                    <TouchableOpacity onPress={() => showModeA('date')}>
                        <Icon style={{ color: COLOURS.orange, paddingLeft: 10, }} name="calendar-today" size={28} />
                    </TouchableOpacity>
                    <Text style={{ paddingLeft: 10, color: COLOURS.grey }} >{returning}</Text>
                    {/* <TextInput style={{ paddingLeft: 10, color: COLOURS.grey }} placeholder="returning" /> */}
                </View>
                <View>
                    <View style={[style.inputContainer]}>
                        <Icon style={{ color: COLOURS.orange }} name="attach-money" size={28} />
                        <TextInput style={{ paddingLeft: 10, color: COLOURS.grey }}
                            keyboardType="number-pad"
                            onChangeText={(bugget) => {
                                setBugget(bugget)
                            }}
                            placeholder="what's your BUDGET?" />
                    </View>
                    <View style={[style.inputContainer,]}>
                        <Icon style={{ color: COLOURS.orange }} name="person-add-alt" size={28} />
                        <TextInput style={{ paddingLeft: 10, color: COLOURS.grey, flex: 1 }}
                            keyboardType="number-pad"
                            onChangeText={(per) => {
                                setPersons(per)
                            }}
                            maxLength={2}
                            placeholder="No of Persons?" />
                    </View>

                </View>

                {!isResponse ? <TouchableOpacity
                    style={style.btnContainer}
                    activeOpacity={0.8}
                    onPress={() => { getAmadeusData() }}
                >
                    <View style={style.btn}>
                        <Image style={style.symbol} resizeMode="contain" source={require('../images/shoestring_symbol.png')} />
                        <Text
                            style={{
                                fontWeight: "bold",
                                color: COLOURS.white,
                                fontSize: 16,
                            }}
                        >
                            SHOESTRING ME SOMETHING!
                        </Text>
                    </View>
                </TouchableOpacity> :

                    <ActivityIndicator style={{ marginTop: height * 0.08 }} size="large" color={COLOURS.orange} />}
            </View>
            <View style={{ backgroundColor: COLOURS.blue, }}>
                <View>
                    <Text style={style.socialText}>Follow us on our socials!</Text>
                    <View style={style.social}>
                        <TouchableOpacity activeOpacity={0.8} onPress={() => Linking.openURL("https://www.facebook.com/")}>
                            <FontAwesomeIcon style={{ color: COLOURS.white }} name="facebook" size={28} />
                        </TouchableOpacity>
                        <TouchableOpacity activeOpacity={0.8} onPress={() => Linking.openURL("https://www.instagram.com/")}>
                            <FontAwesomeIcon style={{ color: COLOURS.white, paddingLeft: 30, }} name="instagram" size={28} />
                        </TouchableOpacity>
                        <TouchableOpacity activeOpacity={0.8} onPress={() => Linking.openURL("https://twitter.com/")}>
                            <FontAwesomeIcon style={{ color: COLOURS.white, paddingLeft: 30, }} name="twitter" size={28} />
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
            {showDeparting && (
                <DateTimePicker
                    testID='dateTimePicker'
                    value={dateForDeparting}
                    mode={modeForDeparting}
                    is24Hour={true}
                    display='default'
                    onChange={onChange}
                />
            )}
            {showReturning && (
                <DateTimePicker
                    testID='dateTimePicker'
                    value={dateForReturning}
                    mode={modeA}
                    is24Hour={true}
                    display='default'
                    onChange={onChangeReturn}
                />
            )}
            {/* </ScrollView> */}
        </SafeAreaView>
    );
};
const style = StyleSheet.create({
    header: {
        paddingVertical: 20,
        marginTop: height * 0.03,
        flexDirection: 'row',
        // justifyContent: "center",
        alignItems: "center",
        backgroundColor: COLOURS.white,
    },
    logo: {
        maxWidth: 130,
        height: '100%',
        paddingTop: 50,
        marginLeft: width * 0.27
    },
    container: {
        position: "absolute",
        zIndex: 10,
        width: '100%',
        alignSelf: "center",
        marginTop: height * 0.03
    },
    headline: {
        //fontFamily:'Sequel-Regular',
        flexWrap: 'wrap',
        textAlign: 'center',
        fontSize: 20,
        color: COLOURS.blue,
        fontWeight: 'bold',
        marginBottom: -20,
    },
    inputContainer: {
        height: 50,
        width: '100%',
        backgroundColor: COLOURS.white,
        borderRadius: 10,
        borderColor: COLOURS.orange,
        borderWidth: 2,
        top: 20,
        marginTop: 15,
        flexDirection: 'row',
        paddingHorizontal: 20,
        alignItems: 'center',
    },
    btnContainer: {
        marginTop: 45,
    },
    btn: {
        height: 50,
        width: '100%',
        backgroundColor: COLOURS.orange,
        borderRadius: 10,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
    },
    symbol: {
        width: 50,
        height: 30,
        marginRight: 20,
        tintColor: COLOURS.white,
    },
    secondSection: {
        backgroundColor: COLOURS.blue,
        marginTop: 120,
        alignItems: 'center',
        height: 1000,
    },
    placeContainer: {
        flexDirection: 'row',
        justifyContent: 'flex-start',
        padding: 20,
    },
    place: {
        borderRadius: 10,
        height: 220,
        width: '30%',
    },
    socialText: {
        flexWrap: 'wrap',
        textAlign: 'center',
        fontSize: 15,
        color: COLOURS.white,
        fontWeight: 'bold',
        padding: 20,
    },
    social: {
        padding: 20,
        flexDirection: 'row',
        justifyContent: 'center',
    },
});
export default LandingPage;