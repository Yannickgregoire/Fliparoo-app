import React, { Component } from 'react';
import { StyleSheet } from 'react-native';

import { connect } from 'react-redux';
import { setOnboardingSkip } from '../store/actions';

import Trick from './trick/Trick';
import Intro from './onboarding/Intro';
import Stance from './onboarding/Stance';
import Permissions from './onboarding/Permissions';

import Swiper from 'react-native-swiper';

class App extends Component {

    constructor(props) {
        super(props);
    }

    handleIndexChanged = (index) => {
        if (index === 3 && this.props.onboarding.skip === false) {
            this.props.setOnboardingSkip(true);
        }
    }

    handleNextSlide = () => {
        this.swiper.scrollBy(1);
    }

    render() {
        return (
            <Swiper
                ref={(ref) => { this.swiper = ref }}
                showsButtons={false}
                showsPagination={true}
                loop={false}
                bounces={true}
                scrollEnabled={true}
                style={styles.swiper}
                dotColor="rgba(255,255,255,.1)"
                activeDotColor="rgba(255,255,255,.5)"
                onIndexChanged={(index) => { this.handleIndexChanged(index) }}
                index={(this.props.onboarding.skip) ? 3 : 0}
                scrollEnabled={!(this.props.onboarding.skip)}
                showsPagination={!(this.props.onboarding.skip)}>
                <Intro onNext={() => { this.handleNextSlide() }} />
                <Stance onNext={() => { this.handleNextSlide() }} />
                <Permissions onNext={() => { this.handleNextSlide() }} />
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

const mapStateToProps = (state, ownProps) => ({
    onboarding: state.onboarding
});

const mapDispatchToProps = (dispatch, ownProps) => ({
    setOnboardingSkip: (skip) => {
        dispatch(setOnboardingSkip(skip));
    }
});

const ConnectedApp = connect(
    mapStateToProps, mapDispatchToProps
)(App);

export default ConnectedApp;
