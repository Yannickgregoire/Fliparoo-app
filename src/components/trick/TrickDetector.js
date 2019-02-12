import React, { Component } from 'react';
import { StyleSheet, Text, View } from 'react-native';

import { connect } from 'react-redux';
import { setTrick } from '../../store/actions';

import { DeviceEventEmitter } from 'react-native';
import { DeviceAngles } from 'NativeModules';

import Api from '../../api/Api';
import TrickPossibilities from './TrickPossibilities';

RECORD_DELTA_START_MIN = 10;
RECORD_DELTA_STOP_MIN = 1;

class TrickDetector extends Component {

    constructor(props) {

        super(props);

        this.rotation = {
            pitch: 0,
            roll: 0,
            yaw: 0
        }

        this.state = {
            delta: this.rotation,
            accumulated: this.rotation,
            rotation: this.rotation,
            trick: { name: 'none', background: '', color: '' },
            background: '#a8d1e7',
            color: '#7b98a8',
            recording: false
        };

        this.acceleration = [];
        this.accelerationInterval;
        this.angleData = [];
        this.angleEvent;

        DeviceAngles.setDeviceMotionUpdateInterval(.01);

    }

    componentDidUpdate(prevProps, prevState) {

        if (this.props.trick.enabled !== prevProps.trick.enabled) {

            if (this.props.trick.enabled === true) {

                DeviceAngles.startMotionUpdates();
                this.angleEvent = DeviceEventEmitter.addListener('AnglesData', (data) => { this.handleAnglesData(data) });
                this.startAccelerationDetection();

            } else {

                DeviceAngles.stopMotionUpdates();
                this.stopAccelerationDetection();
                this.angleEvent.remove();
            }

        }

    };

    startAccelerationDetection = () => {

        let delta = {};
        let prev = {};

        this.accelerationInterval = setInterval(() => {

            delta = {
                pitch: 0,
                roll: 0,
                yaw: 0
            }

            prev = this.acceleration[0];

            this.acceleration.map((data) => {

                delta.pitch += this.getSmallestDifference(data.pitch - prev.pitch);
                delta.roll += this.getSmallestDifference(data.roll - prev.roll);
                delta.yaw += this.getSmallestDifference(data.yaw - prev.yaw);

                prev = data;

            })

            if ((Math.abs(delta.pitch) > RECORD_DELTA_START_MIN || Math.abs(delta.roll) > RECORD_DELTA_START_MIN || Math.abs(delta.yaw) > RECORD_DELTA_START_MIN) && this.state.recording === false) {
                this.setState({ recording: true, background: '#b4fd94', color: '#d7ffc5' });
            }

            if ((Math.abs(delta.pitch) < RECORD_DELTA_STOP_MIN && Math.abs(delta.roll) < RECORD_DELTA_STOP_MIN && Math.abs(delta.yaw) < RECORD_DELTA_STOP_MIN) && this.state.recording === true) {
                this.setState({ recording: false, background: '#a8d1e7', color: '#7b98a8' });
                this.checkTrick();
            }

        }, 10)

    };

    stopAccelerationDetection = () => {
        clearInterval(this.accelerationInterval);
    };

    checkTrick = () => {

        const delta = {
            pitch: 0,
            roll: 0,
            yaw: 0
        }

        const accumulated = {
            pitch: 0,
            roll: 0,
            yaw: 0
        }

        let deltaArray = [];
        let prev = this.angleData[0];

        this.angleData.map((data) => {

            delta.pitch += this.getSmallestDifference(data.pitch - prev.pitch);
            delta.roll += this.getSmallestDifference(data.roll - prev.roll);
            delta.yaw += this.getSmallestDifference(data.yaw - prev.yaw);

            accumulated.pitch += Math.abs(this.getSmallestDifference(data.pitch - prev.pitch));
            accumulated.roll += Math.abs(this.getSmallestDifference(data.roll - prev.roll));
            accumulated.yaw += Math.abs(this.getSmallestDifference(data.yaw - prev.yaw));

            deltaArray.push(Object.assign({}, { p: delta.pitch.toFixed(3), r: delta.roll.toFixed(3), y: delta.yaw.toFixed(3) }));

            prev = data;

        })

        const trick = TrickPossibilities.getTrick(delta, accumulated, this.rotation);

        if (trick) {
            this.props.setTrick(trick);
            if (this.props.permission.value === true) {
                Api.postTrickData(trick, deltaArray);
            }
        }

        this.angleData = [];
        this.setState({ delta: delta, accumulated: accumulated, rotation: this.rotation });

    };

    getSmallestDifference = (diff) => {
        return diff += (diff > 180) ? -360 : (diff < -180) ? 360 : 0;
    };

    handleAnglesData = (data) => {

        if (this.props.stance.value === 'goofy') {
            data.pitch *= -1;
            data.roll *= -1;
            data.yaw *= -1;
        }

        this.rotation = {
            pitch: data.pitch.toFixed(3),
            roll: data.roll.toFixed(3),
            yaw: data.yaw.toFixed(3)
        }

        this.acceleration.push(this.rotation);

        if (this.acceleration.length > 10) {
            this.acceleration.shift();
        }

        if (this.state.recording === true) {
            this.angleData.push(this.rotation);
        }

    };

    render() {

        // uncomment next line to hide angle data
        return null;

        return (
            <View style={styles.container}>
                <View style={styles.column}>
                    <Text style={styles.font}>p: {this.state.rotation.pitch}</Text>
                    <Text style={styles.font}>r: {this.state.rotation.roll}</Text>
                    <Text style={styles.font}>y: {this.state.rotation.yaw}</Text>
                </View>
                <View style={styles.column}>
                    <Text style={styles.font}>dp: {this.state.delta.pitch.toFixed(3)}</Text>
                    <Text style={styles.font}>dr: {this.state.delta.roll.toFixed(3)}</Text>
                    <Text style={styles.font}>dy: {this.state.delta.yaw.toFixed(3)}</Text>
                </View>
                <View style={styles.column}>
                    <Text style={styles.font}>ap: {this.state.accumulated.pitch.toFixed(3)}</Text>
                    <Text style={styles.font}>ar: {this.state.accumulated.roll.toFixed(3)}</Text>
                    <Text style={styles.font}>ay: {this.state.accumulated.yaw.toFixed(3)}</Text>
                </View>
            </View>
        );
    }
};

const styles = StyleSheet.create({
    container: {
        flex: .3,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
    },
    column: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    }, font: {
        color: 'white'
    }
});

const mapStateToProps = (state, ownProps) => ({
    trick: state.trick,
    stance: state.stance,
    permission: state.permission
});

const mapDispatchToProps = (dispatch, ownProps) => ({
    setTrick: (trick) => {
        dispatch(setTrick(trick));
    }
});

const ConnectedTrickDetector = connect(
    mapStateToProps, mapDispatchToProps
)(TrickDetector);

export default ConnectedTrickDetector;
