import React from 'react';
import { Alert, Button, StyleSheet, Text, View } from 'react-native';
import * as api from '../utils/api';

export default class DeckList extends React.Component {
  state = {
    decks: [],
  };

  componentDidMount() {
    const decks = api.getDecksInfo();
    this.setState({ decks });
  }

  _onPressButton(e, deckId) {
    const { navigation } = this.props;
    return navigation.navigate('Deck', { deckId });
    /* Alert.alert(deckId + '');*/
  }

  render() {
    const { decks } = this.state;

    return (
      <View style={styles.container}>
        {decks.map((d, i) =>
          <Button
            key={i}
            onPress={e => this._onPressButton(e, d.id)}
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
