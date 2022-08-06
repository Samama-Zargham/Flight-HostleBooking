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

const MyBookings = ({navigation}) => {
    const [MyBookings, setMyBookings] = useState([])
    const [isLoad, setisLoad] = useState(false)

    const clickHandler = () => {
        navigation.navigate("LandingPage")
    };

    useEffect(() => {



    }, [])


    return (
        <SafeAreaView style={style.container}>
            <View style={style.container}>
                <View style={style.header}>
                    <Image style={style.logo} resizeMode="contain" source={require('../images/shoestring_logo.png')} />
                </View>
                {
                    MyBookings.length > 0 
                        ?
                        <Text>My Bookings</Text>
                        
                        :
                        <Text style={style.headline}>No Bookings</Text>
                }

                <TouchableOpacity
                    activeOpacity={0.7}
                    onPress={clickHandler}
                    style={style.touchableOpacityStyle}>
                    <AntDesign name="plus" color={COLOURS.white} size={24} />
                </TouchableOpacity>
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
