import React, { Component } from 'react';
import { Animated, Easing, StyleSheet, Text} from 'react-native';

export default class TrickName extends Component {

    constructor(props) {
        super(props);

        this.state = {
            opacity: new Animated.Value(0)
        }
    }

    componentDidMount() {
        this.animate()
    }

    animate = () => {
        Animated.timing(
            this.state.opacity,
            {
                toValue: 1,
                duration: 1000,
                delay: this.props.index * 50,
                easing: Easing.elastic(6),
                useNativeDriver: true
            }
        ).start()
    }

    render() {
        return (
            <Animated.View style={[{ transform: [{ scaleX: this.state.opacity }, { scaleY: this.state.opacity }] }]} >
                <Text style={[styles.letter]} >{this.props.letter}</Text>
            </Animated.View >
        );
    }
};

const styles = StyleSheet.create({
    letter: {
        fontFamily: 'Nexa Rust Sans',
        alignSelf: 'flex-start',
        marginRight: -4,
        color: 'white',
        fontSize: 54
    }
});

