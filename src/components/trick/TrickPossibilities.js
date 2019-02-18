import { COLORS, TRICKS, FAILS } from './Tricks';

const MARGIN = 90;
const EMOJIS = ['🤘', '🔥', '👍', '🙌', '👏', '🤟', '🤙', '🎉', '✌️', '✨'];

class TrickPossibilities {

    constructor() { }

    getTrick = (delta, accumulated, rotation) => {

        if (isInRange(Math.abs(rotation.roll), 180, 'rotation')) {
            return {
                id: 'fail',
                name: FAILS[Math.floor(Math.random() * FAILS.length)],
                color: COLORS
            }
        }

        const trick = TRICKS.filter((trick) => {
            return (
                isInRange(delta.pitch, trick.delta.pitch, 'delta') &&
                isInRange(delta.roll, trick.delta.roll, 'delta') &&
                isInRange(delta.yaw, trick.delta.yaw, 'delta') &&
                isInRange(accumulated.pitch, trick.accumulated.pitch, 'accumulated') &&
                isInRange(accumulated.roll, trick.accumulated.roll, 'accumulated') &&
                isInRange(accumulated.yaw, trick.accumulated.yaw, 'accumulated')
            );
        })[0];

        if (trick) {
            return { ...trick, name: trick.name + ' ' + getEmoji() };
        }

    }

}

const getEmoji = () => {
    return EMOJIS[Math.floor(Math.random() * EMOJIS.length)];
}

const isInRange = (property, number, type) => {
    const margin = (type === 'accumulated') ? MARGIN * 2 : (type === 'rotation') ? MARGIN * .8 : MARGIN;
    return (typeof number === 'undefined') ? true : (property > number - margin && property < number + margin);
}

export default new TrickPossibilities();