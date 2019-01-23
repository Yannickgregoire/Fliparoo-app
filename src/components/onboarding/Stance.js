import React, { Component } from 'react';
import { ScrollView, StyleSheet, View, Text } from 'react-native';
import { StyleBook } from '../style/StyleBook'

import Button from '../ui/Button'
import RadioButton from '../ui/RadioButton'

export default class Intro extends Component {

    constructor(props) {
        super(props);
        this.state = { selected: 'regular' };
    }

    componentDidMount() { }

    selectStance = (stance) => {
        this.setState({ selected: stance })
    }

    render() {
        return (
            <View>
                <ScrollView>
                    <View style={[StyleBook.container, StyleBook.scroll]}>
                        <Text style={StyleBook.body}>Are you regular or goofy?</Text>
                        <Text style={StyleBook.description}>Regular stance is righthanded. Goofy stance lefthanded.</Text>
                        <View style={StyleBook.row}>
                            <RadioButton value="regular" text="regular" selected={this.state.selected === 'regular'} icon="🙄" onSelect={this.selectStance} />
                            <RadioButton value="goofy" text="goofy" selected={this.state.selected === 'goofy'} icon="🤪" onSelect={this.selectStance} />
                        </View>
                    </View>
                </ScrollView>
                <Button style={StyleBook.buttonFixed} text="next" />
            </View>
        );
    }
};

const styles = StyleSheet.create({});
