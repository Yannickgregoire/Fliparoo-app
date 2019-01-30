import { Dimensions, StyleSheet } from 'react-native';

const { width, height } = Dimensions.get('window');

export const StyleBook = StyleSheet.create({
    container: {
        flex: 1,
        width: '80%',
        marginLeft: '10%',
        justifyContent: 'center',
    },
    scroll: {
        height: height
    },
    content: {
        flex: 1,
        height: height,
        justifyContent: 'center',
        marginTop: -60
    },
    background: {
        flex: 1,
        backgroundColor: 'black'
    },
    swiper: {
        backgroundColor: 'black'
    },
    row: {
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    divider: {
        height: 32
    },
    heading: {
        fontFamily: 'Sofia Pro',
        fontWeight: 'bold',
        color: 'white',
        fontSize: 32,
        textAlign: 'left',
        marginBottom: 24
    },
    body: {
        fontFamily: 'Roboto',
        color: 'white',
        fontSize: 18,
        marginBottom: 18,
        lineHeight: 24
    },
    description: {
        fontFamily: 'Roboto',
        color: 'white',
        fontSize: 14,
        marginBottom: 18,
        marginTop: -14,
        lineHeight: 18,
        opacity: .8
    },
    button: {
        padding: 12,
        alignSelf: 'flex-start',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'white',
        borderRadius: 50
    },
    buttonTouchable: {
        width: '100%',
    },
    buttonIcon: {
        fontSize: 24,
        marginRight: 8
    },
    buttonText: {
        fontFamily: 'Sofia Pro',
        fontWeight: 'bold',
        color: 'black',
        fontSize: 18,
        lineHeight: 24
    },
    buttonDescription: {
        fontFamily: 'Roboto',
        color: 'black',
        fontSize: 14,
        lineHeight: 18,
        marginTop: -6,
        opacity: .8
    },
    buttonFixed: {
        position: 'absolute',
        width: '60%',
        left: '20%',
        bottom: 60,
    },
    buttonRadio: {
        width: '100%',
        borderColor: 'white',
        borderWidth: 1,
        backgroundColor: 'transparent',
        opacity: .5
    },
    buttonRadioTouchable: {
        width: '48%',
    },
    buttonRadioSelected: {
        opacity: 1
    },
    buttonRadioText: {
        color: 'white'
    },
    buttonRadioDescription: {
        color: 'white'
    },
});