import React, { Component } from 'react';
import { ScrollView, StyleSheet, View, Text } from 'react-native';
import { StyleBook } from '../style/StyleBook'
import Button from '../ui/Button'

export default class Intro extends Component {

    constructor(props) {
        super(props);
        this.state = {};
    }

    componentDidMount() { }

    render() {
        return (
            <View>
                <ScrollView>
                    <View style={[StyleBook.container, StyleBook.scroll]}>
                        <View style={[StyleBook.content]}>
                            <Text style={StyleBook.heading}>heyo!</Text>
                            <Text style={StyleBook.body}>Thanks for checking out Fliparoo. 🎉</Text>
                            <Text style={StyleBook.body}>Before we can start tricking, we need to know some things about you.</Text>
                        </View>
                    </View>
                </ScrollView>
                <Button style={StyleBook.buttonFixed} text="alright, let's go" onPress={this.props.onNext} />
            </View>
        );
    }
};

const styles = StyleSheet.create({});
