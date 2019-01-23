import React, { Component } from 'react';
import { StyleSheet } from 'react-native';

import Trick from './trick/Trick';
import Intro from './onboarding/Intro';
import Stance from './onboarding/Stance';
import Permissions from './onboarding/Permissions';

import Swiper from 'react-native-swiper';

export default class App extends Component {

    constructor(props) {
        super(props);
    }

    componentDidMount() { }

    render() {
        return (
            <Swiper
                showsButtons={false}
                showsPagination={true}
                loop={false}
                bounces={true}
                scrollEnabled={true}
                style={styles.swiper}
                dotColor="rgba(255,255,255,.1)"
                activeDotColor="rgba(255,255,255,.5)">
                <Intro />
                <Stance />
                <Permissions />
                <Trick />
            </Swiper>
        );
    }
};

const styles = StyleSheet.create({
    swiper: {
        backgroundColor: 'black'
    }
});
