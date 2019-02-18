import React, { Component } from 'react';
import { StyleSheet, View, Text } from 'react-native';
import { StyleBook } from '../../style/StyleBook';
import { ifIphoneX } from 'react-native-iphone-x-helper'

export default class Tabbar extends Component {

    constructor(props) {
        super(props);
        this.state = {};
    }

    render() {
        return (
            <View style={[styles.tabbar, this.props.style]}>
                    {this.props.children}
            </View>
        );
    }
};

const styles = StyleSheet.create({
    tabbar: {
        height: 60,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        ...ifIphoneX({
            paddingTop: 20,
            paddingBottom: 40
        }, {
            paddingHorizontal: 20,
        })
    }
});
