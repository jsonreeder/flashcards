import React from 'react';
import { Alert, Button, StyleSheet, Text, TextInput, View } from 'react-native';
import * as api from '../utils/api';

export default class AddDeck extends React.Component {
  state = {
    title: '',
  };

  static navigationOptions = () => ({
    title: 'add deck',
  });

  isFormIncomplete() {
    const { title } = this.state;
    return !title;
  }

  handleCreateDeck() {
    const {
      navigation: { goBack, state: { params: { handleCreateDeck, refresh } } },
    } = this.props;
    const { title } = this.state;
    handleCreateDeck({ title });
  }

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.formGroup}>
          <Text style={styles.label}>title</Text>
          <TextInput
            onChangeText={title => this.setState({ title })}
            value={this.state.title}
            style={styles.input}
          />
        </View>
        <Button
          disabled={this.isFormIncomplete()}
          onPress={() => this.handleCreateDeck()}
          title="create deck"
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
