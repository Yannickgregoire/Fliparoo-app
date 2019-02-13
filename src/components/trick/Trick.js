import React, { Component } from 'react';
import { StyleSheet, View } from 'react-native';

import Achievements from '../achievements/Achievements';
import TrickDetector from './TrickDetector';
import TrickName from './TrickName';

import DoubleTap from '../ui/DoubleTap';

export default class Trick extends Component {

    constructor(props) {
        super(props);
        this.state = {};
    }

    render() {
        return (
            <View style={styles.container}>
                <DoubleTap style={styles.container} doubleTap={this.props.onDoubleTap} >
                    <TrickName />
                </DoubleTap>
                <Achievements/>
                <TrickDetector />
            </View >
        );
    }
};

const styles = StyleSheet.create({
    container: {
        overflow: 'hidden',
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    }

});
