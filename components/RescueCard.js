import { StyleSheet, Text, View, Pressable } from 'react-native'
import React from 'react'
import { TouchableOpacity } from 'react-native'
import { Image } from 'react-native'
import { Ionicons } from '@expo/vector-icons'
import { FontVariants, colors } from '../theme'
import { screenWidth } from '../consts'
import Button from './Button'
import { useNavigation } from '@react-navigation/native'

const RescueCard = ({data}) => {
    
    const navigation = useNavigation()

    return (
        <TouchableOpacity onPress={()=>navigation.navigate("SingleRescue",data)} activeOpacity={1} style={{ ...styles.shadow, borderWidth: 0.4, borderColor: colors.lightGreen, backgroundColor: '#f1faf7', padding: 15, borderRadius: 10, marginBottom: 30 }}>
            <View style={{ flexDirection: "row", justifyContent: 'space-between', alignItems: "center", paddingBottom: 10 }}>
                <View style={{ flexDirection: "row", alignItems: "center" }}>
                    <Image source={{ uri: data.userProfileImg }} style={{ width: 40, height: 35, borderRadius: 10 }} />
                    <Text style={{ color: colors.font, fontSize: 16, fontFamily: FontVariants.weight500, marginLeft: 10 }}>{data.name}</Text>
                </View>
                <View>
                    <Text style={{ color: colors.fontGray, fontSize: 16, fontFamily: FontVariants.weight500, marginLeft: 10 }}>{data.date}</Text>
                </View>
            </View>
            <View>
                <Image source={{ uri: data.photoUrl }} style={{ width: "100%", height: 180, borderRadius: 8, objectFit: "cover" }} />
            </View>
            <View style={{flexDirection:'row',justifyContent:'space-between',paddingVertical:10,alignItems:'center'}}>
                <Pressable style={{
                    flexDirection: "row",
                    justifyContent: "flex-start",
                    alignItems:"flex-start",
                    width: "70%",
                    paddingRight: 10
                }}>
                    <Ionicons name='location-outline' size={24} color={colors.primary} style={{padding:5,paddingTop:0}}/>
                    <Text style={{ fontFamily: FontVariants.weight600, fontSize: 17, color: colors.font, width: "100%" }} numberOfLines={2}>{data.location.formattedLocation}</Text>
                </Pressable>
                <View>
                    <Text style={{ fontFamily: FontVariants.weight600, fontSize: 16, color: colors.fontGray, width: "100%" }}>{data.time}</Text>
                </View>
            </View>
            <Button  onPress={()=>navigation.navigate("SingleRescue",data)} title='Help' style={{ borderRadius: 10, marginTop: 8 }} textStyle={{ color: colors.white }} />
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