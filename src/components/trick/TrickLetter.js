import React, { Component } from 'react';
import { Animated, Easing, StyleSheet, Text } from 'react-native';

export default class TrickName extends Component {

    constructor(props) {
        super(props);
        this.opacity = new Animated.Value(0);
    }

    componentDidMount() {
        this.animate()
    }

    animate = () => {
        Animated.timing(
            this.opacity,
            {
                toValue: 1,
                duration: 1000,
                delay: this.props.index * 50,
                easing: Easing.elastic(6),
                useNativeDriver: true
            }
        ).start()
    }

    isEmoji = (string) => {
        const regex = /(?:[\u2700-\u27bf]|(?:\ud83c[\udde6-\uddff]){2}|[\ud800-\udbff][\udc00-\udfff]|[\u0023-\u0039]\ufe0f?\u20e3|\u3299|\u3297|\u303d|\u3030|\u24c2|\ud83c[\udd70-\udd71]|\ud83c[\udd7e-\udd7f]|\ud83c\udd8e|\ud83c[\udd91-\udd9a]|\ud83c[\udde6-\uddff]|[\ud83c[\ude01\uddff]|\ud83c[\ude01-\ude02]|\ud83c\ude1a|\ud83c\ude2f|[\ud83c[\ude32\ude02]|\ud83c\ude1a|\ud83c\ude2f|\ud83c[\ude32-\ude3a]|[\ud83c[\ude50\ude3a]|\ud83c[\ude50-\ude51]|\u203c|\u2049|[\u25aa-\u25ab]|\u25b6|\u25c0|[\u25fb-\u25fe]|\u00a9|\u00ae|\u2122|\u2139|\ud83c\udc04|[\u2600-\u26FF]|\u2b05|\u2b06|\u2b07|\u2b1b|\u2b1c|\u2b50|\u2b55|\u231a|\u231b|\u2328|\u23cf|[\u23e9-\u23f3]|[\u23f8-\u23fa]|\ud83c\udccf|\u2934|\u2935|[\u2190-\u21ff])/g;
        return string.match(regex);
    }

    render() {
        return (
            <Animated.View style={[{
                transform: [{ scaleX: this.opacity }, { scaleY: this.opacity }]
            }]}>
                <Text style={[styles.letter, (this.isEmoji(this.props.letter)) ? styles.emoji : null]} >{this.props.letter}</Text>
            </Animated.View>
        );
    }
};

const styles = StyleSheet.create({
    letter: {
        fontFamily: 'Sofia Pro',
        fontWeight: 'bold',
        alignSelf: 'flex-start',
        color: 'white',
        /*
        textShadowColor: 'rgba(0, 0, 0, 0.15)',
        textShadowOffset: { width: 0, height: 5 },
        textShadowRadius: 0,
        */
        fontSize: 64
    },
    emoji: {
        fontSize: 52,
        marginTop: -6
    }
});
