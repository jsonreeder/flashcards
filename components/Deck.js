import React from 'react';
import { Alrt, Button, StyleSheet, Text, View } from 'react-native';
import * as api from '../utils/api';

export default class Deck extends React.Component {
  state = {
    title: '',
    count: 0,
    cards: [],
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

  render() {
    const { title } = this.state;
    const {
      navigation: { navigate, state: { params: { deckId } } },
    } = this.props;
    const count = this.calculateCount();

    return (
      <View style={styles.container}>
        <Text>{`${title} - (${count})`}</Text>
        <Button
          onPress={() => navigate('Quiz', { deckId })}
          title="start quiz"
        />
        <Button
          onPress={() => navigate('AddCard', { deckId })}
          title="add card"
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
