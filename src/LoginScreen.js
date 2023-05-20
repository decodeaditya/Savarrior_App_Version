import { View, Text, Pressable, Alert } from 'react-native'
import React, { useRef, useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { FontVariants, colors } from '../theme'
import { screenWidth, screenHeight } from '../utils/const'
import { TextInput } from 'react-native'
import Button from '../components/Button'
import { Image } from 'react-native'
import { useNavigation } from '@react-navigation/native'
import { auth } from '../firebase'
import { deleteUser, sendPasswordResetEmail, signInWithEmailAndPassword, signOut } from 'firebase/auth'
import AsyncStorage from '@react-native-async-storage/async-storage'

const LoginScreen = () => {
    const navigation = useNavigation()

    const [email, setEmail] = useState('')
    const [code, setCode] = useState('')


    const emailRegex = new RegExp(/(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])/)

    const handleSubmit = async () => {
        if (!emailRegex.test(email)) {
            Alert.alert('Invalid Email', 'Enter A Valid Email', [
                { text: 'OK' },
            ]);
        }
        else if (!code.length > 5) {
            Alert.alert('Invalid Password', 'Enter A Password with at least 6 characters', [
                { text: 'OK' },
            ]);

        }
        else {
            try {
                const res = await signInWithEmailAndPassword(auth, email, code)
                if (res.user.emailVerified) {
                    navigation.navigate("BottomNav")
                    await AsyncStorage.setItem("Notifications", JSON.stringify([]))
                }
                else {
                    Alert.alert('Email Not Verified', 'Login with a Verified Email', [
                        { text: 'OK' },
                    ]);
                    deleteUser(res.user)
                }
            }
            catch (err) {
                Alert.alert(err.code.split("/")[1], " ", [
                    { text: 'OK' },
                ]);
            }
        }
    }


    const handleChangePassword = () => {
      if(emailRegex.test(email)){
        sendPasswordResetEmail(auth, email)
        .then(() => {
            Alert.alert('Reset Link Sent',"Password Reset Link Sent to Your Email",[
                {text:'OK'}
            ])
        })
        .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
            Alert.alert(errorCode.split("/")[1],null,[
                {text:'OK'}
            ])
        });
      }
      else{
        Alert.alert('Invalid Email','Enter A Valid Email',[
            {text:'OK'}
        ])
      }
    }


    return (
        <>
            <SafeAreaView style={{ flex: 1, backgroundColor: colors.white }}>
                <View style={{ backgroundColor: colors.white, paddingHorizontal: 20, justifyContent: 'center', height: "100%" }}>
                    <View style={{ padding: 5, paddingHorizontal: 30, backgroundColor: colors.white, alignItems: "center" }}>
                        <Image source={require("../assets/logo-circle.png")} style={{ width: screenWidth * 0.24, height: screenWidth * 0.24 }} />
                    </View>
                    <View>
                        <Text style={{ paddingHorizontal: 9, fontSize: screenWidth / 12, fontFamily: FontVariants.weight800, textAlign: "left", color: colors.font, textAlign: "center" }}>Login</Text>
                    </View>
                    <View style={{ marginTop: 30 }}>
                        <View
                            style={{
                                fontSize: 18, fontFamily: FontVariants.weight500, paddingHorizontal: 20, backgroundColor: "#f5f5f5", paddingVertical: 15, marginHorizontal: 10, marginTop: 15, borderRadius: 10, flexDirection: 'row', alignItems: "center"
                            }}
                        >
                            <TextInput
                                autoCompleteType="email" style={{ fontSize: 18, fontFamily: FontVariants.weight500, width: "90%", color: colors.fontGray }} value={email} onChangeText={setEmail} placeholder='Enter Email' />
                        </View>
                        <View
                            style={{
                                fontSize: 18, fontFamily: FontVariants.weight500, paddingHorizontal: 20, backgroundColor: "#f5f5f5", paddingVertical: 15, marginHorizontal: 10, marginTop: 15, borderRadius: 10, flexDirection: 'row', alignItems: "center"
                            }}
                        >
                            <TextInput style={{ fontSize: 18, fontFamily: FontVariants.weight500, width: "90%", color: colors.fontGray }} placeholder='Enter Password' secureTextEntry={true} value={code} onChangeText={setCode} />
                        </View>
                    </View>
                    <Pressable style={{ padding: 10, marginTop: 1 }} onPress={handleChangePassword}>
                        <Text style={{ textAlign: "right", fontFamily: FontVariants.weight500, fontSize: 16, textDecorationLine: "underline", color: colors.fontGray }}>Forgot Password?</Text>
                    </Pressable>
                    <View style={{ marginTop: 20, marginHorizontal: 10, marginBottom: 10 }}>
                        <Button title='Login' style={{ borderRadius: 10, paddingVertical: 15 }} onPress={handleSubmit} textStyle={{ color: colors.white }} />
                    </View>
                    {/* <View style={{flexDirection: 'row', alignItems: "center", justifyContent: "center", marginVertical: 15 }}>
                        <View style={{ borderTopWidth: 1, borderTopColor: '#d3d3d3', width: screenWidth / 4 }} />
                        <Text style={{ fontFamily: FontVariants.weight600, fontSize: 18, marginHorizontal: 7, color: colors.fontGray, textAlign: "center" }}>OR</Text>
                        <View style={{ borderTopWidth: 1, borderTopColor: '#d3d3d3', width: screenWidth / 4 }} />
                    </View> */}
                    {/*
                  <Pressable>
                  <View
                          style={{
                             justifyContent:"center", fontSize: 18, fontFamily: FontVariants.weight500, paddingHorizontal: 20, paddingVertical: 20, marginHorizontal: 10, marginTop: 5, borderRadius: 10, flexDirection: 'row', alignItems: "center",borderWidth:0.5,borderColor:colors.fontGray
                          }}
                      >
                          <Image source={{uri:"https://upload.wikimedia.org/wikipedia/commons/thumb/5/53/Google_%22G%22_Logo.svg/706px-Google_%22G%22_Logo.svg.png"}} style={{width:30,height:31}}/>
                          <Text style={{fontFamily:FontVariants.weight600,fontSize:18,marginLeft:10}}>Countinue with Google</Text>
                      </View>
                  </Pressable> */}
                    <Pressable style={{ padding: 2 }} onPress={() => navigation.navigate("Register")}>
                        <Text style={{ textAlign: "center", fontFamily: FontVariants.weight600, fontSize: 16 }}>Don't have an account? <Text style={{ color: colors.fontGray, textDecorationColor: colors.black, textDecorationLine: "underline" }}>Sign Up</Text></Text>
                    </Pressable>
                </View>
            </SafeAreaView>
        </>
    )
}

export default LoginScreen