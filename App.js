import React from 'react';
import { StackNavigator } from 'react-navigation';
import { Deck, DeckList, QuizCard } from './components';

const Stack = StackNavigator({
  Home: {
    /* screen: DeckList,*/
    screen: QuizCard,
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
