import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import * as api from './utils/api';

export default class App extends React.Component {
  render() {
    const decks = api.getDecksInfo();

    return (
      <View style={styles.container}>
        {decks.map((d, i) =>
          <Text key={i}>
            {`${d.title} (${d.count})`}
          </Text>,
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
