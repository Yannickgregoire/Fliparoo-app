import React, { Component } from 'react';
import { ScrollView, StyleSheet, View, Text } from 'react-native';
import { StyleBook } from '../style/StyleBook'
import Button from '../ui/Button'

export default class Thanks extends Component {

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
                            <Text style={StyleBook.heading}>🤟</Text>
                            <Text style={StyleBook.body}>Alright, that's all we needed to know. If you ever want to change your settings, double tap the trick screen. This will take you to the settings menu.</Text>
                        </View>
                    </View>
                </ScrollView>
                <Button style={StyleBook.buttonFixed} text="start" onPress={this.props.onNext} />
            </View>
        );
    }
};

const styles = StyleSheet.create({});
