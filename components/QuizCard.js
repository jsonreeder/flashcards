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
    const {
      navigation: {
        navigate,
        state: {
          params: { currentCardNo, totalCardNo, getCard, scoreUp, getScore },
        },
      },
    } = this.props;

    if (outcome === 'correct') {
      scoreUp();
    }

    return navigate('Quiz', {
      currentCardNo: currentCardNo + 1,
      getCard,
      getScore,
      scoreUp,
      totalCardNo,
    });
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
    const {
      navigation: { state: { params: { currentCardNo, totalCardNo } } },
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

  renderScore() {
    const {
      navigation: { state: { params: { getScore, totalCardNo } } },
    } = this.props;
    const score = getScore();

    return (
      <View style={styles.container}>
        <Text>{`${score / totalCardNo * 100} %`}</Text>
        <Text>{`${score} / ${totalCardNo}`}</Text>
      </View>
    );
  }

  render() {
    const {
      navigation: {
        state: { params: { currentCardNo, totalCardNo, getScore } },
      },
    } = this.props;

    if (currentCardNo === totalCardNo) {
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
