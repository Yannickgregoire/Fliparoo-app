import React, { Component } from 'react';
import { StyleSheet, View } from 'react-native';

import TrickDetector from './TrickDetector';
import TrickName from './TrickName';

import DoubleTap from '../ui/DoubleTap';

export default class Trick extends Component {

    constructor(props) {
        super(props);
        this.state = {};
    }

    componentDidMount() { }

    render() {
        return (
            <View style={styles.container}>
                <DoubleTap style={styles.container} doubleTap={() => { this.props.onDoubleTap() }}>
                    <TrickName />
                </DoubleTap>
                <TrickDetector />
            </View >
        );
    }
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    }

});
