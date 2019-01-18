import React, { Component } from 'react';
import { StyleSheet } from 'react-native';

import Trick from './trick/Trick';

export default class App extends Component {

    constructor(props) {
        super(props);
    }

    componentDidMount() { }

    render() {
        return (
            <Trick style={[styles.tricks]} />
        );
    }
};

const styles = StyleSheet.create({
    trick: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#a8d1e7'
    }
});
