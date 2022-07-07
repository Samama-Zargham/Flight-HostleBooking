import React, { useState, useRef } from 'react';
import{
    View,
    Text,
    Image,
    SafeAreaView,
    TouchableOpacity,
    Animated,
    ScrollView,
    Platform,
    FlatList,
    StyleSheet
} from 'react-native';
import { getPixelSizeForLayoutSize } from 'react-native/Libraries/Utilities/PixelRatio';
import COLOURS from '../consts/colours';
import Icon from 'react-native-vector-icons/MaterialIcons';
import FontAwesomeIcon from 'react-native-vector-icons/FontAwesome';

const Results = ({navigation}) => {

    //const [countries, setCountries] = useState(dummyData.countries)
    const [countries, setCountries] = useState([
        { name: 'JAPAN', key: '1', price: '$1000', image: require('../images/japan.jpeg') },
        { name: 'SPAIN', key: '2', price: '$800', image: require('../images/spain.jpeg') },
        { name: 'LAOS', key: '3', price: '$500', image: require('../images/laos.png') },
    ])

    const renderItem = ({ item }) => {
        return (
            <TouchableOpacity activeOpacity={0.9} onPress={() => navigation.navigate('')}>
                <View  style={style.resultItem}>
                    <View>
                        <Image style={style.image} source={item.image}></Image>
                    </View>
                    <View style={style.itemName}>
                        <Text style={{ color: COLOURS.blue, fontWeight: '800', fontSize: 15 }}>{item.name}</Text>
                    </View>
                    <View style={style.itemPrice}>
                        <Text style={{ color: COLOURS.white, fontWeight: '800', fontSize: 18 }}>{item.price}</Text>
                    </View>
                </View>
            </TouchableOpacity>
        );
    };

    function renderHeader(){
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
                    onPress={() => console.log("menu pressed")}
                >
                    <Icon style={{ color: COLOURS.orange }} name="menu" size={28} />

                </TouchableOpacity>

                <View style={{ flex:1, alignItems: 'center', justifyContent: 'center' }}>
                    <Text style={{ color: COLOURS.black, fontWeight: 'bold' }}>
                        $1,000
                    </Text>
                </View>

                <TouchableOpacity
                    styles={{
                        alignItems: 'center',
                        justifyContent: 'center'
                    }}
                    onPress={() => console.log("profile pressed")}
                >
                    <FontAwesomeIcon style={{ color: COLOURS.orange }} name="user" size={25} />
                </TouchableOpacity>
            </View>
        )
    }

  return (
    <SafeAreaView style={{ flex:1, backgroundColor: COLOURS.white }}>
        {renderHeader()}

        <ScrollView contentContainerStyle={{ paddingBottom: Platform.OS === 'ios' ? 40 : 0 }}>
            <View style={{ height: 700 }}>
                <View>
                    <FlatList
                        data={countries}
                        renderItem={ renderItem }
                        ListEmptyComponent = { <Text>There's no options at the moment</Text> }
                    />
                </View>
            </View>
        </ScrollView>
    </SafeAreaView>
  )
};

const style = StyleSheet.create({
    resultItem: {
      flexDirection: 'row',
      margin: 20,
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