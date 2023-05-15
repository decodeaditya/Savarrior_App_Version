import { Dimensions } from "react-native";
import { Ionicons } from "@expo/vector-icons"
import { colors } from "../theme";
import { storage } from "../firebase";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { useContext, useEffect, useState } from "react";
import { FirebaseContext } from "../FirebaseData";


export const screenWidth = Dimensions.get("screen").width
export const screenHeight = Dimensions.get("window").height

export const locationOptions = {
    method: 'GET',
    headers: {
        'X-RapidAPI-Key': 'bf68858513msh08a1eb8727753afp19ae90jsn1918cef254fe',
        'X-RapidAPI-Host': 'trueway-geocoding.p.rapidapi.com'
    }
};

export const fetchAddress = async (latitude, longitude) => {
    const response = await fetch(`https://trueway-geocoding.p.rapidapi.com/ReverseGeocode?location=${latitude}%2C${longitude}&language=en`, locationOptions)
    const locate = await response.json()
    return locate
}

export const AllChips = [
    {
        name: "All",
        icon: "",
    },
    {
        name: "Rescues",
        icon: <Ionicons name="bed-outline" size={24} color={colors.primary} />,
    },
    {
        name: "Shelters/NGOs",
        icon: <Ionicons name="bed-outline" size={24} color={colors.primary} />,
    },
]

export const veganTopics = [
    {
        img: "https://static.wixstatic.com/media/dac8c9_0fce4b5d1a41449fb3fe90740a64cb7d~mv2.png/v1/fill/w_214,h_214,al_c,q_85,usm_0.66_1.00_0.01,enc_auto/movie.png",
        title: "Vegan Documentries",
        desc: "Get yourself aware about the cruelty animals go through.",
        slug: "vegan-documentaries"
    },
    {
        img: "https://static.wixstatic.com/media/dac8c9_fc3cfa1c2c4f46f3b0a6e07588de69fc~mv2.png/v1/fill/w_245,h_246,al_c,q_85,usm_0.66_1.00_0.01,enc_auto/dac8c9_fc3cfa1c2c4f46f3b0a6e07588de69fc~mv2.png",
        title: "Vegan Food Library",
        desc: "Here is a curated video library to help to adapt vegan food.",
        slug: "vegan-food-library"
    },
    {
        img: "https://static.wixstatic.com/media/dac8c9_d348e6704018480db8a9f103d5fe8d5e~mv2.png/v1/fill/w_238,h_239,al_c,q_85,usm_0.66_1.00_0.01,enc_auto/piggy.png",
        title: "Reading Resources",
        desc: "Explore a curated list of Vegan Nutrition Guides, Blogs, etc.",
        slug: "vegan-reading-resources"
    },
    {
        img: "https://static.wixstatic.com/media/dac8c9_7f7f861f454647e0a191d0ff8e274544~mv2.png/v1/fill/w_238,h_239,al_c,q_85,usm_0.66_1.00_0.01,enc_auto/shopping%202.png",
        title: "Vegan Brands",
        desc: "Use this e-commerce library for to shop for all your vegan needs.",
        slug: "vegan-brands"
    },
    {
        img: "https://static.wixstatic.com/media/dac8c9_3d159f08b00446e2b9741ada0d96dad1~mv2.png/v1/fill/w_231,h_231,al_c,q_85,usm_0.66_1.00_0.01,enc_auto/dog.png",
        title: "Community & People",
        desc: "Connect with Vegan community to be Aware of Facts.",
        slug: "vegan-community"
    },
]

export const initialUser = {
    displayName: "Guest",
    photoURL: "https://img.freepik.com/premium-vector/anonymous-user-flat-icon-vector-illustration-with-long-shadow_520826-1932.jpg",
}


export const formatAMPM = (date) => {
    let hours = date.getHours();
    let minutes = date.getMinutes();
    let ampm = hours >= 12 ? 'PM' : 'AM';
    hours = hours % 12;
    hours = hours ? hours : 12; // the hour '0' should be '12'
    minutes = minutes < 10 ? '0' + minutes : minutes;
    let strTime = hours + ':' + minutes + ' ' + ampm;
    return strTime;
}

export const dateOptions = {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
};

export const uploadImageAsync = async (uri, name) => {
    const response = await fetch(uri);
    const blob = await response.blob();
    const fileRef = ref(storage, name);
    const result = await uploadBytes(fileRef, blob);


    return await getDownloadURL(fileRef);
}


export const schedulePushNotification = async (tokens,message) => {
    const response = await fetch('https://exp.host/--/api/v2/push/send', {
        method: 'POST',
        headers: {
            Accept: 'application/json',
            'Accept-encoding': 'gzip, deflate',
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            AndroidNotificationPriority: "high",
            to: tokens,
            sound: 'default',
            title: message.heading,
            body: message.msg,
            data: message.data
        }),
    });
}