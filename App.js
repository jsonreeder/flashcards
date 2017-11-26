import React from 'react';
import { StackNavigator } from 'react-navigation';
import { Deck, DeckList } from './components';

const Stack = StackNavigator({
  Home: {
    screen: DeckList,
  },
  Deck: {
    path: 'decks/:deckId',
    screen: Deck,
  },
});

export default class App extends React.Component {
  render() {
    return <Stack />;
  }
}
