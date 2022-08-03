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

const Results = ({ route, navigation }) => {

    const { AmadeusDataa } = route.params;
    // console.log("---->>>>>>>>>>>>>>>>>>>>>>> ", JSON.stringify(AmadeusDataa))
    // console.log("-----------" + JSON.stringify(CountryLIST))

    const [countries, setCountries] = useState([
        { name: 'JAPAN', key: '1', price: '$1000', image: require('../images/japan.jpeg') },
        { name: 'SPAIN', key: '2', price: '$800', image: require('../images/spain.jpeg') },
        { name: 'LAOS', key: '3', price: '$500', image: require('../images/laos.png') },
    ])

    const renderItem = ({ item, index }) => {

        return (
            <TouchableOpacity activeOpacity={0.9} onPress={() => navigation.navigate('Details', { aircraftDaata: item?.aircraftDaata })}>
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
                        $1,000
                    </Text>
                </View>

                <TouchableOpacity
                    styles={{
                        alignItems: 'center',
                        justifyContent: 'center'
                    }}
                    onPress={() => navigation.navigate('Login')}
                >
                    <FontAwesomeIcon style={{ color: COLOURS.orange }} name="user" size={25} />
                </TouchableOpacity>
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