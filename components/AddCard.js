import React from 'react';
import { Button, StyleSheet, Text, View } from 'react-native';

export default class AddCard extends React.Component {
  static navigationOptions = () => ({
    title: 'add card',
  });

  render() {
    return (
      <View style={styles.container}>
        <Text>Add Card</Text>
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
