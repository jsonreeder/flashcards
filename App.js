import React from 'react';
import { StackNavigator } from 'react-navigation';
import { AddCard, AddDeck, Deck, DeckList, Quiz } from './components';
import * as api from './utils/api';
import { setLocalNotification } from './utils/notifications';

const Stack = StackNavigator({
  Home: {
    screen: DeckList,
  },
  Deck: {
    screen: Deck,
  },
  Quiz: {
    screen: Quiz,
  },
  AddCard: {
    screen: AddCard,
  },
  AddDeck: {
    screen: AddDeck,
  },
});

export default class App extends React.Component {
  componentDidMount() {
    api.writeSeedData();
    setLocalNotification();
  }

  render() {
    return <Stack />;
  }
}
