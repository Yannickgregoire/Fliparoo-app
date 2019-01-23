import React, { Component } from 'react';
import { StyleSheet, View } from 'react-native';

import { connect } from 'react-redux';
import TrickLetter from './TrickLetter';

class TrickName extends Component {

    constructor(props) {
        super(props);
    }

    renderLines = () => {
        if (this.props.trick.name) {
            const lines = this.props.trick.name.split('\n');
            return lines.map((line, index) => {
                console.log(line)
                return <View key={index} style={[styles.line]}>{this.renderLetters(lines[index])}</View>
            })
        }
    }

    renderLetters = (line) => {
        return [...line].map((letter, index) => {
            return <TrickLetter key={Date.parse(new Date()) + '-' + line + '-' + index} letter={letter} index={index} isLast={(index === line.length - 1)} />
        })
    }

    render() {
        return (
            <View style={styles.container}>
                {this.renderLines()}
            </View>
        );
    }

};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        paddingLeft: 20,
        transform: [{ rotate: '90deg' }]
    },
    line: {
        flexDirection: 'row',
    }
});

const mapStateToProps = (state, ownProps) => ({
    trick: state.trick
});

const ConnectedTrickName = connect(
    mapStateToProps, null
)(TrickName);

export default ConnectedTrickName;
