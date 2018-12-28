import React, { Component } from 'react';
import { Platform, StyleSheet, Text, View, ScrollView } from 'react-native';

import { DeviceEventEmitter } from 'react-native';
import { DeviceAngles } from 'NativeModules';

export default class App extends Component {

  constructor(props) {

    super(props);

    this.state = {
      delta: {
        pitch: 0,
        roll: 0,
        yaw: 0
      }, rotation: {}, trick: '', bigger: '',
      backgroundColor: '#a8d1e7', color: '#7b98a8'
    };

    this.data = [];
  }

  componentDidMount() {

    DeviceAngles.setDeviceMotionUpdateInterval(.01);
    DeviceAngles.startMotionUpdates();

    DeviceEventEmitter.addListener('AnglesData', (data) => {

      const rotation = {
        pitch: data.pitch.toFixed(3),
        roll: data.roll.toFixed(3),
        yaw: data.yaw.toFixed(3)
      }

      this.data.push(rotation)

      if (this.data.length > 200) {
        this.data.shift();
      }

      this.setState({ rotation: rotation });

    });

    setInterval(() => {

      const delta = {
        pitch: 0,
        roll: 0,
        yaw: 0
      }

      let prev = this.data[0];

      this.data.map((data) => {

        delta.pitch += (Math.abs(data.pitch - prev.pitch) < 180) ? data.pitch - prev.pitch : 0;
        delta.roll += (Math.abs(data.roll - prev.roll) < 180) ? data.roll - prev.roll : 0;
        delta.yaw += (Math.abs(data.yaw - prev.yaw) < 180) ? data.yaw - prev.yaw : 0;

        prev = data;

      })

      if (delta.yaw > 120) {
        this.setState({ trick: 'FS Shove-it!', backgroundColor: '#f7e9a0', color: '#b9ae76' });
      }

      if (delta.yaw > 240) {
        this.setState({ trick: 'FS 360 Shove-it!', backgroundColor: '#f7e9a0', color: '#b9ae76' });
      }

      if (delta.yaw < -120) {
        this.setState({ trick: 'BS Shove-it!', backgroundColor: '#f7e9a0', color: '#b9ae76' });
      }

      if (delta.yaw < -240) {
        this.setState({ trick: 'BS 360 Shove-it!', backgroundColor: '#f7e9a0', color: '#b9ae76' });
      }

      if (delta.roll < -320) {
        this.setState({ trick: 'Kickflip!', backgroundColor: '#f76d6d', color: '#fd9498' });
      }

      if (delta.roll > 320) {
        this.setState({ trick: 'Heelflip!', backgroundColor: '#f76d6d', color: '#fd9498' });
      }

      if (Math.abs(delta.pitch) < 10 && Math.abs(delta.roll) < 10 && Math.abs(delta.yaw) < 10) {
        this.setState({ trick: 'Idle', backgroundColor: '#a8d1e7', color: '#7b98a8' });
      }

      this.setState({ delta: delta });

    }, 500)

  }

  render() {
    return (
      <View style={[styles.container, { backgroundColor: this.state.backgroundColor }]}>

        < Text style={[styles.trick, { color: this.state.color }]} >{this.state.trick}</Text>

        {/*
        <Text>pitch: {this.state.bigger}</Text>
        <Text>pitch: {this.state.rotation.pitch}</Text>
        <Text>roll: {this.state.rotation.roll}</Text>
        <Text>yaw: {this.state.rotation.yaw}</Text>

        <Text>delta pitch: {this.state.delta.pitch.toFixed(3)}</Text>
        <Text>delta roll: {this.state.delta.roll.toFixed(3)}</Text>
        <Text>delta yaw: {this.state.delta.yaw.toFixed(3)}</Text>
        */}

      </View >
    );
  }
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#a8d1e7'
  },
  trick: {
    fontSize: 70,
    textAlign: 'center',
    color: '#7b98a8'
  }
});
