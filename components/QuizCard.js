import React from 'react';
import { Button, StyleSheet, Text, View } from 'react-native';

export default class Deck extends React.Component {
  render() {
    return (
      <View style={styles.container}>
        <Text>Quiz Card</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
