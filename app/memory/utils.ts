import { NUMBER_OF_CARDS, MATCHING_CARDS } from './constants';

export const shuffle = (array: string[]) => [...array].sort(() => Math.random() - 0.5);

export const isGameOver = (foundCards: string[]) => foundCards.length === NUMBER_OF_CARDS * MATCHING_CARDS;
