import React from 'react';
import { Alert, Button, StyleSheet, Text, View } from 'react-native';

export default class Deck extends React.Component {
  state = {
    isFlipped: false,
  };

  renderText() {
    const {
      navigation: { navigate, state: { params: { currentCardNo, getCard } } },
    } = this.props;
    const card = getCard(currentCardNo);
    console.log(card);
    const { front, back } = card;
    const { isFlipped } = this.state;

    if (!isFlipped) {
      return (
        <Text>
          {front}
        </Text>
      );
    }

    return (
      <Text>
        {back}
      </Text>
    );
  }

  renderFlip() {
    const { isFlipped } = this.state;
    const text = !isFlipped ? 'show answer' : 'show question';

    return (
      <Button
        onPress={() => this.setState({ isFlipped: !isFlipped })}
        title={text}
      />
    );
  }

  renderAnswerButtons() {
    return (
      <View>
        <Button onPress={() => Alert.alert('')} title="correct" />
        <Button onPress={() => Alert.alert('')} title="incorrect" />
      </View>
    );
  }

  nextCard() {}

  render() {
    const {
      navigation: {
        navigate,
        state: { params: { currentCardNo, totalCardNo } },
      },
    } = this.props;

    return (
      <View style={styles.container}>
        <Text>{`${currentCardNo + 1} / ${totalCardNo}`}</Text>
        {this.renderText()}
        {this.renderFlip()}
        {this.renderAnswerButtons()}
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
