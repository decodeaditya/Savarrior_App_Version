import { StyleSheet, Text, View } from 'react-native'
import React, { useContext, useEffect, useLayoutEffect, useState } from 'react'
import { FontVariants, colors } from '../theme';
import { Image } from 'react-native';
import { Pressable } from 'react-native';
import { ScrollView } from 'react-native';
import Notification from '../components/Notification';
import { AuthContext } from '../AuthContext';
import { screenHeight } from '../consts';

const NotificationScreen = ({ navigation }) => {

    const { AlertList } = useContext(AuthContext)

    useLayoutEffect(() => {
        navigation.setOptions({
            headerShown: true,
            title: "Notifications",
            headerTitleAlign: "left",
            headerTitleStyle: {
                fontSize: 24,
                fontFamily: FontVariants.weight700,
                color: colors.secondry,
            },
            headerStyle: {
                height: 60,
                elevation: 0
            },
            headerLeft: () => (
                <Pressable style={{ backgroundColor: "white", padding: 10, borderRadius: 10 }} onPress={() => navigation.goBack()}>
                    <Image source={{ uri: "https://cdn-icons-png.flaticon.com/512/271/271220.png" }} style={{ width: 20, height: 20, }} />
                </Pressable>
            ),
        });
    }, []);

    return (
        <ScrollView style={{ flex: 1, backgroundColor: colors.white, paddingHorizontal: 10 }}>
            {AlertList.length === 0 && 
            <View style={{justifyContent:"center",alignItems:"center",height:screenHeight/1.2}}>
                <Image source={{uri:"https://cdn.dribbble.com/users/1373705/screenshots/6457914/no_notification_yiran.png?compress=1&resize=400x300"}} style={{width:180,height:180}}/>
                <Text style={{fontSize:18,fontFamily:FontVariants.weight600,color:colors.fontGray}}>No Notifications Yet!</Text>
            </View>}
            {AlertList.map((res, index) => (
                    <Notification data={res} key={index} AlertList={AlertList}/>
            ))}
        </ScrollView>
    )
}

export default NotificationScreen

const styles = StyleSheet.create({})