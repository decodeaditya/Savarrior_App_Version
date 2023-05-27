import { View, Text, StyleSheet } from 'react-native'
import React, { useContext, useState } from 'react'
import { Pressable } from 'react-native'
import { FontVariants, colors } from '../theme'
import { screenWidth } from '../consts'
import { Image } from 'react-native'
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native'
import { getDistance } from 'geolib'
import { AuthContext } from '../AuthContext'

const Notification = ({ data, AlertList }) => {

    const [list, setAlertList] = useState(AlertList)
    const navigation = useNavigation()
    const {newCoords} = useContext(AuthContext)

    
    const notificationHandle = async (d) => {
        const distanceFromPoint = getDistance(
            { latitude: Number(newCoords?.latitude), longitude: Number(newCoords?.longitude) },
            { latitude: Number(d.location.coords.latitude), longitude: Number(d.location.coords.longitude) }
        )
    
        const calcdist = distanceFromPoint / 1000 < 1 ? `${distanceFromPoint} Meters` : `${distanceFromPoint / 1000}KM`
        navigation.navigate("SingleRescue", {
            data: d,
            distanceFromPoint: calcdist
        })
        const filterdList = list.filter((item) => {
            return item.id !== d.id
        })
        setAlertList(filterdList)
        await AsyncStorage.setItem("Notifications", JSON.stringify(filterdList))
        try {
            const jsonValue = await AsyncStorage.getItem('Notifications')
            return jsonValue != null ? setAlertList(JSON.parse(jsonValue)) : null;
        } catch (e) {
            // error reading value
        }
    }

    return (
        <Pressable onPress={() => notificationHandle(data)} style={{ ...styles.shadow, borderColor: colors.primary, borderWidth: 0.3, borderRadius: 10, margin: 15, marginVertical: 10, backgroundColor: colors.bgGreen }}>
            <View style={{ flexDirection: "row", alignItems: "center", paddingBottom: 10, paddingHorizontal: 10, padding: 10, }}>
                <View>
                    <Image source={{ uri: data.photoUrl }} style={{ borderRadius: 10, width: 100, height: 90, objectFit: "cover" }} />
                </View>
                <View style={{ padding: 10 }}>
                    <Text style={{ fontFamily: FontVariants.weight600, fontSize: 18, width: screenWidth / 2.1, color: colors.font }} numberOfLines={2}>Rescue Reported at {data.location.formattedLocation}</Text>
                    <Text style={{ fontFamily: FontVariants.weight500, fontSize: 17, width: screenWidth / 2.1, color: colors.font }} numberOfLines={1}>By {data.name}</Text>
                    <Text style={{ fontFamily: FontVariants.weight500, fontSize: 15, marginBottom: 5, width: screenWidth / 2 + 10, color: colors.fontGray }} numberOfLines={1}>{data.date}, {data.time}</Text>
                </View>
            </View>
        </Pressable>
    )
}

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

export default Notification