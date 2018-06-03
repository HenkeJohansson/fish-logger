import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

import FishLogger from './app/FishLogger';

export default class App extends React.Component {
  render() {
    return (
      <View style={styles.container}>
        <FishLogger/>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
