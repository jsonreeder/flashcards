import React from 'react';
import { Button, StyleSheet, Text, View } from 'react-native';

export default class Quiz extends React.Component {
  state = {
    isFlipped: false,
    currentCardNo: 0,
    score: 0,
  };

  static navigationOptions = () => ({
    title: 'quiz',
  });

  scoreUp() {
    return this.setState(state => ({
      score: state.score + 1,
    }));
  }

  countCards() {
    const { navigation: { state: { params: { cards } } } } = this.props;
    return cards.length;
  }

  renderText() {
    const { navigation: { state: { params: { cards } } } } = this.props;
    const { currentCardNo } = this.state;
    const card = cards[currentCardNo];
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

  nextCard(outcome) {
    const { currentCardNo } = this.state;
    const { navigation: { state: { params: { cards } } } } = this.props;

    if (outcome === 'correct') {
      this.setState(state => ({
        score: state.score + 1,
      }));
    }

    return this.setState(state => ({
      currentCardNo: state.currentCardNo + 1,
    }));
  }

  renderAnswerButtons() {
    return (
      <View>
        <Button onPress={() => this.nextCard('correct')} title="correct" />
        <Button onPress={() => this.nextCard('incorrect')} title="incorrect" />
      </View>
    );
  }

  renderCard() {
    const { currentCardNo } = this.state;

    return (
      <View style={styles.container}>
        <Text>{`${currentCardNo + 1} / ${this.countCards()}`}</Text>
        {this.renderText()}
        {this.renderFlip()}
        {this.renderAnswerButtons()}
      </View>
    );
  }

  renderScore() {
    const { navigation: { state: { params: { getScore } } } } = this.props;
    const { score } = this.state;

    return (
      <View style={styles.container}>
        <Text>{`${score / this.countCards() * 100} %`}</Text>
        <Text>{`${score} / ${this.countCards()}`}</Text>
      </View>
    );
  }

  render() {
    const { currentCardNo } = this.state;

    if (currentCardNo === this.countCards()) {
      return this.renderScore();
    }

    return this.renderCard();
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});