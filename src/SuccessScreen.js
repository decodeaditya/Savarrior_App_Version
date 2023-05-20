import { StyleSheet, Text, SafeAreaView, Pressable, View } from "react-native";
import React from "react";
import LottieView from "lottie-react-native";
import { FontVariants, colors } from "../theme";
import Button from "../components/Button";
import { useRoute } from "@react-navigation/native";
import { screenHeight } from "../consts";

const SuccessScreen = ({ navigation }) => {

    const route = useRoute()

    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: "#fff", justifyContent: "space-between", paddingHorizontal: 20, paddingTop: 20 }}>
            <View style={{height:screenHeight*8/10,justifyContent:"center"}}>
                <LottieView
                    source={require("../assets/thumbs.json")}
                    style={{
                        height: 330,
                        width: 330,
                        alignSelf: "center",
                        justifyContent: "center",
                    }}
                    autoPlay
                    loop={false}
                    speed={0.7}
                />
                <Text style={{
                    marginVertical: 10,
                    fontSize: 30,
                    textAlign: "center",
                    fontFamily: FontVariants.weight700,
                    paddingHorizontal: 10
                }}>Congratulations!</Text>
                <Text
                    style={{
                        fontSize: 18,
                        textAlign: "center",
                        fontFamily: FontVariants.weight600,
                        paddingHorizontal: 10, marginBottom: 10, textTransform: "uppercase", color: colors.fontGray
                    }}
                >
                    {route.params === "ngo" ? "Your NGO has been Updated" : "Your Rescue Has Been Reported"}
                </Text>
            </View>

            <LottieView
                source={require("../assets/sparkle.json")}
                style={{
                    height: 200,
                    position: "absolute",
                    top: 100,
                    width: 200,
                    alignSelf: "center",
                }}
                autoPlay
                loop={false}
                speed={0.7}
            />

            <Pressable style={{ flexDirection: "row", justifyContent: "center", marginBottom: 20}}>
                <Button textStyle={{ color: "#fff" }} title='Go to Home' style={{ width: "95%", height: 60, borderRadius: 5 }} onPress={async () => {
                    navigation.navigate("Home")
                }} />
            </Pressable>
        </SafeAreaView>
    );
};


export default SuccessScreen;

const styles = StyleSheet.create({});