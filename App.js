import React from 'react';
import { StackNavigator } from 'react-navigation';
import { DeckList } from './components';

const Stack = StackNavigator({
  Home: {
    screen: DeckList,
  },
});

export default class App extends React.Component {
  render() {
    return <Stack />;
  }
}
