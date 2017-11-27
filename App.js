import React from 'react';
import { StackNavigator } from 'react-navigation';
import { AddCard, Deck, DeckList, Quiz } from './components';

const Stack = StackNavigator({
  Home: {
    screen: AddCard,
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
});

export default class App extends React.Component {
  render() {
    return <Stack />;
  }
}
