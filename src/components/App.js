import React, { Component } from 'react';
import { LayoutAnimation, StyleSheet, View } from 'react-native';
import { StyleBook } from './style/StyleBook';

import { connect } from 'react-redux';
import { setOnboardingSkip, setTrick } from '../store/actions';

import Onboarding from './onboarding/Onboarding';
import Trick from './trick/Trick';
import Settings from './settings/Settings';

import Swiper from 'react-native-swiper';
import OpaqueOverlay from './ui/OpaqueOverlay';

const ONBOARDING_SLIDE_INDEX = 0;
const TRICK_SLIDE_INDEX = 1;
const SETTINGS_SLIDE_INDEX = 2;

class App extends Component {

    constructor(props) {
        super(props);
        this.state = { index: 0 };
    }

    componentDidMount() {
        if (this.props.onboarding.skip === true) {
            this.setState({ index: TRICK_SLIDE_INDEX });
        }
    }

    handleIndexChanged = (index) => {
        this.setState({ index });
        if (index === TRICK_SLIDE_INDEX && this.props.onboarding.skip === false) {
            this.props.setOnboardingSkip(true);
            this.props.setTrick({ name: 'start flippin\' ✌️', color: ['#263e4a', '#49b19d', '#e17a47', '#ef3e59', '#f2bc42'] })
        }
    }

    handleNextSlide = () => {
        this.swiper.scrollBy(1);
    }

    render() {
        return (
            <View style={StyleBook.background}>
                <Swiper
                    ref={swiper => this.swiper = swiper}
                    onIndexChanged={(index) => { this.handleIndexChanged(index) }}
                    scrollEnabled={(this.state.index === SETTINGS_SLIDE_INDEX)}
                    index={this.state.index}
                    showsPagination={false}
                    loop={false}
                    bounces={true}
                    style={StyleBook.swiper}>
                    <Onboarding onStart={() => { this.handleNextSlide() }} />
                    <Trick onDoubleTap={() => { this.handleNextSlide() }} />
                    <Settings />
                </Swiper>
                <OpaqueOverlay />
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

const ConnectedApp = connect(
    mapStateToProps, mapDispatchToProps
)(App);

export default ConnectedApp;

