const MARGIN = 90;
const EMOJIS = ['🤘', '🔥', '👍', '🙌', '👏', '🤟', '🤙', '🎉', '✌️', '✨'];
const COLORS = ['#263e4a', '#e17a47', '#49b19d',  '#ef3e59', '#f2bc42'];
const FAILS = ['whoops', 'ouch', 'nope', 'nuhuh'];
const TRICKS = [
    {
        id: 'fs180shove',
        name: 'fs shove-it',
        color: COLORS,
        delta: { pitch: 0, roll: 0, yaw: 180 },
        accumulated: { pitch: undefined, roll: 0, yaw: 180 }
    },
    {
        id: 'fs360shove',
        name: 'fs 360\nshove-it',
        color: COLORS,
        delta: { pitch: 0, roll: 0, yaw: 360 },
        accumulated: { pitch: undefined, roll: undefined, yaw: 360 }
    },
    {
        id: 'bs180shove',
        name: 'bs shove-it',
        color: COLORS,
        delta: { pitch: 0, roll: 0, yaw: -180 },
        accumulated: { pitch: undefined, roll: 0, yaw: 180 }
    },
    {
        id: 'bs360shove',
        name: 'bs 360\nshove-it',
        color: COLORS,
        delta: { pitch: 0, roll: 0, yaw: -360 },
        accumulated: { pitch: undefined, roll: undefined, yaw: 360 }
    },
    {
        id: 'kickflip',
        name: 'kickflip',
        color: COLORS,
        delta: { pitch: 0, roll: -360, yaw: 0 },
        accumulated: { pitch: undefined, roll: undefined, yaw: undefined }
    },
    {
        id: 'doublekickflip',
        name: 'double\nkickflip',
        color: COLORS,
        delta: { pitch: 0, roll: -720, yaw: 0 },
        accumulated: { pitch: 90, roll: 900, yaw: 90 }
    },
    {
        id: 'heelflip',
        name: 'heelflip',
        color: COLORS,
        delta: { pitch: 0, roll: 360, yaw: 0 },
        accumulated: { pitch: undefined, roll: undefined, yaw: undefined }
    },
    {
        id: 'doubleheelflip',
        name: 'double\nheelflip',
        color: COLORS,
        delta: { pitch: 0, roll: 720, yaw: 0 },
        accumulated: { pitch: 90, roll: 720, yaw: 90 }
    },
    {
        id: 'hardflip',
        name: 'hardflip',
        color: COLORS,
        delta: { pitch: 0, roll: -360, yaw: 180 },
        accumulated: { pitch: 180, roll: 360, yaw: 180 }
    },
    {
        id: 'varialheelflip',
        name: 'varial\nheelflip',
        color: COLORS,
        delta: { pitch: 0, roll: 360, yaw: 180 },
        accumulated: { pitch: 180, roll: 360, yaw: 180 }
    },
    {
        id: 'varialkickflip',
        name: 'varial\nkickflip',
        color: COLORS,
        delta: { pitch: 0, roll: -360, yaw: -180 },
        accumulated: { pitch: 180, roll: 360, yaw: 180 }
    },
    {
        id: 'inwardheelflip',
        name: 'inward\nheelflip',
        color: COLORS,
        delta: { pitch: 0, roll: 360, yaw: -180 },
        accumulated: { pitch: 180, roll: 360, yaw: 180 }
    },
    {
        id: '360flip',
        name: 'tre flip',
        color: COLORS,
        delta: { pitch: 0, roll: -360, yaw: -360 },
        accumulated: { pitch: undefined, roll: undefined, yaw: undefined }
    },
    {
        id: 'doublehardflip',
        name: 'double\nhardflip',
        color: COLORS,
        delta: { pitch: 0, roll: -360, yaw: 360 },
        accumulated: { pitch: undefined, roll: undefined, yaw: undefined }
    },
    {
        id: 'doublehardflip',
        name: 'double\nhardflip',
        color: COLORS,
        delta: { pitch: 0, roll: -720, yaw: 0 },
        accumulated: { pitch: 360, roll: 720, yaw: 360 }
    },
    {
        id: 'laserflip',
        name: 'laserflip',
        color: COLORS,
        delta: { pitch: 0, roll: 360, yaw: 360 },
        accumulated: { pitch: undefined, roll: undefined, yaw: undefined }
    },
    {
        id: '360inwardheelflip',
        name: 'inward\n360 heelflip',
        color: COLORS,
        delta: { pitch: 0, roll: 360, yaw: -360 },
        accumulated: { pitch: undefined, roll: undefined, yaw: undefined }
    },
    {
        id: '360inwardheelflip',
        name: 'inward\n360 heelflip',
        color: COLORS,
        delta: { pitch: 0, roll: 720, yaw: 0 },
        accumulated: { pitch: 360, roll: 720, yaw: 360 }
    },
]

class TrickPossibilities {

    constructor() {}

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