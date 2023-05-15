import { Image, Pressable, StyleSheet, Text, View } from 'react-native'
import React, { useRef } from 'react'
import { useRoute } from '@react-navigation/native'
import MapView, { Marker, PROVIDER_GOOGLE } from 'react-native-maps'
import { screenHeight } from '../consts'
import { FontVariants, colors } from '../theme'
import { SafeAreaView } from 'react-native-safe-area-context'

const MapScreen = ({navigation}) => {

    const mapView = useRef(null);

    const route = useRoute()
    const data = route.params
    const { latitude, longitude } = data.location.coords

    const zoomRegion = {
        latitude: Number(latitude),
        longitude: Number(longitude),
        latitudeDelta: 0.001,
        longitudeDelta: 0.001,
    };

    return (
        <>
           <SafeAreaView style={{ flexDirection: 'row',backgroundColor:colors.white, alignItems: "center", paddingHorizontal: 15, paddingVertical: 10 }}>
                <Pressable style={{ backgroundColor: "white", padding: 10, borderRadius: 10, marginRight: 5 }} onPress={() => navigation.goBack()}>
                    <Image source={{ uri: "https://cdn-icons-png.flaticon.com/512/271/271220.png" }} style={{ width: 15, height: 15, }} />
                </Pressable>
                <Text style={{ fontSize: 18, fontFamily: FontVariants.weight600, color: colors.secondry }}>Back</Text>
            </SafeAreaView>
            <View style={styles.container}>
                <MapView
                    provider={PROVIDER_GOOGLE}
                    style={styles.map}
                    ref={mapView}
                    initialRegion={zoomRegion} //your region data goes here.
                >
                    <Marker coordinate={{
                        latitude: Number(latitude),
                        longitude: Number(longitude)
                    }} title={data.name} />
                </MapView>
            </View>
        </>
    )
}

export default MapScreen

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#fff",
    },
    map: {
        width: '100%',
        height: screenHeight,
        borderRadius: 10
    },
})