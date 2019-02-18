import React, { Component } from 'react';
import { TouchableOpacity, StyleSheet, View, Image } from 'react-native';

export default class ImageButton extends Component {

    constructor(props) {
        super(props);
    }

    render() {
        return (
            <TouchableOpacity delayPressIn={0} onPressOut={this.props.onPress} style={[styles.container, this.props.style]} activeOpacity={.5}>
                <Image
                    style={styles.image}
                    source={this.props.image}
                />
            </TouchableOpacity>
        );
    }
};

const styles = StyleSheet.create({
    container: {
        width: 40,
        height: 40,
    }, image: {
        width: 40,
        height: 40,
    },
});
