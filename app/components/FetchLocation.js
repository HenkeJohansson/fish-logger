import React from 'react';
import AwesomeButton from 'react-native-really-awesome-button';

const fetchLocation = props => {
    return (
        <AwesomeButton onPress={props.onGetLocation}>Logg fishy</AwesomeButton>
    );
};

export default fetchLocation;