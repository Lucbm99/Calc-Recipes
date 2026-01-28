import React from "react";
import { style } from "./styles";

import { ActivityIndicator, Text, TouchableOpacity, TouchableOpacityProps } from 'react-native';

type Props = TouchableOpacityProps & {
    text: string,
    loading?: boolean
}
export function Button({...rest}: Props){
    return (
        <TouchableOpacity 
            {...rest} 
            style={style.button} 
            activeOpacity={0.6} 
        >
            {rest.loading ? 
                <ActivityIndicator color={'#FFF'}/> : 
                <Text style={[style.textButton]}>
                    {rest.text}
                </Text>
            }
        </TouchableOpacity>
    );
}