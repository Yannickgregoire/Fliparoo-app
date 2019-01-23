const EMOJIS = ['🤘', '🔥', '👍', '🙌', '👏', '🤟', '🤙', '🎉', '💩'];
const MARGIN = 90;

class TrickPossibilities {

    constructor() {

        this.tricks = [
            {
                name: 'fs shove-it! ' + getEmoji(),
                delta: { pitch: 0, roll: 0, yaw: 180 },
                accumulated: { pitch: undefined, roll: undefined, yaw: 180 }
            },
            {
                name: 'fs 360\nshove-it! ' + getEmoji(),
                delta: { pitch: 0, roll: 0, yaw: 360 },
                accumulated: { pitch: undefined, roll: undefined, yaw: 360 }
            },
            {
                name: 'bs shove-it! ' + getEmoji(),
                delta: { pitch: 0, roll: 0, yaw: -180 },
                accumulated: { pitch: undefined, roll: undefined, yaw: 180 }
            },
            {
                name: 'bs 360\nshove-it! ' + getEmoji(),
                delta: { pitch: 0, roll: 0, yaw: -360 },
                accumulated: { pitch: undefined, roll: undefined, yaw: 360 }
            },
            {
                name: 'kickflip! ' + getEmoji(),
                delta: { pitch: 0, roll: -360, yaw: 0 },
                accumulated: { pitch: undefined, roll: 360, yaw: undefined }
            },
            {
                name: 'double\nkickflip! ' + getEmoji(),
                delta: { pitch: 0, roll: -720, yaw: 0 },
                accumulated: { pitch: 90, roll: 720, yaw: 90 }
            },
            {
                name: 'heelflip! ' + getEmoji(),
                delta: { pitch: 0, roll: 360, yaw: 0 },
                accumulated: { pitch: undefined, roll: 360, yaw: undefined }
            },
            {
                name: 'double\nheelflip! ' + getEmoji(),
                delta: { pitch: 0, roll: 720, yaw: 0 },
                accumulated: { pitch: 90, roll: 720, yaw: 90 }
            },
            {
                name: 'tre flip! ' + getEmoji(),
                delta: { pitch: 0, roll: -360, yaw: -360 },
                accumulated: { pitch: undefined, roll: undefined, yaw: undefined }
            },
            {
                name: 'double\nhardflip' + getEmoji(),
                delta: { pitch: 0, roll: -360, yaw: 360 },
                accumulated: { pitch: undefined, roll: undefined, yaw: undefined }
            },
            {
                name: 'double\nhardflip' + getEmoji(),
                delta: { pitch: 0, roll: -720, yaw: 0 },
                accumulated: { pitch: 360, roll: 720, yaw: 360 }
            },
            {
                name: 'laserflip ' + getEmoji(),
                delta: { pitch: 0, roll: 360, yaw: 360 },
                accumulated: { pitch: undefined, roll: undefined, yaw: undefined }
            },
            {
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