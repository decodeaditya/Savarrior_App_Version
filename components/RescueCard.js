import { StyleSheet, Text, View, Pressable, Alert } from 'react-native'
import React, { useContext, useEffect, useState } from 'react'
import { TouchableOpacity } from 'react-native'
import { Image } from 'react-native'
import { Ionicons,MaterialCommunityIcons } from '@expo/vector-icons'
import { FontVariants, colors } from '../theme'
import { screenWidth } from '../consts'
import Button from './Button'
import { useNavigation } from '@react-navigation/native'
import { AuthContext } from '../AuthContext'
import { getDistance } from 'geolib'

const RescueCard = ({ data, style }) => {

    const navigation = useNavigation()
    const { newCoords } = useContext(AuthContext)
    const [calcdist, setCalcdist] = useState(0)


    useEffect(() => {
        const distanceFromPoint = getDistance(
            { latitude: Number(newCoords?.latitude), longitude: Number(newCoords?.longitude) },
            { latitude: Number(data.location.coords.latitude), longitude: Number(data.location.coords.longitude) }
        )

        setCalcdist(distanceFromPoint / 1000 < 1 ? `${distanceFromPoint} Meters` : `${distanceFromPoint / 1000}KM`)
    }, [newCoords])


    return (
        <TouchableOpacity onPress={() => navigation.navigate("SingleRescue", {
            data: data,
            distanceFromPoint: calcdist
        })} activeOpacity={1} style={{ borderWidth: 0.4, width: screenWidth - 40, marginRight: 25, borderColor: colors.lightGreen, backgroundColor: '#f1faf7', padding: 15, borderRadius: 10, marginBottom: 10, ...style }}>
            <View style={{ flexDirection: "row", justifyContent: 'space-between', alignItems: "center", paddingBottom: 10 }}>
                <View style={{ flexDirection: "row", alignItems: "center" }}>
                    <Image source={{ uri: data.userProfileImg }} style={{ width: 40, height: 40, borderRadius: 10 }} />
                    <Text style={{ color: colors.font, fontSize: 16, fontFamily: FontVariants.weight500, marginLeft: 10 }}>{data.name}</Text>
                </View>
                <View>
                    <Text style={{ color: colors.fontGray, fontSize: 16, fontFamily: FontVariants.weight500, marginLeft: 10 }}>{data.date}</Text>
                </View>
            </View>
            <View>
                <Image source={{ uri: data.photoUrl }} style={{ width: "100%", height: 195, borderRadius: 15, objectFit: "cover" }} />
                <View style={{ backgroundColor: colors.primary,...styles.shadow, position: 'absolute', margin: 8, padding: 4, borderRadius: 7, right: 0}}>
                    <Text style={{ fontFamily: FontVariants.weight500, fontSize: 15, color: colors.white, width: "100%",marginHorizontal:4 }} >{calcdist} Away</Text>
                </View>
            </View>
            <View style={{ flexDirection: 'row', justifyContent: 'space-between', paddingVertical: 10, alignItems: 'center' }}>
                <Pressable style={{
                    flexDirection: "row",
                    justifyContent: "flex-start",
                    alignItems: "center",
                    width: "70%",
                    paddingRight: 10
                }}>
                    <Ionicons name='location-sharp' size={24} color={colors.primary} style={{ padding: 5, paddingTop: 0 }} />
                    <Text style={{ fontFamily: FontVariants.weight600, fontSize: 17, color: colors.font, width: "100%" }} numberOfLines={2}>{data.location.formattedLocation}</Text>
                </Pressable>
                <View>
                    <Text style={{ fontFamily: FontVariants.weight600, fontSize: 16, color: colors.fontGray, width: "100%" }}>{data.time}</Text>
                </View>
            </View>
            <Button onPress={() => navigation.navigate("SingleRescue", {
                data: data,
                distanceFromPoint: calcdist
            })} title='Help' style={{ borderRadius: 10, marginTop: 8 }} textStyle={{ color: colors.white }} />
        </TouchableOpacity>
    )
}

export default RescueCard

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