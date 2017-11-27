import React from 'react';
import { Alert, Button, StyleSheet, Text, View } from 'react-native';
import * as api from '../utils/api';

export default class DeckList extends React.Component {
  state = {
    decks: [],
  };

  static navigationOptions = () => ({
    title: 'home',
  });

  async componentDidMount() {
    const decks = await api.getDecksInfo();

    this.setState({
      decks,
    });
  }

  render() {
    const { decks } = this.state;
    const { navigation: { navigate } } = this.props;

    return (
      <View style={styles.container}>
        {decks &&
          decks.map((d, i) =>
            <Button
              key={i}
              onPress={() => navigate('Deck', { deckId: d.id })}
              title={`${d.title} (${d.count})`}
            />,
          )}
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
