import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { Pressable } from 'react-native'
import { Image } from 'react-native'
import { FontVariants, colors } from '../theme'
import { ScrollView } from 'react-native'
import { Ionicons } from '@expo/vector-icons'
import Carousel from '../components/Carousel'
import { screenWidth } from '../consts'
import Button from '../components/Button'
import { useRoute } from '@react-navigation/native'
import { Linking } from 'react-native'

const SingleNgoScreen = ({ navigation }) => {

    const route = useRoute()
    const data = route.params

    const whatsappNo = data.phoneNumber
    const whatsappMsg = `Hi ${data.name}`

    const website = data?.web.includes("http://") ? data?.web : `http://${data?.web}`


    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: colors.white, }}>
            <View style={{ flexDirection: 'row', alignItems: "center", paddingHorizontal: 15, paddingVertical: 10 }}>
                <Pressable style={{ backgroundColor: "white", padding: 10, borderRadius: 10, marginRight: 5 }} onPress={() => navigation.goBack()}>
                    <Image source={{ uri: "https://cdn-icons-png.flaticon.com/512/271/271220.png" }} style={{ width: 15, height: 15, }} />
                </Pressable>
                <Text style={{ fontSize: 18, fontFamily: FontVariants.weight600, color: colors.secondry }}>Back</Text>
            </View>
            <ScrollView style={{ paddingVertical: 20, paddingTop: 0 }}>
                <Carousel imagesData={data.images} />
                <View style={{ paddingHorizontal: 20, paddingVertical: 10 }}>
                    <Text style={{ fontFamily: FontVariants.weight700, fontSize: 24 }}>{data.name}</Text>
                    <Pressable style={{
                        flexDirection: "row",
                        justifyContent: "flex-start", alignItems: "center",
                        width: "100%",
                        paddingRight: 10
                    }}>
                        <Ionicons name='location-outline' size={24} color={colors.primary} />
                        <Text style={{ fontFamily: FontVariants.weight600, fontSize: 18, width: screenWidth / 2.1, color: colors.font }} numberOfLines={2}>{data.city}</Text>
                    </Pressable>
                </View>
                <View style={{ paddingHorizontal: 20, flexDirection: "row", alignItems: 'center', justifyContent: "space-between" }}>
                    <Pressable style={{ width: 50, alignItems: "center", margin: 10, marginLeft: 0 }} onPress={() => { Linking.openURL(`tel:${data?.phoneNumber}`) }}>
                        <Ionicons name='call-sharp' color={colors.primary} size={24} style={{ backgroundColor: colors.bgGreen, borderWidth: 1, borderColor: colors.primary, alignSelf: "center", padding: 10, borderRadius: 100 }} />
                        <Text style={{ fontSize: 16, fontFamily: FontVariants.weight600, marginTop: 5, color: colors.primary }}>Call</Text>
                    </Pressable>
                    <Pressable style={{ width: 50, alignItems: "center", margin: 10, marginLeft: 0 }}>
                        <Ionicons name='location-sharp' color={colors.primary} size={24} style={{ backgroundColor: colors.bgGreen, borderWidth: 1, borderColor: colors.primary, alignSelf: "center", padding: 10, borderRadius: 100 }} onPress={() => Linking.openURL(`https://www.google.com/maps/search/?api=1&query=${data.location.includes(data.name) ? data.location : data.name+ data.location}`)} />
                        <Text style={{ fontSize: 16, fontFamily: FontVariants.weight600, marginTop: 5, color: colors.primary }}>Map</Text>
                    </Pressable>
                    <Pressable style={{ width: 50, alignItems: "center", margin: 10, marginLeft: 0 }}>
                        <Ionicons name='mail-sharp' color={colors.primary} size={24} style={{ backgroundColor: colors.bgGreen, borderWidth: 1, borderColor: colors.primary, alignSelf: "center", padding: 10, borderRadius: 100 }} onPress={() => { Linking.openURL(`mailto:${data?.email}`) }} />
                        <Text style={{ fontSize: 16, fontFamily: FontVariants.weight600, marginTop: 5, color: colors.primary }}>Email</Text>
                    </Pressable>
                    <Pressable style={{ width: 70, alignItems: "center", margin: 10, marginLeft: 0 }} onPress={() => { Linking.openURL(`whatsapp://send?phone=${whatsappNo}&text=${whatsappMsg}`); }}>
                        <Ionicons name='logo-whatsapp' color={colors.primary} size={24} style={{ backgroundColor: colors.bgGreen, borderWidth: 1, borderColor: colors.primary, alignSelf: "center", padding: 10, borderRadius: 100 }} />
                        <Text style={{ fontSize: 14, fontFamily: FontVariants.weight600, marginTop: 5, color: colors.primary }} >WhatsApp</Text>
                    </Pressable>
                </View>
                <View style={{ borderTopWidth: 2, borderTopColor: "#f5f5f5", marginVertical: 25, marginBottom: 0 }} />
                <Pressable style={{
                    flexDirection: "row",
                    justifyContent: "flex-start", alignItems: "center",
                    width: "100%",

                    paddingVertical: 20, paddingHorizontal: 20
                }}>
                    <Ionicons name='map-outline' size={24} color={colors.primary} style={{ paddingRight: 10, }} />
                    <Text style={{ fontFamily: FontVariants.weight600, fontSize: 18, width: '90%', color: colors.font }}>{data.location}</Text>
                </Pressable>
                <View style={{ borderTopWidth: 2, borderTopColor: "#f5f5f5", marginBottom: 10 }} />
                <View style={{ paddingHorizontal: 20, paddingTop: 20 }}>
                    <Text style={{ fontFamily: FontVariants.weight700, fontSize: 24, paddingBottom: 15 }}>Animals They Serve</Text>
                    <View style={{ flexDirection: "row", flexWrap: "wrap" }}>
                        {data.animals.map((res, index) => (
                            <Pressable key={index} style={{
                                flexDirection: "row",
                                justifyContent: "flex-start", alignItems: "center",
                                width: "50%",
                                paddingVertical: 5,
                            }}>
                                <Ionicons name='checkmark-circle-sharp' size={24} color='green' style={{ paddingRight: 10, }} />
                                <Text style={{ fontFamily: FontVariants.weight600, fontSize: 18, width: '90%', color: colors.font }}>{res}</Text>
                            </Pressable>
                        ))}
                    </View>
                </View>

                <View style={{ borderTopWidth: 2, borderTopColor: "#f5f5f5", marginVertical: 25, marginBottom: 0 }} />

                {data.web &&
                    <Pressable onPress={() => Linking.openURL(website)} style={{
                        flexDirection: "row",
                        justifyContent: "flex-start", alignItems: "center",
                        width: "100%",

                        paddingVertical: 20, paddingHorizontal: 20
                    }}>
                        <Ionicons name='globe-outline' size={24} color={colors.primary} style={{ paddingRight: 10, }} />
                        <Text style={{ fontFamily: FontVariants.weight600, fontSize: 18, width: '90%', color: colors.font }}>{data.web}</Text>
                    </Pressable>}

                <View style={{ borderTopWidth: 2, borderTopColor: "#f5f5f5", marginBottom: 10 }} />

                <View style={{ paddingHorizontal: 20, paddingTop: 20, marginBottom: 30 }}>
                    <Text style={{ fontFamily: FontVariants.weight700, fontSize: 24, paddingBottom: 15 }}>Their Services</Text>
                    <View style={{ flexDirection: "row", flexWrap: "wrap" }}>
                        {data.services.map((res, index) => (
                            <Pressable key={index} style={{
                                flexDirection: "row",
                                justifyContent: "flex-start", alignItems: "center",
                                width: "50%",
                                paddingVertical: 5,
                            }}>
                                <Ionicons name='checkmark-circle-sharp' size={24} color='green' style={{ paddingRight: 10, }} />
                                <Text style={{ fontFamily: FontVariants.weight600, fontSize: 18, width: '90%', color: colors.font }}>{res}</Text>
                            </Pressable>
                        ))}
                    </View>
                </View>
            </ScrollView>
            <Pressable style={{ padding: 10,borderTopColor:colors.primary,borderTopWidth:0.2,backgroundColor:colors.bgGreen }}>
                <Button title='Emergency' style={{ backgroundColor: '#ff5c5c', borderRadius: 12 }} textStyle={{ color: colors.white }} onPress={() => { Linking.openURL(`tel:${data?.phoneNumber}`) }} />
            </Pressable>
        </SafeAreaView>
    )
}

export default SingleNgoScreen

const styles = StyleSheet.create({})