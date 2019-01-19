import React, { Component } from 'react';
import { StyleSheet, View } from 'react-native';

import TrickDetector from './TrickDetector';
import TrickName from './TrickName';

export default class Trick extends Component {

    constructor(props) {
        super(props);
        this.state = {};
    }

    componentDidMount() { }

    render() {
        return (
            <View style={styles.container}>
                <TrickName />
                <TrickDetector />
            </View >
        );
    }
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'black'
    }
});
