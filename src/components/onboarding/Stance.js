import React, { Component } from 'react';
import { ScrollView, StyleSheet, View, Text } from 'react-native';
import { StyleBook } from '../style/StyleBook'

import { connect } from 'react-redux';
import { setStance } from '../../store/actions';

import Button from '../ui/Button'
import RadioButton from '../ui/RadioButton'

class Stance extends Component {

    constructor(props) {
        super(props);
        this.state = { selected: 'regular' };
    }

    componentDidMount() { }

    selectStance = (stance) => {
        this.props.setStance(stance);
    }

    render() {
        return (
            <View>
                <ScrollView>
                    <View style={[StyleBook.container, StyleBook.scroll]}>
                        <View style={[StyleBook.content]}>
                            <Text style={StyleBook.body}>Are you regular or goofy?</Text>
                            <Text style={StyleBook.description}>Regular stance is righthanded. Goofy stance lefthanded.</Text>
                            <View style={StyleBook.row}>
                                <RadioButton value="regular" text="regular" selected={this.props.stance.value === 'regular'} icon="😗" onSelect={this.selectStance} />
                                <RadioButton value="goofy" text="goofy" selected={this.props.stance.value === 'goofy'} icon="🤪" onSelect={this.selectStance} />
                            </View>
                        </View>
                    </View>
                </ScrollView>
                <Button style={StyleBook.buttonFixed} text="next" onPress={this.props.onNext} />
            </View>
        );
    }
};

const styles = StyleSheet.create({});

const mapStateToProps = (state, ownProps) => ({
    stance: state.stance
});

const mapDispatchToProps = (dispatch, ownProps) => ({
    setStance: (stance) => {
        dispatch(setStance(stance));
    }
});

const ConnectedStance = connect(
    mapStateToProps, mapDispatchToProps
)(Stance);

export default ConnectedStance;
