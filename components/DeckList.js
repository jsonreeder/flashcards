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

  async handleCreateCard({ back, front, deckId }) {
    const card = await api.createCard(deckId, front, back);
    this.setState(state => ({
      decks: {
        ...state.decks,
        [deckId]: {
          ...state.decks[deckId],
          cards: [...state.decks[deckId].cards, card],
        },
      },
    }));
  }

  async handleCreateDeck({ title }) {
    const deck = await api.createDeck(title);
    this.setState(state => ({
      decks: {
        ...state.decks,
        [deck.id]: deck,
      },
    }));
  }

  getDeck(deckId) {
    const { decks } = this.state;
    return decks[deckId];
  }

  deckTitle(deck) {
    const cardCount = deck.cards ? deck.cards.length : 0;
    return `${deck.title} (${cardCount})`;
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
                onPress={() =>
                  navigate('Deck', {
                    deckId: key,
                    getDeck: deckId => this.getDeck(deckId),
                    handleCreateCard: args => this.handleCreateCard(args),
                  })}
                title={this.deckTitle(deck)}
              />
            );
          })}
        <Button
          onPress={() =>
            navigate('AddDeck', {
              handleCreateDeck: args => this.handleCreateDeck(args),
              refresh: () => this.forceUpdate(),
            })}
          title="add deck"
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
});
