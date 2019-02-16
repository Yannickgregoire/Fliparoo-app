import React, { Component } from 'react';
import { TouchableOpacity, StyleSheet, View, Text } from 'react-native';
import { StyleBook } from '../../style/StyleBook'

export default class Button extends Component {

    constructor(props) {
        super(props);
        this.state = {};
    }

    renderIcon = () => {
        if (this.props.icon) {
            return <View><Text style={StyleBook.buttonIcon}>{this.props.icon}</Text></View>;
        }
    };

    renderText = () => {

        let texts = [];

        if (this.props.text) {
            texts.push(<Text key="text" style={StyleBook.buttonText}>{this.props.text}</Text>)
        }

        if (this.props.description) {
            texts.push(<Text key="description" style={StyleBook.buttonDescription}>{this.props.description}</Text>)
        }

        return texts;
    };

    render() {

        return (
            <TouchableOpacity style={StyleBook.buttonTouchable} onPress={this.props.onPress} activeOpacity={.5}>
                <View style={[StyleBook.button, { ...this.props.style }]}>
                    {this.renderIcon()}
                    <View>
                        {this.renderText()}
                    </View>
                </View>
            </TouchableOpacity>
        );
    }
};

const styles = StyleSheet.create({});
