import seedData from './seedData';

export function getDecksInfo() {
  const allDecks = getDecks();
  return allDecks.map(d => ({
    title: d.title,
    count: getCardsForDeck(d.id).length,
  }));
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
