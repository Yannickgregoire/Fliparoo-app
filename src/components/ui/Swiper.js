import React, { Component } from 'react';
import { StyleSheet } from 'react-native';

import { connect } from 'react-redux';
import { setOnboardingSkip, setTrick } from '../../store/actions';

import Swiper from 'react-native-swiper';

class App extends Component {

    constructor(props) {
        super(props);
        this.state = { index: 0 }
    }

    handleIndexChanged = (index) => {
        this.setState({ index });
        console.log(index, this.props.trickSlideNum)
        if (index === this.props.trickSlideNum && this.props.onboarding.skip === false) {
            this.props.setOnboardingSkip(true);
            this.props.setTrick({name:'heelflip\nmaybe?'})
        }
    }

    handleNextSlide = () => {
        this.swiper.scrollBy(1);
    }

    render() {
        return (
            <Swiper
                ref={swiper => this.swiper = swiper}
                showsButtons={false}
                showsPagination={true}
                loop={false}
                bounces={true}
                scrollEnabled={true}
                style={styles.swiper}
                dotColor="rgba(255,255,255,.1)"
                activeDotColor="rgba(255,255,255,.5)"
                onIndexChanged={(index) => { this.handleIndexChanged(index) }}
                index={(this.props.onboarding.skip) ? this.props.trickSlideNum : 0}
                scrollEnabled={!(this.props.onboarding.skip && this.props.settingsSlideNum !== this.state.index) }
                showsPagination={!(this.props.onboarding.skip)}>
                {this.props.children}
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
    },
    setTrick: (trick) => {
        dispatch(setTrick(trick));
    }
});

const ConnectedApp = connect(
    mapStateToProps, mapDispatchToProps, null, { forwardRef: true }
)(App);

export default ConnectedApp;
