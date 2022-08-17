import React,{useState} from 'react'
import { Text,TouchableOpacity, View, StyleSheet } from 'react-native';
import { axiosInstance, baseUrl } from "../../api";
import {TextInput, Card } from 'react-native-paper';
const ResetPassword = ({route,navigation}) => {
  const {Email} = route.params;
  const [password,setPassword] = useState(null)
  const updatePassword = async()=>{
    const res  = await axiosInstance.post(baseUrl + "users/updatePassword",{Email:Email,Password:password});
    if(res){
      navigation.navigate("Login")
    }
    else{
      console.log(res.data);
    }
  }
  return (
    <View style={styles.container}>
      <Text style={styles.paragraph}>
        Reset Password
      </Text>
      <Card>
        <Text style={styles.paragraph}> New Password </Text>
        <View>
        <TextInput
        lable='Password'
        placeholder="Password"
        secureTextEntry
        onChangeText={(text) => {
          setPassword(text);
        }}
       left={<TextInput.Icon name="lock" />}
        style={styles.input}
      />
        </View>
        <View>
<TouchableOpacity
        style={styles.button}
        onPress={updatePassword}
      >
        <Text>Reset</Text>
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
      margin: 12
    },
    paragraph: {
      margin: 24,
      fontSize: 18,
      fontWeight: 'bold',
      textAlign: 'center',
      color:'#5ead97'
    },
  });
export default ResetPassword
