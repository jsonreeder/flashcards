import React from 'react';
import { Alert, Button, StyleSheet, Text, TextInput, View } from 'react-native';
import * as api from '../utils/api';

export default class AddCard extends React.Component {
  state = {
    front: '',
    back: '',
  };

  static navigationOptions = () => ({
    title: 'add card',
  });

  isFormComplete() {
    const { back, front } = this.state;
    return !back || !front;
  }

  handleCreateCard() {
    const {
      navigation: { goBack, state: { params: { deckId, handleCreateCard } } },
    } = this.props;
    const { back, front } = this.state;
    handleCreateCard({ back, front, deckId });
    goBack();
  }

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.formGroup}>
          <Text style={styles.label}>front</Text>
          <TextInput
            onChangeText={front => this.setState({ front })}
            value={this.state.front}
            style={styles.input}
          />
        </View>
        <View style={(styles.formGroup, { paddingTop: 20 })}>
          <Text style={styles.label}>back</Text>
          <TextInput
            onChangeText={back => this.setState({ back })}
            value={this.state.back}
            style={styles.input}
          />
        </View>
        <Button
          disabled={this.isFormComplete()}
          onPress={() => this.handleCreateCard()}
          title="submit"
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
  formGroup: {
    justifyContent: 'flex-start',
  },
  label: {
    paddingBottom: 5,
  },
});
