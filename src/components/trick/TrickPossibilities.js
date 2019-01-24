const EMOJIS = ['🤘', '🔥', '👍', '🙌', '👏', '🤟', '🤙', '🎉', '💩'];
const MARGIN = 90;

class TrickPossibilities {

    constructor() {

        this.tricks = [
            {
                id: 'fs180shove',
                name: 'fs shove-it! ' + getEmoji(),
                delta: { pitch: 0, roll: 0, yaw: 180 },
                accumulated: { pitch: undefined, roll: undefined, yaw: 180 }
            },
            {
                id: 'fs360shove',
                name: 'fs 360\nshove-it! ' + getEmoji(),
                delta: { pitch: 0, roll: 0, yaw: 360 },
                accumulated: { pitch: undefined, roll: undefined, yaw: 360 }
            },
            {
                id: 'bs180shove',
                name: 'bs shove-it! ' + getEmoji(),
                delta: { pitch: 0, roll: 0, yaw: -180 },
                accumulated: { pitch: undefined, roll: undefined, yaw: 180 }
            },
            {
                id: 'bs360shove',
                name: 'bs 360\nshove-it! ' + getEmoji(),
                delta: { pitch: 0, roll: 0, yaw: -360 },
                accumulated: { pitch: undefined, roll: undefined, yaw: 360 }
            },
            {
                id: 'kickflip',
                name: 'kickflip! ' + getEmoji(),
                delta: { pitch: 0, roll: -360, yaw: 0 },
                accumulated: { pitch: undefined, roll: 360, yaw: undefined }
            },
            {
                id: 'doublekickflip',
                name: 'double\nkickflip! ' + getEmoji(),
                delta: { pitch: 0, roll: -720, yaw: 0 },
                accumulated: { pitch: 90, roll: 720, yaw: 90 }
            },
            {
                id: 'heelflip',
                name: 'heelflip! ' + getEmoji(),
                delta: { pitch: 0, roll: 360, yaw: 0 },
                accumulated: { pitch: undefined, roll: 360, yaw: undefined }
            },
            {
                id: 'doubleheelflip',
                name: 'double\nheelflip! ' + getEmoji(),
                delta: { pitch: 0, roll: 720, yaw: 0 },
                accumulated: { pitch: 90, roll: 720, yaw: 90 }
            },
            {
                id: '360flip',
                name: 'tre flip! ' + getEmoji(),
                delta: { pitch: 0, roll: -360, yaw: -360 },
                accumulated: { pitch: undefined, roll: undefined, yaw: undefined }
            },
            {
                id: 'doublehardflip',
                name: 'double\nhardflip' + getEmoji(),
                delta: { pitch: 0, roll: -360, yaw: 360 },
                accumulated: { pitch: undefined, roll: undefined, yaw: undefined }
            },
            {
                id: 'doublehardflip',
                name: 'double\nhardflip' + getEmoji(),
                delta: { pitch: 0, roll: -720, yaw: 0 },
                accumulated: { pitch: 360, roll: 720, yaw: 360 }
            },
            {
                id: 'laserflip',
                name: 'laserflip ' + getEmoji(),
                delta: { pitch: 0, roll: 360, yaw: 360 },
                accumulated: { pitch: undefined, roll: undefined, yaw: undefined }
            },
            {
                id: '360inwardheelflip',
                name: 'inward\n360 heelflip ' + getEmoji(),
                delta: { pitch: 0, roll: 360, yaw: -360 },
                accumulated: { pitch: undefined, roll: undefined, yaw: undefined }
            }
        ]

    }

    getTrick = (delta, accumulated) => {

        return this.tricks.filter((trick) => {

            return (
                isInRange(delta.pitch, trick.delta.pitch, 'delta') &&
                isInRange(delta.roll, trick.delta.roll, 'delta') &&
                isInRange(delta.yaw, trick.delta.yaw, 'delta') &&
                isInRange(accumulated.pitch, trick.accumulated.pitch, 'accumulated') &&
                isInRange(accumulated.roll, trick.accumulated.roll, 'accumulated') &&
                isInRange(accumulated.yaw, trick.accumulated.yaw, 'accumulated')
            );

        })[0];
    }

}

const getEmoji = () => {
    return EMOJIS[Math.floor(Math.random() * EMOJIS.length)];
}

const isInRange = (property, number, type) => {

    const margin = (type === 'accumulated') ? MARGIN * 2 : MARGIN;
    return (typeof number === 'undefined') ? true : (property > number - margin && property < number + margin);

}

export default new TrickPossibilities();