import React, { Component } from 'react';
import { AppState, Text } from 'react-native';

import { connect } from 'react-redux';
import { setTrickEnabled } from '../../store/actions';

class ActiveState extends Component {

    constructor(props) {
        super(props);
        this.state = { appState: AppState.currentState }
    }

    componentDidMount() {
        AppState.addEventListener('change', this.handleAppStateChange);
    }

    componentWillUnmount() {
        AppState.removeEventListener('change', this.handleAppStateChange);
    }

    handleAppStateChange = (nextAppState) => {
        if ( this.state.appState.match(/inactive|background/) && nextAppState === 'active') {
            this.props.setTrickEnabled(true);
        } else {
            this.props.setTrickEnabled(false);
        }
        this.setState({ appState: nextAppState });
    };

    render() {
        return null;
    }
}

const mapDispatchToProps = (dispatch, ownProps) => ({
    setTrickEnabled: (enabled) => {
        dispatch(setTrickEnabled(enabled));
    }
});

const ConnectedActiveState = connect(
    null, mapDispatchToProps
)(ActiveState);

export default ConnectedActiveState;
