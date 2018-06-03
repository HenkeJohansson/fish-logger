import React from 'react';
import { Button } from 'react-native';

const fetchLocation = props => {
    return (
        <Button title="Log Fish" onPress={props.onGetLocation} />
    );
};

export default fetchLocation;