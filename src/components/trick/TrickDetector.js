import React, { Component } from 'react';
import { StyleSheet, Text, View } from 'react-native';

import { connect } from 'react-redux';
import { setTrick } from '../../store/actions';

import { DeviceEventEmitter } from 'react-native';
import { DeviceAngles } from 'NativeModules';

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
        // for outputting
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

            // for outputting
            deltaArray.push(Object.assign({}, { p: delta.pitch.toFixed(3), r: delta.roll.toFixed(3), y: delta.yaw.toFixed(3) }));

            prev = data;

        })

        if (this.isInRange(delta.yaw, 180, 45) && this.isInRange(delta.roll, 0, 45)) {
            this.props.setTrick({ name: 'FS Shove-it! ' + this.getRandomEmoji(), background: '#f7e9a0', color: '#b9ae76' })
            isTrick = true;
        }

        if (this.isInRange(delta.yaw, 360, 45) && this.isInRange(delta.roll, 0, 45)) {
            this.props.setTrick({ name: 'FS 360 Shove! ' + this.getRandomEmoji(), background: '#f7e9a0', color: '#b9ae76' });
            isTrick = true;
        }

        if (this.isInRange(delta.yaw, -180, 45) && this.isInRange(delta.roll, 0, 45)) {
            this.props.setTrick({ name: 'BS Shove-it! ' + this.getRandomEmoji(), background: '#f7e9a0', color: '#b9ae76' });
            isTrick = true;
        }

        if (this.isInRange(delta.yaw, -180, 45) && this.isInRange(delta.roll, 0, 45)&& this.isInRange(accumulated.pitch, 270, 45)) {
            this.props.setTrick({ name: 'Hardflip! ' + this.getRandomEmoji(), background: '#f7e9a0', color: '#b9ae76' });
            isTrick = true;
        }

        if (this.isInRange(delta.yaw, 180, 45) && this.isInRange(delta.roll, -360, 45)&& this.isInRange(accumulated.pitch, 270, 45)) {
            this.props.setTrick({ name: 'Hardflip! ' + this.getRandomEmoji(), background: '#f7e9a0', color: '#b9ae76' });
            isTrick = true;
        }

        if (this.isInRange(delta.yaw, -360, 45) && this.isInRange(delta.roll, 0, 45)) {
            this.props.setTrick({ name: 'BS 360 Shove! ' + this.getRandomEmoji(), background: '#f7e9a0', color: '#b9ae76' });
            isTrick = true;
        }

        if (this.isInRange(delta.yaw, 0, 45) && this.isInRange(delta.roll, -360, 45)) {
            this.props.setTrick({ name: 'Kickflip! ' + this.getRandomEmoji(), background: '#f76d6d', color: '#fd9498' });
            isTrick = true;
        }

        if (this.isInRange(delta.yaw, 0, 45) && this.isInRange(delta.roll, -720, 45)) {
            this.props.setTrick({ name: 'Double Kickflip! ' + this.getRandomEmoji(), background: '#f76d6d', color: '#fd9498' });
            isTrick = true;
        }

        if (this.isInRange(delta.yaw, 0, 45) && this.isInRange(delta.roll, 360, 45)) {
            this.props.setTrick({ name: 'Heelflip! ' + this.getRandomEmoji(), background: '#f76d6d', color: '#fd9498' });
            isTrick = true;
        }

        if (this.isInRange(delta.yaw, 0, 45) && this.isInRange(delta.roll, 720, 45)) {
            this.props.setTrick({ name: 'Double Heelflip! ' + this.getRandomEmoji(), background: '#f76d6d', color: '#fd9498' });
            isTrick = true;
        }

        if (this.isInRange(delta.yaw, -360, 45) && this.isInRange(delta.roll, -360, 45)) {
            this.props.setTrick({ name: 'Tre Flip! ' + this.getRandomEmoji(), background: '#f76d6d', color: '#fd9498' });
            isTrick = true;
        }

        if (this.isInRange(delta.yaw, 360, 45) && this.isInRange(delta.roll, -360, 45)) {
            this.props.setTrick({ name: 'Doube Hardflip! ' + this.getRandomEmoji(), background: '#f76d6d', color: '#fd9498' });
            isTrick = true;
        }

        if (this.isInRange(delta.yaw, 0, 45) && this.isInRange(delta.roll, -720, 45) && this.isInRange(accumulated.pitch, 360, 45)) {
            this.props.setTrick({ name: 'Doube Hardflip! ' + this.getRandomEmoji(), background: '#f76d6d', color: '#fd9498' });
            isTrick = true;
        }

        if (this.isInRange(delta.yaw, 360, 45) && this.isInRange(delta.roll, 360, 45)) {
            this.props.setTrick({ name: 'Laserflip!' + this.getRandomEmoji(), background: '#f76d6d', color: '#fd9498' });
            isTrick = true;
        }

        if (this.isInRange(delta.yaw, -360, 45) && this.isInRange(delta.roll, 360, 45)) {
            this.props.setTrick({ name: 'Emerald flip! ' + this.getRandomEmoji(), background: '#f76d6d', color: '#fd9498' });
            isTrick = true;
        }

        if (isTrick) {
            // for outputting
            // console.log(JSON.stringify(deltaArray));
        }

        this.angleData = [];

        this.setState({ delta: delta, accumulated: accumulated });

    };

    getSmallestDifference = (diff) => {
        return diff += (diff > 180) ? -360 : (diff < -180) ? 360 : 0;
    };

    getRandomEmoji = () => {
        return emojis[Math.floor(Math.random() * emojis.length)];
    }

    isInRange = (property, number, margin) => {
        return (property > number - margin && property < number + margin);
    }

    handleAnglesData = (data) => {

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

    render() {

        // uncomment next line to hide angle data
        // return null;

        return (
            <View style={styles.container}>

                <View style={styles.column}>
                    <Text style={styles.font}>p: {this.state.rotation.pitch}</Text>
                    <Text style={styles.font}>r: {this.state.rotation.roll}</Text>
                    <Text style={styles.font}>y: {this.state.rotation.yaw}</Text>
                </View >
                <View style={styles.column}>
                    <Text style={styles.font}>dp: {this.state.delta.pitch.toFixed(3)}</Text>
                    <Text style={styles.font}>dr: {this.state.delta.roll.toFixed(3)}</Text>
                    <Text style={styles.font}>dy: {this.state.delta.yaw.toFixed(3)}</Text>
                </View >
                <View style={styles.column}>
                    <Text style={styles.font}>ap: {this.state.accumulated.pitch.toFixed(3)}</Text>
                    <Text style={styles.font}>ar: {this.state.accumulated.roll.toFixed(3)}</Text>
                    <Text style={styles.font}>ay: {this.state.accumulated.yaw.toFixed(3)}</Text>
                </View >
            </View >
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

const emojis = ['🤘', '🔥', '👍', '🙌', '👏', '🤟', '🤙', '🎉', '💩'];

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
