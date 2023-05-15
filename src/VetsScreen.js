import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { FontVariants, colors } from '../theme';
import { Feather } from '@expo/vector-icons'
import { TextInput } from 'react-native';
import { ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Pressable } from 'react-native';
import { Image } from 'react-native';
import NgoCard from '../components/NgoCard';
import Button from '../components/Button';
import { Linking } from 'react-native';

const VetsScreen = ({ navigation }) => {

    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: colors.white, }}>
            <View style={{ flexDirection: 'row', alignItems: "center", paddingHorizontal: 15, paddingTop: 10 }}>
                <Pressable style={{ backgroundColor: "white", padding: 10, borderRadius: 10, marginRight: 5 }} onPress={() => navigation.goBack()}>
                <Image source={{ uri: "https://cdn-icons-png.flaticon.com/512/271/271220.png" }} style={{ width: 20, height: 20, }} />
                </Pressable>
                <Text style={{ fontSize: 24, fontFamily: FontVariants.weight700, color: colors.secondry }}>Vets</Text>
            </View>
            <View style={{ borderTopWidth: 4, borderTopColor: '#f5f5f5', marginVertical: 15, marginBottom: 0 }} />
            <View style={{ paddingHorizontal: 25, backgroundColor: colors.bgGreen,flex:1,justifyContent:"center" }}>
                <Pressable style={{ borderRadius: 10, justifyContent: "center", paddingBottom: 20 }}>
                    <View style={{ justifyContent: 'center', alignItems: "center", marginBottom: 10 }}>
                        <Image source={{ uri: "https://wellhavenpethealthlt.com/wp-content/uploads/2018/08/tell-us-vets.png" }} style={{ width: 190, height: 213 }} />
                    </View>
                    <View style={{ alignItems: "center" }}>
                        <Text style={{ fontFamily: FontVariants.weight500, fontSize: 18, width: "100%", marginBottom: 10, }}>Are You Curious to Connect with Vets? Let Us Know!</Text>
                        <Button title="I'm interested " style={{ width: "100%", marginTop: 10, borderRadius: 10 }} textStyle={{ color: colors.white }} onPress={()=>Linking.openURL(`whatsapp://send?phone=9044558703&text=I am Interested to Meet Vets on Savarrior!`)}/>
                    </View>
                </Pressable>
            </View>
        </SafeAreaView>
    )
}

export default VetsScreen

const styles = StyleSheet.create({})