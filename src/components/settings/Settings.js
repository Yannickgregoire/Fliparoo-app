import React, { Component } from 'react';
import { ScrollView, StyleSheet, View, Text } from 'react-native';
import { StyleBook } from '../style/StyleBook'

import { connect } from 'react-redux';
import { setPermission, setStance } from '../../store/actions';

import VersionNumber from 'react-native-version-number';
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
                <ScrollView style={[StyleBook.scroll]}>
                    <View style={[StyleBook.container, { justifyContent: 'flex-start', paddingTop: 80 }]}>
                        <Text style={StyleBook.heading}>Settings</Text>
                        <Text style={StyleBook.body}>Stance</Text>
                        <Text style={StyleBook.description}>Regular stance is righthanded. Goofy stance lefthanded.</Text>
                        <View style={StyleBook.row}>
                            <RadioButton value="regular" text="regular" selected={this.props.stance.value === 'regular'} icon="😗" onSelect={this.selectStance} />
                            <RadioButton value="goofy" text="goofy" selected={this.props.stance.value === 'goofy'} icon="🤪" onSelect={this.selectStance} />
                        </View>
                        <View style={[StyleBook.divider]}></View>
                        <Text style={StyleBook.body}>Send trick data</Text>
                        <Text style={StyleBook.description}>We'll store a UUID and your accelerometer data once a trick is detected.</Text>
                        <View style={StyleBook.row}>
                            <RadioButton value={false} text="no" selected={this.props.permission.value === false} icon="👎" onSelect={this.selectPermission} />
                            <RadioButton value={true} text="yes" selected={this.props.permission.value === true} icon="👍" onSelect={this.selectPermission} />
                        </View>
                        <View style={[StyleBook.divider]}></View>
                        <Text style={{ ...StyleBook.description, marginTop: 0 }}>
                            Version {VersionNumber.appVersion}
                        </Text>
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
