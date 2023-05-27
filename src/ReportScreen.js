import { ActivityIndicator, StyleSheet, Text, View, Alert } from 'react-native'
import React, { useContext, useEffect, useState } from 'react'
import { FontVariants, colors } from '../theme';
import { ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Pressable } from 'react-native';
import { Image } from 'react-native';
import Button from '../components/Button';
import { TouchableOpacity } from 'react-native';
import { AuthContext } from '../AuthContext';
import { dateOptions, formatAMPM, schedulePushNotification, uploadImageAsync } from '../utils/const';
import { doc, setDoc } from 'firebase/firestore';
import { db } from '../firebase';
import * as ImagePicker from 'expo-image-picker'
import AsyncStorage from '@react-native-async-storage/async-storage';
import ReactNativeModal from 'react-native-modal';
import { FirebaseContext } from '../FirebaseData';

const ReportScreen = ({ navigation }) => {

  const { CurrentUser, displayCurrentAddress, newCoords } = useContext(AuthContext)
  const [loading, setLoading] = useState(false)
  const [imagepath, setImagepath] = useState(null)
  const [ContactNo, setPhone] = useState(null)
  const { tokens } = useContext(FirebaseContext)

  const getPhone = async () => {
    const Phone = await AsyncStorage.getItem("Phone")
    Phone ? setPhone(Phone) : null
  }

  useEffect(() => {
    getPhone()
  })

  const phoneRegex = new RegExp(/^(0|91)?[6-9][0-9]{9}$/)

  const handleRescue = async () => {
    const imageName = `rescue${CurrentUser?.displayName}${CurrentUser?.uid}${new Date().getMilliseconds() * 123}`
    const date = new Date().toLocaleString('en-IN', dateOptions)
    const time = formatAMPM(new Date)

    if (ContactNo && imagepath && newCoords) {
      try {
        const imageUrl = await uploadImageAsync(imagepath, imageName)
        await setDoc(doc(db, 'rescues', imageName), {
          id: imageName,
          name: CurrentUser?.displayName,
          phoneNumber: `+91${ContactNo}`,
          location: {
            formattedLocation: displayCurrentAddress.address,
            coords: newCoords
          },
          photoUrl: imageUrl,
          userProfileImg: CurrentUser?.photoURL,
          date: date,
          time: time
        })
        if (imageUrl) {
          setImagepath(defaultImg)
          setLoading(false)
          navigation.navigate("Success")
          schedulePushNotification(tokens, {
            heading: `Rescue Located By ${CurrentUser?.displayName}`,
            msg: `A Rescue is Reported at ${displayCurrentAddress.address}`,
            data: {
              id: imageName,
              name: CurrentUser?.displayName,
              phoneNumber: `+91${ContactNo}`,
              location: {
                formattedLocation: displayCurrentAddress.address,
                coords: newCoords
              },
              photoUrl: imageUrl,
              userProfileImg: CurrentUser?.photoURL,
              date: date,
              time: time
            }
          })
        }

        setLoading(false)

      }
      catch (err) {
        console.log(err)
        setLoading(false)
      }
    }
  }

  const openCamera = async () => {
    // Ask the user for the permission to access the camera
    const permissionResult = await ImagePicker.requestCameraPermissionsAsync();
    console.log(permissionResult)

    if (permissionResult.granted === false) {
      Alert.alert("Camera Access Denied", "You've refused to allow Savarrior to access your Camera! Allow to Coutinue");
      return;
    }

      const result = await ImagePicker.launchCameraAsync({
        quality: 0.6
      });

      if (!result.canceled) {
        setImagepath(result.assets[0].uri)
      }
      if (result.canceled) {
        setLoading(false)
      }
  }


  const submitRescue = async () => {
    if (!phoneRegex.test(ContactNo)) {
      Alert.alert('Invalid Phone Number', "Enter Valid Phone Number in Profile", [
        { text: 'OK' },

      ]);
    }
    else if (!imagepath) {
      Alert.alert('No Image Uploaded', "Click a Image of Animal", [
        { text: 'OK' },

      ]);
    }
    else if (!newCoords) {
      Alert.alert('Invalid Location', "Please Wait for Location to fetch or Reload the App", [
        { text: 'OK' },

      ]);
    }

    else {
      setLoading(!loading)
      handleRescue()
      setLoading(!loading)
    }
  }

  const defaultImg = 'https://cdn-icons-png.flaticon.com/512/1829/1829589.png'


  return (
    <>
      <SafeAreaView style={{ flex: 1, backgroundColor: colors.white, }}>
        <View style={{ flexDirection: 'row', alignItems: "center", paddingHorizontal: 15, paddingTop: 10 }}>
          <Pressable style={{ backgroundColor: "white", padding: 10, borderRadius: 10, marginRight: 5 }} onPress={() => navigation.goBack()}>
            <Image source={{ uri: "https://cdn-icons-png.flaticon.com/512/271/271220.png" }} style={{ width: 20, height: 20, }} />
          </Pressable>
          <Text style={{ fontSize: 24, fontFamily: FontVariants.weight700, color: colors.secondry }}>Report Rescue</Text>
        </View>
        <ScrollView showsVerticalScrollIndicator={false} style={{ paddingHorizontal: 20, paddingTop: 30 }}>
          <View style={{ marginVertical: 10 }}>
            <Text style={{ fontSize: 18, paddingHorizontal: 10, color: colors.font, fontFamily: FontVariants.weight500 }}>Name</Text>
            <Text style={{ fontSize: 18, fontFamily: FontVariants.weight500, paddingHorizontal: 20, backgroundColor: "#f5f5f5", paddingVertical: 15, marginHorizontal: 10, marginTop: 10, borderRadius: 10, color: colors.fontGray }}>{CurrentUser.displayName}</Text>
          </View>
          <View style={{ marginVertical: 10 }}>
            <Text style={{ fontSize: 18, paddingHorizontal: 10, color: colors.font, fontFamily: FontVariants.weight500 }}>Phone Number</Text>
            <View
              style={{
                fontSize: 18, fontFamily: FontVariants.weight500, paddingHorizontal: 20, backgroundColor: "#f5f5f5", paddingVertical: 15, marginHorizontal: 10, marginTop: 10, borderRadius: 10, flexDirection: 'row', alignItems: "center"
              }}
            >
              <Text style={{ fontFamily: FontVariants.weight500, fontSize: 18, marginRight: 10 }}>+91</Text>
              <Text style={{ fontSize: 18, fontFamily: FontVariants.weight500, width: "90%", color: colors.fontGray }} >{ContactNo}</Text>
            </View>
          </View>
          <View style={{ marginVertical: 10 }}>
            <Text style={{ fontSize: 18, paddingHorizontal: 10, color: colors.font, fontFamily: FontVariants.weight500 }}>Location</Text>
            <Text style={{ fontSize: 18, fontFamily: FontVariants.weight500, paddingHorizontal: 20, backgroundColor: "#f5f5f5", paddingVertical: 15, marginHorizontal: 10, marginTop: 10, borderRadius: 10, color: colors.fontGray }}>{displayCurrentAddress.address}</Text>
          </View>
          <View style={{ marginVertical: 10 }}>
            <Text style={{ fontSize: 18, paddingHorizontal: 10, color: colors.font, fontFamily: FontVariants.weight500 }}>Animal's Image</Text>
            <TouchableOpacity onPress={openCamera} style={{ justifyContent: 'center', alignItems: "center", backgroundColor: "#f5f5f5", paddingVertical: imagepath ? 0 : 15, marginHorizontal: 10, marginTop: 10, borderRadius: 10, }}>
              {imagepath &&
                <Image source={{ uri: imagepath }} style={{ height: 190, width: "100%", borderRadius: 10 }} />
              }
              {!imagepath &&
                <Image source={{ uri: defaultImg }} style={{ height: 150, width: 150 }} />}
            </TouchableOpacity>
          </View>
          <Button title='Upload Rescue' textStyle={{ color: '#fff' }} style={{ backgroundColor: colors.primary, marginHorizontal: 10, marginRight: 10, borderRadius: 10, marginTop: 20 }} onPress={submitRescue} />
          <View style={{ height: 150 }} />
        </ScrollView>
      </SafeAreaView>
      <ReactNativeModal isVisible={loading}>
        <ActivityIndicator animating={true} color={colors.primary} size={40} />
      </ReactNativeModal>
    </>
  )
}

export default ReportScreen

const styles = StyleSheet.create({})