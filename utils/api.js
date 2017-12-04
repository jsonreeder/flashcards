import { AsyncStorage } from 'react-native';
import uuid from 'uuid';
import seedData from './seedData';

const STORAGE_KEY = 'Flashcards';

// API

export async function getDecksAndCards() {
  const { decks, cards } = await getAppData();
  const decksAndCards = decks.reduce((decks, d) => {
    decks[d.id] = {
      id: d.id,
      title: d.title,
      cards: cards.filter(c => c.deck === d.id),
    };
    return decks;
  }, {});
  return decksAndCards;
}

export async function writeSeedData() {
  await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(seedData));
}

export async function createCard(deckId, front, back) {
  const card = {
    back,
    front,
    deck: deckId,
    id: uuid.v4(),
  };
  const { decks, cards } = await getAppData();
  const newData = {
    cards: [...cards, card],
  };
  await AsyncStorage.mergeItem(STORAGE_KEY, JSON.stringify(newData));
  return card;
}

export async function createDeck(title) {
  const deck = {
    id: uuid.v4(),
    title,
  };
  const { decks, cards } = await getAppData();
  const newData = {
    decks: [...decks, deck],
  };
  await AsyncStorage.mergeItem(STORAGE_KEY, JSON.stringify(newData));
  return deck;
}

// Helpers

async function getAppData() {
  const results = await AsyncStorage.getItem(STORAGE_KEY);
  const data = JSON.parse(results);
  return data;
}
