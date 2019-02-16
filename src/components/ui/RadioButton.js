import React, { Component } from 'react';
import { StyleSheet, View, Text, TouchableOpacity } from 'react-native';
import { StyleBook } from '../../style/StyleBook'

export default class RadioButton extends Component {

    constructor(props) {
        super(props);
        this.state = {};
    }

    onSelect = () => {
        this.props.onSelect(this.props.value);
    }

    renderIcon = () => {
        if (this.props.icon) {
            return <View><Text style={StyleBook.buttonIcon}>{this.props.icon}</Text></View>;
        }
    };

    renderText = () => {

        let texts = [];

        if (this.props.text) {
            texts.push(<Text key="text" style={[StyleBook.buttonText, StyleBook.buttonRadioText]}>{this.props.text}</Text>)
        }

        if (this.props.description) {
            texts.push(<Text key="description" style={[StyleBook.buttonDescription, StyleBook.buttonRadioDescription]}>{this.props.description}</Text>)
        }

        return texts;
    };

    render() {

        const styleRadioSelected = (this.props.selected === true) ? StyleBook.buttonRadioSelected : null;

        return (
            <TouchableOpacity style={StyleBook.buttonRadioTouchable} onPress={this.onSelect} activeOpacity={.5}>
                <View style={[StyleBook.button, StyleBook.buttonRadio, styleRadioSelected, { ...this.props.style }]}>
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
