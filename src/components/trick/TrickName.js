import React, { Component } from 'react';
import { StyleSheet, View } from 'react-native';

import { connect } from 'react-redux';
import TrickLetter from './TrickLetter';

class TrickName extends Component {

    constructor(props) {
        super(props);
        this.state = { trick: {} };

        this.animatedValue = []

    }

    componentDidMount() { }

    renderLetters = () => {

        if (this.props.trick.name) {

            return [...this.props.trick.name].map((letter, index) => {
                return <TrickLetter key={Date.parse(new Date()) + '-' + this.props.trick.name + '-' + index} letter={letter} index={index} />
            })

        }

    }

    render() {
        return (
            <View style={styles.container}>
                {this.renderLetters()}
            </View >
        );
    }
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        transform: [{ rotate: '90deg' }]
    }
});

const mapStateToProps = (state, ownProps) => ({
    trick: state.trick
});

const ConnectedTrickName = connect(
    mapStateToProps, null
)(TrickName);

export default ConnectedTrickName;
