import React, { useState } from "react";
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
import Icon from 'react-native-vector-icons/MaterialIcons';
import FontAwesomeIcon from 'react-native-vector-icons/FontAwesome';
import WavyBackground from 'react-native-wavy-background';
import COLOURS from '../consts/colours';
import DateTimePicker from '@react-native-community/datetimepicker';
import Constants from 'expo-constants';
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';
const { width, height } = Dimensions.get("window")
const LandingPage = ({ navigation }) => {
    const [Location, setLocation] = useState("")
    const [bugget, setBugget] = useState()
    // Calender For Departing
    const [dateForDeparting, setDateForDeparting] = useState(new Date())
    const [modeForDeparting, setModeForDeparting] = useState('date')
    const [showDeparting, setShowDeparting] = useState(false)
    const [departing, setDeparting] = useState('departing')
    const onChange = (event, selectDate) => {
        const currentDate = selectDate || date;
        setShowDeparting(Platform.OS === 'ios');
        setDateForDeparting(currentDate);
        let tempDate = new Date(currentDate);
        let fDate = tempDate.getDate() + '/' + (tempDate.getMonth() + 1) + '/' + tempDate.getFullYear();
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
    const onChangeReturn = (event, selectDate) => {
        const currentDate = selectDate || date;
        setShowReturning(Platform.OS === 'ios');
        setDateForReturning(currentDate);
        let tempDate = new Date(currentDate);
        let fDate = tempDate.getDate() + '/' + (tempDate.getMonth() + 1) + '/' + tempDate.getFullYear();
        setReturning(fDate)
    }
    const showModeA = (currentMode) => {
        setShowReturning(true);
        setModeForReturning(currentMode);
    }
    return (
        <SafeAreaView
            style={{ flex: 1, backgroundColor: COLOURS.white }}>
            <View style={style.header}>
                <Image style={style.logo} resizeMode="contain" source={require('../images/shoestring_logo.png')} />
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
                                height: height*0.071,
                                borderRadius: 10,
                                paddingLeft:width*0.17
                            }
                        }}
                        renderLeftButton={()=>
                        <Icon style={{ color: COLOURS.orange,position:"absolute",zIndex:12, margin:10, marginLeft:width*0.06 }} name="location-pin" size={28} />
                        }
                        placeholder="where are you departing from?"
                        query={{
                            key: 'AIzaSyAGm9Qv2yhO03ggoPIogG3ny3dXsGZFIG0',
                            language: 'en', // language of the results
                        }}
                        onPress={(data, details = null) => console.log(data)}
                        onFail={(error) => console.error(error)}
                        requestUrl={{
                            url:
                                'https://cors-anywhere.herokuapp.com/https://maps.googleapis.com/maps/api',
                            useOnPlatform: 'web',
                        }} // this in only required for use on the web. See https://git.io/JflFv more for details.
                    />
                </View>
                {/* </View> */}
                <View style={[style.inputContainer, { marginTop: height*0.091 }]}>
                    <TouchableOpacity onPress={() => showModeForDeparting('date')}>
                        <Icon style={{ color: COLOURS.orange }} name="calendar-today" size={28} />
                    </TouchableOpacity>
                    <Text style={{ paddingLeft: 10, color: COLOURS.grey }} >{departing}</Text>
                    {/* <TextInput style={{ paddingLeft: 10, color: COLOURS.grey }} placeholder="departing" /> */}
                    <Icon style={{ color: COLOURS.orange, paddingLeft: 20, }} name="arrow-forward" size={28} />
                    <TouchableOpacity onPress={() => showModeA('date')}>
                        <Icon style={{ color: COLOURS.orange, paddingLeft: 20, }} name="calendar-today" size={28} />
                    </TouchableOpacity>
                    <Text style={{ paddingLeft: 10, color: COLOURS.grey }} >{returning}</Text>
                    {/* <TextInput style={{ paddingLeft: 10, color: COLOURS.grey }} placeholder="returning" /> */}
                </View>
                <View style={style.inputContainer}>
                    <Icon style={{ color: COLOURS.orange }} name="attach-money" size={28} />
                    <TextInput style={{ paddingLeft: 10, color: COLOURS.grey }}
                        keyboardType="number-pad"
                        onChangeText={(bugget) => {
                            setBugget(bugget)
                        }}
                        placeholder="what's your BUDGET?" />
                </View>
                <TouchableOpacity
                    style={style.btnContainer}
                    activeOpacity={0.8}
                    onPress={() => navigation.navigate('Results')}
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
                </TouchableOpacity>
            </View>
            {/* <View
                            style={{
                                position: 'absolute',
                                bottom: 0,
                                left: 0,
                                right: 0,
                                top: 400,
                            }}>
                                <WavyBackground
                                height={300}
                                width={1100}
                                amplitude={25}
                                frequency={1}
                                offset={150}
                                color="#67CAE0"
                                bottom
                                />
                        </View> */}
            <View style={{ backgroundColor: COLOURS.blue, }}>
                <View>
                    <Text style={style.socialText}>Follow us on our socials!</Text>
                    <View style={style.social}>
                        <TouchableOpacity activeOpacity={0.8} onPress={() => navigation.navigate('')}>
                            <FontAwesomeIcon style={{ color: COLOURS.white }} name="facebook" size={28} />
                        </TouchableOpacity>
                        <TouchableOpacity activeOpacity={0.8} onPress={() => navigation.navigate('')}>
                            <FontAwesomeIcon style={{ color: COLOURS.white, paddingLeft: 20, }} name="instagram" size={28} />
                        </TouchableOpacity>
                        <TouchableOpacity activeOpacity={0.8} onPress={() => navigation.navigate('')}>
                            <FontAwesomeIcon style={{ color: COLOURS.white, paddingLeft: 20, }} name="twitter" size={28} />
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
        paddingHorizontal: 20,
        flexDirection: 'row',
        justifyContent: 'space-between',
        backgroundColor: COLOURS.white,
    },
    logo: {
        maxWidth: 350,
        height: '100%',
        paddingTop: 50,
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