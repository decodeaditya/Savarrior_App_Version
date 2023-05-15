import { StyleSheet, Text, View, Pressable } from 'react-native'
import React from 'react'
import { TouchableOpacity } from 'react-native'
import { Image } from 'react-native'
import { Ionicons } from '@expo/vector-icons'
import { FontVariants, colors } from '../theme'
import { screenWidth } from '../consts'
import Button from './Button'
import { useNavigation } from '@react-navigation/native'

const NgoCard = ({style,locationStyle,data}) => {

    const navigation = useNavigation()

    return (
        <TouchableOpacity onPress={()=>navigation.navigate("SingleNgo",data)} activeOpacity={1} style={{backgroundColor: '#f1faf7', alignItems: "center", borderRadius: 10, width: screenWidth-50, marginRight: 25, borderWidth: 0.7, borderColor: colors.lightGreen, ...style, }}>
            <View style={{ width: "100%", alignItems: 'center', padding: 20,paddingBottom:10 }}>
                <Image source={{ uri: data.images.img1 }} style={{ width: "100%", height: 250, objectFit: "cover", borderRadius: 20 }} />
            </View>
            <View style={{marginHorizontal:15,width:"85%"}}>
                <View>
                    <Text style={{ fontSize: 20, color: colors.font, fontFamily: FontVariants.weight700, }} numberOfLines={1}>{data.name}</Text>
                </View>
                <Pressable style={{
                    flexDirection: "row",
                    paddingVertical: 10, justifyContent: "flex-start",
                }}>
                    <Ionicons name='location-outline' size={24} color={colors.primary} />
                    <Text style={{ marginLeft:5,fontSize: 17, color: colors.font, fontFamily: FontVariants.weight600, width: "90%", ...locationStyle}} numberOfLines={2}>{data.location}</Text>
                </Pressable>
                <Button title='View' onPress={()=>navigation.navigate("SingleNgo",data)} style={{borderRadius:10,marginBottom:20,marginTop:8}} textStyle={{color:colors.white}}/>
            </View>
        </TouchableOpacity>
    )
}

export default NgoCard

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