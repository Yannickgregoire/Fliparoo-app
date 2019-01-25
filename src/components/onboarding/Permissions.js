import React, { Component } from 'react';
import { ScrollView, StyleSheet, View, Text } from 'react-native';
import { StyleBook } from '../style/StyleBook'

import { connect } from 'react-redux';
import { setPermission } from '../../store/actions';

import Button from '../ui/Button'
import RadioButton from '../ui/RadioButton'

class Permission extends Component {

    constructor(props) {
        super(props);
        this.state = { selected: 'no' };
    }

    selectPermission = (permission) => {
        this.props.setPermission(permission);
    }

    render() {
        return (
            <View>
                <ScrollView>
                    <View style={[StyleBook.container, StyleBook.scroll]}>
                        <View style={[StyleBook.content]}>
                            <Text style={StyleBook.body}>Would you like to send us your trick data? This way we can improve trick detection.</Text>
                            <Text style={StyleBook.description}>We'll store your device id and accelerometer data. Find out why.</Text>
                            <View style={StyleBook.row}>
                                <RadioButton value={false} text="no" description="thanks" selected={this.props.permission.value === false} icon="👎" onSelect={this.selectPermission} />
                                <RadioButton value={true} text="yes" description="please" selected={this.props.permission.value === true} icon="👍" onSelect={this.selectPermission} />
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
    permission: state.permission
});

const mapDispatchToProps = (dispatch, ownProps) => ({
    setPermission: (permission) => {
        dispatch(setPermission(permission));
    }
});

const ConnectedPermission = connect(
    mapStateToProps, mapDispatchToProps
)(Permission);

export default ConnectedPermission;
