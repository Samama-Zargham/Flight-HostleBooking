import React, {useState} from 'react';
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
import { CheckBox } from 'react-native-web';

const Login = ({ navigation }) => {

  const [isSelected, setSelection] = useState(false)

  return (
    <SafeAreaView style={{flex:1, backgroundColor: COLOURS.white}}>
      <ImageBackground source={require('../images/login-bg.jpg')} resizeMode="cover" style={style.image}>
        <View style={style.container}>
          <Image style={style.logo} source={require('../images/shoestring_logo.png')} />
          <View style={style.inputContainer}>
            <Icon style={{ color: COLOURS.orange }} name="email" size={23} />
            <TextInput style={{ paddingLeft: 10, color: COLOURS.grey }} placeholder="email address" />
          </View>
          <View style={style.inputContainer}>
            <Icon style={{ color: COLOURS.orange }} name="lock" size={23} />
            <TextInput style={{ paddingLeft: 10, color: COLOURS.grey }} placeholder="password" />
          </View>
          <View style={style.forgotContainer}>
            <TouchableOpacity activeOpacity={0.8} onPress={() => navigation.navigate('')}>  
              <Text style={style.forgot}>forgot password?</Text>
            </TouchableOpacity>
          </View>
          <TouchableOpacity style={style.btnContainer} activeOpacity={0.8} onPress={() => navigation.navigate('')}>
            <View style={style.btn}>
              <Text style={{ fontWeight: 'bold', color: COLOURS.white, fontSize: 16 }}>LOGIN</Text>
            </View>
          </TouchableOpacity>
          <View style={style.registerContainer}>
            <Text style={style.registerText}>don't have an account?</Text>
            <TouchableOpacity activeOpacity={0.8} onPress={() => navigation.navigate('Register')}>  
              <Text style={style.registerHere}> Register here!</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ImageBackground>
    </SafeAreaView>
  )
};

const style = StyleSheet.create({
   container: {
    margin: 40,
    backgroundColor:'rgba(255,255,255,0.9)',
    flex: 1,
    alignItems: 'center',
   },

   image: {
    flex: 1,
    width: null,
    height: null,
   },

   logo: {
    width: 150,
    height: 50,
    margin: 30,

   },

   inputContainer: {
    height: 50,
    width: '80%',
    borderRadius: 10,
    borderColor: COLOURS.orange,
    borderWidth: 2,
    marginTop: 30,
    flexDirection: 'row',
    paddingHorizontal: 20,
    alignItems: 'center',
  },

  forgotContainer: {
    margin: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',

  },

  forgot: {
    color: COLOURS.blue,

  },

  btnContainer: {
    marginTop: 20,
    width: '80%',
  },

  btn: {
    height: 50,
    backgroundColor: COLOURS.orange,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
},

registerContainer: {
  flexDirection: 'row',
  marginTop: 20,
},

registerText: {
  color: COLOURS.grey
},

registerHere: {
  color: COLOURS.blue
},

});

export default Login