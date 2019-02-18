export const COLORS = ['#344e5c', '#e17a47', '#4ab19d',  '#ef3d59', '#efc959'];
export const FAILS = ['whoops', 'ouch', 'nope', 'nuhuh'];
export const TRICKS = [
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
        id: '360hardflip',
        name: '360\nhardflip',
        color: COLORS,
        delta: { pitch: 0, roll: -360, yaw: 360 },
        accumulated: { pitch: undefined, roll: undefined, yaw: undefined }
    },
    {
        id: '360hardflip',
        name: '360\nhardflip',
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
];