import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { FontVariants, colors } from '../theme';
import { Ionicons } from '@expo/vector-icons'
import { Pressable } from 'react-native';
import { Image } from 'react-native';
import Button from './Button';
import { screenWidth } from '../consts';
import { deleteObject, ref } from 'firebase/storage';
import { db, storage } from '../firebase';
import { deleteDoc, doc } from 'firebase/firestore';

const UserRescue = ({data}) => {

    const rescueDelete = async (rescue) => {
        try {
          await deleteObject(ref(storage, rescue.id));
          await deleteDoc(doc(db, "rescues", rescue.id));
        }
        catch (err) {
          console.log(err)
        }
      }

    return (
        <Pressable style={{ borderColor: colors.primary, borderWidth: 0.3, borderRadius: 10, margin: 15, marginVertical: 10, ...styles.shadow, backgroundColor: colors.bgGreen }}>
            <View style={{ flexDirection: "row", alignItems: "center", paddingBottom: 10, paddingHorizontal: 10, padding: 10, }}>
                <View>
                    <Image source={{ uri: data.photoUrl }} style={{ borderRadius: 10, width: 100, height: 75, objectFit: "cover" }} />
                </View>
                <View style={{ padding: 10 }}>
                    <Text style={{paddingLeft:5, fontFamily: FontVariants.weight500, fontSize: 17, marginBottom: 5, width: screenWidth / 2 + 10, color: colors.font }} numberOfLines={1}>On {data.date}</Text>
                    <Pressable style={{
                        flexDirection: "row",
                        justifyContent: "flex-start", alignItems: "center",
                        width: "100%",
                        paddingRight: 10
                    }}>
                        <Ionicons name='location' size={24} color={colors.primary} />
                        <Text style={{ fontFamily: FontVariants.weight600, fontSize: 18, width: screenWidth / 2.1, color: colors.font }} numberOfLines={2}>{data.location.formattedLocation}</Text>
                    </Pressable>
                </View>
            </View>
            <View style={{ paddingHorizontal: 10, padding: 10, flexDirection: "row", justifyContent: "space-between", borderTopWidth: 3, borderTopColor: "whitesmoke", paddingTop: 10 }}>
                <View style={{ flexDirection: "row", alignItems: "center" }}>
                    <Image source={{ uri: "https://img.freepik.com/free-vector/alarm-clock-concept-illustration_114360-12926.jpg" }} style={{ height: 40, width: 40, borderRadius: 100 }} />
                    <Text style={{ marginLeft: 6, fontFamily: FontVariants.weight600, fontSize: 16, color: colors.font }}>{data.time}</Text>
                </View>
                <Button title="Delete Now" onPress={()=>rescueDelete(data)} style={{ paddingHorizontal: 20, borderRadius: 10 }} textStyle={{ color: colors.white, fontSize: 15 }} />
            </View>
        </Pressable>
    )
}

export default UserRescue

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