import { StyleSheet, Text, View } from 'react-native'
import React, { useContext } from 'react'
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
import { screenWidth } from '../consts';
import { AuthContext } from '../AuthContext';

const VetsScreen = ({ navigation }) => {
    
    const {CurrentUser} = useContext(AuthContext)

    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: colors.white, }}>
            <View style={{ flexDirection: 'row', alignItems: "center", paddingHorizontal: 15, paddingTop: 10 }}>
                <Pressable style={{ backgroundColor: "white", padding: 10, borderRadius: 10, marginRight: 5 }} onPress={() => navigation.goBack()}>
                    <Image source={{ uri: "https://cdn-icons-png.flaticon.com/512/271/271220.png" }} style={{ width: 20, height: 20, }} />
                </Pressable>
                <Text style={{ fontSize: 24, fontFamily: FontVariants.weight700, color: colors.secondry }}>Vets</Text>
            </View>
                <Pressable style={{ borderRadius: 10, justifyContent: "center", paddingTop: 20,flex:1,marginBottom:50,backgroundColor:"#fff" }}>
                    <View style={{ justifyContent: 'center', alignItems: "center" }}>
                        <Image source={{ uri: "https://img.freepik.com/free-vector/veterinarian-doctor-exam-cat-vet-clinic-room-specialist-with-stethoscope-listen-kitten-heart-beat-patient-lung-examination-room-interior-veterinary-clinic-medicine-domestic-animal_575670-1452.jpg?w=740&t=st=1685176587~exp=1685177187~hmac=921c8cb22c5cd91df3da4764a1403b0a4c2e9472c06d6a6c07841061b97f2074" }} style={{ height:screenWidth-160, width:screenWidth-60 }} />
                    </View>
                    <View style={{ alignItems: "center",paddingHorizontal: 25, paddingVertical: 20 }}>
                    <Text style={{ fontFamily: FontVariants.weight800,textTransform:"uppercase", fontSize: 24, width: "100%", marginBottom: 10, color: colors.font }}>Vets are Coming Soon!</Text>
                        <Text style={{ fontFamily: FontVariants.weight600, fontSize: 19, textTransform: 'capitalize', width: "100%", marginBottom: 10, color: colors.fontGray }}>Are You Curious to Connect with Vets? Let Us Know!</Text>
                        <Button title='I am Interested!' style={{ backgroundColor: "#def5ef", width: "100%", borderWidth: 0.9, borderColor: colors.primary, borderRadius: 10, marginTop: 20, height: 50 }} textStyle={{ fontSize: 18, color: colors.font }} onPress={() => Linking.openURL(`whatsapp://send?phone=+919044558703&text=Hi, I am ${CurrentUser.displayName} and I am Interested to Meet Vets On Savarrior!`)} />
                    </View>
                </Pressable>
        </SafeAreaView>
    )
}

export default VetsScreen

const styles = StyleSheet.create({})