import React from 'react';
import { Button, StyleSheet, Text, View } from 'react-native';
import * as api from '../utils/api';

export default class Deck extends React.Component {
  static navigationOptions = () => ({
    title: 'deck',
  });

  cardCount(deck) {
    const quantifier = deck.cards ? deck.cards.length : 0;
    const noun = quantifier === 1 ? 'card' : 'cards';
    return `${quantifier} ${noun}`;
  }

  render() {
    const {
      navigation: {
        navigate,
        state: { params: { getDeck, deckId, handleCreateCard } },
      },
    } = this.props;
    const deck = getDeck(deckId);

    return (
      <View style={styles.container}>
        <View style={styles.textContainer}>
          <Text style={styles.title}>
            {deck.title}
          </Text>
          <Text style={styles.count}>
            {this.cardCount(deck)}
          </Text>
        </View>
        <View style={styles.buttonContainer}>
          <Button
            onPress={() =>
              navigate('Quiz', {
                id: deckId,
                cards,
              })}
            title="start quiz"
          />
          <Button
            onPress={() =>
              navigate('AddCard', {
                deckId,
                handleCreateCard,
                refresh: () => this.forceUpdate(),
              })}
            title="add card"
          />
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
  },
  textContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonContainer: {
    marginBottom: 80,
  },
  title: {
    fontSize: 30,
  },
  count: {
    fontStyle: 'italic',
  },
});
