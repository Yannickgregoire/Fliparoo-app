import Config from './Config';
import DeviceInfo from 'react-native-device-info';

const DEVICE_UID = DeviceInfo.getUniqueID();

class Api {

    constructor() { }

    postTrickData = (trick, data) => {

        fetch(Config.server, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ uuid: DEVICE_UID, trick: { name: trick.id, data: data } }),
        }).then((response) => {
            console.log('success', response);
        }, (error) => {
            console.log('error', error);
        });

    };

}

export default new Api();
