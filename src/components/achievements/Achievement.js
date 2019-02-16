import React, { Component } from 'react';
import { StyleSheet, View, Text, Animated, Easing } from 'react-native';
import { StyleBook } from '../../style/StyleBook'

import { connect } from 'react-redux';

class Achievement extends Component {

    constructor(props) {
        super(props);
        this.animation = new Animated.Value(0);
        this.rotation = new Animated.Value(0);
        this.randomRotation = Math.round(Math.random() * 20 + 20) + 'deg';
    }

    componentDidMount() {
        this.animate()
    }

    animate = () => {

        Animated.timing(
            this.animation,
            {
                toValue: 1,
                duration: 600,
                delay: 1000,
                easing: Easing.elastic(1),
                useNativeDriver: true
            }
        ).start()

        Animated.timing(
            this.rotation,
            {
                toValue: 1,
                duration: 1800,
                delay: 1000,
                easing: Easing.elastic(8),
                useNativeDriver: true
            }
        ).start()

        setTimeout(() => {
            Animated.timing(
                this.animation,
                {
                    toValue: 0,
                    duration: 400,
                    easing: Easing.back(4),
                    useNativeDriver: true
                }
            ).start()
        }, 4000)

    }

    render() {

        this.rotate = this.rotation.interpolate({
            inputRange: [0, 1],
            outputRange: [this.randomRotation, '0deg']
        })

        // const styleRotation = (this.props.stance.value === 'regular') ? { transform: [{ rotate: '90deg' }] } : { transform: [{ rotate: '-90deg' }] };
        // const stylePosition = (this.props.stance.value === 'regular') ? { right: 0, top: '100%' } : { left: 0, top: 0 };
        const stylePadding = (this.props.stance.value === 'regular') ? { paddingLeft: 20 } : { paddingRight: 20 };

        return (
            <Animated.View style={[styles.text, {
                transform: [{ scaleX: this.animation }, { scaleY: this.animation }, { rotate: this.rotate }]
            }]}>
                <Text style={[StyleBook.heading, styles.body]}>🏆 {this.props.title}</Text>
                <Text style={[StyleBook.description, styles.description]}>achievement</Text>
            </Animated.View>
        );
    }
};

const styles = StyleSheet.create({
    text: {
        alignItems: 'flex-end',
        justifyContent: 'flex-end',
        marginTop: 20,
        marginRight: 20
    },
    description: {
        marginTop: 0,
        marginBottom: 0
    },
    body: {
        marginBottom: 0,
        lineHeight: 0,
        fontSize: 18
    }
});

const mapStateToProps = (state, ownProps) => ({
    stance: state.stance
});

const ConnectedAchievement = connect(
    mapStateToProps, null
)(Achievement);

export default ConnectedAchievement;
