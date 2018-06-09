import React, { Component } from 'react';
import { View, ScrollView, StyleSheet, Modal, Text, TextInput, Picker } from 'react-native';
import AwesomeButton from 'react-native-really-awesome-button';

import FetchLocation from './components/FetchLocation';
import FishMap from './components/FishMap';
import { getForecast } from './Utils/Utils';

export default class FishLogger extends Component {

    state = {
        userLocation: null,
        modalVisible: false,
        form: {
            labels: {
                species: 'Art',
                length: 'Längd',
                weight: 'Vikt',
                lure: 'Bete',
            },
            data: {
                species: null,
                length: null,
                weight: null,
                lure: null,
            }
        }
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

    setModalVisible = (visible) => {
        this.setState({modalVisible: visible});
    };

    render() {

        const formData = {
            ...this.state.form.data
        };
        console.log('formData', formData);
        return (
            <View style={styles.container}>
                <View style={styles.map}>
                    <FishMap userLocation={this.state.userLocation}/>
                </View>
                <View style={styles.logView}>
                    <FetchLocation onGetLocation={this.getUserLocationHandler}/>
                    <AwesomeButton
                        onPress={() => {
                            this.setModalVisible(true);
                        }}>Awesome Button</AwesomeButton>
                </View>
                <Modal
                    animationType="slide"
                    transparent={false}
                    visible={this.state.modalVisible}
                    onRequestClose={() => { console.log('Modal has been closed') }}>
                    <ScrollView>
                        <Text>Modal</Text>
                        <View style={styles.Form}>
                            <Picker
                                style={styles.Picker}
                                selectedValue={formData.species}
                                onValueChange={(itemValue,itemIndex) => formData.species = itemValue}>
                                <Picker.Item label="Gädda" value="pike" />
                                <Picker.Item label="Abborre" value="perch" />
                                <Picker.Item label="Gös" value="zander" />
                            </Picker>
                            <TextInput
                                style={styles.Input}
                                onChange={(text) => formData.species = text}
                                value={this.state.form.labels.species}/>
                            <TextInput
                                style={styles.Input}
                                onChange={(text) => formData.length = text}
                                value={this.state.form.labels.length}/>
                            <TextInput
                                style={styles.Input}
                                onChange={(text) => formData.weight = text}
                                value={this.state.form.labels.weight}/>
                            <TextInput
                                style={styles.Input}
                                onChange={(text) => formData.lure = text}
                                value={this.state.form.labels.lure}/>
                        </View>
                        <View style={styles.WeatherData}>
                            <Text>Weather data</Text>
                        </View>
                        <AwesomeButton
                            onPress={() => {
                                this.setModalVisible(!this.state.modalVisible);
                            }}>Close Modal</AwesomeButton>
                    </ScrollView>
                </Modal>
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
        flexDirection: 'row',
        backgroundColor: 'white'
    },
    AwesomeButton: {
        flex: 1,
    },
    Form: {},
    Picker: {
        height: 50,
        width: '100%',
        marginTop: 20
    },
    Input: {
        height: 50,
        width: 100,
        marginTop: 20,
        borderColor: '#000',
        borderWidth: 1
    },
    WeatherData: {
        marginTop: 20
    }
});