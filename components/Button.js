import { StyleSheet, Text } from 'react-native'
import React from 'react'
import { Pressable } from 'react-native'
import { colors,FontVariants } from '../theme'

const Button = ({title,onPress,style,textStyle}) => {
  return (
    <Pressable style={{...styles.btnContainer,...style}} onPress={onPress}>
        <Text style={{...styles.btnText,...textStyle}}>{title}</Text>
    </Pressable>
  )
}

export default Button

const styles = StyleSheet.create({
    btnContainer:{
        backgroundColor:colors.primary,
        paddingVertical:10,
        paddingHorizontal:10,
        flexDirection:'row',
        alignItems:'center',
        justifyContent:"center"
    },
    btnText:{
        fontFamily:FontVariants.weight600,
        color:colors.fontGray,
        fontSize:20,
        textAlign:"center"
    }
})