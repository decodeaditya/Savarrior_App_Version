import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { SliderBox } from "react-native-image-slider-box";
import { colors } from "../theme";

const Carousel = ({imagesData}) => {
    const images = [
       imagesData.img1,
       imagesData.img2
    ];
    return (
        <View>
            <SliderBox
                images={images}
                autoplay
                circleLoop={true}
                dotColor={colors.primary}
                inactiveDotColor={colors.lightGreen}
                ImageComponentStyle={{
                    borderRadius: 6,
                    width: "90%",
                }}
            />
        </View>
    );
};

export default Carousel;

const styles = StyleSheet.create({});