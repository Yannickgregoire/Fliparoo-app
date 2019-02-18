import React, { Component } from 'react';
import { StyleSheet, View, Text } from 'react-native';
import { StyleBook } from '../../style/StyleBook';

import { connect } from 'react-redux';

class AchievementsTab extends Component {

    constructor(props) {
        super(props);
    }

    render() {
        return (
            <View style={[StyleBook.container, { justifyContent: 'flex-start', paddingTop: 20 }]}>
                <Text style={StyleBook.heading}>Achievements</Text>
                <Text style={StyleBook.body}>A list of available and unlocked achievements.</Text>
                <Text style={StyleBook.description}>So you can sleep well at night.</Text>
            </View>
        );
    }
};

const styles = StyleSheet.create({});

const mapStateToProps = (state, ownProps) => ({
    permission: state.permission,
    stance: state.stance
});

const ConnectedAchievementsTab = connect(
    mapStateToProps, null
)(AchievementsTab);

export default ConnectedAchievementsTab;
