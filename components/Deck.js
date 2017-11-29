import React from 'react';
import { Button, StyleSheet, Text, View } from 'react-native';
import * as api from '../utils/api';

export default class Deck extends React.Component {
  static navigationOptions = () => ({
    title: 'deck',
  });

  countCards() {
    const {
      navigation: { navigate, state: { params: { deck: { cards } } } },
    } = this.props;
    return cards.length;
  }

  getCard(cards, cardNo) {
    return cards[cardNo];
  }

  render() {
    const {
      navigation: {
        navigate,
        state: { params: { deck: { title, cards, id } } },
      },
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
                id,
                cards,
              })}
            title="start quiz"
          />
          <Button
            onPress={() => navigate('AddCard', { deckId: id })}
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
