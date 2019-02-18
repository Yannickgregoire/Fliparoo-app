import React, { Component } from 'react';
import { StyleSheet, View, Text, Image } from 'react-native';
import { StyleBook } from '../../style/StyleBook';

import { connect } from 'react-redux';
import { TRICKS } from '../trick/Tricks';
// import { ACHIEVEMENTS } from '../achievements/Achievements';

class TricksTab extends Component {

    constructor(props) {
        super(props);
        this.tricks = [];
    }

    renderLanded = () => {

    };

    renderTricks = () => {

        this.tricks = this.getUnique(TRICKS, 'id')

        return this.tricks.map((trick) => {

            const landed = (this.props.achievements.trickListTotal.filter((landedTrick) => {
                return (trick.id === landedTrick.id)
            }).length > 0);

            const landedElement = (landed) ? <Text style={[StyleBook.description, { marginBottom: 0, marginTop: 0 }]}>landed</Text> : null;
            const landedIcon = (landed) ? <Image style={styles.listItemIcon} source={require('../../assets/icons/check.png')} /> : null;

            return (
                <View>
                    <View style={styles.listItem}>
                        <View style={[styles.listItemText, { opacity: (landed) ? 1 : .3 }]}>
                            <Text style={[StyleBook.body, { marginBottom: 0 }]}>{trick.name.replace('\n', ' ')}</Text>
                            <Text style={[StyleBook.description, { marginBottom: 0, marginTop: 0 }]}>{(landed) ? 'landed' : 'not landed yet'}</Text>
                        </View>
                        {landedIcon}
                    </View>


                </View>
            );
        })
    };

    getUnique = (arr, comp) => {
        return arr.map(e => e[comp])
            .map((e, i, final) => final.indexOf(e) === i && i)
            .filter(e => arr[e]).map(e => arr[e]);
    }

    render() {
        return (
            <View style={[StyleBook.container, { justifyContent: 'flex-start', paddingTop: 20 }]}>
                <Text style={StyleBook.heading}>Tricks</Text>
                <Text style={StyleBook.body}>Available and landed tricks.</Text>
                <Text style={StyleBook.description}>Landing all tricks will get you a little something something.</Text>
                {this.renderTricks()}
            </View>
        );
    };

};

const styles = StyleSheet.create({
    listItem: {
        width: '100%',
        height: 50,
        marginBottom: 10,
        alignSelf: 'flex-start',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center'
    },
    listItemText: {
        flex: 1,
    },
    listItemIcon: {
        width: 30,
        height: 30
    }
});

const mapStateToProps = (state, ownProps) => ({
    achievements: state.achievements
});

const ConnectedTricksTab = connect(
    mapStateToProps, null
)(TricksTab);

export default ConnectedTricksTab;
