import React, { Component } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import DeviceInfo from 'react-native-device-info';

import { connect } from 'react-redux';
import { setTrick } from '../../store/actions';

import { DeviceEventEmitter } from 'react-native';
import { DeviceAngles } from 'NativeModules';

import Config from '../../api/Config';
import TrickPossibilities from './TrickPossibilities';

const DEVICE_UID = DeviceInfo.getUniqueID();

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

        this.angleData = [];
        this.acceleration = [];
        this.accelerationInterval;

    }

    componentDidMount() {

        DeviceAngles.setDeviceMotionUpdateInterval(.01);
        DeviceAngles.startMotionUpdates();

        DeviceEventEmitter.addListener('AnglesData', (data) => { this.handleAnglesData(data) });

        this.startAccelerationDetection();

    }

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

            if ((Math.abs(delta.pitch) > 10 || Math.abs(delta.roll) > 10 || Math.abs(delta.yaw) > 10) && this.state.recording === false) {
                this.setState({ recording: true, background: '#b4fd94', color: '#d7ffc5' });
            }

            if ((Math.abs(delta.pitch) < 1 && Math.abs(delta.roll) < 1 && Math.abs(delta.yaw) < 1) && this.state.recording === true) {
                this.setState({ recording: false, background: '#a8d1e7', color: '#7b98a8' });
                this.checkTrick();
            }

        }, 10)

    }

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
        let isTrick = false;

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

        const trick = TrickPossibilities.getTrick(delta, accumulated);

        if (trick) {
            this.props.setTrick(trick);
            isTrick = true;

            this.sendTrickData(trick, deltaArray);
        }

        this.angleData = [];
        this.setState({ delta: delta, accumulated: accumulated });

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

        this.setState({ rotation: this.rotation });

    };

    sendTrickData = (trick, data) => {

        fetch(Config.server, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ uuid: DEVICE_UID, trick: { name: trick.id, data: data } }),
        }).then((response) => {
            console.log('success', response);
        }, (error) => {
            console.log('error', error);
        });

    };

    render() {

        // uncomment next line to hide angle data
        // return null;

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
    stance: state.stance
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
