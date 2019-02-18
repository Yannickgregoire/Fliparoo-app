import React, { Component } from 'react';
import { StyleSheet, View } from 'react-native';
import { StyleBook } from '../../style/StyleBook';

import { connect } from 'react-redux';
import { setOnboardingSkip, setTrick } from '../../store/actions';

import Swiper from 'react-native-swiper';

import Intro from './Intro';
import Stance from './Stance';
import Permissions from './Permissions';
import Thanks from './Thanks';

class OnboardingScreen extends Component {

    constructor(props) {
        super(props);
        this.state = { index: 0 }
    }

    handleNextSlide = () => {
        this.swiper.scrollBy(1);
    }

    render() {
        return (
            <View style={StyleBook.background}>
                <Swiper
                    ref={swiper => this.swiper = swiper}
                    showsButtons={false}
                    showsPagination={true}
                    loop={false}
                    bounces={true}
                    scrollEnabled={true}
                    dotColor="rgba(255,255,255,.3)"
                    activeDotColor="rgba(255,255,255,.8)"
                    showsPagination={true}
                    paginationStyle={{bottom: 45}}
                    style={StyleBook.swiper}>
                    <Intro onNext={this.handleNextSlide} />
                    <Stance onNext={this.handleNextSlide} />
                    <Permissions onNext={this.handleNextSlide} />
                    <Thanks onNext={this.props.onStart} />
                </Swiper>
            </View>
        );
    }
};

const styles = StyleSheet.create({});

const mapStateToProps = (state, ownProps) => ({
    onboarding: state.onboarding
});

const mapDispatchToProps = (dispatch, ownProps) => ({
    setOnboardingSkip: (skip) => {
        dispatch(setOnboardingSkip(skip));
    },
    setTrick: (trick) => {
        dispatch(setTrick(trick));
    }
});

const ConnectedOnboardingScreen = connect(
    mapStateToProps, mapDispatchToProps, null, { forwardRef: true }
)(OnboardingScreen);

export default ConnectedOnboardingScreen;
