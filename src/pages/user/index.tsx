import { Ionicons } from '@expo/vector-icons';
import { NavigationProp, useNavigation } from '@react-navigation/native';
import React from "react";
import { Alert, Text, TouchableOpacity, View } from "react-native";
import { style } from "./styles";

export default function User() {
    const navigation = useNavigation<NavigationProp<any>>();

    const handleLogout = () => {
        Alert.alert("Logout", "Você saiu da conta.");
        return navigation.reset({routes:[{name :'Login'}]});
    };

    return (
        <View style={style.container}>
            <Text style={style.name}>Caio Eduardo.</Text>
            <TouchableOpacity style={style.logoutButton} onPress={handleLogout}>
                <Ionicons 
                    name="exit"  
                    style={{color:'gray'}}
                    size={40}
                />
            </TouchableOpacity>
        </View>
    );
}