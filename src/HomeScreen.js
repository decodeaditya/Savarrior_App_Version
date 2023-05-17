import { StyleSheet, Text, View } from 'react-native'
import React, { useContext, useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { Image } from 'react-native'
import { Pressable } from 'react-native'
import { Ionicons, Feather, Entypo } from '@expo/vector-icons'
import { FontVariants, colors } from '../theme'
import { screenHeight, screenWidth } from '../consts'
import Button from '../components/Button'
import { ScrollView } from 'react-native'
import RescueCard from '../components/RescueCard'
import NgoCard from '../components/NgoCard'
import { schedulePushNotification, veganTopics } from '../utils/const'
import { TouchableOpacity } from 'react-native'
import { AuthContext } from '../AuthContext'
import { FirebaseContext } from '../FirebaseData'
import { Alert } from 'react-native'
import { Linking } from 'react-native'


const HomeScreen = ({ navigation }) => {

    const { displayCurrentAddress, CurrentUser, AlertList } = useContext(AuthContext)
    const { RescuesList, NgosList } = useContext(FirebaseContext)

    const showLocation = () => {
        Alert.alert('Your Location', displayCurrentAddress.address, [
            { text: 'OK' }
        ]);
    }



    return (
        <SafeAreaView style={{ paddingVertical: 10, backgroundColor: colors.white, flex: 1, }}>
            <View style={{ marginBottom: 15, flexDirection: "row", justifyContent: "space-between", alignItems: "center", paddingHorizontal: 20 }}>
                <TouchableOpacity activeOpacity={0.9} onPress={() => navigation.navigate("Profile")}>
                    <Image source={{ uri: CurrentUser.photoURL }} style={{ width: 50, height: 50, borderRadius: 100 }} />
                </TouchableOpacity>
                <Pressable onPress={showLocation} style={{
                    shadowColor: "#000",
                    width: "68%",
                    alignItems: "center",
                    flexDirection: "row",
                    shadowColor: "#000000",
                    shadowOffset: {
                        width: 0,
                        height: 1,
                    },
                    shadowOpacity: 0.15,
                    shadowRadius: 1.00,
                    elevation: 1,
                    elevation: 3, paddingHorizontal: 10, marginHorizontal: 10, borderRadius: 50, backgroundColor: "#fff", paddingVertical: 10, justifyContent: "center", alignItems: 'center'
                }}>
                    <Ionicons name='location-outline' size={18} />
                    <Text style={{ fontSize: 16, color: colors.font, fontFamily: FontVariants.weight600, width: "85%", marginLeft: 5 }} numberOfLines={1}>{displayCurrentAddress.address}</Text>
                </Pressable>
                <Ionicons name='md-notifications-outline' size={25} onPress={() => navigation.navigate("Alert")} />
            </View>

            {/* SearchBar */}

            {/* <View style={{ marginTop: 20, paddingHorizontal: 20, marginBottom: 15 }}>
                <View
                    style={{
                        padding: 10,
                        flexDirection: "row",
                        alignItems: "center",
                        justifyContent: "space-between",
                        borderWidth: 0.2,
                        borderColor: colors.fontGray,
                        borderRadius: 23,
                        backgroundColor: "#f8f6f8"
                    }}
                >
                    <Feather name="search" size={24} color={colors.fontGray} />
                    <TextInput onChangeText={setQuery} value={query} placeholder={'Search'} style={{ fontFamily: FontVariants.weight500, width:query.length > 0 ? "80%" : "90%", }}/>
                    {query.length > 0 && <Ionicons name='close-outline' size={24} color={colors.fontGray} onPress={()=>setQuery("")}/>}
                </View>
            </View> */}

            <ScrollView showsVerticalScrollIndicator={false}>
                {/* SlideShow */}

                <View style={{ marginTop: 15, paddingHorizontal: 20 }}>
                    <Pressable style={{ backgroundColor: '#def5ef', borderWidth: 0.9, borderColor: colors.primary, flexDirection: 'row', justifyContent: "center", borderRadius: 20, paddingTop: 13 }}>
                        <Pressable style={{ padding: 10, justifyContent: "space-around", width: "57%", }} onPress={() => navigation.navigate("Report")}>
                            <Text style={{ fontSize: 19, color: colors.font, fontFamily: FontVariants.weight700, marginLeft: 5 }}>Spoted A Rescue? Report Now!</Text>
                            <Button onPress={() => navigation.navigate("Report")} title='Report' style={{ backgroundColor: "#fff", borderRadius: 40, width: "70%", borderWidth: 0.9, borderColor: "whitesmoke" }} textStyle={{ color: colors.fontGray, fontSize: 17 }} />
                        </Pressable>
                        <Pressable style={{ borderRadius: 20, width: "43%", }}>
                            <Image source={{ uri: "https://img.freepik.com/premium-vector/happy-pet-owners-concept-illustration-woman-holding-dog-golden-retriever-colorful-stock-vector-illustration-flat-style-eps-10_697732-142.jpg" }} style={{ width: '100%', height: screenWidth * 0.4, borderBottomRightRadius: 20 }} />
                        </Pressable>
                    </Pressable>
                </View>

                <View style={{ borderTopWidth: 4, borderTopColor: '#f5f5f5', marginVertical: 25 }} />
                <View style={{ paddingHorizontal: 20, paddingBottom: 5 }}>
                    <View style={{ flexDirection: "row", justifyContent: "space-between", alignItems: "center" }}>
                        <Text style={{ fontSize: 24, fontFamily: FontVariants.weight800, textTransform: 'uppercase' }}>Rescues Nearby</Text>
                        <Button title='See All' style={{ backgroundColor: "#def5ef", borderWidth: 0.9, borderColor: colors.primary, borderRadius: 20, }} textStyle={{ fontSize: 16, color: colors.font }} onPress={() => { navigation.navigate("Rescues") }} />
                    </View>
                    <View style={{ marginTop: 25 }}>
                        {RescuesList.slice(Math.max(RescuesList.length - 5,0)).map((res, index) => (
                            <RescueCard key={index} data={res} />
                        ))}
                    </View>
                    {RescuesList.length > 5 &&
                        <Pressable style={{ justifyContent: 'center', alignItems: 'center' }} onPress={() => navigation.navigate("Rescues")}>
                            <Text style={{ fontFamily: FontVariants.weight700, fontSize: 17 }}>See All</Text>
                            <Ionicons name='chevron-down' size={30} />
                        </Pressable>
                    }
                    {RescuesList.length === 0 &&
                        <View style={{ justifyContent: "center", alignItems: "center", height: screenHeight / 3 }}>
                            <Image source={{ uri: 'https://i.pinimg.com/originals/c6/d6/08/c6d6089fc2b74cb603348cc2dbb0e1cd.png' }} style={{ width: 150, height: 150 }} />
                            <Text style={{fontFamily: FontVariants.weight800, fontSize: 19, color: colors.fontGray,textTransform:"uppercase" }}>No Rescues Found</Text>
                        </View>
                    }
                </View>

                <View style={{ borderTopWidth: 4, borderTopColor: '#f5f5f5', marginVertical: 25 }} />
                <View style={{ paddingHorizontal: 25, paddingBottom: 5 }}>
                    <View style={{ flexDirection: "row", justifyContent: "space-between", alignItems: "center" }}>
                        <Text style={{ fontSize: 24, fontFamily: FontVariants.weight800, textTransform: 'uppercase' }}>organizations</Text>
                        <Button title='See All' style={{ backgroundColor: "#def5ef", borderWidth: 0.9, borderColor: colors.primary, borderRadius: 20, }} textStyle={{ fontSize: 16, color: colors.font }} onPress={() => { navigation.navigate("NGOs") }} />
                    </View>
                    <ScrollView showsHorizontalScrollIndicator={false} horizontal style={{ marginTop: 25 }}>
                        {NgosList.map((res, index) => (
                            <NgoCard data={res} key={index} style={{ marginBottom: 25 }} />
                        ))}
                    </ScrollView>
                </View>
                <View style={{ borderTopWidth: 4, borderTopColor: "#f5f5f5", marginVertical: 25, marginBottom: 0 }} />
                <View style={{ paddingHorizontal: 25, backgroundColor: colors.bgGreen, paddingTop: 20 }}>
                    <View style={{ flexDirection: "row", justifyContent: "space-between", alignItems: "center", marginBottom: 20 }}>
                        <Text style={{ fontSize: 24, fontFamily: FontVariants.weight800, textTransform: 'uppercase' }}>vets</Text>
                        <Button title='Coming soon' style={{ backgroundColor: "#def5ef", borderWidth: 0.9, borderColor: colors.primary, borderRadius: 20, }} textStyle={{ fontSize: 16, color: colors.font }} />
                    </View>
                    <Pressable style={{ borderRadius: 10, justifyContent: "center", paddingBottom: 20 }}>
                        <View style={{ justifyContent: 'center', alignItems: "center", marginBottom: 10 }}>
                            <Image source={{ uri: "https://wellhavenpethealthlt.com/wp-content/uploads/2018/08/tell-us-vets.png" }} style={{ width: 190, height: 213 }} />
                        </View>
                        <View style={{ alignItems: "center" }}>
                            <Text style={{ fontFamily: FontVariants.weight500, fontSize: 18, width: "100%", marginBottom: 10, }}>Are You Curious to Connect with Vets? Let Us Know!</Text>
                            <Button title="I'm interested " style={{ width: "100%", marginTop: 10, borderRadius: 10 }} textStyle={{ color: colors.white }} onPress={() => Linking.openURL(`whatsapp://send?phone=9044558703&text=I am Interested to Meet Vets on Savarrior!`)} />
                        </View>
                    </Pressable>
                </View>
                <View style={{ borderTopWidth: 4, borderTopColor: '#f5f5f5', marginVertical: 25, marginTop: 0 }} />
                <View style={{ paddingHorizontal: 25 }}>
                    <View style={{ flexDirection: "row", justifyContent: "space-between", alignItems: "center", marginBottom: 20 }}>
                        <Text style={{ fontSize: 24, fontFamily: FontVariants.weight800, textTransform: 'uppercase' }}>vegan library</Text>
                        <Button title='Go to Library' style={{ backgroundColor: "#def5ef", borderWidth: 0.9, borderColor: colors.primary, borderRadius: 20, }} textStyle={{ fontSize: 16, color: colors.font }} onPress={() => Linking.openURL("https://www.veganvoice.in/")} />
                    </View>
                    {veganTopics.map((item, index) => (
                        <Pressable onPress={() => Linking.openURL(`https://www.veganvoice.in/${item.slug}`)} key={index} style={{ flexDirection: "row", justifyContent: "space-between", alignItems: "center", marginBottom: 15, paddingVertical: 10, borderRadius: 10, }}>
                            <View style={{ flexDirection: "row", width: '65%', alignItems: "center" }}>
                                <Image source={{ uri: item.img }} style={{ width: 60, height: 60, marginRight: 4 }} />
                                <View>
                                    <Text style={{ fontFamily: FontVariants.weight600, fontSize: 18 }}>{item.title}</Text>
                                    <Text style={{ fontFamily: FontVariants.weight500, fontSize: 16 }}>{item.desc}</Text>
                                </View>
                            </View>
                            <Pressable style={{ justifyContent: "center", alignItems: "center", paddingRight: 15 }}>
                                <Entypo name='chevron-thin-right' size={20} />
                            </Pressable>
                        </Pressable>
                    ))}
                    <View>
                    </View>
                </View>
                <View style={{ borderTopWidth: 4, borderTopColor: '#f5f5f5', marginVertical: 25, marginBottom: 0 }} />
                <View style={{ paddingHorizontal: 25, paddingBottom: 80, backgroundColor: colors.bgGreen, paddingTop: 25 }}>
                    <View style={{ paddingBottom: 20, paddingHorizontal: 10 }}>
                        <View style={{ flexDirection: "row", alignItems: "center", justifyContent: "space-between" }}>
                            <View style={{ width: "60%" }}>
                                <Text style={{ fontFamily: FontVariants.weight500, fontSize: 18, width: "100%", marginBottom: 10, }}>Want to Join Us or Give Feedback?</Text>
                                <Button title="Contact Now!" style={{ width: "85%", borderRadius: 10, marginTop: 5 }} textStyle={{ color: colors.white }} onPress={() => Linking.openURL(`mailto:adityaj02810@gmail.com`)} />
                            </View>

                            <Image source={{ uri: "https://cdn-icons-png.flaticon.com/512/5075/5075578.png" }} style={{ height: 120, width: 120, }} />
                        </View>
                    </View>
                </View>
            </ScrollView>
        </SafeAreaView>
    )
}

export default HomeScreen

const styles = StyleSheet.create({})