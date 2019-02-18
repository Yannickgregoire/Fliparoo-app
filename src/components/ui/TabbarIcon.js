import React, { Component } from 'react';
import { StyleSheet, View, Text, Image, TouchableOpacity } from 'react-native';
import { StyleBook } from '../../style/StyleBook';

export default class TabbarIcon extends Component {

    constructor(props) {
        super(props);
        this.state = {};
    }

    render() {
        return (
            <TouchableOpacity delayPressIn={0} onPressOut={this.props.onPress} style={styles.icon}  activeOpacity={.8}>
                <View style={[styles.icon, { opacity: (this.props.selected === true) ? 1 : .3 }]}>
                    <Image
                        style={styles.image}
                        source={this.props.icon}
                    />
                    <Text style={styles.text}>{this.props.title}</Text>
                </View>
            </TouchableOpacity >
        );
    }
};

const styles = StyleSheet.create({
    icon: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    },
    text: {
        fontFamily: 'Roboto',
        color: 'white',
        fontSize: 9
    },
    image: {
        width: 30,
        height: 30,
        marginBottom: 4
    }
});
