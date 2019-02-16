import React, { Component } from 'react';
import { ScrollView, StyleSheet, View, Text } from 'react-native';
import { StyleBook } from '../../style/StyleBook'
import Button from '../ui/Button'

export default class Intro extends Component {

    constructor(props) {
        super(props);
        this.state = {};
    }

    render() {
        return (
            <View>
                <ScrollView style={[StyleBook.scroll]}>
                    <View style={[StyleBook.container]}>
                        <View style={[StyleBook.content]}>
                            <Text style={StyleBook.heading}>👋</Text>
                            <Text style={StyleBook.body}>Thanks for checking out Fliparooo.</Text>
                            <Text style={StyleBook.body}>Before we can start flipping, we need to know some things about you.</Text>
                        </View>
                    </View>
                </ScrollView>
                <Button style={StyleBook.buttonFixed} text="let's go" onPress={this.props.onNext} />
            </View>
        );
    }
};

const styles = StyleSheet.create({});
