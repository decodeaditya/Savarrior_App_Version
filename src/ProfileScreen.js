import { ActivityIndicator, Alert, StyleSheet, Text, View } from 'react-native'
import React, { useContext, useEffect, useLayoutEffect, useState } from 'react'
import { FontVariants, colors } from '../theme';
import { Pressable } from 'react-native';
import { Image } from 'react-native';
import { ScrollView } from 'react-native';
import Button from '../components/Button';
import UserRescue from '../components/UserRescue';
import { TextInput } from 'react-native';
import { AuthContext } from '../AuthContext';
import { signOut, updateProfile } from 'firebase/auth';
import { auth, db } from '../firebase';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { FirebaseContext } from '../FirebaseData';
import { screenHeight, screenWidth } from '../consts';
import ReactNativeModal from 'react-native-modal';
import CheckBox from 'expo-checkbox';
import { doc, setDoc } from 'firebase/firestore';

const ProfileScreen = ({ navigation }) => {

    const [ngoProfile, setNgoProfile] = useState(false)
    const [loading, setLoading] = useState(false)

    const [selectedTab, setSelectedTab] = useState("rescues")
    const { displayCurrentAddress, CurrentUser } = useContext(AuthContext)
    const [mobile, setMobile] = useState(null)
    const [name, setName] = useState(CurrentUser.displayName)

    const getPhone = async () => {
        const Phone = await AsyncStorage.getItem("Phone")
        Phone ? setMobile(Phone) : null
    }
    getPhone()


    const { RescuesList } = useContext(FirebaseContext)
    const { NgosList } = useContext(FirebaseContext)

    const filterdList = NgosList.filter((ngo) => {
        return ngo.id.includes(auth.currentUser.uid)
    })

    const userNgo = filterdList[0]

    const [website, setSite] = useState(userNgo ? userNgo.web : "")
    const [address, setAddress] = useState(displayCurrentAddress)
    const [img1, setImg1] = useState(userNgo ? userNgo.images.img1 : null)
    const [img2, setImg2] = useState(userNgo ? userNgo.images.img2 : null)

    const UserRescuesList = RescuesList.filter((rescue) => {
        return rescue.id.includes(auth.currentUser.uid)
    })

    const [animals, setAnimals] = useState(userNgo ? userNgo.animals : [])
    const serve_animals = ['Birds', 'Small Animals', 'Large Animals', 'Wild Animals']

    const [services, setServices] = useState(userNgo ? userNgo.services : [])
    const service_options = ['Sterlization', 'Feeding', 'Rescue', 'Adoption']


    const handleNgo = async () => {
        setLoading(!loading)
        if (animals.length !== 0 && services.length !== 0 && img1 && img2) {
            try {
                const ngoId = `ngo${CurrentUser?.displayName}${CurrentUser?.uid}`
                await setDoc(doc(db, 'ngos', ngoId), {
                    id: ngoId,
                    name: CurrentUser?.displayName,
                    email: CurrentUser?.email,
                    phoneNumber: mobile,
                    web: website,
                    images: {
                        img1: img1,
                        img2: img2
                    },
                    location: address,
                    userProfileImg: CurrentUser?.photoURL,
                    animals: animals,
                    services: services
                })
                navigation.navigate("Success", "ngo")
                setLoading(!loading)
            }
            catch (err) {
                Alert.alert('Something Went Wrong', { err }, [
                    { text: 'OK' },
                ]);
            }
        }
        else {
            Alert.alert('Empty or Invalid Fields', 'Please Fill All the Fields Correctly', [
                { text: 'OK' },
            ]);
        }
    }


    useLayoutEffect(() => {
        navigation.setOptions({
            headerShown: true,
            title: "Profile",
            headerTitleAlign: "left",
            headerTitleStyle: {
                fontSize: 24,
                fontFamily: FontVariants.weight700,
                color: colors.secondry,
            },
            headerStyle: {
                height: 60,
                elevation: 0
            },
            headerLeft: () => (
                <Pressable style={{ backgroundColor: "white", padding: 10, borderRadius: 10 }} onPress={() => navigation.goBack()}>
                    <Image source={{ uri: "https://cdn-icons-png.flaticon.com/512/271/271220.png" }} style={{ width: 20, height: 20, }} />
                </Pressable>
            ),
        });
    }, []);

    const RescueTab = () => (
        <View style={{ marginTop: 10, paddingBottom: 20 }}>
            {UserRescuesList.map((res, index) => (
                <UserRescue key={index} data={res} />
            ))}
            {UserRescuesList.length === 0 &&
                <View style={{ justifyContent: "center", alignItems: "center", height: screenHeight / 3 }}>
                    <Image source={{ uri: 'https://img.freepik.com/free-vector/add-user-concept-illustration_114360-567.jpg?w=740&t=st=1684039832~exp=1684040432~hmac=6747383d99b5db59eb170357ef01d47b291d8d3828e488f002dc3920382962a9' }} style={{ width: 170, height: 170 }} />
                    <Text style={{ marginTop: 10, fontFamily: FontVariants.weight700, fontSize: 19, color: colors.fontGray }}>No Rescues Here</Text>
                </View>
            }
        </View>
    )

    const signout = () => {
        signOut(auth)
        navigation.navigate("Login")
    }

    const handleProfile = async () => {
        if (name == '') {
            Alert.alert('Invalid Name', 'Enter A Valid Name', [
                { text: 'OK', onPress: () => setMobile("") },
            ]);
        }
        else {
            await updateProfile(CurrentUser, {
                displayName: name,
            })

            await AsyncStorage.setItem("Phone", mobile)

            Alert.alert('Profile Update was Successfull', "Great, Profile was Updated", [
                { text: 'OK' },
            ]);
        }
    }


    const pickAnimals = (animal) => {
        if (animals.includes(animal)) {
            const ele = animals.filter((item) => {
                return item !== animal
            })
            setAnimals(ele)
        }
        else {
            setAnimals(item => item.concat(animal))
        }
    }

    const pickServices = (service) => {
        if (services.includes(service)) {
            const ele = services.filter((item) => {
                return item !== service
            })
            setServices(ele)
        }
        else {
            setServices(item => item.concat(service))
        }
    }

    return (
        <ScrollView style={{ flex: 1, backgroundColor: "#fff" }}>
            <Pressable style={{ alignItems: 'center', padding: 15 }}>
                <Image source={{ uri: CurrentUser.photoURL }} style={{ borderRadius: 20, width: 120, height: 120 }} />
                <Text style={{ fontSize: 27, marginTop: 10, fontFamily: FontVariants.weight800, color: colors.font }}>{CurrentUser.displayName}</Text>
                <Text style={{ fontSize: 18, marginTop: 3, fontFamily: FontVariants.weight700, color: colors.fontGray }}>{userNgo ? "Animal Welfare NGO" : "Warrior for Animals"}</Text>
                <Button onPress={signout} title='Logout' style={{ marginTop: 3, fontFamily: FontVariants.weight700, backgroundColor: colors.primary, borderRadius: 10, marginTop: 19 }} textStyle={{ color: '#fff' }} />
            </Pressable>
            <Pressable style={{ flexDirection: 'row', marginTop: 20, marginHorizontal: 15, padding: 10, backgroundColor: "whitesmoke", borderRadius: 10 }}>
                <Button title='My Rescues' style={{ ...styles.shadow, width: "48%", backgroundColor: selectedTab === 'rescues' ? '#fff' : 'whitesmoke', marginRight: 10, borderRadius: 10, elevation: selectedTab === "rescues" ? 3 : 0 }} textStyle={{ color: selectedTab === 'rescues' ? colors.font : colors.fontGray }} onPress={() => setSelectedTab('rescues')} />
                <Button title='Info' style={{ ...styles.shadow, width: "48%", backgroundColor: selectedTab === 'info' ? '#fff' : 'whitesmoke', marginRight: 10, borderRadius: 10, elevation: selectedTab === "info" ? 3 : 0 }} textStyle={{ color: selectedTab === 'info' ? colors.font : colors.fontGray }} onPress={() => setSelectedTab('info')} />
            </Pressable>
            {selectedTab === 'rescues' ? (
                <RescueTab />
            ) : (
                <ScrollView showsVerticalScrollIndicator={false} style={{ paddingHorizontal: 10, paddingTop: 30, paddingBottom: 15 }}>
                    <View style={{ marginVertical: 10 }}>
                        <Text style={{ fontSize: 18, paddingHorizontal: 10, color: colors.font, fontFamily: FontVariants.weight500 }}>Name</Text>
                        <TextInput value={name} onChangeText={setName} placeholder='Enter Your Name' style={{ fontSize: 18, fontFamily: FontVariants.weight500, paddingHorizontal: 20, backgroundColor: "#f5f5f5", paddingVertical: 15, marginHorizontal: 10, marginTop: 10, borderRadius: 10 }} />
                    </View>
                    <View style={{ marginVertical: 10 }}>
                        <Text style={{ fontSize: 18, paddingHorizontal: 10, color: colors.font, fontFamily: FontVariants.weight500 }}>Email</Text>
                        <Text style={{ fontSize: 18, fontFamily: FontVariants.weight500, paddingHorizontal: 20, backgroundColor: "#f5f5f5", paddingVertical: 15, marginHorizontal: 10, marginTop: 10, borderRadius: 10, color: colors.secondry }}>{CurrentUser.email}</Text>
                    </View>
                    <View style={{ marginVertical: 10 }}>
                        <Text style={{ fontSize: 18, paddingHorizontal: 10, color: colors.font, fontFamily: FontVariants.weight500 }}>Phone Number</Text>
                        <View
                            style={{
                                fontSize: 18, fontFamily: FontVariants.weight500, paddingHorizontal: 20, backgroundColor: "#f5f5f5", paddingVertical: 15, marginHorizontal: 10, marginTop: 10, borderRadius: 10, flexDirection: 'row', alignItems: "center"
                            }}
                        >
                            <Text style={{ fontFamily: FontVariants.weight500, fontSize: 18, marginRight: 10 }}>+91</Text>
                            <TextInput keyboardType="phone-pad"
                                autoCompleteType="tel" style={{ fontSize: 18, fontFamily: FontVariants.weight500, width: "90%", color: colors.fontGray }} value={mobile} onChangeText={setMobile} placeholder='Enter Mobile Number' />
                        </View>
                    </View>
                    <View style={{ marginVertical: 10 }}>
                        <Text style={{ fontSize: 18, paddingHorizontal: 10, color: colors.font, fontFamily: FontVariants.weight500 }}>Location</Text>
                        <Text style={{ fontSize: 18, fontFamily: FontVariants.weight500, paddingHorizontal: 20, backgroundColor: "#f5f5f5", paddingVertical: 15, marginHorizontal: 10, marginTop: 10, borderRadius: 10, color: colors.secondry }}>{displayCurrentAddress}</Text>
                    </View>
                    <Button title='Update Profile' textStyle={{ color: '#fff' }} style={{ backgroundColor: colors.primary, marginHorizontal: 10, marginRight: 10, borderRadius: 10, marginTop: 20 }} onPress={handleProfile} />
                    <View style={{ padding: 15, flexDirection: 'row', alignItems: "center", justifyContent: "center", marginVertical: 10 }}>
                        <View style={{ borderTopWidth: 1, borderTopColor: '#d3d3d3', width: screenWidth / 4 }} />
                        <Text style={{ fontFamily: FontVariants.weight600, fontSize: 18, marginHorizontal: 7, color: colors.fontGray, textAlign: "center" }}>or</Text>
                        <View style={{ borderTopWidth: 1, borderTopColor: '#d3d3d3', width: screenWidth / 4 }} />
                    </View>
                    <Button title={userNgo ? 'Edit NGO Info' : 'Create NGO Profile'} textStyle={{ color: '#fff' }} style={{ backgroundColor: colors.primary, marginHorizontal: 10, marginRight: 10, borderRadius: 10, }} onPress={() => setNgoProfile(!ngoProfile)} />
                    <ReactNativeModal isVisible={ngoProfile} style={{ margin: 0 }}>
                        <ScrollView style={{ backgroundColor: "#fff", padding: 20 }}>
                            <View style={{ marginVertical: 10 }}>
                                <Text style={{ fontSize: 18, paddingHorizontal: 10, color: colors.font, fontFamily: FontVariants.weight500 }}>Organisation Name</Text>
                                <Text style={{ fontSize: 18, fontFamily: FontVariants.weight500, paddingHorizontal: 20, backgroundColor: "#f5f5f5", paddingVertical: 15, marginHorizontal: 10, marginTop: 10, borderRadius: 10 }}>{CurrentUser.displayName}</Text>
                            </View>
                            <View style={{ marginVertical: 10 }}>
                                <Text style={{ fontSize: 18, paddingHorizontal: 10, color: colors.font, fontFamily: FontVariants.weight500 }}>Email</Text>
                                <Text style={{ fontSize: 18, fontFamily: FontVariants.weight500, paddingHorizontal: 20, backgroundColor: "#f5f5f5", paddingVertical: 15, marginHorizontal: 10, marginTop: 10, borderRadius: 10, color: colors.secondry }}>{CurrentUser.email}</Text>
                            </View>
                            <View style={{ marginVertical: 10 }}>
                                <Text style={{ fontSize: 18, paddingHorizontal: 10, color: colors.font, fontFamily: FontVariants.weight500 }}>Phone Number</Text>
                                <View
                                    style={{
                                        fontSize: 18, fontFamily: FontVariants.weight500, paddingHorizontal: 20, backgroundColor: "#f5f5f5", paddingVertical: 15, marginHorizontal: 10, marginTop: 10, borderRadius: 10, flexDirection: 'row', alignItems: "center"
                                    }}
                                >
                                    <Text style={{ fontFamily: FontVariants.weight500, fontSize: 18, marginRight: 10 }}>+91</Text>
                                    <Text
                                        style={{ fontSize: 18, fontFamily: FontVariants.weight500, width: "90%", color: colors.fontGray }}>{mobile}</Text>
                                </View>
                            </View>
                            <View style={{ marginVertical: 10 }}>
                                <Text style={{ fontSize: 18, paddingHorizontal: 10, color: colors.font, fontFamily: FontVariants.weight500 }}>Organisation Address</Text>
                                <TextInput value={address} onChangeText={setAddress} style={{ fontSize: 18, fontFamily: FontVariants.weight500, paddingHorizontal: 20, backgroundColor: "#f5f5f5", paddingVertical: 15, marginHorizontal: 10, marginTop: 10, borderRadius: 10, color: colors.secondry }} multiline={true} />
                            </View>
                            <View style={{ marginVertical: 10 }}>
                                <Text style={{ fontSize: 18, paddingHorizontal: 10, color: colors.font, fontFamily: FontVariants.weight500 }}>Website (Optional)</Text>
                                <TextInput value={website} onChangeText={setSite} style={{ fontSize: 18, fontFamily: FontVariants.weight500, paddingHorizontal: 20, backgroundColor: "#f5f5f5", paddingVertical: 15, marginHorizontal: 10, marginTop: 10, borderRadius: 10, color: colors.secondry }} placeholder='Enter Your Website' />
                            </View>
                            <View style={{ marginVertical: 10 }}>
                                <Text style={{ fontSize: 18, paddingHorizontal: 10, color: colors.font, fontFamily: FontVariants.weight500 }}>Organisation Images</Text>
                                <TextInput value={img1} onChangeText={setImg1} style={{ fontSize: 18, fontFamily: FontVariants.weight500, paddingHorizontal: 20, backgroundColor: "#f5f5f5", paddingVertical: 15, marginHorizontal: 10, marginTop: 10, borderRadius: 10, color: colors.secondry }} placeholder='Image URL' />
                                <TextInput value={img2} onChangeText={setImg2} style={{ fontSize: 18, fontFamily: FontVariants.weight500, paddingHorizontal: 20, backgroundColor: "#f5f5f5", paddingVertical: 15, marginHorizontal: 10, marginTop: 10, borderRadius: 10, color: colors.secondry }} placeholder='Image URL' />
                            </View>
                            <View style={{ marginVertical: 10 }}>
                                <Text style={{ fontSize: 18, paddingHorizontal: 10, color: colors.font, fontFamily: FontVariants.weight500 }}>Animals You Serve</Text>
                                <View
                                    style={{
                                        fontSize: 18, fontFamily: FontVariants.weight500, flexWrap: "wrap", paddingHorizontal: 20, backgroundColor: "#f5f5f5", paddingVertical: 15, marginHorizontal: 10, marginTop: 10, borderRadius: 10, flexDirection: 'row', alignItems: "center"
                                    }}
                                >
                                    {serve_animals.map((opt, index) => (
                                        <Pressable key={index} style={{ width: "50%", paddingTop: 10, flexDirection: "row" }} onPress={() => pickAnimals(opt)}>
                                            <CheckBox value={animals.includes(opt) ? true : false} onValueChange={() => pickAnimals(opt)} />
                                            <Text style={{ fontFamily: FontVariants.weight500, marginLeft: 5, fontSize: 15 }}>{opt}</Text>
                                        </Pressable>
                                    ))}
                                </View>
                            </View>
                            <View style={{ marginVertical: 10 }}>
                                <Text style={{ fontSize: 18, paddingHorizontal: 10, color: colors.font, fontFamily: FontVariants.weight500 }}>Your Services</Text>
                                <View
                                    style={{
                                        fontSize: 18, fontFamily: FontVariants.weight500, flexWrap: "wrap", paddingHorizontal: 20, backgroundColor: "#f5f5f5", paddingVertical: 15, marginHorizontal: 10, marginTop: 10, borderRadius: 10, flexDirection: 'row', alignItems: "center"
                                    }}
                                >
                                    {service_options.map((opt, index) => (
                                        <Pressable key={index} style={{ width: "50%", paddingTop: 10, flexDirection: "row" }} onPress={() => pickServices(opt)}>
                                            <CheckBox value={services.includes(opt) ? true : false} onValueChange={() => pickServices(opt)} />
                                            <Text style={{ fontFamily: FontVariants.weight500, marginLeft: 5, fontSize: 15 }}>{opt}</Text>
                                        </Pressable>
                                    ))}
                                </View>
                            </View>
                            <View style={{ flexDirection: "row", marginTop: 20, flexDirection: "row" }}>
                                <Button title="Done" style={{ width: "48%", marginBottom: 20, borderRadius: 10, marginRight: 10 }} textStyle={{ color: colors.white }} onPress={handleNgo} />
                                <Button title="Cancel" style={{ width: "48%", marginBottom: 20, borderRadius: 10, backgroundColor: "#ff5c5c" }} textStyle={{ color: colors.white }} onPress={() => setNgoProfile(!ngoProfile)} />
                            </View>
                        </ScrollView>
                    </ReactNativeModal>
                    <ReactNativeModal isVisible={loading}>
                        <ActivityIndicator animating={true} color={colors.primary} size={40} />
                    </ReactNativeModal>
                </ScrollView>

            )
            }
        </ScrollView >
    )
}

export default ProfileScreen

const styles = StyleSheet.create({
    shadow: {
        shadowColor: colors.primary,
        shadowOffset: {
            width: 0,
            height: 10
        },
        shadowOpacity: 0.8,
        shadowRadius: 30,
        elevation: 7
    }
})