import React from 'react';
import { Button, StyleSheet, Text, View } from 'react-native';
import * as api from '../utils/api';

export default class Deck extends React.Component {
  state = {
    title: '',
    cards: [],
    score: 0,
  };

  componentDidMount() {
    const { navigation: { state: { params: { deckId } } } } = this.props;
    const deck = api.getDeck(deckId);
    const { title, cards } = deck;
    this.setState({ title, cards });
  }

  calculateCount() {
    const { cards } = this.state;
    return cards.length;
  }

  getCard(cards, cardNo) {
    return cards[cardNo];
  }

  scoreUp() {
    return this.setState(state => ({
      score: state.score + 1,
    }));
  }

  render() {
    const { title, cards } = this.state;
    const {
      navigation: { navigate, state: { params: { deckId } } },
    } = this.props;
    const count = this.calculateCount();
    const card = cards[0];

    return (
      <View style={styles.container}>
        <View style={styles.textContainer}>
          <Text style={styles.title}>
            {title}
          </Text>
          <Text style={styles.count}>
            {count} cards
          </Text>
        </View>
        <View style={styles.buttonContainer}>
          <Button
            onPress={() =>
              navigate('Quiz', {
                deckId,
                currentCardNo: 0,
                totalCardNo: this.calculateCount(),
                getCard: cardNo => this.getCard(cards, cardNo),
                scoreUp: () => this.scoreUp(),
              })}
            title="start quiz"
          />
          <Button
            onPress={() => navigate('AddCard', { deckId })}
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
