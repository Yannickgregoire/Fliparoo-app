import React, { Component } from 'react';
import { ScrollView, StyleSheet, View, Image } from 'react-native';
import { StyleBook, width } from '../../style/StyleBook';
import LinearGradient from 'react-native-linear-gradient';

import Tabbar from '../ui/Tabbar';
import TabbarIcon from '../ui/TabbarIcon';
import ImageButton from '../ui/ImageButton';

import SettingsTab from './SettingsTab';
import TricksTab from './TricksTab';
import AchievementsTab from './AchievementsTab';

const TABS = {
    settings: { 
        backgroundColor: '#4ab19d' ,
        tab: <SettingsTab />
    },
    tricks: { 
        backgroundColor: '#ef3d59',
        tab: <TricksTab />
    },
    achievements: { 
        backgroundColor: '#efc959',
        tab: <AchievementsTab />
    }
}

export default class SettingsScreen extends Component {

    constructor(props) {
        super(props);
        this.state = {
            selectedTab: 'settings'
        };
    }

    render() {
        return (
            <View style={[StyleBook.scroll]}>
                <ScrollView style={{ flex: 1 }} stickyHeaderIndices={[1]}>

                    <View style={{ height: 20 }}></View>
                    <View style={styles.navbar}>
                        <LinearGradient style={styles.topShadow} start={{ x: 0, y: .915 }} end={{ x: 0, y: 1 }} colors={['#000000ff', '#00000000']} />
                        <ImageButton
                            onPress={this.props.onBack}
                            style={styles.backButton}
                            image={require('../../assets/icons/back.png')}
                        />
                    </View>

                    { TABS[this.state.selectedTab].tab }

                    <View style={{ height: 40 }}></View>

                </ScrollView>

                <View style={styles.bottomShadow} pointerEvents="none">
                    <LinearGradient style={styles.gradient} colors={['#00000000', '#000000ff']} />
                </View>

                <Tabbar style={{ backgroundColor: TABS[this.state.selectedTab].backgroundColor }}>
                    <TabbarIcon
                        title="settings"
                        icon={require('../../assets/icons/options.png')}
                        selected={this.state.selectedTab === 'settings'}
                        onPress={() => {
                            this.setState({
                                selectedTab: 'settings',
                            });
                        }} />
                    <TabbarIcon
                        title="tricks"
                        icon={require('../../assets/icons/checkmark.png')}
                        selected={this.state.selectedTab === 'tricks'}
                        onPress={() => {
                            this.setState({
                                selectedTab: 'tricks',
                            });
                        }} />
                    <TabbarIcon
                        title="achievements"
                        icon={require('../../assets/icons/trophy.png')}
                        selected={this.state.selectedTab === 'achievements'}
                        onPress={() => {
                            this.setState({
                                selectedTab: 'achievements',
                            });
                        }} />
                </Tabbar>
            </View>
        );
    }
};

const styles = StyleSheet.create({
    navbar: {
        flex: 1,
        alignItems: 'flex-start',
        justifyContent: 'center',
        width: '100%',
        height: 80,
    },
    backButton: {
        marginTop: 30,
        marginLeft: width * .1 - 7
    },
    gradient: {
        width: '100%',
        height: '100%'
    },
    topShadow: {
        position: 'absolute',
        width: '100%',
        height: '100%'
    },
    bottomShadow: {
        position: 'absolute',
        width: '100%',
        height: 20,
        bottom: 50
    }
});
