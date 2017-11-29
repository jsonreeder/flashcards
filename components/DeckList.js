import React from 'react';
import { Alert, Button, StyleSheet, Text, View } from 'react-native';
import * as api from '../utils/api';

export default class DeckList extends React.Component {
  state = {
    decks: {},
  };

  static navigationOptions = () => ({
    title: 'home',
  });

  async componentDidMount() {
    const decks = await api.getDecksAndCards();

    this.setState({
      decks,
    });
  }

  render() {
    const { decks } = this.state;
    const { navigation: { navigate } } = this.props;
    const decksKeys = Object.keys(decks);

    return (
      <View style={styles.container}>
        {decksKeys &&
          decksKeys.map((key, i) => {
            const deck = decks[key];
            return (
              <Button
                key={i}
                onPress={() => navigate('Deck', { deck })}
                title={`${deck.title} (${deck.cards.length})`}
              />
            );
          })}
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
