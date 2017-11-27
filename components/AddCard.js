import React from 'react';
import { Button, StyleSheet, Text, TextInput, View } from 'react-native';

export default class AddCard extends React.Component {
  state = {
    front: '',
    back: '',
  };

  static navigationOptions = () => ({
    title: 'add card',
  });

  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.label}>Front</Text>
        <TextInput
          onChangeText={front => this.setState({ front })}
          value={this.state.front}
          style={styles.input}
        />
        <Text style={styles.label}>Back</Text>
        <TextInput
          onChangeText={back => this.setState({ back })}
          value={this.state.back}
          style={styles.input}
        />
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
  input: {
    width: 200,
    borderColor: 'gray',
    borderWidth: 1,
    borderRadius: 5,
    padding: 5,
  },
  label: {
    paddingTop: 10,
  },
});
