import React, { Component } from 'react';
import { View, StyleSheet } from 'react-native';

import FetchLocation from './components/FetchLocation';
import FishMap from './components/FishMap';
import { getForecast } from './Utils/Utils';

export default class FishLogger extends Component {

    state = {
        userLocation: null
    };

    getUserLocationHandler = () => {
        navigator.geolocation.getCurrentPosition(position => {
            this.setState({
                userLocation: {
                    latitude: position.coords.latitude,
                    longitude: position.coords.longitude,
                    latitudeDelta: 0.0222,
                    longitudeDelta: 0.0021,
                }
            });
            getForecast(position.coords.latitude, position.coords.longitude)
                .then(res => {
                    console.log('smhi', res['timeSeries'][0]);
                });
        }, err => console.log(err));
        // const weather = getForecast(this.state.userLocation.latitude, this.state.userLocation.longitude);
        // const weather = this.state;
    };

    render() {
        return (
            <View style={styles.container}>
                <View style={styles.map}>
                    <FishMap userLocation={this.state.userLocation}/>
                </View>
                <View style={styles.logView}>
                    <FetchLocation style={styles.logBtn} onGetLocation={this.getUserLocationHandler}/>
                </View>
            </View>
        );
    }


}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        width: '100%',
        backgroundColor: '#fff',
    },
    map: {
        flex: 8,
        backgroundColor: 'powderblue'
    },
    logView: {
        flex: 1,
        backgroundColor: 'white'
    },
    logBtn: {},
});