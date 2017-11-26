import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import * as api from '../utils/api';

export default class DeckList extends React.Component {
  state = {
    decks: [],
  };

  componentDidMount() {
    const decks = api.getDecksInfo();
    this.setState({ decks });
  }

  render() {
    const { decks } = this.state;

    return (
      <View style={styles.container}>
        {decks.map((d, i) =>
          <Text key={i}>
            {`${d.title} (${d.count})`}
          </Text>,
        )}
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
