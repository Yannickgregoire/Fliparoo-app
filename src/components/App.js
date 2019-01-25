import React, { Component } from 'react';
import { StyleSheet } from 'react-native';

import Trick from './trick/Trick';
import Intro from './onboarding/Intro';
import Stance from './onboarding/Stance';
import Permissions from './onboarding/Permissions';
import Thanks from './onboarding/Thanks';
import Settings from './settings/Settings';

import Swiper from './ui/Swiper';

export default class App extends Component {

    constructor(props) {
        super(props);
    }

    handleNextSlide = () => {
        this.swiper.handleNextSlide();
    }

    render() {
        return (
            <Swiper ref={swiper => this.swiper = swiper} trickSlideNum={4} settingsSlideNum={5}>
                <Intro onNext={() => { this.handleNextSlide() }} />
                <Stance onNext={() => { this.handleNextSlide() }} />
                <Permissions onNext={() => { this.handleNextSlide() }} />
                <Thanks onNext={() => { this.handleNextSlide() }} />
                <Trick onDoubleTap={() => { this.handleNextSlide() }}/>
                <Settings />
            </Swiper>
        );
    }
};

const styles = StyleSheet.create({});
