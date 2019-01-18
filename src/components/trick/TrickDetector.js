import React, { Component } from 'react';
import { StyleSheet, Text, View } from 'react-native';

import { connect } from 'react-redux';
import { setTrick } from '../../store/actions';

import { DeviceEventEmitter } from 'react-native';
import { DeviceAngles } from 'NativeModules';

class TrickDetector extends Component {

    constructor(props) {

        super(props);

        const rotation = {
            pitch: 0,
            roll: 0,
            yaw: 0
        }

        this.state = {
            delta: rotation,
            rotation: rotation,
            trick: { name: 'none', background: '', color: '' },
            background: '#a8d1e7',
            color: '#7b98a8',
            recording: false
        };

        this.data = [];
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

        this.accelerationInterval = setInterval(() => {

            const delta = {
                pitch: 0,
                roll: 0,
                yaw: 0
            }

            let prev = this.acceleration[0];

            this.acceleration.map((data) => {

                delta.pitch += (Math.abs(data.pitch - prev.pitch) < 180) ? data.pitch - prev.pitch : 0;
                delta.roll += (Math.abs(data.roll - prev.roll) < 180) ? data.roll - prev.roll : 0;
                delta.yaw += (Math.abs(data.yaw - prev.yaw) < 180) ? data.yaw - prev.yaw : 0;

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

        // for outputting
        let deltaArray = [];

        let prev = this.data[0];
        let isTrick = false;

        this.data.map((data) => {

            delta.pitch += this.getSmallestDifference(data.pitch - prev.pitch);
            delta.roll += this.getSmallestDifference(data.roll - prev.roll);
            delta.yaw += this.getSmallestDifference(data.yaw - prev.yaw);

            deltaArray.push(Object.assign({}, { p: delta.pitch.toFixed(3), r: delta.roll.toFixed(3), y: delta.yaw.toFixed(3) }));

            prev = data;

        })

        if (delta.yaw > 120) {
            this.setState({ trick: { name: 'FS Shove-it!', background: '#f7e9a0', color: '#b9ae76' } });
            this.props.setTrick({ name: 'FS Shove-it!', background: '#f7e9a0', color: '#b9ae76' })
            isTrick = true;
        }

        if (delta.yaw > 240) {
            this.setState({ trick: { name: 'FS 360 Shove-it!', background: '#f7e9a0', color: '#b9ae76' } });
            this.props.setTrick({ name: 'FS 360 Shove-it!', background: '#f7e9a0', color: '#b9ae76' });
            isTrick = true;
        }

        if (delta.yaw < -120) {
            this.setState({ trick: { name: 'BS Shove-it!', background: '#f7e9a0', color: '#b9ae76' } });
            this.props.setTrick({ name: 'BS Shove-it!', background: '#f7e9a0', color: '#b9ae76' });
            isTrick = true;
        }

        if (delta.yaw < -240) {
            this.setState({ trick: { name: 'BS 360 Shove-it!', background: '#f7e9a0', color: '#b9ae76' } });
            this.props.setTrick({ name: 'BS 360 Shove-it!', background: '#f7e9a0', color: '#b9ae76' });
            isTrick = true;
        }

        if (delta.roll < -320) {
            this.setState({ trick: { name: 'Kickflip!', background: '#f76d6d', color: '#fd9498' } });
            this.props.setTrick({ name: 'Kickflip!', background: '#f76d6d', color: '#fd9498' });
            isTrick = true;
        }

        if (delta.roll > 320) {
            this.setState({ trick: { name: 'Heelflip!', background: '#f76d6d', color: '#fd9498' } });
            this.props.setTrick({ name: 'Heelflip!', background: '#f76d6d', color: '#fd9498' });
            isTrick = true;
        }

        if (isTrick) {
            console.log(JSON.stringify(deltaArray));
            // set trick name in store
        }

        this.data = [];

        this.setState({ delta: delta });

    };

    getSmallestDifference = (diff) => {
        return diff += (diff > 180) ? -360 : (diff < -180) ? 360 : 0;
    };

    handleAnglesData = (data) => {

        const rotation = {
            pitch: data.pitch.toFixed(3),
            roll: data.roll.toFixed(3),
            yaw: data.yaw.toFixed(3)
        }

        this.acceleration.push(rotation);

        if (this.acceleration.length > 10) {
            this.acceleration.shift();
        }

        if (this.state.recording === true) {
            this.data.push(rotation);
        }

        this.setState({ rotation: rotation });

    };

    render() {
        return (
            <View style={styles.container}>
            
                <Text>pitch: {this.state.rotation.pitch}</Text>
                <Text>roll: {this.state.rotation.roll}</Text>
                <Text>yaw: {this.state.rotation.yaw}</Text>

                <Text>delta pitch: {this.state.delta.pitch.toFixed(3)}</Text>
                <Text>delta roll: {this.state.delta.roll.toFixed(3)}</Text>
                <Text>delta yaw: {this.state.delta.yaw.toFixed(3)}</Text>

            </View >
        );
    }
};

const styles = StyleSheet.create({
    container: {
        flex: .5,
        alignItems: 'center',
        justifyContent: 'center',
    }
});

const mapStateToProps = (state, ownProps) => ({
    trick: state.trick
});

const mapDispatchToProps = (dispatch, ownProps) => ({
    setTrick: (trick) => {
        dispatch(setTrick(trick));
    }
});

const ConnectedTrickDetector = connect(
    mapStateToProps,
    mapDispatchToProps
)(TrickDetector);

export default ConnectedTrickDetector;
