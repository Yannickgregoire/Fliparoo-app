const MARGIN = 90;
const COLORS = [
    [ '#765d69','#8fb9a8', '#fefad4', '#fcd0ba', '#f1828d'],
    [ '#344e5c','#4ab19d', '#efc958', '#e17a47', '#ef3d59'],
    [ '#4d5e72','#3f6a8a', '#f1e6c1', '#f2cc8c', '#dda5b6'],
    [ '#325d79','#9bd7d1', '#efeeee', '#f9a26c', '#f26627'],
    [ '#475c7a','#685d79', '#ab6c82', '#d8737f', '#fcbb6d'],
    [ '#305f72','#568ea6', '#f1d1b5', '#f0b7a4', '#f18c8e']
]

class TrickPossibilities {

    constructor() {

        this.tricks = [
            {
                id: 'fs180shove',
                name: 'fs shove-it',
                color: COLORS[0],
                delta: { pitch: 0, roll: 0, yaw: 180 },
                accumulated: { pitch: undefined, roll: undefined, yaw: 180 }
            },
            {
                id: 'fs360shove',
                name: 'fs 360\nshove-it',
                color: COLORS[5],
                delta: { pitch: 0, roll: 0, yaw: 360 },
                accumulated: { pitch: undefined, roll: undefined, yaw: 360 }
            },
            {
                id: 'bs180shove',
                name: 'bs shove-it',
                color: COLORS[0],
                delta: { pitch: 0, roll: 0, yaw: -180 },
                accumulated: { pitch: undefined, roll: undefined, yaw: 180 }
            },
            {
                id: 'bs360shove',
                name: 'bs 360\nshove-it',
                color: COLORS[5],
                delta: { pitch: 0, roll: 0, yaw: -360 },
                accumulated: { pitch: undefined, roll: undefined, yaw: 360 }
            },
            {
                id: 'kickflip',
                name: 'kickflip',
                color: COLORS[0],
                delta: { pitch: 0, roll: -360, yaw: 0 },
                accumulated: { pitch: undefined, roll: undefined, yaw: undefined }
            },
            {
                id: 'doublekickflip',
                name: 'double\nkickflip',
                color: COLORS[4],
                delta: { pitch: 0, roll: -720, yaw: 0 },
                accumulated: { pitch: 90, roll: 720, yaw: 90 }
            },
            {
                id: 'heelflip',
                name: 'heelflip',
                color: COLORS[0],
                delta: { pitch: 0, roll: 360, yaw: 0 },
                accumulated: { pitch: undefined, roll: undefined, yaw: undefined }
            },
            {
                id: 'doubleheelflip',
                name: 'double\nheelflip',
                color: COLORS[5],
                delta: { pitch: 0, roll: 720, yaw: 0 },
                accumulated: { pitch: 90, roll: 720, yaw: 90 }
            },
            {
                id: '360flip',
                name: 'tre flip',
                color: COLORS[0],
                delta: { pitch: 0, roll: -360, yaw: -360 },
                accumulated: { pitch: undefined, roll: undefined, yaw: undefined }
            },
            {
                id: 'doublehardflip',
                name: 'double\nhardflip',
                color: COLORS[2],
                delta: { pitch: 0, roll: -360, yaw: 360 },
                accumulated: { pitch: undefined, roll: undefined, yaw: undefined }
            },
            {
                id: 'doublehardflip',
                name: 'double\nhardflip',
                color: COLORS[2],
                delta: { pitch: 0, roll: -720, yaw: 0 },
                accumulated: { pitch: 360, roll: 720, yaw: 360 }
            },
            {
                id: 'laserflip',
                name: 'laserflip',
                color: COLORS[1],
                delta: { pitch: 0, roll: 360, yaw: 360 },
                accumulated: { pitch: undefined, roll: undefined, yaw: undefined }
            },
            {
                id: '360inwardheelflip',
                name: 'inward\n360 heelflip',
                color: COLORS[3],
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

const isInRange = (property, number, type) => {

    const margin = (type === 'accumulated') ? MARGIN * 2 : MARGIN;
    return (typeof number === 'undefined') ? true : (property > number - margin && property < number + margin);

}

export default new TrickPossibilities();