import React from 'react';
import { Button, StyleSheet, Text, View } from 'react-native';
import * as api from '../utils/api';

export default class Deck extends React.Component {
  state = {
    title: '',
    cards: [],
  };

  static navigationOptions = () => {
    return {
      title: 'deck',
    };
  };

  componentDidMount() {
    const { navigation: { state: { params: { deckId } } } } = this.props;
    const deck = api.getDeck(deckId);
    const { title, cards } = deck;
    this.setState({ title, cards });
  }

  countCards() {
    const { cards } = this.state;
    return cards.length;
  }

  getCard(cards, cardNo) {
    return cards[cardNo];
  }

  render() {
    const { title, cards } = this.state;
    const {
      navigation: { navigate, state: { params: { deckId } } },
    } = this.props;

    return (
      <View style={styles.container}>
        <View style={styles.textContainer}>
          <Text style={styles.title}>
            {title}
          </Text>
          <Text style={styles.count}>
            {this.countCards()} cards
          </Text>
        </View>
        <View style={styles.buttonContainer}>
          <Button
            onPress={() =>
              navigate('Quiz', {
                deckId,
                cards,
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
