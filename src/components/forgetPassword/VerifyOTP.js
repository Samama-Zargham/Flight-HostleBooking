import React,{ useState} from 'react'
import { Text,TouchableOpacity, View, StyleSheet } from 'react-native';
import { axiosInstance, baseUrl } from "../../api";
import {TextInput, Card } from 'react-native-paper';
const VerifyOTP = ({route,navigation}) => {
  const {Email} = route.params;
  const [otp,setOtp] = useState(null)
  const verityOtp = async ()=>{
    const res  = await axiosInstance.post(baseUrl + "users/verifyOTP",{Email:Email,otp:otp});
    if(res){
      navigation.navigate("ResetPassword",{
        Email:Email
      })
    }
    else{
      alert("someThing Wrong");
      console.log(res.data);
    }
  }
  return (
    <View style={styles.container}>
      <Text style={styles.paragraph}>
        Reset Password
      </Text>
      <Card>
        <Text style={styles.paragraph}> Enter OTP </Text>
        <View>
        <TextInput
        lable='number'
        placeholder="OTP"
        onChangeText={(text) => {
          setOtp(text);
        }}
       left={<TextInput.Icon name="link" />}
        style={styles.input}
      />
        </View>
        <View>
<TouchableOpacity
        style={styles.button}
        onPress={verityOtp}
      >
        <Text>Press Here</Text>
      </TouchableOpacity>
        </View>
        
        
      </Card>
    </View>
  )
}
const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'center',
      backgroundColor: '#ecf0f1',
      padding: 8,
    },
    button: {
      alignItems: "center",
      backgroundColor: "#5ead97",
      padding: 10
    },
    input: {
      margin: 12,
    },
    paragraph: {
      margin: 24,
      fontSize: 18,
      fontWeight: 'bold',
      textAlign: 'center',
      color:'#5ead97'
    },
  });
export default VerifyOTP
