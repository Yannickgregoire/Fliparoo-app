import React, { Component } from 'react';
import { LayoutAnimation, StyleSheet, View } from 'react-native';
import { StyleBook } from '../style/StyleBook';

export default class App extends Component {

    constructor(props) {
        super(props);
        this.state = { overlayOpacity: 1 };
    }

    componentDidMount() {
        LayoutAnimation.configureNext(LayoutAnimation.Presets.spring);
        this.setState({ overlayOpacity: 0 });
    }

    render() {
        return (
            <View pointerEvents="none" style={[StyleBook.background, styles.overlay, { opacity: this.state.overlayOpacity }]}></View>
        );
    }
};

const styles = StyleSheet.create({
    overlay: {
        position: 'absolute',
        width: '100%',
        height: '100%'
    }
});
