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
  ActivityIndicator,
} from "react-native";
import Icon from "react-native-vector-icons/MaterialIcons";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import WavyBackground from "react-native-wavy-background";
import COLOURS from "../consts/colours";
import { CheckBox } from "react-native-web";

// Auth Api
import { axiosInstance, baseUrl } from "../api";

const Register = ({ navigation }) => {
  const [isSelected, setSelection] = useState(false);
  const [Email, setEmail] = useState("");
  const [loading, setloading] = useState(false);
  const [FirstName, setFirstName] = useState("");
  const [LastName, setLastName] = useState("");
  const [Password, setPassword] = useState("");

  const Signup = () => {
    if (
      Email !== "" &&
      FirstName !== "" &&
      LastName !== "" &&
      Password !== ""
    ) {
      if (Password.length > 7) {
        if (Email.includes("@gmail")) {
          setloading(true);
          const params = {
            firstName: FirstName,
            LastName: LastName,
            Email: Email.toLowerCase(),
            Password: Password,
          };

          axiosInstance
            .post(baseUrl + "users/signup", params)
            .then((res) => {
              console.warn(res);
              const userData = res.data;

              if (userData.status === "200") {
                setloading(false);
                alert("User Register !");
                navigation.goBack();
                // navigation.navigate("Results")
              }
            })
            .catch((error) => {
              if (error) {
                // console.warn(error);
                setloading(false);
                alert("Email Already Registered");
              }
            });
        } else {
          alert("use Valid Email");
        }
      } else {
        setloading(false);
        alert("Password must contain 8 characters.");
      }
    } else {
      setloading(false);
      alert("All fields are Required");
    }
  };

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
        <SafeAreaView style={{ flex: 1, backgroundColor: COLOURS.white }}>
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
              <View style={style.inputContainer}>
                <MaterialCommunityIcons
                  style={{ color: COLOURS.green }}
                  name="pencil"
                  size={23}
                />
                <TextInput
                  style={{ paddingLeft: 10, color: COLOURS.grey }}
                  placeholder="first name"
                  onChangeText={(text) => {
                    setFirstName(text);
                  }}
                />
              </View>
              <View style={style.inputContainer}>
                <MaterialCommunityIcons
                  style={{ color: COLOURS.green }}
                  name="pencil"
                  size={23}
                />
                <TextInput
                  style={{ paddingLeft: 10, color: COLOURS.grey }}
                  placeholder="last name"
                  onChangeText={(text) => {
                    setLastName(text);
                  }}
                />
              </View>
              <View style={style.inputContainer}>
                <Icon style={{ color: COLOURS.green }} name="email" size={23} />
                <TextInput
                  style={{ paddingLeft: 10, color: COLOURS.grey }}
                  placeholder="email address"
                  onChangeText={(text) => {
                    setEmail(text);
                  }}
                />
              </View>
              <View style={style.inputContainer}>
                <Icon style={{ color: COLOURS.green }} name="lock" size={23} />
                <TextInput
                  style={{ paddingLeft: 10, color: COLOURS.grey }}
                  placeholder="password"
                  onChangeText={(text) => {
                    setPassword(text);
                  }}
                />
              </View>
              <TouchableOpacity
                style={style.btnContainer}
                activeOpacity={0.8}
                onPress={() => Signup()}
              >
                <View style={style.btn}>
                  <Text
                    style={{
                      fontWeight: "bold",
                      color: COLOURS.white,
                      fontSize: 16,
                    }}
                  >
                    REGISTER
                  </Text>
                </View>
              </TouchableOpacity>
              <View style={style.loginContainer}>
                <Text style={style.loginText}>already have an account?</Text>
                <TouchableOpacity
                  activeOpacity={0.8}
                  onPress={() => navigation.replace("Login")}
                >
                  <Text style={style.loginHere}> Login here!</Text>
                </TouchableOpacity>
              </View>
            </View>
          </ImageBackground>
        </SafeAreaView>
      )}
    </>
  );
};

const style = StyleSheet.create({
  container: {
    margin: 40,
    backgroundColor: "rgba(255,255,255,0.9)",
    flex: 1,
    alignItems: "center",
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
    width: "80%",
    borderRadius: 10,
    borderColor: COLOURS.green,
    borderWidth: 2,
    marginTop: 30,
    flexDirection: "row",
    paddingHorizontal: 20,
    alignItems: "center",
  },

  btnContainer: {
    marginTop: 40,
    width: "80%",
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

export default Register;