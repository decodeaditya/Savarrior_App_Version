import { View, Text } from 'react-native'
import React, { useCallback, useContext, useEffect, useState } from 'react'
import { NavigationContainer } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import LoginScreen from './src/LoginScreen'
import OnBoardingScreen from './src/OnBoardingScreen'
import { useFonts } from '@expo-google-fonts/urbanist'
import { FontVariants, allFonts, colors } from './theme'
import HomeScreen from './src/HomeScreen'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { Entypo, AntDesign, Ionicons, Octicons, MaterialCommunityIcons } from '@expo/vector-icons'
import { screenWidth } from './consts'
import { StyleSheet } from 'react-native'
import ProfileScreen from './src/ProfileScreen'
import NotificationScreen from './src/NotificationScreen'
import RescuesScreen from './src/RescuesScreen'
import NgosScreen from './src/NgosScreen'
import VetsScreen from './src/VetsScreen'
import ReportScreen from './src/ReportScreen'
import SingleNgoScreen from './src/SingleNgoScreen'
import SingleRescueScreen from './src/SingleRescueScreen'
import { Image } from 'react-native'
import RegisterScreen from './src/RegisterScreen'
import SuccessScreen from './src/SuccessScreen'
import MapScreen from './src/MapScreen'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { AuthContext } from './AuthContext'

const StackNavigator = () => {

    const Stack = createNativeStackNavigator()
    const Tab = createBottomTabNavigator()

    const BottomNavigation = () => (
        <Tab.Navigator initialRouteName='Home' screenOptions={{
            tabBarStyle: {
                position: 'absolute',
                bottom: 0,
                left: 0,
                right: 0,
                elevation: 0,
                borderRadius: 15,
                paddingTop: 10,
                height: 80,
                ...styles.shadow
            }
        }}>
            <Tab.Screen
                name="Home"
                component={HomeScreen}
                options={{
                    tabBarLabel: "Home",
                    headerShown: false,
                    tabBarLabelStyle: {
                        fontFamily: FontVariants.weight600,
                        fontSize: 14,
                        marginBottom: 8,
                        color: colors.fontGray,
                        marginTop: 0
                    },
                    tabBarIcon: ({ focused }) =>
                        focused ? (
                            <View style={{ width: 50, backgroundColor: colors.lightGreen, justifyContent: "center", alignItems: "center", paddingVertical: 5, borderRadius: 10, paddingHorizontal: 10 }}>
                                <Entypo name="home" size={25} color={colors.primary} />
                            </View>
                        ) : (
                            <AntDesign name="home" size={25} color={colors.fontGray} />
                        ),
                }}
            />
            <Tab.Screen
                name="Rescues"
                component={RescuesScreen}
                options={{
                    headerShown: false,
                    tabBarLabel: "Rescues",
                    tabBarLabelStyle: {
                        fontFamily: FontVariants.weight600,
                        fontSize: 14,
                        marginBottom: 8,
                        color: colors.fontGray,
                        marginTop: 0
                    },
                    tabBarIcon: ({ focused }) =>
                        focused ? (
                            <View style={{ width: 50, backgroundColor: colors.lightGreen, justifyContent: "center", alignItems: "center", paddingVertical: 5, borderRadius: 10, paddingHorizontal: 10 }}>
                                <Ionicons name="paw" size={25} color={colors.primary} />
                            </View>
                        ) : (
                            <Ionicons name="paw-outline" size={25} color="black" />
                        ),
                }}
            />
            <Tab.Screen
                name="Report"
                component={ReportScreen}
                options={{
                    tabBarLabel: "Report",
                    headerShown: false,
                    tabBarLabelStyle: {
                        display: "none"
                    },
                    tabBarIcon: ({ focused }) =>
                        <AntDesign name="pluscircle" size={60} color={colors.primary} style={{ bottom: 40, backgroundColor: '#fff', borderRadius: 100, ...styles.shadow, }} />
                }}
            />
            <Tab.Screen
                name="NGOs"
                component={NgosScreen}
                options={{
                    tabBarLabel: "NGOs",
                    headerShown: false,
                    tabBarItemStyle: { color: "red" },
                    tabBarLabelStyle: {
                        fontFamily: FontVariants.weight600,
                        fontSize: 14,
                        marginBottom: 8,
                        color: colors.fontGray,
                        marginTop: 0
                    },
                    tabBarIcon: ({ focused }) =>
                        focused ? (
                            <View View style={{ width: 50, backgroundColor: colors.lightGreen, justifyContent: "center", alignItems: "center", paddingVertical: 5, borderRadius: 10, paddingHorizontal: 10 }}>
                                <Octicons name='organization' size={25} color={colors.primary} />
                            </View>
                        ) : (
                            <Octicons name="organization" size={25} color="black" />
                        ),
                }}
            />
            <Tab.Screen
                name="Vets"
                component={VetsScreen}
                options={{
                    tabBarLabel: "Vets",
                    headerShown: false,
                    tabBarItemStyle: { color: "red" },
                    tabBarLabelStyle: {
                        fontFamily: FontVariants.weight600,
                        fontSize: 14,
                        marginBottom: 8,
                        color: colors.fontGray,
                        marginTop: 0
                    },
                    tabBarIcon: ({ focused }) =>
                        focused ? (
                            <View style={{ width: 50, backgroundColor: colors.lightGreen, justifyContent: "center", alignItems: "center", paddingVertical: 5, borderRadius: 10, paddingHorizontal: 10 }}>
                                <MaterialCommunityIcons name="account-supervisor-circle" size={25} color={colors.primary} />
                            </View>
                        ) : (
                            <MaterialCommunityIcons name="account-supervisor-circle-outline" size={25} color="black" />
                        ),
                }}
            />
        </Tab.Navigator>

    )

    const [fontLoaded] = useFonts(allFonts)
    const [isFirstLaunch, setIsFirstLaunch] = useState(null)
    const {CurrentUser} = useContext(AuthContext)

    useEffect(() => {
        AsyncStorage.getItem("isLaunched").then(value => {
            if (value === null) {
                AsyncStorage.setItem("isLaunched", "true")
                setIsFirstLaunch(true)
            }
            else {
                setIsFirstLaunch(false)
            }
        })
    }, [])

    if (!fontLoaded) {
        return <Text>Loading</Text>
    }

    const AuthNav = () => (
        <Stack.Navigator initialRouteName='BottomNav'>
            <Stack.Screen name="BottomNav" component={BottomNavigation} options={{ headerShown: false }} />
            <Stack.Screen name="Map" component={MapScreen} options={{ headerShown: false }} />
            <Stack.Screen name="Login" component={LoginScreen} options={{ headerShown: false }} />
            <Stack.Screen name="Profile" component={ProfileScreen} options={{ headerShadowVisible: false }} />
            <Stack.Screen name="Alert" component={NotificationScreen} options={{ headerShadowVisible: false }} />
            <Stack.Screen name="Success" component={SuccessScreen} options={{ headerShown: false }} />
            <Stack.Screen name="SingleRescue" component={SingleRescueScreen} options={{ headerShadowVisible: false, headerShown: false }} />
            <Stack.Screen name="SingleNgo" component={SingleNgoScreen} options={{ headerShadowVisible: false, headerShown: false }} />
        </Stack.Navigator>
    )

    const UnAuthNav = () => (
        <Stack.Navigator>
         {isFirstLaunch&& <Stack.Screen name="OnBoarding" component={OnBoardingScreen} options={{ headerTitle: () => (<Image source={require("./assets/logo.png")} style={{ width: 140, height: 40, marginTop: 10 }} />), headerTitleAlign: 'center', headerShadowVisible: false, }} />}
            <Stack.Screen name="Login" component={LoginScreen} options={{ headerShown: false }} />
            <Stack.Screen name="Register" component={RegisterScreen} options={{ headerShown: false }} />
        </Stack.Navigator>
    )


    return (
        CurrentUser ? <AuthNav/> : <UnAuthNav/>
    )
}

const styles = StyleSheet.create({
    shadow: {
        shadowColor: colors.primary,
        shadowOffset: {
            width: 0,
            height: 10
        },
        shadowOpacity: 1,
        shadowRadius: 50,
        elevation: 8
    }
})

export default StackNavigator