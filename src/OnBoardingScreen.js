import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import Onboarding from 'react-native-onboarding-swiper'
import { Image } from 'react-native'
import { screenHeight, screenWidth } from '../consts'
import { FontVariants, colors } from '../theme'
import { Pressable } from 'react-native'
import Button from '../components/Button'
import { useNavigation } from '@react-navigation/native'

const SwiperItems = [
    {
        backgroundColor: "#fff",
        title: "REPORT RESCUES",
        subtitle: "Millions of People use to Turn ideas into Reality.",
        image: <Image source={{ uri: "https://img.freepik.com/free-vector/good-doggy-illustration-concept_114360-887.jpg?w=740&t=st=1683527107~exp=1683527707~hmac=94bc0c83b274f6a72f27e220c8bc9f81d79d0ec4cdf3aebbcf37497f3d1ae898" }} style={{ width: screenWidth - 40, height: screenWidth - 40 }} />
    },
    {
        backgroundColor: "#fff",
        title: "LOCATE RESCUES NEARBY",
        subtitle: "Millions of People use to Turn ideas into Reality.",
        image: <Image source={{ uri: "https://img.freepik.com/free-vector/solidarity-concept-illustration_114360-6226.jpg?w=740&t=st=1683527497~exp=1683528097~hmac=cf03276ef170ecf14602fccc71a5e150346576ba43a61d157ebe7c4ce7adeed8" }} style={{ width: screenWidth - 40, height: screenWidth - 40 }} />
    },
    {
        backgroundColor: "#fff",
        title: "CONNECT WITH VETS",
        subtitle: "Millions of People use to Turn ideas into Reality",
        image: <Image source={{ uri: "https://img.freepik.com/free-vector/veterinary-concept-illustration_114360-3226.jpg?w=740&t=st=1683526604~exp=1683527204~hmac=9ccd9c75ef08ccb282c061b1faaa5d1b97df389423c9fd1293fec92748fb3c1b" }} style={{ width: screenWidth - 40, height: screenWidth - 40 }} />
    },
    {
        backgroundColor: "#fff",
        title: "CONNECT WITH NGOS",
        subtitle: "Millions of People use to Turn ideas into Reality.",
        image: <Image source={{ uri: "https://img.freepik.com/free-vector/animal-shelter-concept-illustration_114360-2876.jpg?w=740&t=st=1683525990~exp=1683526590~hmac=89ae18c9f3b49bb278177073ffa20a538de57f8fe18c72f13338bc3917e8acf2" }} style={{ width: screenWidth - 40, height: screenWidth - 40 }} />
    }
]

const Dots = ({ selected }) => {

    return (
        <View
            style={{
                width: selected ? 17 : 10,
                marginBottom: screenHeight/6,
                borderRadius: 30,
                height: 10,
                marginHorizontal: 3,
                backgroundColor: selected ? colors.primary : 'rgba(0, 0, 0, 0.3)',
            }}
        />
    );
}

const Skip = ({ ...props }) => (
    <Pressable style={{ marginLeft: 25, padding: 10 }} {...props}>
        <Text style={{ fontSize: 18, fontFamily: FontVariants.weight700, color: colors.fontGray }}>Skip</Text>
    </Pressable>
)

const Next = ({ ...props }) => (
    <Button title='Next' textStyle={{color:colors.white}} style={{ marginRight: 15, width: 100, color: colors.fontGray, borderRadius: 10, paddingVertical: 8 }}  {...props} />
);

const Done = ({ ...props }) => (
    <Pressable style={{ width: screenWidth, alignItems: "center" }} {...props}>
        <Button title='Get Started' textStyle={{color:colors.white}} style={{ width: screenWidth - 40, color: colors.fontGray, borderRadius: 10, }} {...props} />
    </Pressable>
);



const OnBoardingScreen = () => {

    const navigation = useNavigation()

    return (
            <Onboarding
                bottomBarHighlight={false}
                DoneButtonComponent={Done}
                SkipButtonComponent={Skip}
                NextButtonComponent={Next}
                DotComponent={Dots}
                imageContainerStyles={{ height: screenWidth - 10 }}
                onSkip={() => navigation.replace("Login")}
                onDone={() => navigation.replace('Login')}
                containerStyles={{
                    justifyContent: "flex-start",
                    alignItems: "flex-start",
                    paddingHorizontal:10,
                    marginTop:20
                }}
                titleStyles={{ fontSize: 18, paddingHorizontal: 10, color: colors.fontGray, fontFamily: FontVariants.weight700 }}
                subTitleStyles={{ paddingHorizontal: 9, fontSize: screenWidth / 11, fontFamily: FontVariants.weight800, textAlign: "left", color: colors.font }}
                pages={SwiperItems} />
    )
}

export default OnBoardingScreen

const styles = StyleSheet.create({})