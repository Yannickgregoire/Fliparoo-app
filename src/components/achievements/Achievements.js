import React, { Component } from 'react';
import { StyleSheet, View, Text } from 'react-native';
import { StyleBook } from '../style/StyleBook'

import { connect } from 'react-redux';
import { addAchievement } from '../../store/actions';

import Achievement from './Achievement';

class Achievements extends Component {

    constructor(props) {

        super(props);
        this.state = {
            achievements: []
        };

        this.showAchievements = [];

        this.achievements = [
            {
                id: 'first',
                title: 'your first trick!',
                condition: () => this.props.achievements.trickCount === 1,
                callback: () => { }
            },
            {
                id: 'total5',
                title: 'landed 5 tricks!',
                condition: () => this.props.achievements.trickCount === 5,
                callback: () => { }
            },
        ]
    }

    componentDidUpdate(prevProps, prevState) {

        if (this.props.achievements.trickCount !== prevProps.achievements.trickCount) {

            this.achievements.map((achievement) => {

                if (achievement.condition() === true && !this.isCompleted(achievement.id)) {
                    this.props.addAchievement(achievement);
                    achievement.callback();

                    this.showAchievements.push(achievement);
                    this.setState({ achievements: this.showAchievements });

                    setTimeout(() => {
                        this.showAchievements = this.showAchievements.filter((a) => a.id !== achievement.id)
                        this.setState({ achievements: this.showAchievements });
                    }, 5000)
                }
            })

        }

    };

    isCompleted = (id) => {
        return (this.props.achievements.achievements.filter((achievement) => {
            return (achievement.id === id);
        }).length > 0);
    };

    renderAchievements = () => {
        return this.state.achievements.map((achievement) => {
            return <Achievement key={achievement.id} title={achievement.title} />
        })
    };

    render() {
        return (
            <View style={[styles.achievement]} pointerEvents="none">
                {this.renderAchievements()}
            </View>
        );
    };
};

const styles = StyleSheet.create({
    achievement: {
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        justifyContent: 'flex-start',
        alignItems: 'flex-end'
    }
});

const mapStateToProps = (state, ownProps) => ({
    stance: state.stance,
    achievements: state.achievements
});

const mapDispatchToProps = (dispatch, ownProps) => ({
    addAchievement: (achievement) => {
        dispatch(addAchievement(achievement));
    },
});

const ConnectedAchievements = connect(
    mapStateToProps, mapDispatchToProps
)(Achievements);

export default ConnectedAchievements;