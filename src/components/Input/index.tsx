import { FontAwesome, MaterialIcons, Octicons } from '@expo/vector-icons';
import React, { forwardRef, Fragment, LegacyRef } from "react";
import { StyleProp, Text, TextInput, TextInputProps, TextStyle, TouchableOpacity, View } from 'react-native';
import { themas } from "../../global/themes";
import { style } from "./styles";

type IconComponent = React.ComponentType<React.ComponentProps<typeof MaterialIcons>> | 
                     React.ComponentType<React.ComponentProps<typeof FontAwesome>> | 
                     React.ComponentType<React.ComponentProps<typeof Octicons>>;

type Props = TextInputProps & {
    IconLeft?: IconComponent,
    IconRight?: IconComponent,
    iconLeftName?: string,
    iconRightName?: string, 
    title?: string,
    onIconLeftPress?: () => void, 
    onIconRightPress?: () => void ,
    height?: number,
    labelStyle?: StyleProp<TextStyle>
}

export const Input = forwardRef((props: Props, ref: LegacyRef<TextInput> | null) => {
    const { IconLeft, IconRight, iconLeftName, iconRightName, title, onIconLeftPress, onIconRightPress, height, labelStyle, ...rest } = props;

    const calculateSizeWidth = () => {
        if (IconLeft && IconRight) {
            return '80%';
        } else if (IconLeft || IconRight) {
            return '90%';
        } else {
            return '100%';
        }
    };

    const calculateSizePaddingLeft = () => {
        if (IconLeft && IconRight) {
            return 0;
        } else if (IconLeft || IconRight) {
            return 10;
        } else {
            return 20;
        }
    };

    return (
        <Fragment>
            {title && 
                <Text style={[style.titleInput, labelStyle]}>
                    {title}
                </Text>
            }
            <View style={[style.boxInput, { paddingLeft: calculateSizePaddingLeft(), height: height ? height: 40, padding: 5}]}>
                {IconLeft && iconLeftName && (
                    <TouchableOpacity onPress={onIconLeftPress} style={style.Button}>
                        <IconLeft name={iconLeftName as any} size={20} color={themas.colors.gray} style={style.Icon} />
                    </TouchableOpacity>
                )}
                <TextInput 
                    style={[style.Input, { width: calculateSizeWidth(), height: '100%'}]}
                    ref={ref}
                    multiline
                    {...rest}
                    
                />
                {IconRight && iconRightName && (
                    <TouchableOpacity onPress={onIconRightPress} style={style.Button}>
                        <IconRight name={iconRightName as any} size={20} color={themas.colors.gray} style={style.Icon} />
                    </TouchableOpacity>
                )}
            </View>
        </Fragment>
    );
});