import { Linking, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { Pressable } from 'react-native'
import { Image } from 'react-native'
import { FontVariants, colors } from '../theme'
import { ScrollView } from 'react-native'
import { Ionicons, MaterialCommunityIcons, Foundation } from '@expo/vector-icons'
import { screenWidth } from '../consts'
import Button from '../components/Button'
import { useRoute } from '@react-navigation/native'

const SingleRescueScreen = ({ navigation }) => {

    const route = useRoute()
    const data = route.params.data
    const distance = route.params.distanceFromPoint

    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: colors.white, }}>
            <View style={{ flexDirection: 'row', alignItems: "center", paddingHorizontal: 15, paddingVertical: 10 }}>
                <Pressable style={{ backgroundColor: "white", padding: 10, borderRadius: 10, marginRight: 5 }} onPress={() => navigation.goBack()}>
                    <Image source={{ uri: "https://cdn-icons-png.flaticon.com/512/271/271220.png" }} style={{ width: 15, height: 15, }} />
                </Pressable>
                <Text style={{ fontSize: 18, fontFamily: FontVariants.weight600, color: colors.secondry }}>Back</Text>
            </View>
            <ScrollView style={{ paddingVertical: 20, paddingTop: 0 }}>
                <View style={{ paddingHorizontal: 20, paddingTop: 0 }}>
                    <Image source={{ uri: data.photoUrl }} style={{ width: "100%", height: 250, objectFit: "cover", borderRadius: 10 }} />
                </View>
                <View style={{ paddingHorizontal: 20, paddingVertical: 10 }}>
                    <Text style={{ fontFamily: FontVariants.weight700, fontSize: 24 }}>{data.name}</Text>
                    <Pressable style={{
                        flexDirection: "row",
                        justifyContent: "flex-start", alignItems: "center",
                        width: "100%",
                        paddingRight: 15,
                        paddingTop: 5
                    }}>
                        <MaterialCommunityIcons name='map-marker-distance' size={24} color={colors.primary} style={{ paddingRight: 5 }} />
                        <Text style={{ fontFamily: FontVariants.weight600, fontSize: 18, color: colors.font, paddingRight: 10 }} numberOfLines={2}>{distance} Away</Text>
                    </Pressable>
                </View>
                <View style={{ flexDirection: "row", justifyContent: "center" }}>
                    <Pressable onPress={() => Linking.openURL(`tel:${data.phoneNumber}`)} style={{
                        flexDirection: "row",
                        justifyContent: "center", alignItems: "center",
                        backgroundColor: colors.bgGreen,
                        borderColor: colors.lightGreen, borderWidth: 1,
                        padding: 20, paddingVertical: 15, borderRadius: 50,
                        width: "45%",
                        margin: 5
                    }}>
                        <Ionicons name='call-sharp' size={24} color={colors.primary} style={{ paddingRight: 10, }} />
                        <Text style={{ fontFamily: FontVariants.weight600, fontSize: 18, color: colors.font }}>Call</Text>
                    </Pressable>
                    <Pressable onPress={() => Linking.openURL(`https://www.google.com/maps/search/?api=1&query=  ${data.location.coords.latitude} ${data.location.coords.longitude}`)} style={{
                        flexDirection: "row",
                        justifyContent: "center", alignItems: "center",
                        backgroundColor: colors.bgGreen,
                        borderColor: colors.lightGreen, borderWidth: 1,
                        padding: 20, paddingVertical: 15, borderRadius: 50, borderRadius: 50,
                        width: "45%",
                        margin: 5
                    }}>
                        <Ionicons name='map' size={24} color={colors.primary} style={{ paddingRight: 10, }} />
                        <Text style={{ fontFamily: FontVariants.weight600, fontSize: 18, color: colors.font }}>Map</Text>
                    </Pressable>
                </View>
                <View style={{ borderTopWidth: 1, borderTopColor: "#f5f5f5", marginVertical: 10, marginBottom: 0 }} />
                <Pressable style={{
                    flexDirection: "row",
                    justifyContent: "flex-start", alignItems: "center",
                    width: "100%",
                    paddingVertical: 20, paddingHorizontal: 20
                }}>
                    <Ionicons name='time-outline' size={24} color={colors.primary} style={{ paddingRight: 10, }} />
                    <Text style={{ fontFamily: FontVariants.weight600, fontSize: 18, color: colors.font }}>{data.date}, {data.time}</Text>
                </Pressable>
                <View style={{ borderTopWidth: 1, borderTopColor: "#f5f5f5", marginBottom: 0 }} />
                <Pressable style={{
                    flexDirection: "row",
                    justifyContent: "flex-start", alignItems: "center",
                    width: "100%",

                    paddingVertical: 20, paddingHorizontal: 20
                }}>
                    <Ionicons name='location-sharp' size={24} color={colors.primary} style={{ paddingRight: 10, }} />
                    <Text style={{ fontFamily: FontVariants.weight600, fontSize: 18, width: '90%', color: colors.font }}>{data.location.formattedLocation}</Text>
                </Pressable>
                <View style={{ borderTopWidth: 1, borderTopColor: "#f5f5f5" }} />
            </ScrollView>
            <Pressable style={{ padding: 10, borderTopColor: colors.primary, borderTopWidth: 0.5, backgroundColor: colors.bgGreen }}>
                <Button title='Call Now' style={{ borderRadius: 10 }} textStyle={{ color: colors.white }} onPress={() => Linking.openURL(`tel:${data.phoneNumber}`)} />
            </Pressable>
        </SafeAreaView>
    )
}

export default SingleRescueScreen

const styles = StyleSheet.create({})