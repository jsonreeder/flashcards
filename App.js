import React from 'react';
import { StackNavigator } from 'react-navigation';
import { Deck, DeckList, Quiz } from './components';

const Stack = StackNavigator({
  Home: {
    screen: DeckList,
    headerTitle: 'home',
  },
  Deck: {
    path: 'decks/:deckId',
    screen: Deck,
  },
  Quiz: {
    path: 'quiz/:deckId',
    screen: Quiz,
  },
});

export default class App extends React.Component {
  render() {
    return <Stack />;
  }
}
