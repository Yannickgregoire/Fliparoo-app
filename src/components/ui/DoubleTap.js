import React, { Component } from "react";
import { TouchableOpacity } from "react-native";

export default class DoubleTap extends Component {

    constructor(props) {
        super(props);
        this.delayTime = props.delay ? props.delay : 200;
        this.firstPress = true;
        this.lastTime = new Date();
        this.timer = false;
    }

    componentWillUnmount() {
        this.timer && clearTimeout(this.timer);
    }

    onPress = () => {

        let now = new Date().getTime();

        if (this.firstPress) {

            this.firstPress = false;

            this.timer = setTimeout(() => {
                this.props.singleTap ? this.props.singleTap() : null;
                this.firstPress = true;
            }, this.delayTime);

            this.lastTime = now;

        } else {

            if (now - this.lastTime < this.delayTime) {
                this.timer && clearTimeout(this.timer);
                this.props.doubleTap ? this.props.doubleTap() : null;
                this.firstPress = true;
            }

        }
    };

    render() {
        return (
            <TouchableOpacity delayPressIn={0} onPressOut={this.onPress} style={this.props.style} activeOpacity={1}>
                {this.props.children}
            </TouchableOpacity>
        );
    }
}
