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
import { HomeCarousel, schedulePushNotification, veganTopics } from '../utils/const'
import { TouchableOpacity } from 'react-native'
import { AuthContext } from '../AuthContext'
import { FirebaseContext } from '../FirebaseData'
import { Alert } from 'react-native'
import { Linking } from 'react-native'
import Swiper from 'react-native-swiper'


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

                <View style={{ paddingHorizontal: 12, marginVertical: 10 }}>
                    <Swiper dotStyle={{ height: 5, width: 5 }} activeDotStyle={{ height: 6, width: 6 }} autoplayTimeout={15} style={styles.wrapper} showsButtons={false} key={HomeCarousel.length} activeDotColor={colors.fontGray} autoplay={true}>
                        {HomeCarousel.map((data, index) => (
                            <Pressable key={index} style={{ ...styles.slide1, marginHorizontal: 8, backgroundColor: colors.lightGreen, borderWidth: 0.9, borderColor: colors.primary, flexDirection: 'row', justifyContent: "space-around", borderRadius: 20, paddingTop: 13 }}>
                                <Pressable style={{ padding: 10, paddingRight: 0, justifyContent: "space-around", width: "56%" }} onPress={() => navigation.navigate(data.link)}>
                                    <Text style={{ fontSize: 19, color: colors.font, fontFamily: FontVariants.weight700, marginLeft: 5 }}>{data.heading}</Text>
                                    <Button title={data.buttonText} style={{ backgroundColor: colors.bgGreen, borderWidth: 0.9, borderColor: colors.primary, borderRadius: 20, width: "70%" }} textStyle={{ fontSize: 16, color: colors.font }} onPress={() => { navigation.navigate(data.link) }} />
                                </Pressable>
                                <Pressable style={{ borderRadius: 20, width: "43%", paddingRight: 6, }}>
                                    <Image source={data.image} style={{ width: '100%', height: screenWidth * 0.38, borderBottomRightRadius: 20 }} />
                                </Pressable>
                            </Pressable>
                        ))}
                    </Swiper>
                </View>
                <View style={{ paddingHorizontal: 20, paddingVertical: 25, paddingTop: 15 }}>
                    <View style={{ flexDirection: "row", justifyContent: "space-between", alignItems: "center" }}>
                        <View>
                            <Text style={{ fontSize: 22, fontFamily: FontVariants.weight800, textTransform: 'uppercase' }}>Rescues Nearby</Text>
                            <Text style={{ color: colors.fontGray, fontFamily: FontVariants.weight600, fontSize: 15 }}>Help in Rescues Near You</Text>
                        </View>
                        <Button title='See All' style={{ backgroundColor: "#def5ef", borderWidth: 0.9, borderColor: colors.primary, borderRadius: 20, }} textStyle={{ fontSize: 16, color: colors.font }} onPress={() => { navigation.navigate("Rescues") }} />
                    </View>
                    <ScrollView showsHorizontalScrollIndicator={false} horizontal style={{ paddingTop: 30 }}>
                        {RescuesList.slice(Math.max(RescuesList.length - 5, 0)).map((res, index) => (
                            <RescueCard key={index} data={res} style={{ marginBottom: 20, marginRight: index === RescuesList.length - 1 ? 0 : 15, width: screenWidth - 70 }} />
                        ))}
                        {RescuesList.length > 5 && <Pressable onPress={() => navigation.navigate("Rescues")} style={{ justifyContent: "center", alignItems: "center", paddingRight: 15 }}>
                            <Entypo name='chevron-thin-right' size={20} color={colors.primary} style={{ padding: 15, borderWidth: 1, borderColor: colors.primary, marginLeft: 25, backgroundColor: colors.bgGreen, borderRadius: 50 }} />
                        </Pressable>}
                    </ScrollView>
                    {RescuesList.length === 0 &&
                        <View style={{ justifyContent: "center", alignItems: "center", height: screenHeight / 3 }}>
                            <Image source={{ uri: 'https://i.pinimg.com/originals/c6/d6/08/c6d6089fc2b74cb603348cc2dbb0e1cd.png' }} style={{ width: 150, height: 150 }} />
                            <Text style={{ fontFamily: FontVariants.weight800, fontSize: 19, color: colors.fontGray, textTransform: "uppercase" }}>No Rescues Found</Text>
                        </View>
                    }
                </View>

                <View style={{ backgroundColor: "#9ae9af", paddingTop: 20, marginBottom: 40 }}>
                    <View style={{ paddingHorizontal: 25, flexDirection: "row", justifyContent: "space-between", alignItems: "center", marginBottom: 20 }}>
                        <Text style={{ fontSize: 24, fontFamily: FontVariants.weight800, textTransform: 'uppercase' }}>Join Us</Text>
                    </View>
                    <Pressable style={{ borderRadius: 10, justifyContent: "center", paddingTop: 20 }}>
                        <View style={{ justifyContent: 'center', alignItems: "center" }}>
                            <Image source={{ uri: "https://www.jotform.com/blog/wp-content/uploads/2019/09/How-to-Start-an-Animal-Rescue-featured-604x366.png" }} style={{ height: 220, width: "100%", }} />
                        </View>
                        <View style={{ alignItems: "center", paddingHorizontal: 25, backgroundColor: "#72ce8d", paddingVertical: 20 }}>
                            <Text style={{ fontFamily: FontVariants.weight600, fontSize: 18, textTransform: 'capitalize', width: "100%", marginBottom: 10, color: colors.font }}>Are You A Animal Welfare organization? Join Us to create More Impact!</Text>
                            <Button title='Join Now' style={{ backgroundColor: "#def5ef", width: "100%", borderWidth: 0.9, borderColor: colors.primary, borderRadius: 10, marginTop: 20, height: 50 }} textStyle={{ fontSize: 18, color: colors.font }} onPress={() => { navigation.navigate("Profile", true) }} />
                        </View>
                    </Pressable>
                </View>
                <View style={{ paddingHorizontal: 25, marginBottom: 10 }}>
                    <View style={{ flexDirection: "row", justifyContent: "space-between", alignItems: "center" }}>
                        <View>
                            <Text style={{ fontSize: 22, fontFamily: FontVariants.weight800, textTransform: 'uppercase' }}>organizations</Text>
                            <Text style={{ color: colors.fontGray, fontFamily: FontVariants.weight600, fontSize: 15 }}>Explore Animals Welfare Groups</Text>
                        </View>
                        <Button title='See All' style={{ backgroundColor: "#def5ef", borderWidth: 0.9, borderColor: colors.primary, borderRadius: 20, }} textStyle={{ fontSize: 16, color: colors.font }} onPress={() => { navigation.navigate("NGOs") }} />
                    </View>
                    <ScrollView showsHorizontalScrollIndicator={false} horizontal style={{ paddingTop: 30 }}>
                        {NgosList.map((res, index) => (
                            <NgoCard data={res} key={index} style={{ marginBottom: 25, marginRight: index === NgosList.length - 1 ? 0 : 15, width: screenWidth-75 }} />
                        ))}
                        {NgosList.length > 5 && <Pressable onPress={() => navigation.navigate("NGOs")} style={{ justifyContent: "center", alignItems: "center", paddingRight: 15 }}>
                            <Entypo name='chevron-thin-right' size={20} color={colors.primary} style={{ padding: 15, borderWidth: 1, borderColor: colors.primary, marginLeft: 25, backgroundColor: colors.bgGreen, borderRadius: 50 }} />
                        </Pressable>}
                    </ScrollView>
                </View>

                <View style={{ backgroundColor: "#dbece2", paddingTop: 20, marginVertical: 20 }}>
                    <View style={{ paddingHorizontal: 25, flexDirection: "row", justifyContent: "space-between", alignItems: "center", marginBottom: 20 }}>
                        <Text style={{ fontSize: 24, fontFamily: FontVariants.weight800, textTransform: 'uppercase' }}>Vets</Text>
                    </View>
                    <Pressable style={{ borderRadius: 10, justifyContent: "center", paddingTop: 20 }}>
                        <View style={{ justifyContent: 'center', alignItems: "center" }}>
                            <Image source={{ uri: "https://img.freepik.com/free-vector/pet-veterinary_24908-57947.jpg?w=900&t=st=1685090584~exp=1685091184~hmac=0967e38b2899688c4f91caa57ace491c6a7e4cd34f47811a0dfd99489651dd7f" }} style={{ height: 228, width: "100%", }} />
                        </View>
                        <View style={{ alignItems: "center", paddingHorizontal: 25, backgroundColor: "#a6d2bb", paddingVertical: 20 }}>
                            <Text style={{ fontFamily: FontVariants.weight600, fontSize: 19, textTransform: 'capitalize', width: "100%", marginBottom: 10, color: colors.font }}>Are You Curious to Connect with Vets? Let Us Know!</Text>
                            <Button title='I am Interested!' style={{ backgroundColor: "#def5ef", width: "100%", borderWidth: 0.9, borderColor: colors.primary, borderRadius: 10, marginTop: 20, height: 50 }} textStyle={{ fontSize: 18, color: colors.font }} onPress={() => Linking.openURL(`whatsapp://send?phone=+919044558703&text=Hi, I am ${CurrentUser.displayName} and I am Interested to Meet Vets On Savarrior!`)} />
                        </View>
                    </Pressable>
                </View>

                <View style={{ paddingHorizontal: 25, paddingTop: 20 }}>
                    <View style={{ flexDirection: "row", justifyContent: "space-between", alignItems: "center", marginBottom: 20 }}>
                        <View>
                            <Text style={{ fontSize: 22, fontFamily: FontVariants.weight800, textTransform: 'uppercase' }}>Vegan Library</Text>
                            <Text style={{ color: colors.fontGray, fontFamily: FontVariants.weight600, fontSize: 15 }}>Explore Well curated Vegan Library</Text>
                        </View>
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
                <View style={{ borderTopWidth: 0, borderTopColor: '#f5f5f5', marginVertical: 25, marginBottom: 0 }} />
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

const styles = StyleSheet.create({
    wrapper: {
        height: 190,
    }, slide1: {
        flex: 0.9,

    }
})