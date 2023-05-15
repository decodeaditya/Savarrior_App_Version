import { StyleSheet, Text, SafeAreaView, Pressable } from "react-native";
import React from "react";
import LottieView from "lottie-react-native";
import { FontVariants } from "../theme";
import Button from "../components/Button";
import { useRoute } from "@react-navigation/native";

const SuccessScreen = ({ navigation }) => {

    const route = useRoute()

    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: "#fff" }}>
            <LottieView
                source={require("../assets/thumbs.json")}
                style={{
                    height: 300,
                    width: 300,
                    alignSelf: "center",
                    marginTop: 40,
                    justifyContent: "center",
                }}
                autoPlay
                loop={false}
                speed={0.7}
            />
            <Text style={{
                marginVertical: 10,
                fontSize: 26,
                textAlign: "center",
                fontFamily: FontVariants.weight700,
                paddingHorizontal: 10
            }}>Congratulations!</Text>
            <Text
                style={{
                    fontSize: 22,
                    textAlign: "center",
                    fontFamily: FontVariants.weight600,
                    paddingHorizontal: 10, marginBottom: 10
                }}
            >
                {route.params === "ngo" ? "Your NGO has been Updated" : "Your Rescue Has Been Reported"}
            </Text>

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

            <Pressable style={{ flexDirection: "row", justifyContent: "center", marginTop: 20 }}>
                <Button textStyle={{ color: "#fff" }} title='Back To Home' style={{ width: 160, borderRadius: 15 }} onPress={async () => {
                    navigation.navigate("Home")
                }} />
            </Pressable>
        </SafeAreaView>
    );
};


export default SuccessScreen;

const styles = StyleSheet.create({});