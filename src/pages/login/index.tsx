import React, { useState } from "react";
import Logo from '../../assets/logo.png';
import { style } from "./styles";

import { Alert, Image, Text, View } from 'react-native';
import { Button } from "../../components/Button";
import { Input } from "../../components/Input";
import { useNavigation, NavigationProp  } from '@react-navigation/native';
import { MaterialIcons, Octicons } from '@expo/vector-icons';

export default function Login (){
    const navigation = useNavigation<tionProp<any>>();

    const [email, setEmail]               = useState('');
    const [password, setPassword]         = useState('');
    const [showPassword, setShowPassword] = useState(true);
    const [loading, setLoading]           = useState(false);


    async function getLogin() {
        try {
            setLoading(true)
            if(!email ||!password){
                return Alert.alert('Atenção','Informe os campos obrigatórios!')
            }

            if(email === 'caio@gmail.com' && password === '12345') {
                return navigation.reset({
                    routes:[
                        {name :'BottomRoutes'}
                    ]
                });
            }

            Alert.alert('Atenção','E-mail ou senha inválida!')
        } catch (error) {
            console.log(error)
        } finally {
            setLoading(false)
        }
    }


    return (
        <View style={style.container}>
            <View style={style.boxTop}>
                <Image 
                    source={Logo} 
                    style={style.logo}
                    resizeMode="contain"
                />
                <Text style={style.text}>Bem vindo de volta!</Text>
            </View>
            <View style={style.boxMid}>
                <Input 
                    title="E-mail:"
                    value={email}
                    onChangeText={setEmail}
                    IconRight={MaterialIcons}
                    iconRightName="email"
                    onIconRightPress={() => console.log('OLA')}
                />
                <Input 
                    title="Senha:"
                    value={password}
                    onChangeText={setPassword}
                    IconRight={Octicons}
                    iconRightName={showPassword ? "eye-closed" : "eye" }
                    onIconRightPress={() => setShowPassword(!showPassword)}
                    secureTextEntry={true}
                    multiline={false}
                />
            </View>
            <View style={style.boxBottom}>
                <Button  text="Entrar" loading={loading} onPress={() => getLogin()}/>
            </View>
            <Text style={style.textBottom}>Não tem conta? <Text  style={style.textBottomCreate}>Crie agora</Text></Text>
        </View>
    )
}