import React from 'react';
import { StackNavigator } from 'react-navigation';
import { AddCard, AddDeck, Deck, DeckList, Quiz } from './components';
import * as api from './utils/api';

const Stack = StackNavigator({
  Home: {
    screen: DeckList,
  },
  Deck: {
    path: 'decks/:deckId',
    screen: Deck,
  },
  Quiz: {
    path: 'quiz/:deckId',
    screen: Quiz,
  },
  AddCard: {
    path: 'decks/:deckId/add',
    screen: AddCard,
  },
  AddDeck: {
    screen: AddDeck,
  },
});

export default class App extends React.Component {
  componentDidMount() {
    api.writeSeedData();
  }

  render() {
    return <Stack />;
  }
}
