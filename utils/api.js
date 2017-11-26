import seedData from './seedData';

export function getDecksInfo() {
  const allDecks = getDecks();
  return allDecks.map(d => ({
    id: d.id,
    title: d.title,
    count: getCardsForDeck(d.id).length,
  }));
}

export function getDeck(deckId) {
  const allDecks = getDecks();
  const deck = allDecks.find(d => d.id === deckId);
  const cards = getCardsForDeck(deckId);
  return {
    title: deck.title,
    id: deck.id,
    cards,
  };
}

// Helpers

function getCardsForDeck(deckId) {
  const allCards = getCards();
  return allCards.filter(c => c.deck === deckId);
}

function getDecks() {
  return seedData.decks;
}

function getCards() {
  return seedData.cards;
}
