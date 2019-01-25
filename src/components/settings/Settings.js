import React, { Component } from 'react';
import { ScrollView, StyleSheet, View, Text } from 'react-native';
import { StyleBook } from '../style/StyleBook'

import { connect } from 'react-redux';
import { setPermission, setStance } from '../../store/actions';

import Button from '../ui/Button'
import RadioButton from '../ui/RadioButton'

class Settings extends Component {

    constructor(props) {
        super(props);
        this.state = { selected: 'no' };
    }

    componentDidMount() { }

    selectPermission = (permission) => {
        this.props.setPermission(permission);
    }

    selectStance = (stance) => {
        this.props.setStance(stance);
    }

    render() {
        return (
            <View>
                <ScrollView>
                    <View style={[StyleBook.container, StyleBook.scroll]}>
                        <Text style={StyleBook.heading}>Settings</Text>
                        <Text style={StyleBook.body}>Stance</Text>
                        <Text style={StyleBook.description}>Regular stance is righthanded. Goofy stance lefthanded.</Text>
                        <View style={StyleBook.row}>
                            <RadioButton value="regular" text="regular" selected={this.props.stance.value === 'regular'} icon="😗" onSelect={this.selectStance} />
                            <RadioButton value="goofy" text="goofy" selected={this.props.stance.value === 'goofy'} icon="🤪" onSelect={this.selectStance} />
                        </View>
                        <View style={[StyleBook.divider]}></View>
                        <Text style={StyleBook.body}>Send trick data</Text>
                        <Text style={StyleBook.description}>We'll store your device id and accellerometer data. Find out whys</Text>
                        <View style={StyleBook.row}>
                            <RadioButton value={false} text="no" selected={this.props.permission.value === false} icon="👎" onSelect={this.selectPermission} />
                            <RadioButton value={true} text="yes" selected={this.props.permission.value === true} icon="👍" onSelect={this.selectPermission} />
                        </View>
                    </View>
                </ScrollView>
            </View>
        );
    }
};

const styles = StyleSheet.create({});

const mapStateToProps = (state, ownProps) => ({
    permission: state.permission,
    stance: state.stance
});

const mapDispatchToProps = (dispatch, ownProps) => ({
    setPermission: (permission) => {
        dispatch(setPermission(permission));
    },
    setStance: (stance) => {
        dispatch(setStance(stance));
    }
});

const ConnectedSettings = connect(
    mapStateToProps, mapDispatchToProps
)(Settings);

export default ConnectedSettings;
