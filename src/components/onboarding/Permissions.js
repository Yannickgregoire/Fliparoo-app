import React, { Component } from 'react';
import { ScrollView, StyleSheet, View, Text } from 'react-native';
import { StyleBook } from '../style/StyleBook'

import Button from '../ui/Button'
import RadioButton from '../ui/RadioButton'

export default class Intro extends Component {

    constructor(props) {
        super(props);
        this.state = { selected: 'no' };
    }

    componentDidMount() { }

    selectPermission = (permission) => {
        this.setState({ selected: permission })
    }

    render() {
        return (
            <View>
                <ScrollView>
                    <View style={[StyleBook.container, StyleBook.scroll]}>
                        <Text style={StyleBook.body}>Would you like to send us your trick data? This way we can improve trick detection.</Text>
                        <Text style={StyleBook.description}>We'll store your device id and accellerometer data. Read why.</Text>
                        <View style={StyleBook.row}>
                            <RadioButton value="no" text="no" description="thanks" selected={this.state.selected === 'no'} icon="👎" onSelect={this.selectPermission} />
                            <RadioButton value="yes" text="yes" description="please" selected={this.state.selected === 'yes'} icon="👍" onSelect={this.selectPermission} />
                        </View>
                    </View>
                </ScrollView>
                <Button style={StyleBook.buttonFixed} text="next" />
            </View>
        );
    }
};

const styles = StyleSheet.create({});
