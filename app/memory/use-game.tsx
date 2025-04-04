"use client";

import { useEffect, useReducer, Reducer } from "react";

import { CARDS, WAIT_TIMEOUT, MATCHING_CARDS, GAME_ACTIONS } from "./constants";
import { shuffle } from "./utils";

interface GameState {
  cards: string[];
  found: string[];
  revealedIndexes: number[];
  moves: number;
}

interface GameAction {
  type: string;
  card?: string;
  cardIndex?: number;
}

const initialGameState: GameState = {
  cards: [...CARDS],
  found: [],
  revealedIndexes: [],
  moves: 0,
};

export function useGame() {
  const [game, dispatchGame] = useReducer(gameReducer, initialGameState);

  useEffect(() => {
    reset();
  }, []);

  useEffect(() => {
    let foundTimeout: ReturnType<typeof setTimeout>,
      revealTimeout: ReturnType<typeof setTimeout>;

    if (game.revealedIndexes.length === MATCHING_CARDS) {
      const [first, second]: number[] = game.revealedIndexes;
      const firstCard = game.cards[first];
      const secondCard = game.cards[second];

      const getPizzaName = (card: string) =>
        card.includes(".avif")
          ? card
              .replace("card-front/", "")
              .replace(".avif", "")
              .replace(/_/g, " ")
              .replace(/\b\w/g, char => char.toUpperCase())
          : card;

      if (getPizzaName(firstCard) === getPizzaName(secondCard)) {
        foundTimeout = setTimeout(() => {
          dispatchGame({
            type: GAME_ACTIONS.FIND,
            card: getPizzaName(firstCard),
          });
        }, WAIT_TIMEOUT);
      }

      revealTimeout = setTimeout(() => {
        dispatchGame({ type: GAME_ACTIONS.HIDE_REVEALED });
      }, WAIT_TIMEOUT);
    }

    return () => {
      if (foundTimeout) clearTimeout(foundTimeout);
      if (revealTimeout) clearTimeout(revealTimeout);
    };
  }, [game.revealedIndexes]);

  const revealCard = (cardIndex: number) => {
    if (game.revealedIndexes.length < MATCHING_CARDS) {
      dispatchGame({ type: GAME_ACTIONS.REVEAL, cardIndex });
    }
  };

  const reset = () => {
    dispatchGame({ type: GAME_ACTIONS.RESET });
  };

  return {
    state: {
      ...game,
    },
    handler: {
      revealCard,
      reset,
    },
  };
}

function gameReducer(state: GameState, action: GameAction): GameState {
  if (action.type === GAME_ACTIONS.REVEAL) {
    const cardIndex = action.cardIndex as number;
    const revealedIndexes =
      state.revealedIndexes.length > 0
        ? [...state.revealedIndexes, cardIndex]
        : [cardIndex];
    return {
      ...state,
      revealedIndexes,
      moves: state.moves + 1,
    };
  }
  if (action.type === GAME_ACTIONS.HIDE_REVEALED) {
    return {
      ...state,
      revealedIndexes: [],
    };
  }
  if (action.type === GAME_ACTIONS.FIND) {
    const foundPizza = action.card as string;
    const imagePath = `card-front/${foundPizza.toLowerCase().replace(/ /g, "_")}.avif`;
  
    return {
      ...state,
      found: [...state.found, foundPizza, imagePath],
    };
  }
  
  if (action.type === GAME_ACTIONS.RESET) {
    return {
      cards: shuffle([...CARDS]),
      found: [],
      revealedIndexes: [],
      moves: 0,
    };
  }

  return state;
}
