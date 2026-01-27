import { StyleSheet, Dimensions} from "react-native";
import { themas } from "../../global/themes";


export const style = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    },
    boxTop: {
        height: Dimensions.get('window').height/3,
        width: '100%',
        alignItems: 'center',
        justifyContent: 'center'
    },
    boxMid: {
        height: Dimensions.get('window').height/4,
        width: '100%',
        paddingHorizontal: 37,
    },
    boxBottom: {
        height: Dimensions.get('window').height/3,
        width: '100%',
        alignItems: 'center',
        justifyContent: 'flex-start'
        
    },
    logo: {
        width: 80,
        height: 80,
        marginTop: 40
    },
    text: {
        marginTop: 35,
        fontSize: 18,
        fontWeight: 'bold'
    },
    boxIcon: {
        width: 50,
        height: 50,
        backgroundColor: 'red'
    },
    textBottom: {
        fontSize: 16,
        color: themas.colors.gray,
        marginBottom: 35
    },
    textBottomCreate: {
        fontSize: 16,
        color: themas.colors.primary
    }
})