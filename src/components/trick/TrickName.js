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

        const styleRotation = (this.props.stance.value === 'regular') ? { transform: [{ rotate: '90deg' }] } : { transform: [{ rotate: '-90deg' }] };
        const stylePadding = (this.props.stance.value === 'regular') ? { paddingLeft: 20 } : { paddingRight: 20 };

        return (
            <View style={[styles.container, styleRotation, stylePadding]}>
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
        justifyContent: 'center'
    },
    line: {
        flexDirection: 'row',
    }
});

const mapStateToProps = (state, ownProps) => ({
    trick: state.trick,
    stance: state.stance
});

const ConnectedTrickName = connect(
    mapStateToProps, null
)(TrickName);

export default ConnectedTrickName;
