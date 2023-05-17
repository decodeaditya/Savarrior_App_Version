import { View, Text, Pressable } from 'react-native'
import React, { useRef, useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { FontVariants, colors } from '../theme'
import { initialUser, screenWidth } from '../utils/const'
import { TextInput } from 'react-native'
import Button from '../components/Button'
import { Image } from 'react-native'
import { useNavigation } from '@react-navigation/native'
import { Alert } from 'react-native'
import { GoogleAuthProvider, createUserWithEmailAndPassword, sendEmailVerification, signInWithPopup, signOut, updateProfile, } from 'firebase/auth'
import { auth } from '../firebase'

const RegisterScreen = () => {

    const navigation = useNavigation()

    const [email, setEmail] = useState('')
    const [code, setCode] = useState('')
    const [name,setName] = useState('')

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
                const res = await createUserWithEmailAndPassword(auth, email, code)
                updateProfile(res.user, {
                    displayName: name,
                    photoURL: "https://cdn-icons-png.flaticon.com/512/4305/4305692.png",
                })
                await sendEmailVerification(res.user)
                signOut(auth)
                Alert.alert("Verify Your Email", "Check your Inbox for Verification Link", [
                    { text: "OK" }
                ])
                navigation.navigate("Login")

            }
            catch (err) {
                Alert.alert(err.code.split("/")[1], " ", [
                    { text: 'OK' },
                ]);
            }
        }
    }

    const googleSignIn = async () => {
        Alert.alert('Coming Soon', "Google Auth on its way ", [
            { text: 'OK' },
        ]);
    }

    return (
        <>
            <SafeAreaView style={{ flex: 1, backgroundColor: colors.white }}>
                <View style={{ padding: 20, paddingHorizontal: 30, backgroundColor: colors.white,alignItems:"center" }}>
                    <Image source={require("../assets/logo.png")} style={{ width: screenWidth * 0.4, height: screenWidth * 0.12 }} />
                </View>
                <View style={{ backgroundColor: colors.white, paddingHorizontal: 20, justifyContent: 'center', height: "80%" }}>
                    <View>
                        <Text style={{ paddingHorizontal: 9, fontSize: screenWidth / 13, fontFamily: FontVariants.weight800, textAlign: "left", color: colors.font }}>Register Now!</Text>
                    </View>
                    <View style={{ marginTop: 15 }}>

                        <Text style={{ fontSize: 18, paddingHorizontal: 10, color: colors.fontGray, fontFamily: FontVariants.weight600 }}>Want to Help Animals? Register to Get Started!</Text>
                        <View
                            style={{
                                fontSize: 18, fontFamily: FontVariants.weight500, paddingHorizontal: 20, backgroundColor: "#f5f5f5", paddingVertical: 15, marginHorizontal: 10, marginTop: 15, borderRadius: 10, flexDirection: 'row', alignItems: "center"
                            }}
                        >
                            <TextInput
                                autoCompleteType="name" style={{ fontSize: 18, fontFamily: FontVariants.weight500, width: "90%", color: colors.fontGray }} value={name} onChangeText={setName} placeholder='Enter Your Name' />
                        </View>
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
                    <View style={{ marginTop: 40, marginHorizontal: 10 }}>
                        <Button title='Register Now' style={{ borderRadius: 10, paddingVertical: 15 }} onPress={handleSubmit} textStyle={{ color: colors.white }} />
                    </View>
                    {/* <View style={{ padding: 15, flexDirection: 'row', alignItems: "center", justifyContent: "center", marginVertical: 10 }}>
                        <View style={{ borderTopWidth: 1, borderTopColor: '#d3d3d3', width: screenWidth / 4 }} />
                        <Text style={{ fontFamily: FontVariants.weight600, fontSize: 18, marginHorizontal: 7, color: colors.fontGray, textAlign: "center" }}>OR</Text>
                        <View style={{ borderTopWidth: 1, borderTopColor: '#d3d3d3', width: screenWidth / 4 }} />
                    </View>

                    <Pressable onPress={googleSignIn}>
                        <View
                            style={{
                                justifyContent: "center", fontSize: 18, fontFamily: FontVariants.weight500, paddingHorizontal: 20, paddingVertical: 20, marginHorizontal: 10, marginTop: 5, borderRadius: 10, flexDirection: 'row', alignItems: "center", borderWidth: 0.5, borderColor: colors.fontGray
                            }}
                        >
                            <Image source={{ uri: "https://upload.wikimedia.org/wikipedia/commons/thumb/5/53/Google_%22G%22_Logo.svg/706px-Google_%22G%22_Logo.svg.png" }} style={{ width: 30, height: 31 }} />
                            <Text style={{ fontFamily: FontVariants.weight600, fontSize: 18, marginLeft: 10 }}>Continue with Google</Text>
                        </View>
                    </Pressable> */}
                    <Pressable style={{ padding: 10, marginTop: 10 }} onPress={() => navigation.navigate("Login")}>
                        <Text style={{ textAlign: "center", fontFamily: FontVariants.weight600, fontSize: 16 }}>Already Have A Account? <Text style={{ color: colors.fontGray, textDecorationColor: colors.black, textDecorationLine: "underline" }}>Sign In</Text></Text>
                    </Pressable>
                </View>
            </SafeAreaView>
        </>
    )
}

export default RegisterScreen