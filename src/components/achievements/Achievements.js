import React, { Component } from 'react';
import { StyleSheet, View, Text } from 'react-native';
import { width, height } from '../../style/StyleBook'

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
                title: 'your first trick',
                condition: () => this.props.achievements.trickCount === 1,
                callback: () => { }
            },
            {
                id: 'total10',
                title: 'land 10 tricks',
                condition: () => this.props.achievements.trickCount === 10,
                callback: () => { }
            },
            {
                id: 'total100',
                title: 'land 100 tricks, nice!',
                condition: () => this.props.achievements.trickCount === 100,
                callback: () => { }
            },
            {
                id: 'alltricks',
                title: 'land all possible tricks',
                condition: () => this.props.achievements.trickListTotal.length === 16,
                callback: () => { }
            },
            {
                id: 'allachievements',
                title: 'unlock all achievements',
                condition: () => this.props.achievements.achievements.length === this.achievements.length -1,
                callback: () => { }
            },
        ]

    }

    componentDidUpdate(prevProps, prevState) {

        if (this.props.achievements.trickCount !== prevProps.achievements.trickCount) {
            this.checkAchievements();
        }

        if (this.props.achievements.trickListTotal !== prevProps.achievements.trickListTotal) {
            this.checkAchievements();
        }

    };

    checkAchievements = () => {

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

    };

    isCompleted = (id) => {
        return (this.props.achievements.achievements.filter((achievement) => {
            return (achievement.id === id);
        }).length > 0);
    };

    renderAchievements = () => {
        return this.state.achievements.map((achievement, index) => {
            return <Achievement key={achievement.id} title={achievement.title} />
        })
    };

    render() {
        const styleRotation = (this.props.stance.value === 'regular') ? { transform: [{ rotate: '90deg' }] } : { transform: [{ rotate: '-90deg' }] };
        return (
            <View style={[styles.achievements, styleRotation]} pointerEvents="none">
                {this.renderAchievements()}
            </View>
        );
    };
};

const styles = StyleSheet.create({
    achievements: {
        position: 'absolute',
        width: height,
        height: width,
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
    }
});

const ConnectedAchievements = connect(
    mapStateToProps, mapDispatchToProps
)(Achievements);

export default ConnectedAchievements;
