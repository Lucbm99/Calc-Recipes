import React, { createContext, useContext, useEffect, useRef, useState } from "react"; 
 { themas } from "../global/themes";
import { Input } from "../components/Input";
import { Modalize } from 'react-native-modalize';
import { MaterialIcons, AntDesign } from '@expo/vector-icons';
import { TouchableOpacity, Text, View, StyleSheet, KeyboardAvoidingView, Platform, ScrollView } from 'react-native';

export const AuthContextList: any = createContext({});

export const AuthProviderList = (props: any):any => {
    const modalizeRef = useRef<Modalize>(null);
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [selectedFlag, setSelectedFlag] = useState('urgente');
    const [selectedDate, setSelectedDate] = useState(new Date());
    const [selectedTime, setSelectedTime] = useState(new Date());
    const [showDatePicker, setShowDatePicker] = useState(false);
    const [showTimePicker, setShowTimePicker] = useState(false);
    const [taskList, setTaskList] = useState([]);
    const [taskListBackup,setTaskListBackup]= useState([]);
    const [item,setItem] = useState(0);
    const [loading,setLoading]= useState(false)

    const onOpen = () => {
        modalizeRef.current?.open();
    };

    const onClose = () => {
        modalizeRef.current?.close();
    };

    useEffect(() => {
        get_taskList();
    }, []);


    const _container = () => {
        return (
            <KeyboardAvoidingView 
                style={styles.container}
                behavior={Platform.OS === "ios" ? "padding" : "height"}
                keyboardVerticalOffset={Platform.OS === "ios" ? 40 : 0}
            >
                <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
                    <View style={styles.header}>
                        <TouchableOpacity onPress={() => onClose()}>
                            <MaterialIcons name="close" size={30} />
                        </TouchableOpacity>
                        <Text style={styles.title}>{item != 0 ? 'Editar tarefa' : 'Criar tarefa'}</Text>
                        <TouchableOpacity onPress={handleSave}>
                            <AntDesign name="check" size={30} />
                        </TouchableOpacity>
                    </View>
                    <View style={styles.content}>
                        <Input 
                            title="Título:" 
                            labelStyle={styles.label} 
                            value={title}
                            onChangeText={setTitle}
                        />
                        <Input 
                            title="Descrição:" 
                            numberOfLines={5} 
                            height={100} 
                            multiline 
                            labelStyle={styles.label} 
                            textAlignVertical="top"
                            value={description}
                            onChangeText={setDescription}
                        />
                        <View style={{ width: '100%', flexDirection: 'row', gap: 10 }}>
                            <TouchableOpacity onPress={() => setShowDatePicker(true)} style={{ width: 200, zIndex: 999 }}>
                                <Input 
                                    title="Data limite:" 
                                    labelStyle={styles.label} 
                                    editable={false}
                                    value={selectedDate.toLocaleDateString()}
                                    onPress={() => setShowDatePicker(true)} 
                                />
                            </TouchableOpacity>
                            <TouchableOpacity onPress={() => setShowDatePicker(true)} style={{ width: 100 }}>
                                <Input 
                                    title="Hora limite:" 
                                    labelStyle={styles.label} 
                                    editable={false}
                                    value={selectedTime.toLocaleTimeString()}
                                    onPress={() => setShowTimePicker(true)}
                                />
                            </TouchableOpacity>
                        </View>

                            <CustomDateTimePicker 
                                type='date' 
                                onDateChange={handleDateChange} 
                                show={showDatePicker} 
                                setShow={setShowDatePicker} 
                            />
                            <CustomDateTimePicker 
                                type='time' // Mude para 'time' aqui
                                onDateChange={handleTimeChange} 
                                show={showTimePicker} // Use showTimePicker aqui
                                setShow={setShowTimePicker} // Use setShowTimePicker aqui
                            />

                        <View style={styles.containerFlag}>
                            <Text style={styles.flag}>Flags:</Text>
                            <View style={{ flexDirection: 'row', gap: 10, marginTop: 10 }}>
                                {_renderFlags()}
                            </View>
                        </View>
                    </View>
                </ScrollView>
            </KeyboardAvoidingView>
        );
    }

    return (
        <AuthContextList.Provider value={{ onOpen, taskList, handleEdit, handleDelete, taskListBackup, filter }}>
            <Loading loading={loading} />
                {props.children}
            <Modalize 
                ref={modalizeRef} 
                childrenStyle={{ height: 600 }} 
                adjustToContentHeight={true}
            >
                {_container()}
            </Modalize>
        </AuthContextList.Provider>

    )
}


export const styles = StyleSheet.create({
    container: {
        width: '100%',
    },
    header: {
        width: '100%',
        height: 40,
        paddingHorizontal: 40,
        flexDirection: 'row',
        marginTop: 20,
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    title: {
        fontSize: 20,
        fontWeight: 'bold'
    },
    content: {
        width: '100%',
        paddingHorizontal: 20
    },
    label: {
        fontWeight: 'bold',
        color: '#000'
    },
    containerFlag: {
        width: '100%',
        padding: 10
    },
    flag: {
        fontSize: 14,
        fontWeight: 'bold'
    }
});



export const useAuth = () => useContext(AuthContextList);