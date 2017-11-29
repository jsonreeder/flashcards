import { AsyncStorage } from 'react-native';
import uuid from 'uuid';
import seedData from './seedData';

const STORAGE_KEY = 'Flashcards';

// API

export async function getDecksInfo() {
  const allDecks = await getDecks();
  const allCards = await getCards();
  return allDecks.map(d => {
    return {
      id: d.id,
      title: d.title,
      count: allCards.filter(c => c.deck === d.id).length,
    };
  });
}

export async function getDeck(deckId) {
  const allDecks = await getDecks();
  const deck = allDecks.find(d => d.id === deckId);
  const cards = await getCardsForDeck(deckId);
  return {
    title: deck.title,
    id: deck.id,
    cards,
  };
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
  const allDecks = await getDecks();
  const allCards = await getCards();
  const newData = {
    decks: allDecks,
    cards: [...allCards, card],
  };
  await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(newData));
}

// Helpers

async function getCardsForDeck(deckId) {
  const allCards = await getCards();
  return allCards.filter(c => c.deck === deckId);
}

async function getDecks() {
  const appData = await getAppData();
  return appData.decks;
}

async function getCards() {
  const appData = await getAppData();
  return appData.cards;
}

async function getAppData() {
  const results = await AsyncStorage.getItem(STORAGE_KEY);
  const data = JSON.parse(results);
  return data;
}
