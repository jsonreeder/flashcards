import { AsyncStorage } from 'react-native';
import uuid from 'uuid';
import seedData from './seedData';

const STORAGE_KEY = 'Flashcards';

// API

export async function getDecksAndCards() {
  const { decks, cards } = await getAppData();
  return decks.map(d => {
    return {
      id: d.id,
      title: d.title,
      cards: cards.filter(c => c.deck === d.id),
    };
  });
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
}

// Helpers

async function getAppData() {
  const results = await AsyncStorage.getItem(STORAGE_KEY);
  const data = JSON.parse(results);
  return data;
}
