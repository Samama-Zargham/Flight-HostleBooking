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
import Icon from 'react-native-vector-icons/MaterialIcons';
import FontAwesomeIcon from 'react-native-vector-icons/FontAwesome';
import WavyBackground from 'react-native-wavy-background';
import COLOURS from '../consts/colours';

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

const Details = ({ navigation }) => {
    const [status, setStatus] = useState('Hotel')
    const [datalist, setDatalist] = useState(data)
    const setStatusFilter = status => {
        setDatalist([...data.filter(e => e.status === status)])
        
        setStatus(status)
    }
    const renderItem = ({item, index}) => {
        return (
            <View key={index}>
                <View>
                    <Text>{item.name}</Text>
                    <Text>{item.address}</Text>
                </View>
            </View>
        )
    }

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
                    onPress={() => navigation.navigate('Results')}
                >
                    <Icon style={{ color: COLOURS.orange }} name="arrow-back-ios" size={28} />

                </TouchableOpacity>

                <View style={{ flex:1, alignItems: 'center', justifyContent: 'center' }}>
                    <Text style={{ color: COLOURS.black, fontWeight: 'bold' }}>
                        JAPAN
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
    <SafeAreaView style={{flex:1, backgroundColor: COLOURS.white,}}>
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
                data = {datalist}
                keyExtractor = {(e, i) => i.toString()}
                renderItem = {renderItem}
            />
        </View>
    </SafeAreaView>
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

});

export default Details