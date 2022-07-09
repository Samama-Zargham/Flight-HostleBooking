import React from "react";
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

const LandingPage = ({ navigation }) => {
    return(
        <SafeAreaView
            style={{flex:1, backgroundColor: COLOURS.white}}>
                <StatusBar translucent={false} backgroundColor={COLOURS.orange} />
                <View style={style.header}>
                    <Image style={style.logo} resizeMode="contain" source={require('../images/shoestring_logo.png')} />
                </View>
                <ScrollView showsVerticalScrollIndicator={false}>
                    <View style={{ padding: 20 }}>
                        <Text style={style.headline}>LOOK FOR YOUR NEW ADVENTURE ON A SHOESTRING</Text>
                    </View>
                    <View style={{ flex: 1, paddingHorizontal: 20 }}>
                        <View style={style.inputContainer}>
                            <Icon style={{ color: COLOURS.orange }} name="location-pin" size={28} />
                            <TextInput style={{ paddingLeft: 10, color: COLOURS.grey }} placeholder="where are you departing from?" />
                        </View>
                        <View style={style.inputContainer}>
                            <Icon style={{ color: COLOURS.orange }} name="calendar-today" size={28} />
                            <TextInput style={{ paddingLeft: 10, color: COLOURS.grey }} placeholder="departing" />
                            <Icon style={{ color: COLOURS.orange, paddingLeft: 20, }} name="arrow-forward" size={28} />
                            <Icon style={{ color: COLOURS.orange, paddingLeft: 20, }} name="calendar-today" size={28} />
                            <TextInput style={{ paddingLeft: 10, color: COLOURS.grey }} placeholder="returning" />
                        </View>
                        <View style={style.inputContainer}>
                            <Icon style={{ color: COLOURS.orange }} name="attach-money" size={28} />
                            <TextInput style={{ paddingLeft: 10, color: COLOURS.grey }} placeholder="what's your BUDGET?" />
                        </View>
                        <TouchableOpacity style={{marginTop: 45}} activeOpacity={0.8} onPress={() => navigation.navigate('Results')}>
                            <View style={style.btn}>
                                <Image style={style.symbol} resizeMode="contain" source={require('../images/shoestring_symbol.png')} />
                                <Text style={{ fontWeight: 'bold', color: COLOURS.white, fontSize: 16 }}>SHOESTRING ME SOMETHING!</Text>
                            </View>
                        </TouchableOpacity>
                    </View>
                    <View
                            style={{
                                position: 'absolute',
                                bottom: 0,
                                left: 0,
                                right: 0,
                                top: 320,
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
                        </View>
                        <View style={{backgroundColor: COLOURS.blue, height: 250, marginTop: 100,}}>
                            <View>
                                <Text style={style.socialText}>Follow us on our socials!</Text>
                                <View style={style.social}>
                                    <TouchableOpacity activeOpacity={0.8} onPress={() => navigation.navigate('')}>
                                        <FontAwesomeIcon style={{ color: COLOURS.white}} name="facebook" size={28} /> 
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
                        
                </ScrollView>
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

    headline: {
        flex:1, 
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

    secondSection:{
        backgroundColor: COLOURS.blue,
        marginTop: 120,
        alignItems: 'center',
        height: 1000,
    },

    placeContainer:{
        flexDirection: 'row',
        justifyContent: 'flex-start',
        padding: 20,
    },

    place:{
        borderRadius: 10,
        height: 220,
        width: '30%',
    },

    socialText:{
        flexWrap: 'wrap', 
        textAlign: 'center',
        fontSize: 15,
        color: COLOURS.white,
        fontWeight: 'bold',
        padding: 20,
    },

    social:{
        padding: 20,
        flexDirection: 'row',
        justifyContent: 'center',

    },

});

export default LandingPage;