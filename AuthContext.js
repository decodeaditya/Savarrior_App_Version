import { onAuthStateChanged, signInWithCustomToken } from "firebase/auth";
import { createContext, useState, useEffect, useRef } from "react";
import { auth, db } from './firebase';
import * as Location from 'expo-location'
import { Alert } from "react-native";
import { fetchAddress } from './utils/const';
import AsyncStorage from "@react-native-async-storage/async-storage";
import * as Device from 'expo-device';
import * as Notifications from 'expo-notifications';
import { useNavigation } from "@react-navigation/native";
import { arrayUnion, doc, updateDoc } from "firebase/firestore";
import { getDistance } from "geolib";

Notifications.setNotificationHandler({
    handleNotification: async () => ({
        shouldShowAlert: true,
        shouldPlaySound: true,
        shouldSetBadge: false,
    }),
});


export const AuthContext = createContext()

export const AuthContextProvider = ({ children }) => {
    const [ContactNo, setContactNo] = useState("")
    const [AlertList, setAlertList] = useState([])
    const [CurrentUser, setCurrentUser] = useState(null)
    const [locationServicesEnabled, setlocationServicesEnabled] = useState(false);
    const [newCoords, setCoords] = useState(null)
    const [displayCurrentAddress, setdisplayCurrentAddress] = useState({
        address: "Fetching Your Location"
    });

    const [expoPushToken, setExpoPushToken] = useState('');
    const [notification, setNotification] = useState(false);
    const notificationListener = useRef();
    const responseListener = useRef();

    const navigation = useNavigation()

    useEffect(() => {
        try {
            checkIfLocationEnabled();
            getCurrentLocation();
        }
        catch (err) {
            console.log(err)
        }
    }, []);

    const checkIfLocationEnabled = async () => {
        let enabled = await Location.hasServicesEnabledAsync();
        if (!enabled) {
            Alert.alert(
                "Location services not enabled",
                "Please enable the location services",
                [
                    {
                        text: "Cancel",
                        style: "cancel",
                    },
                    { text: "OK" },
                ],
                { cancelable: false }
            );
        } else {
            setlocationServicesEnabled(enabled);
        }
    };


    const getCurrentLocation = async () => {
        let { status } = await Location.requestForegroundPermissionsAsync();

        if (status !== "granted") {
            Alert.alert(
                "Permission denied",
                "allow the app to use the location services",
                [
                    {
                        text: "Cancel",
                        style: "cancel",
                    },
                    { text: "OK" }
                ],
                { cancelable: false }
            );
        }

        const { coords } = await Location.getCurrentPositionAsync({ accuracy: Location.Accuracy.Highest, maximumAge: 10000 });
        if (coords) {
            const { latitude, longitude } = coords;

            setCoords(coords)

            let response = await Location.reverseGeocodeAsync({
                latitude,
                longitude,
            });


            for (let item of response) {
                let address = `${item.name} ${item.city} ${item.postalCode}`;
                setdisplayCurrentAddress({
                    address: address,
                    city: item.city,
                    region: item.region
                });
            }

        };

    };


    useEffect(() => {
        const AuthState = onAuthStateChanged(auth, async (user) => {
            setCurrentUser(user)
            try {
                getCurrentLocation()
            }
            catch (err) {
                console.log(err)
            }
            const LocalUserData = await AsyncStorage.getItem("UserData")
            if (LocalUserData === null || user !== null) {
                await AsyncStorage.setItem("UserData", JSON.stringify(user))
                const updatedUser = await AsyncStorage.getItem("UserData")
                setCurrentUser(JSON.parse(updatedUser))
            }
            else if (LocalUserData !== null) {
                const updatedUser = await AsyncStorage.getItem("UserData")
                setCurrentUser(JSON.parse(updatedUser))
            }
        })

        return () => {
            AuthState()
        }
    }, [])



    useEffect(() => {
        registerForPushNotificationsAsync().then(token => setExpoPushToken(token));

        notificationListener.current = Notifications.addNotificationReceivedListener(async (notification) => {
            setNotification(notification);
            const data = notification.request.content.data

            
            const distanceFromPoint = getDistance(
                { latitude: Number(newCoords?.latitude), longitude: Number(newCoords?.longitude) },
                { latitude: Number(data.location.coords.latitude), longitude: Number(data.location.coords.longitude) }
            )

            const localList = await AsyncStorage.getItem("Notifications")
            setAlertList(localList)
            AlertList.push(data)
            await AsyncStorage.setItem("Notifications", JSON.stringify(AlertList))

            try {
                const jsonValue = await AsyncStorage.getItem('Notifications')
                return jsonValue != null ? setAlertList(JSON.parse(jsonValue)) : null;
            } catch (e) {
                // error reading value
            }
        });

        responseListener.current = Notifications.addNotificationResponseReceivedListener(async (response) => {

            
            const data = response.notification.request.content.data

            const distanceFromPoint = getDistance(
                { latitude: Number(newCoords?.latitude), longitude: Number(newCoords?.longitude) },
                { latitude: Number(data.location.coords.latitude), longitude: Number(data.location.coords.longitude) }
            )

            const calcdist = distanceFromPoint / 1000 < 1 ? `${distanceFromPoint} Meters` : `${distanceFromPoint / 1000}KM`

            navigation.navigate("SingleRescue", {
                data: data,
                distanceFromPoint: calcdist
            })
            const filterdList = AlertList.filter((item) => {
                return item.id !== data.id
            })
            setAlertList(filterdList)
            await AsyncStorage.setItem("Notifications", JSON.stringify(filterdList))
            try {
                const jsonValue = await AsyncStorage.getItem('Notifications')
                return jsonValue != null ? setAlertList(JSON.parse(jsonValue)) : null;
            } catch (e) {
                // error reading value
            }

        });

        return () => {
            Notifications.removeNotificationSubscription(notificationListener.current);
            Notifications.removeNotificationSubscription(responseListener.current);
        };
    }, []);


    useEffect(() => {
        const unsub = () => {
            async () => {
                const jsonValue = await AsyncStorage.getItem('Notifications')
                return jsonValue != null ? setAlertList(JSON.parse(jsonValue)) : null;
            }

        }
        return unsub

    }, [])

    async function registerForPushNotificationsAsync() {
        let token;

        if (Platform.OS === 'android') {
            await Notifications.setNotificationChannelAsync('default', {
                name: 'default',
                importance: Notifications.AndroidImportance.MAX,
                vibrationPattern: [0, 250, 250, 250],
                lightColor: '#FF231F7C',
            });
        }

        if (Device.isDevice) {
            const { status: existingStatus } = await Notifications.getPermissionsAsync();
            let finalStatus = existingStatus;
            if (existingStatus !== 'granted') {
                const { status } = await Notifications.requestPermissionsAsync();
                finalStatus = status;
            }
            if (finalStatus !== 'granted') {
                Alert.alert('','Allow for Notifications to Get Rescues and Other Updates!');
                return;
            }
            token = (await Notifications.getExpoPushTokenAsync()).data;
            await updateDoc(doc(db, "notifications", "notifications"), {
                tokens: arrayUnion(token)
            })
        } else {
            alert('Must use physical device for Push Notifications');
        }

        return token;
    }



    return (
        <AuthContext.Provider value={{ CurrentUser, displayCurrentAddress, newCoords, AlertList }}>
            {children}
        </AuthContext.Provider>
    )
}