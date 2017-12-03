import React from 'react';
import { Alert, Button, StyleSheet, Text, TextInput, View } from 'react-native';
import * as api from '../utils/api';

export default class AddDeck extends React.Component {
  state = {
    name: '',
  };

  static navigationOptions = () => ({
    title: 'add deck',
  });

  isFormComplete() {
    const { name } = this.state;
    return !!name;
  }

  async handleCreateDeck() {
    const {
      navigation: { goBack, state: { params: { handleCreateCard, refresh } } },
    } = this.props;
    const { name } = this.state;
    await handleCreateDeck({ name });
    refresh();
    goBack();
  }

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.formGroup}>
          <Text style={styles.label}>name</Text>
          <TextInput
            onChangeText={front => this.setState({ name })}
            value={this.state.name}
            style={styles.input}
          />
        </View>
        <Button
          disabled={this.isFormComplete()}
          onPress={() => this.handleCreateDeck()}
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
